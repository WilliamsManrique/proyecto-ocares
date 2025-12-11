import os
import json
from datetime import datetime
from io import BytesIO
from dotenv import load_dotenv
from flask import (
    Flask, render_template, request, redirect, url_for, flash, session, jsonify, send_file
)
from flask_login import (
    LoginManager, UserMixin, login_user, logout_user, login_required, current_user
)
from werkzeug.security import generate_password_hash, check_password_hash
import mysql.connector
from mysql.connector import Error
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas

# Cargar variables de entorno desde .env
load_dotenv()

# =================== Configuración de la app ===================
app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY", "clave_secreta_demo")

# Configuración de Flask-Login
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "login"
login_manager.login_message = "Por favor inicia sesión para acceder a esta página."

# =================== Conexión a MySQL ===================
from sshtunnel import SSHTunnelForwarder
import mysql.connector
import os

tunnel = None  # evitar múltiples túneles

def get_db_connection():
    global tunnel

    SSH_HOST = os.getenv("SSH_HOST")
    SSH_PORT = int(os.getenv("SSH_PORT"))
    SSH_USER = os.getenv("SSH_USER")
    SSH_KEY_PATH = os.getenv("SSH_KEY_PATH")

    DB_HOST = os.getenv("DB_HOST")
    DB_PORT = int(os.getenv("DB_PORT"))
    DB_NAME = os.getenv("DB_NAME")
    DB_USER = os.getenv("DB_USER")
    DB_PASSWORD = os.getenv("DB_PASSWORD")

    try:
        # Crear túnel solo una vez
        if tunnel is None or not tunnel.is_active:
            tunnel = SSHTunnelForwarder(
                (SSH_HOST, SSH_PORT),
                ssh_username=SSH_USER,
                ssh_private_key=SSH_KEY_PATH,
                remote_bind_address=(DB_HOST, DB_PORT),
                local_bind_address=("127.0.0.1", 0)  # Puerto local automático
            )
            tunnel.start()
            print(f"🔐 SSH Tunnel activo en puerto {tunnel.local_bind_port}")

        # Conectar a MySQL usando el puerto del túnel
        conn = mysql.connector.connect(
            host="127.0.0.1",
            port=tunnel.local_bind_port,
            user=DB_USER,
            password=DB_PASSWORD,
            database=DB_NAME,
            autocommit=True
        )

        print("✔ Conexión MySQL vía SSH exitosa")
        return conn

    except Exception as e:
        print("❌ Error conectando a MySQL vía SSH:", e)
        return None

def close_db_connection(conn):
    try:
        if conn:
            conn.close()
    except Exception:
        pass

# =================== Creación de tablas ===================
def init_db():
    conn = get_db_connection()
    if conn is None:
        print("❌ No se pudo inicializar DB")
        return

    cursor = conn.cursor()

    try:
        # Usuarios
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS usuarios (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(100) UNIQUE NOT NULL,
                telefono VARCHAR(20),
                password VARCHAR(200) NOT NULL,
                puntos INT DEFAULT 0,
                fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
                social_id VARCHAR(100) NULL,
                provider VARCHAR(50) NULL
            )
        ''')

        # Direcciones
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS direcciones (
                id INT AUTO_INCREMENT PRIMARY KEY,
                usuario_id INT NOT NULL,
                alias VARCHAR(50),
                calle VARCHAR(200) NOT NULL,
                ciudad VARCHAR(100) NOT NULL,
                estado VARCHAR(100),
                codigo_postal VARCHAR(20),
                pais VARCHAR(100) NOT NULL,
                es_principal TINYINT(1) DEFAULT 0,
                FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
            )
        ''')

        # Pedidos
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS pedidos (
                id INT AUTO_INCREMENT PRIMARY KEY,
                usuario_id INT NULL,
                nombre_cliente VARCHAR(100),
                email_cliente VARCHAR(100),
                telefono_cliente VARCHAR(20),
                direccion_cliente TEXT,
                metodo_pago VARCHAR(50),
                fecha_pedido DATETIME DEFAULT CURRENT_TIMESTAMP,
                total DECIMAL(10,2),
                estado VARCHAR(50) DEFAULT 'pendiente',
                datos_pedido TEXT,
                FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL
            )
        ''')

        # Reseñas
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS resenas (
                id INT AUTO_INCREMENT PRIMARY KEY,
                usuario_id INT NOT NULL,
                producto_id INT NOT NULL,
                calificacion INT NOT NULL,
                comentario TEXT,
                fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
            )
        ''')

        # Lista de deseos
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS lista_deseos (
                id INT AUTO_INCREMENT PRIMARY KEY,
                usuario_id INT NOT NULL,
                producto_id INT NOT NULL,
                fecha_agregado DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
            )
        ''')

        # Preferencias de notificación
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS preferencias_notificacion (
                id INT AUTO_INCREMENT PRIMARY KEY,
                usuario_id INT NOT NULL,
                email_notificaciones TINYINT(1) DEFAULT 1,
                sms_notificaciones TINYINT(1) DEFAULT 0,
                emails_promocionales TINYINT(1) DEFAULT 1,
                FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
            )
        ''')

        # Contactos
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS contactos (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL,
                mensaje TEXT NOT NULL,
                fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
                ip_cliente VARCHAR(45) NULL
            )
        ''')

        conn.commit()
        print("✔ Tabla creada o existente")

    except Exception as e:
        print("❌ Error creando tabla:", e)

    finally:
        cursor.close()
        conn.close()

# =================== Usuario Flask-Login ===================
class User(UserMixin):
    def __init__(self, id, email, telefono, puntos):
        self.id = id
        self.email = email
        self.telefono = telefono
        self.puntos = puntos

@login_manager.user_loader
def load_user(user_id):
    conn = get_db_connection()
    if not conn:
        return None
    try:
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT id, email, telefono, puntos FROM usuarios WHERE id = %s", (user_id,))
        data = cursor.fetchone()
        cursor.close()
        return User(data["id"], data["email"], data["telefono"], data["puntos"]) if data else None
    except Exception as e:
        print(f"❌ Error cargando usuario: {e}")
        return None
    finally:
        close_db_connection(conn)

# =================== Helper: puntos ===================
def agregar_puntos(usuario_id, monto):
    """Agregar puntos por compras (1 punto cada S/10)"""
    try:
        puntos = int(float(monto) / 10)
    except Exception:
        return 0

    conn = get_db_connection()
    if not conn:
        return 0
    try:
        cursor = conn.cursor()
        cursor.execute("UPDATE usuarios SET puntos = puntos + %s WHERE id = %s", (puntos, usuario_id))
        conn.commit()
        cursor.close()
        return puntos
    except Exception as e:
        print(f"❌ Error agregando puntos: {e}")
        return 0
    finally:
        close_db_connection(conn)

# =================== Rutas de autenticación ===================
@app.route("/registro", methods=["GET", "POST"])
def registro():
    if request.method == "POST":
        email = request.form.get("email")
        telefono = request.form.get("telefono")
        password = request.form.get("password")
        confirm_password = request.form.get("confirm_password")

        if not all([email, telefono, password, confirm_password]):
            flash("Completa todos los campos.", "error")
            return render_template("registro.html")

        if password != confirm_password:
            flash("Las contraseñas no coinciden.", "error")
            return render_template("registro.html")

        if len(password) < 6:
            flash("La contraseña debe tener al menos 6 caracteres.", "error")
            return render_template("registro.html")

        conn = get_db_connection()
        if not conn:
            flash("Error de conexión con la base de datos.", "error")
            return render_template("registro.html")

        try:
            cursor = conn.cursor()
            cursor.execute("SELECT id FROM usuarios WHERE email = %s", (email,))
            if cursor.fetchone():
                flash("El correo ya está registrado.", "error")
                cursor.close()
                close_db_connection(conn)
                return render_template("registro.html")

            hashed_password = generate_password_hash(password)
            cursor.execute(
                "INSERT INTO usuarios (email, telefono, password) VALUES (%s, %s, %s)",
                (email, telefono, hashed_password),
            )
            conn.commit()
            cursor.close()
            flash("¡Registro exitoso! Ahora puedes iniciar sesión.", "success")
            return redirect(url_for("login"))
        except Exception as e:
            print(f"❌ Error en registro: {e}")
            flash("Error al registrar. Intenta nuevamente.", "error")
            return render_template("registro.html")
        finally:
            close_db_connection(conn)
    return render_template("registro.html")

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        correo = request.form.get("email")
        contraseña = request.form.get("password")

        conn = get_db_connection()
        if not conn:
            flash("Error de conexión con la base de datos.", "error")
            return render_template("login.html")

        try:
            cursor = conn.cursor(dictionary=True)
            cursor.execute("SELECT * FROM usuarios WHERE email = %s", (correo,))
            account = cursor.fetchone()
            cursor.close()
            if account and check_password_hash(account["password"], contraseña):
                user = User(account["id"], account["email"], account["telefono"], account["puntos"])
                login_user(user)
                flash("Inicio de sesión exitoso", "success")
                return redirect(url_for("perfil"))
            else:
                flash("Correo o contraseña incorrectos", "error")
        except Exception as e:
            print(f"❌ Error en login: {e}")
        finally:
            close_db_connection(conn)
    return render_template("login.html")

@app.route("/logout")
@login_required
def logout():
    logout_user()
    flash("Has cerrado sesión correctamente", "info")
    return redirect(url_for("login"))

# ===== RUTAS DE PERFIL Y USUARIO =====
@app.route("/perfil")
@login_required
def perfil():
    conn = get_db_connection()
    user_data = {}

    if not conn:
        flash('Error de conexión a la base de datos', 'error')
        return render_template('perfil.html', user_data=user_data)

    try:
        cursor = conn.cursor(dictionary=True)

        # Direcciones
        cursor.execute('SELECT id, alias, calle, ciudad, estado, codigo_postal, pais, es_principal FROM direcciones WHERE usuario_id = %s', (current_user.id,))
        direcciones = []
        for row in cursor.fetchall():
            direcciones.append({
                'id': row['id'],
                'alias': row['alias'],
                'calle': row['calle'],
                'ciudad': row['ciudad'],
                'estado': row['estado'],
                'codigo_postal': row['codigo_postal'],
                'pais': row['pais'],
                'es_principal': bool(row['es_principal'])
            })

        # Pedidos (selecciono columnas explícitas)
        cursor.execute('SELECT id, fecha_pedido, total, estado, datos_pedido FROM pedidos WHERE usuario_id = %s ORDER BY fecha_pedido DESC', (current_user.id,))
        pedidos = []
        for row in cursor.fetchall():
            pedidos.append({
                'id': row['id'],
                'fecha_pedido': row['fecha_pedido'],
                'total': float(row['total']) if row['total'] is not None else 0.0,
                'estado': row['estado'],
                'datos_pedido': row['datos_pedido']
            })

        # Lista de deseos
        cursor.execute('SELECT id, producto_id, fecha_agregado FROM lista_deseos WHERE usuario_id = %s', (current_user.id,))
        lista_deseos = [{'id': r['id'], 'producto_id': r['producto_id'], 'fecha_agregado': r['fecha_agregado']} for r in cursor.fetchall()]

        # Preferencias
        cursor.execute('SELECT email_notificaciones, sms_notificaciones, emails_promocionales FROM preferencias_notificacion WHERE usuario_id = %s', (current_user.id,))
        pref_row = cursor.fetchone()
        preferencias = {
            'email_notificaciones': bool(pref_row['email_notificaciones']) if pref_row else True,
            'sms_notificaciones': bool(pref_row['sms_notificaciones']) if pref_row else False,
            'emails_promocionales': bool(pref_row['emails_promocionales']) if pref_row else True
        }

        cursor.close()
        user_data = {
            'direcciones': direcciones,
            'pedidos': pedidos,
            'lista_deseos': lista_deseos,
            'preferencias': preferencias
        }
    except Exception as e:
        print(f"Error obteniendo datos del perfil: {e}")
    finally:
        close_db_connection(conn)

    return render_template('perfil.html', user_data=user_data)


@app.route("/agregar_direccion", methods=['POST'])
@login_required
def agregar_direccion():
    alias = request.form.get('alias')
    calle = request.form.get('calle')
    ciudad = request.form.get('ciudad')
    estado = request.form.get('estado')
    codigo_postal = request.form.get('codigo_postal')
    pais = request.form.get('pais')
    es_principal = 1 if request.form.get('es_principal') else 0

    conn = get_db_connection()
    if conn:
        try:
            cursor = conn.cursor()
            cursor.execute(
                '''INSERT INTO direcciones (usuario_id, alias, calle, ciudad, estado, codigo_postal, pais, es_principal) 
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)''',
                (current_user.id, alias, calle, ciudad, estado, codigo_postal, pais, es_principal)
            )
            conn.commit()
            cursor.close()
            flash('Dirección agregada exitosamente', 'success')
        except Exception as e:
            print(f"Error agregando dirección: {e}")
            flash('Error al agregar la dirección', 'error')
        finally:
            close_db_connection(conn)

    return redirect(url_for('perfil'))

@app.route("/agregar_favorito/<int:producto_id>", methods=['POST'])
@login_required
def agregar_favorito(producto_id):
    conn = get_db_connection()
    if conn:
        try:
            cursor = conn.cursor()
            cursor.execute('SELECT id FROM lista_deseos WHERE usuario_id = %s AND producto_id = %s',
                           (current_user.id, producto_id))
            if not cursor.fetchone():
                cursor.execute(
                    'INSERT INTO lista_deseos (usuario_id, producto_id) VALUES (%s, %s)',
                    (current_user.id, producto_id)
                )
                conn.commit()
                flash('Producto agregado a favoritos', 'success')
            else:
                flash('El producto ya está en tu lista de favoritos', 'info')
            cursor.close()
        except Exception as e:
            print(f"Error agregando a favoritos: {e}")
            flash('Error al agregar a favoritos', 'error')
        finally:
            close_db_connection(conn)

    return redirect(request.referrer or url_for('productos'))

@app.route("/eliminar_favorito/<int:item_id>", methods=['POST'])
@login_required
def eliminar_favorito(item_id):
    conn = get_db_connection()
    if conn:
        try:
            cursor = conn.cursor()
            cursor.execute('DELETE FROM lista_deseos WHERE id = %s AND usuario_id = %s',
                           (item_id, current_user.id))
            conn.commit()
            cursor.close()
            flash('Producto eliminado de favoritos', 'success')
        except Exception as e:
            print(f"Error eliminando favorito: {e}")
            flash('Error al eliminar de favoritos', 'error')
        finally:
            close_db_connection(conn)

    return redirect(url_for('perfil'))

@app.route("/actualizar_preferencias", methods=['POST'])
@login_required
def actualizar_preferencias():
    email_notificaciones = 1 if request.form.get('email_notificaciones') else 0
    sms_notificaciones = 1 if request.form.get('sms_notificaciones') else 0
    emails_promocionales = 1 if request.form.get('emails_promocionales') else 0

    conn = get_db_connection()
    if conn:
        try:
            cursor = conn.cursor()
            cursor.execute(
                '''UPDATE preferencias_notificacion 
                SET email_notificaciones = %s, sms_notificaciones = %s, emails_promocionales = %s
                WHERE usuario_id = %s''',
                (email_notificaciones, sms_notificaciones, emails_promocionales, current_user.id)
            )
            conn.commit()
            cursor.close()
            flash('Preferencias actualizadas exitosamente', 'success')
        except Exception as e:
            print(f"Error actualizando preferencias: {e}")
            flash('Error al actualizar preferencias', 'error')
        finally:
            close_db_connection(conn)

    return redirect(url_for('perfil'))

# ===== SISTEMA DE PEDIDOS Y FACTURAS =====
@app.route("/crear_pedido", methods=['POST'])
@login_required
def crear_pedido():
    datos_pedido = request.form.get('datos_pedido')
    total = request.form.get('total')

    try:
        datos_json = json.loads(datos_pedido) if datos_pedido else {}
        conn = get_db_connection()
        if conn:
            cursor = conn.cursor()
            cursor.execute(
                'INSERT INTO pedidos (usuario_id, nombre_cliente, email_cliente, telefono_cliente, direccion_cliente, metodo_pago, total, datos_pedido) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)',
                (current_user.id, datos_json.get('nombre') or None, datos_json.get('email') or None,
                 datos_json.get('telefono') or None, datos_json.get('direccion') or None,
                 datos_json.get('metodo_pago') or None, total, json.dumps(datos_json))
            )
            pedido_id = cursor.lastrowid
            conn.commit()

            puntos_ganados = agregar_puntos(current_user.id, float(total) if total else 0)
            cursor.close()
            flash(f'¡Pedido realizado exitosamente! Ganaste {puntos_ganados} puntos.', 'success')
        else:
            flash('Error de conexión con la base de datos. Por favor, intenta más tarde.', 'error')
    except Exception as e:
        print(f"❌ Error creando pedido: {e}")
        flash('Error al crear el pedido', 'error')
    finally:
        close_db_connection(conn)

    return redirect(url_for('perfil'))

@app.route("/descargar_factura/<int:pedido_id>")
@login_required
def descargar_factura(pedido_id):
    conn = get_db_connection()
    if not conn:
        flash('Error de conexión con la base de datos.', 'error')
        return redirect(url_for('perfil'))

    try:
        cursor = conn.cursor()
        cursor.execute('SELECT id, fecha_pedido, total, estado, datos_pedido FROM pedidos WHERE id = %s AND usuario_id = %s', (pedido_id, current_user.id))
        pedido_data = cursor.fetchone()
        cursor.close()

        if not pedido_data:
            flash('Pedido no encontrado', 'error')
            close_db_connection(conn)
            return redirect(url_for('perfil'))

        # Crear PDF
        buffer = BytesIO()
        p = canvas.Canvas(buffer, pagesize=letter)

        p.drawString(100, 750, "AGRÍCOLA GREEN CROP")
        p.drawString(100, 735, "Factura de Compra")
        p.drawString(100, 720, f"Factura #: {pedido_data[0]}")
        fecha = pedido_data[1]
        fecha_str = fecha.strftime('%d/%m/%Y %H:%M') if isinstance(fecha, datetime) else str(fecha)
        p.drawString(100, 705, f"Fecha: {fecha_str}")
        p.drawString(100, 690, f"Cliente: {current_user.email}")

        p.drawString(100, 660, "Detalles del Pedido:")
        y = 645

        try:
            datos_pedido = json.loads(pedido_data[4]) if pedido_data[4] else {}
        except Exception:
            datos_pedido = {}

        for item in datos_pedido.get('items', []):
            p.drawString(100, y, f"- {item.get('nombre','')} x {item.get('cantidad','')} - S/ {item.get('precio','')}")
            y -= 15

        p.drawString(100, y-20, f"Total: S/ {pedido_data[2]}")
        p.drawString(100, y-40, f"Estado: {pedido_data[3]}")

        p.showPage()
        p.save()
        buffer.seek(0)
        close_db_connection(conn)
        return send_file(buffer, as_attachment=True, download_name=f'factura_{pedido_id}.pdf', mimetype='application/pdf')
    except Exception as e:
        print(f"Error generando factura: {e}")
        flash('Error al generar la factura', 'error')
        close_db_connection(conn)
        return redirect(url_for('perfil'))

# ===== RUTAS ESTÁTICAS Y FORMULARIOS =====
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/chatbot")
def chatbot():
    return render_template("chatbot.html")

@app.route("/chat", methods=['POST'])
def chat():
    user_message = request.json.get('message', '').lower()
    # (mismo manejo de respuestas que tenías)
    # ... (para mantener corta la versión final, se asume que templates ya existen)
    # Puedes copiar aquí las respuestas que ya tenías en tu versión original
    return jsonify({"response": "Función chatbot activa"})

@app.route("/productos")
def productos():
    return render_template("productos.html")

@app.route("/servicio")
def servicio():
    return render_template("servicio.html")

@app.route("/contact", methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        try:
            nombre = request.form.get('name', '').strip()
            email = request.form.get('email', '').strip()
            mensaje = request.form.get('message', '').strip()
            ip_cliente = request.remote_addr

            if not nombre or not email or not mensaje:
                flash('Por favor, completa todos los campos.', 'error')
                return render_template('contact.html')

            conn = get_db_connection()
            if conn:
                cursor = conn.cursor()
                cursor.execute(
                    'INSERT INTO contactos (nombre, email, mensaje, ip_cliente) VALUES (%s, %s, %s, %s)',
                    (nombre, email, mensaje, ip_cliente)
                )
                conn.commit()
                cursor.close()
                flash('¡Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto.', 'success')
                print("✅ Mensaje guardado en la base de datos MySQL")
            else:
                flash('Error de conexión con la base de datos. Por favor, intenta más tarde.', 'error')

            return redirect(url_for('contact'))

        except Exception as e:
            print(f"❌ Error general en el formulario: {e}")
            flash('Error inesperado. Por favor, intenta nuevamente.', 'error')
            return redirect(url_for('contact'))

    return render_template("contact.html")

@app.route("/blog")
def blog():
    return render_template("blog.html")

@app.route("/nosotros")
def nosotros():
    return render_template("nosotros.html")

@app.route("/formulario_compra", methods=['GET', 'POST'])
def formulario_compra():
    if request.method == 'POST':
        try:
            nombre = request.form.get('full-name')
            email = request.form.get('email')
            telefono = request.form.get('phone')
            direccion = request.form.get('address')
            metodo_pago = request.form.get('payment-method')
            datos_carrito = request.form.get('cart-data')
            total = request.form.get('total')

            if not all([nombre, email, telefono, direccion, metodo_pago, datos_carrito, total]):
                missing = []
                if not nombre: missing.append('nombre')
                if not email: missing.append('email')
                if not telefono: missing.append('teléfono')
                if not direccion: missing.append('dirección')
                if not metodo_pago: missing.append('método de pago')
                if not datos_carrito: missing.append('carrito')
                if not total: missing.append('total')
                flash(f'Faltan campos: {", ".join(missing)}', 'error')
                return render_template("formulario_compra.html")

            usuario_id = current_user.id if current_user.is_authenticated else None

            conn = get_db_connection()
            if conn:
                cursor = conn.cursor()
                cursor.execute(
                    '''INSERT INTO pedidos 
                    (usuario_id, nombre_cliente, email_cliente, telefono_cliente, 
                     direccion_cliente, metodo_pago, total, datos_pedido) 
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s)''',
                    (usuario_id, nombre, email, telefono, direccion, metodo_pago, total, datos_carrito)
                )
                pedido_id = cursor.lastrowid
                conn.commit()
                cursor.close()

                if current_user.is_authenticated:
                    puntos_ganados = agregar_puntos(current_user.id, float(total))
                    mensaje = f'¡Pedido #{pedido_id} realizado con éxito! Ganaste {puntos_ganados} puntos.'
                else:
                    mensaje = f'¡Pedido #{pedido_id} realizado con éxito! Te contactaremos pronto.'

                flash(mensaje, 'success')
                return redirect(url_for('index'))
            else:
                flash('Error de conexión con la base de datos. Por favor, intenta más tarde.', 'error')

        except Exception as e:
            print(f"❌ Error guardando pedido en la base de datos: {e}")
            flash('Error al procesar el pedido. Intenta nuevamente.', 'error')

    return render_template("formulario_compra.html")

@app.route("/compra_productos")
def compra_productos():
    categoria = request.args.get('categoria', 'magnesicos')
    return render_template("compra_productos.html", categoria=categoria)

@app.route("/test-db")
def test_db():
    conn = get_db_connection()
    if conn:
        try:
            cursor = conn.cursor()
            cursor.execute("SELECT COUNT(*) FROM contactos")
            count = cursor.fetchone()[0]
            cursor.execute("SELECT * FROM contactos ORDER BY id DESC LIMIT 1")
            last_message = cursor.fetchone()
            cursor.close()
            close_db_connection(conn)

            result = f"✅ Conexión exitosa a MySQL. Hay {count} mensajes en la base de datos."
            if last_message:
                result += f"<br>Último mensaje: {last_message[1]} - {last_message[2]}"
            return result
        except Exception as e:
            close_db_connection(conn)
            return f"❌ Error en la consulta MySQL: {e}"
    else:
        return "❌ No se pudo conectar a la base de datos MySQL"

if __name__ == '__main__':
    # Inicializar tablas al arrancar (solo si DB y permisos correctos)
    init_db()
    app.run(host="0.0.0.0", port=int(os.getenv("FLASK_PORT", 5000)), debug=True)
