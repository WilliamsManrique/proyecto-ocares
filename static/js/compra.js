// Base de datos de productos por categoría
const productsByCategory = {
    inicio: [  // FERTILIZANTES INICIO Y PRE-FLORACIÓN
        { 
            id: 1, 
            name: "Poly-Feed 8-52-1", 
            category: "FERTILIZANTES INICIO Y PRE-FLORACIÓN", 
            price: 45.99,
            // ¡IMPORTANTE! El archivo en la imagen se llama poly-feed.jpeg, pero el ID 1 usa poly-feed-8-52-17.jpg. 
            // Usaré el nombre del JS, pero podrías tener que renombrar tu archivo.
            image: "poly-feed-8-52-1.png" 
        },
    ],
    fosfatados: [
        { 
            id: 2, 
            name: "Fosfato Diamónico", 
            category: "FERTILIZANTES FOSFATADOS", 
            price: 45.99,
            image: "fosfatodiamonico.png" // Usando fosfato.png de la estructura de carpetas
        },
        { 
            id: 3, 
            name: "Superfosfato Triple", 
            category: "FERTILIZANTES FOSFATADOS", 
            price: 38.50,
            image: "super-fosfato-triple-.png" // Usando 3.jpg de la estructura de carpetas
        },
        { 
            id: 4, 
            name: "Fosfato Monoamónico Granular", 
            category: "FERTILIZANTES FOSFATADOS", 
            price: 52.75,
            image: "fosfatogranular.png" // Usando 5.jpg de la estructura de carpetas
        },
        { 
            id: 5, 
            name: "MicroEssentials SZ", 
            category: "FERTILIZANTES FOSFATADOS", 
            price: 52.75,
            image: "microessential.png" // Usando 5.jpg de la estructura de carpetas
        }
        
    ],
    vegetativo: [  // DESARROLLO VEGETATIVO
        { 
            id: 6, 
            name: "Poly-Feed-31-11-11", 
            category: "DESARROLLO VEGETATIVO", 
            price: 35.99,
            image: "poly-feed-31-11-11.png" // Ejemplo de uso
        }
    ],
    potasicos: [
        { 
            id: 7, 
            name: "Cloruro de Potasio", 
            category: "FERTILIZANTES POTÁSICOS", 
            price: 29.80,
            image: "cloruropotasio.png"
        },
        { 
            id: 8, 
            name: "Sulfato de Potasio", 
            category: "FERTILIZANTES POTÁSICOS", 
            price: 55.40,
            image: "sulfatopotasio.png"
        },
        { 
            id: 9, 
            name: "Nitrato de Potasio Perlado", 
            category: "FERTILIZANTES POTÁSICOS", 
            price: 55.40,
            image: "nitratopotasio.png"
        },
        { 
            id: 10, 
            name: "Cloruro Potásico Blanco", 
            category: "FERTILIZANTES GENÉRICOS", 
            price: 55.40,
            image: "cloruropotasioblanco.png"
        }
    ],
    multiproposito: [
        { 
            id: 11, 
            name: "Poly-Feed 21-21-21", 
            category: "MULTIPROPÓSITO", 
            price: 32.99,
            image: "poly-feed2121.png"
        },
        { 
            id: 12, 
            name: "Haifa Mag Enverdecedor", 
            category: "MULTIPROPÓSITO", 
            price: 35.75,
            image: "haifamag.png" // Ejemplo de uso
        }
    ],
    magnesicos: [
        { 
            id: 13, 
            name: "K-Mag / Sulpomag", 
            category: "FERTILIZANTES MAGNÉSICOS", 
            price: 25.99,
            image: "k-magsulpomag.png" // Ejemplo de uso
        },
        { 
            id: 14, 
            name: "Kieserita (Sulfato de Magnesio)", 
            category: "FERTILIZANTES MAGNÉSICOS", 
            price: 28.75,
            image: "kieseritaweb.png" // Ejemplo de uso
        }
    ],
    fruto: [  // DESARROLLO Y LLENADO DE FRUTO
        { 
            id: 15, 
            name: "Poly-Feed 12-6-40", 
            category: "DESARROLLO Y LLENADO DE FRUTO", 
            price: 44.99,
            image: "polyfeed12.png" // Ejemplo de uso
        },
        { 
            id: 16, 
            name: "Poly-Feed 15-15-30", 
            category: "DESARROLLO Y LLENADO DE FRUTO", 
            price: 47.25,
            image: "poly-feed1515.png" // Ejemplo de uso
        },
        { 
            id: 17, 
            name: "Bonus-npK", 
            category: "DESARROLLO Y LLENADO DE FRUTO", 
            price: 47.25,
            image: "Bonusnpk13.png" // Ejemplo de uso
        },
        { 
            id: 18, 
            name: "K-Leaf Sulfato de Potasio Foliar", 
            category: "DESARROLLO Y LLENADO DE FRUTO", 
            price: 47.25,
            image: "kleafsulfato.png" // Ejemplo de uso
        }
    ],
    micronutrientes: [
        { 
            id: 19, 
            name: "Fertibagra 15G", 
            category: "MICRONUTRIENTES", 
            price: 28.99,
            image: "Fertibagra15.png" // Ejemplo de uso
        },
        { 
            id: 20, 
            name: "F727G", 
            category: "MICRONUTRIENTES", 
            price: 34.50,
            image: "F727g.png" // Ejemplo de uso
        }
    ],
    compuestos: [
        { 
            id: 21, 
            name: "Molimax Superdoce", 
            category: "Mezclas Molimax", 
            price: 43.99,
            image: "molimaxsuperdoceM.png" // Ejemplo de uso
        },
        { 
            id: 22, 
            name: "Molimax - S", 
            category: "FERTILIZANTES COMPUESTOS", 
            price: 39.50,
            image: "molimax-s.png" // Ejemplo de uso
        },
        { 
            id: 23, 
            name: "Molimax 20-20-20", 
            category: "FERTILIZANTES MOLIMAX", 
            price: 39.50,
            image: "molimax202020.png" // Ejemplo de uso
        },
        { 
            id: 24, 
            name: "Molimax 12-12-12", 
            category: "FERTILIZANTES MOLIMAX", 
            price: 39.50,
            image: "molimax121212.png" // Ejemplo de uso
        },
        { 
            id: 25, 
            name: "Molimax Café", 
            category: "Mezclas especificas", 
            price: 39.50,
            image: "molimaxcafe.png" // Ejemplo de uso
        },
        { 
            id: 26, 
            name: "NPK café", 
            category: "MESZCLAS ESPECÍFICAS", 
            price: 39.50,
            image: "npkcafe.png" // Ejemplo de uso
        },
        { 
            id: 27, 
            name: "Molimax Papa Sierra", 
            category: "MEZCLAS ESPECÍFICAS", 
            price: 39.50,
            image: "molimaxpapasierra.png" // Ejemplo de uso
        },
        { 
            id: 28, 
            name: "Molimax Frutales", 
            category: "MEZCLAS ESPECÍFICAS", 
            price: 39.50,
            image: "molimaxfrutales.png" // Ejemplo de uso
        },
        { 
            id: 29, 
            name: "Molimax Maíz", 
            category: "MEZCLAS ESPECÍFICAS", 
            price: 39.50,
            image: "molimaxmaiz.png" // Ejemplo de uso
        },
        { 
            id: 30, 
            name: "Molimax Olivo", 
            category: "MEZCLAS ESPECÍFICAS", 
            price: 39.50,
            image: "molimaxolivo.png" // Ejemplo de uso
        },
        { 
            id: 31, 
            name: "Molimax Maíz Gigante", 
            category: "MEZCLAS ESPECÍFICAS", 
            price: 39.50,
            image: "molimaxmaizgigante.png" // Ejemplo de uso
        },
        { 
            id: 32, 
            name: "NPK Palma Aceitera", 
            category: "FERTILIZANTES COMPUESTOS", 
            price: 39.50,
            image: "npkpalmaaceitera.png" // Ejemplo de uso
        }
    ],
    molinax: [
        { 
            id: 33, 
            name: "Molimax Superdoce", 
            category: "MEZCLAS MOLIMAX", 
            price: 52.99,
            image: "molimaxsuperdoceM.png" 
        },
        { 
            id: 34, 
            name: "Molimax - S", 
            category: "MEZCLAS MOLIMAX", 
            price: 58.75,
            image: "molimax-s.png"
        },
        { 
            id: 35, 
            name: "Molimax 20-20-20", 
            category: "MEZCLAS MOLIMAX", 
            price: 58.75,
            image: "molimax202020.png"
        },
        { 
            id: 36, 
            name: "Molimax 12-12-12", 
            category: "MEZCLAS MOLIMAX", 
            price: 58.75,
            image: "molimax121212.png"
        }
    ],
    especificas: [
        { 
            id: 35, 
            name: "Molimax Café", 
            category: "MEZCLAS ESPECÍFICAS", 
            price: 47.99,
            image: "molimaxcafe.png"
        },
        { 
            id: 36, 
            name: "NPK café", 
            category: "MEZCLAS ESPECÍFICAS", 
            price: 44.50,
            image: "npkcafe.png"
        },
        { 
            id: 36, 
            name: " Molimax Papa Sierra", 
            category: "MEZCLAS ESPECÍFICAS", 
            price: 44.50,
            image: "molimaxpapasierra.png"
        },
        { 
            id: 36, 
            name: "Molimax Frutales", 
            category: "MEZCLAS ESPECÍFICAS", 
            price: 44.50,
            image: "molimaxfrutales.png"
        }
    ],
    quimicas: [
        { 
            id: 37, 
            name: "Moli - 19", 
            category: "MEZCLAS QUÍMICAS Y FORMULACIONES", 
            price: 55.99,
            image: "moli-19.png"
        },
        { 
            id: 38, 
            name: "Moli - 16", 
            category: "MEZCLAS QUÍMICAS Y FORMULACIONES", 
            price: 62.50,
            image: "moli-16.png"
        }
    ],
    hidrosolubles: [
        { 
            id: 39, 
            name: "PONI", 
            category: "FERTILIZANTES HIDROSOLUBLES", 
            price: 36.99,
            image: "poni.png"
        },
        { 
            id: 40, 
            name: "Multi-K pHast", 
            category: "FERTILIZANTES HIDROSOLUBLES", 
            price: 41.25,
            image: "multi-kphast.png"
        },
        { 
            id: 41, 
            name: "Haifa Mag", 
            category: "FERTILIZANTES HIDROSOLUBLES", 
            price: 41.25,
            image: "haifamag.png"
        },
        { 
            id: 42, 
            name: "Haifa MKP", 
            category: "FERTILIZANTES HIDROSOLUBLES", 
            price: 41.25,
            image: "haifamkp.png"
        },
        { 
            id: 43, 
            name: "Nitrato de Calcio", 
            category: "FERTILIZANTES HIDROSOLUBLES", 
            price: 41.25,
            image: "nitratodecalcio.png"
        },
        { 
            id: 44, 
            name: "Fosfato Monoamónico Soluble", 
            category: "FERTILIZANTES HIDROSOLUBLES", 
            price: 41.25,
            image: "fosfatomonoamonico.png"
        },
        { 
            id: 45, 
            name: "Ácido Fosfórico 85%", 
            category: "FERTILIZANTES HIDROSOLUBLES", 
            price: 41.25,
            image: "acidofosforico85%.png"
        },
        { 
            id: 46, 
            name: "SOLUPOTASSE", 
            category: "FERTILIZANTES HIDROSOLUBLES", 
            price: 41.25,
            image: "solupotasse.png"
        },
        { 
            id: 47, 
            name: "Sulfato de Magnesio", 
            category: "FERTILIZANTES HIDROSOLUBLES", 
            price: 41.25,
            image: "sulfatodemagnesioH.png"
        },
        { 
            id: 48, 
            name: "Sulfato de Zinc", 
            category: "FERTILIZANTES HIDROSOLUBLES", 
            price: 41.25,
            image: "sulfatodezinc.png"
        },
        { 
            id: 49, 
            name: "Sulfato de Cobre", 
            category: "FERTILIZANTES HIDROSOLUBLES", 
            price: 41.25,
            image: "SULFATO-DE-COBREO-PENTAHIDRATADO.png"
        },
        { 
            id: 50, 
            name: "Multi-Micro Comb", 
            category: "FERTILIZANTES HIDROSOLUBLES", 
            price: 41.25,
            image: "MULTI-MICRO-COMB-.png"
        }
    ],
    foliares: [
        { 
            id: 51, 
            name: "Poly-Feed 8-52-17", 
            category: "FERTILIZANTES FOLIARES", 
            price: 29.99,
            image: "poly-feed-8-52-1.png"
        },
        { 
            id: 52, 
            name: "Poly-Feed 31-11-11", 
            category: "FERTILIZANTES FOLIARES", 
            price: 33.75,
            image: "poly-feed-31-11-11.png"
        },
        { 
            id: 53, 
            name: "Poly-Feed 21-21-21", 
            category: "FERTILIZANTES FOLIARES", 
            price: 33.75,
            image: "poly-feed2121.png"
        },
        { 
            id: 54, 
            name: "Poly-Feed 12-6-40", 
            category: "FERTILIZANTES FOLIARES", 
            price: 33.75,
            image: "polyfeed12.png"
        }
    ],
    nitrogenados: [
        { 
            id: 55, 
            name: "Urea Agrícola", 
            category: "FERTILIZANTES NITROGENADOS", 
            price: 35.90,
            image: "ureaagricola.png"
        },
        { 
            id: 56, 
            name: "Nitrato de Amonio", 
            category: "FERTILIZANTES NITROGENADOS", 
            price: 48.60,
            image: "nitratodeamonio.png"
        },
        { 
            id: 57, 
            name: "Sulfato de Amonio", 
            category: "FERTILIZANTES NITROGENADOS", 
            price: 48.60,
            image: "sulfatodeamonio.png"
        },
        { 
            id: 58, 
            name: " Molimax Nitros", 
            category: "FERTILIZANTES NITROGENADOS", 
            price: 48.60,
            image: "molimaxnitros.png"
        },
        { 
            id: 59, 
            name: " Urea Azulada", 
            category: "FERTILIZANTES NITROGENADOS", 
            price: 48.60,
            image: "ureaazulada.png"
        }
    ]
};

// Variables globales
let currentCategory = 'fosfatados';
let cart = [];

// Ruta base para las imágenes (ajustada a la estructura de carpetas 'static/img')
const IMAGE_BASE_PATH = 'static/img/';
const PLACEHOLDER_IMAGE = 'placeholder.jpg'; // Asegúrate de tener esta imagen en static/img/

// Función para obtener la ruta de la imagen, reemplazando la lógica de url_for
function getImagePath(imageFileName) {
    // Si la ruta del JS es diferente a la raíz, ajusta la ruta.
    // Asumiendo que el JS está en una carpeta y 'static' está al mismo nivel.
    // Ejemplo: /js/script.js -> ../static/img/filename
    // Si el JS está en la raíz, es: static/img/filename
    // Usaremos la ruta absoluta desde la raíz para evitar problemas: /static/img/filename
    return `/${IMAGE_BASE_PATH}${imageFileName}`;
}

// ========== SISTEMA DEL CARRITO ==========

// Función para inicializar el carrito desde localStorage
function initializeCartFromStorage() {
    try {
        const savedCart = localStorage.getItem('cart');
        console.log('📦 Carrito guardado en localStorage:', savedCart);
        
        if (savedCart) {
            cart = JSON.parse(savedCart);
            console.log('🛒 Carrito cargado desde localStorage:', cart);
        } else {
            cart = [];
            console.log('🛒 Carrito inicializado vacío');
        }
    } catch (error) {
        console.error('❌ Error al cargar el carrito:', error);
        cart = [];
    }
}

// Función para agregar producto al carrito
function addToCart(id, name, price) {
    console.log('🔄 Intentando agregar producto:', { id, name, price });
    
    // Verificar si el producto ya está en el carrito
    const existingItemIndex = cart.findIndex(item => item.id == id);
    
    if (existingItemIndex !== -1) {
        // Si ya existe, aumentar la cantidad
        cart[existingItemIndex].quantity += 1;
        console.log('📈 Producto existente, cantidad aumentada:', cart[existingItemIndex]);
    } else {
        // Si no existe, agregar nuevo producto
        cart.push({
            id: id,
            name: name,
            price: price,
            quantity: 1
        });
        console.log('🆕 Nuevo producto agregado:', cart[cart.length - 1]);
    }
    
    // Guardar en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log('💾 Carrito guardado en localStorage:', cart);
    
    // Actualizar interfaz
    updateCartCount();
    updateCartModal();
    
    // Mostrar notificación
    showNotification(`✅ ${name} añadido al carrito`);
}

// Función para eliminar producto del carrito
function removeFromCart(index) {
    console.log('🗑️ Eliminando producto del índice:', index);
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartModal();
    updateCartCount();
}

// Función para actualizar cantidad
function updateQuantity(index, change) {
    console.log('🔢 Actualizando cantidad:', { index, change });
    // Asegurarse de que el índice es válido
    if (index >= 0 && index < cart.length) {
        cart[index].quantity += change;
        
        if (cart[index].quantity <= 0) {
            // Eliminar si la cantidad llega a 0 o menos
            cart.splice(index, 1);
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartModal();
        updateCartCount();
    } else {
        console.error('❌ Índice de carrito inválido:', index);
    }
}

// Actualizar contador del carrito
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        console.log('🔢 Contador actualizado:', totalItems, 'productos en el carrito');
    } else {
        // Este error puede ser esperado si el JS se carga antes de que el HTML esté listo
        console.error('❌ Elemento .cart-count no encontrado');
    }
}

// Actualizar modal del carrito
function updateCartModal() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    console.log('🔄 Actualizando modal del carrito, productos:', cart);
    
    if (!cartItems || !cartTotal) {
        // Puede que no estemos en la página que tiene el modal
        console.warn('⚠️ Elementos del modal (cart-items o cart-total) no encontrados. Saltando actualización del modal.');
        return;
    }
    
    cartItems.innerHTML = '';
    let total = 0;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart" style="text-align: center; color: #666; padding: 20px;">Tu carrito está vacío</p>';
        if (checkoutBtn) checkoutBtn.disabled = true;
        console.log('📭 Carrito vacío mostrado');
    } else {
        if (checkoutBtn) checkoutBtn.disabled = false;
        
        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            // Buscar la imagen del producto en la base de datos
            const product = findProductById(item.id);
            const productImageName = product ? product.image : PLACEHOLDER_IMAGE;
            
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            
            // Reemplazo de {{ url_for(...) }} por getImagePath()
            const imagePath = getImagePath(productImageName);
            const placeholderPath = getImagePath(PLACEHOLDER_IMAGE);

            cartItemElement.innerHTML = `
                <div class="cart-item-image">
                    <img src="${imagePath}" 
                        alt="${item.name}" 
                        class="cart-product-image"
                        onerror="this.src='${placeholderPath}'">
                </div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)} c/u</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                        <span style="margin: 0 10px; font-weight: bold;">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
                    </div>
                </div>
                <button class="remove-item" onclick="removeFromCart(${index})">🗑️</button>
            `;
            
            cartItems.appendChild(cartItemElement);
        });
        
        console.log('📦 Productos mostrados en el modal:', cart.length, 'productos');
    }
    
    cartTotal.textContent = total.toFixed(2);
    console.log('💰 Total calculado: $' + total.toFixed(2));
}

// Función auxiliar para encontrar producto por ID
function findProductById(id) {
    // Convertir el ID a número ya que los IDs en el carrito pueden ser strings
    const productId = parseInt(id); 
    for (const category in productsByCategory) {
        // Usar triple igualdad (===) si se asegura que todos los IDs son números.
        const product = productsByCategory[category].find(item => item.id === productId);
        if (product) return product;
    }
    return null;
}

// Función para mostrar notificaciones
function showNotification(message) {
    console.log('🔔 Mostrando notificación:', message);
    
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #2d5016;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 1001;
        font-weight: bold;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        transition: opacity 0.5s ease-in-out;
        opacity: 0; /* Empieza oculto para la animación */
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Iniciar animación de entrada
    setTimeout(() => {
        notification.style.opacity = 1;
    }, 10); // Pequeño retraso para que el navegador aplique 'opacity: 0'

    // Retardo para la eliminación
    setTimeout(() => {
        notification.style.opacity = 0; // Iniciar animación de salida
        setTimeout(() => {
            notification.remove();
        }, 500); // Esperar que termine la transición de salida
    }, 3000);
}

// Inicializar sistema del carrito
function initializeCart() {
    console.log('🚀 Inicializando sistema del carrito...');
    
    // Cargar carrito desde localStorage
    initializeCartFromStorage();
    
    const cartIcon = document.getElementById('header-cart-icon');
    const cartSystem = document.getElementById('cart-system');
    const closeCart = document.getElementById('close-cart');
    const overlay = document.getElementById('overlay');
    const checkoutBtn = document.getElementById('checkout-btn');

    // Manejo de errores para elementos que pueden no estar en todas las páginas
    const cartElementsExist = cartIcon && cartSystem && closeCart && overlay;

    if (!cartElementsExist) {
        console.warn('⚠️ No se encontraron todos los elementos del carrito (Icono, Modal, Cierre, Overlay). El sistema del carrito se inicializa parcialmente para el conteo y localStorage.');
        updateCartCount(); // Asegurarse de que el contador se actualice si existe
        return; // Salir si falta un elemento crítico para la interfaz del modal
    }

    // Abrir carrito
    cartIcon.addEventListener('click', function() {
        console.log('📂 Abriendo carrito...');
        cartSystem.classList.add('open');
        overlay.classList.add('active');
        updateCartModal(); // Asegurarse de que el modal esté al día
    });

    // Cerrar carrito
    closeCart.addEventListener('click', function() {
        console.log('📁 Cerrando carrito...');
        cartSystem.classList.remove('open');
        overlay.classList.remove('active');
    });

    // Cerrar carrito al hacer clic en el overlay
    overlay.addEventListener('click', function() {
        console.log('📁 Cerrando carrito desde overlay...');
        cartSystem.classList.remove('open');
        overlay.classList.remove('active');
    });

    // Procesar compra
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (cart.length === 0) {
                alert('Tu carrito está vacío. Añade algunos productos antes de proceder al pago.');
            } else {
                const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            
                // Redirigir al formulario de compra
                window.location.href = "/formulario_compra";
            
                // Opcional: Mostrar mensaje de confirmación
                console.log('🛒 Redirigiendo al formulario de compra con', cart.length, 'productos');
            }
        });
    }
}

    // Actualizar interfaz
    updateCartCount();
    updateCartModal();
    
    console.log('✅ Sistema del carrito inicializado correctamente');


// ========== SISTEMA DE PRODUCTOS Y BÚSQUEDA ==========

// Función para mostrar productos de una categoría
function showCategory(category) {
    console.log('📋 Cambiando a categoría:', category);
    currentCategory = category;
    const products = productsByCategory[category] || [];
    displayProducts(products);
    updateActiveCategory(category);
}

// Función para mostrar productos
function displayProducts(products) {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) {
        console.error('❌ products-grid no encontrado');
        return;
    }
    
    productsGrid.innerHTML = '';

    if (products.length === 0) {
        productsGrid.innerHTML = '<p class="no-products">No hay productos disponibles en esta categoría.</p>';
        return;
    }

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        // Reemplazo de {{ url_for(...) }} por getImagePath()
        const imagePath = getImagePath(product.image);
        const placeholderPath = getImagePath(PLACEHOLDER_IMAGE);

        // Escapar comillas en el nombre del producto para la función onclick
        const escapedProductName = product.name.replace(/'/g, "\\'");

        productCard.innerHTML = `
            <div class="product-image-container">
                <img src="${imagePath}" 
                    alt="${product.name}" 
                    class="product-image"
                    onerror="this.src='${placeholderPath}'">
            </div>
            <div class="product-category">${product.category}</div>
            <h3 class="product-name">${product.name}</h3>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <button class="add-to-cart-btn" onclick="addToCart(${product.id}, '${escapedProductName}', ${product.price})">
                AÑADIR AL CARRITO
            </button>
        `;
        productsGrid.appendChild(productCard);
    });
    
    console.log('📦 Productos mostrados:', products.length);
} 


// Función para actualizar categoría activa
function updateActiveCategory(activeCategory) {
    document.querySelectorAll('.categories-list a').forEach(link => {
        link.classList.remove('active');
        // Buscar el nombre de la categoría en el atributo onclick
        if (link.getAttribute('onclick') && link.getAttribute('onclick').includes(`showCategory('${activeCategory}')`)) {
            link.classList.add('active');
        }
    });
}

// Sistema de búsqueda
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const suggestionsList = document.getElementById('suggestionsList');

    if (!searchInput || !suggestionsList) {
        console.error('❌ Elementos de búsqueda no encontrados');
        return;
    }

    searchInput.addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase().trim();
        
        if (query.length === 0) {
            suggestionsList.style.display = 'none';
            // Volver a mostrar la categoría actual cuando la búsqueda se borra
            showCategory(currentCategory); 
            return;
        }

        const allProducts = getAllProducts();
        const results = allProducts.filter(product => 
            product.name.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query)
        );

        showSuggestions(results, query);
    });

    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch(this.value);
            suggestionsList.style.display = 'none';
        }
    });

    document.addEventListener('click', function(e) {
        // Cierra las sugerencias al hacer clic fuera del input y la lista
        if (!searchInput.contains(e.target) && !suggestionsList.contains(e.target)) {
            suggestionsList.style.display = 'none';
        }
    });
}

function getAllProducts() {
    const allProducts = [];
    for (const category in productsByCategory) {
        // Asegurarse de que el valor sea un array antes de hacer spread
        if (Array.isArray(productsByCategory[category])) {
            allProducts.push(...productsByCategory[category]);
        }
    }
    return allProducts;
}

function showSuggestions(products, query) {
    const suggestionsList = document.getElementById('suggestionsList');
    suggestionsList.innerHTML = '';
    
    if (products.length === 0) {
        suggestionsList.innerHTML = '<li class="no-results">No se encontraron productos</li>';
    } else {
        products.slice(0, 5).forEach(product => {
            const li = document.createElement('li');
            li.className = 'suggestion-item';
            li.textContent = product.name;
            li.onclick = () => {
                document.getElementById('searchInput').value = product.name;
                performSearch(product.name);
                suggestionsList.style.display = 'none';
            };
            suggestionsList.appendChild(li);
        });
    }
    
    suggestionsList.style.display = 'block';
}

function performSearch(query) {
    const allProducts = getAllProducts();
    const results = allProducts.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    );
    
    // Al buscar, desactiva la categoría activa visualmente
    document.querySelectorAll('.categories-list a').forEach(link => {
        link.classList.remove('active');
    });
    
    displayProducts(results);
}

// ========== INICIALIZACIÓN ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('🌐 Página completamente cargada');
    console.log('🔍 Verificando elementos del DOM...');
    
    // Inicializar sistemas
    initializeSearch();
    initializeCart();
    
    // Mostrar la categoría por defecto (fosfatados)
    // Esto debe hacerse después de la inicialización si la función showCategory
    // necesita que el DOM esté completamente cargado.
    showCategory('fosfatados');
    
    console.log('🎉 Todos los sistemas inicializados');
    console.log('💡 Para probar: Haz clic en "AÑADIR AL CARRITO" y revisa la consola');
});







// Función para cargar el carrito en la tabla
        // Función para cargar el carrito en la tabla del checkout
        function loadCheckoutCart() {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const cartItemsContainer = document.getElementById('checkout-cart-items');
            const cartTotalElement = document.getElementById('checkout-cart-total');
            let total = 0;

            cartItemsContainer.innerHTML = '';

            if (cart.length === 0) {
                cartItemsContainer.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 20px;">No hay productos en el carrito</td></tr>';
            } else {
                cart.forEach((item, index) => {
                    const subtotal = item.price * item.quantity;
                    total += subtotal;

                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${item.name}</td>
                        <td>$${item.price.toFixed(2)}</td>
                        <td>
                            <input type="number" min="1" value="${item.quantity}" 
                                onchange="updateCartItemQuantity(${index}, this.value)" 
                                style="width: 60px; padding: 5px; text-align: center;">
                        </td>
                        <td>$${subtotal.toFixed(2)}</td>
                        <td>
                            <button class="btn-remove" onclick="removeCartItem(${index})">Eliminar</button>
                        </td>
                    `;
                    cartItemsContainer.appendChild(row);
                });
            }

            cartTotalElement.textContent = `$${total.toFixed(2)}`;
        }

        // Función para actualizar la cantidad de un producto en el carrito
        function updateCartItemQuantity(index, newQuantity) {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            if (index >= 0 && index < cart.length) {
                cart[index].quantity = parseInt(newQuantity);
                localStorage.setItem('cart', JSON.stringify(cart));
                loadCheckoutCart(); // Recargar la tabla
            }
        }

        // Función para eliminar un producto del carrito
        function removeCartItem(index) {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            if (index >= 0 && index < cart.length) {
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                loadCheckoutCart(); // Recargar la tabla
            }
        }

        // Función para actualizar el carrito desde la tabla
        function updateCartFromTable() {
            // Esta función se puede usar para forzar una actualización si fuera necesario
            loadCheckoutCart();
            alert('Carrito actualizado correctamente');
        }

        // Función para continuar comprando
        function continueShopping() {
            window.location.href = "{{ url_for('productos') }}";
        }

        // Cargar el carrito cuando la página se carga
        document.addEventListener('DOMContentLoaded', function() {
            loadCheckoutCart();
        });



        



        // Función para actualizar campos ocultos del formulario
function updateHiddenFields() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartDataField = document.getElementById('cart-data');
    const totalAmountField = document.getElementById('total-amount');
    
    if (cartDataField && totalAmountField) {
        cartDataField.value = JSON.stringify(cart);
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        totalAmountField.value = total.toFixed(2);
        
        console.log('📦 Datos del carrito preparados:', cart);
        console.log('💰 Total calculado:', total.toFixed(2));
    }
}

// Llamar esta función antes de enviar el formulario
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('purchase-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            updateHiddenFields(); // Actualizar campos antes de enviar
            
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            if (cart.length === 0) {
                e.preventDefault();
                alert('Tu carrito está vacío');
                return;
            }
            
            console.log('🔄 Enviando formulario con datos:', {
                cart: cart,
                total: document.getElementById('total-amount').value
            });
        });
    }
});



// ========== SOLO 2 ANIMACIONES DOM ==========

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. ANIMACIÓN DOM: Entrada escalonada
    function animarEntradaEscalonada() {
        const elementos = document.querySelectorAll('.form-element');
        
        elementos.forEach((elemento, index) => {
            setTimeout(() => {
                elemento.classList.add('visible');
                console.log(`🎬 DOM: Animando elemento ${index + 1}`);
            }, index * 200);
        });
    }
    
    // 2. ANIMACIÓN DOM: Validación en tiempo real
    function configurarValidacionDOM() {
        const inputs = document.querySelectorAll('input[required]');
        
        inputs.forEach(input => {
            
            input.addEventListener('blur', function() {
                validarCampoDOM(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('input-invalid') || this.classList.contains('input-valid')) {
                    validarCampoDOM(this);
                }
            });
        });
    }
    
    function validarCampoDOM(input) {
        input.classList.remove('input-valid', 'input-invalid');
        
        let esValido = false;
        
        if (input.type === 'email') {
            esValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
        } else if (input.type === 'tel') {
            esValido = /^[0-9+\-\s()]{8,}$/.test(input.value);
        } else {
            esValido = input.value.trim().length > 0;
        }
        
        if (esValido) {
            input.classList.add('input-valid');
            console.log(`✅ DOM: Campo ${input.id} válido`);
        } else {
            input.classList.add('input-invalid');
            console.log(`❌ DOM: Campo ${input.id} inválido`);
        }
    }
    
    // INICIAR LAS 2 ANIMACIONES DOM
    console.log('🚀 INICIANDO 2 ANIMACIONES DOM:');
    console.log('1. Entrada escalonada');
    console.log('2. Validación tiempo real');
    
    animarEntradaEscalonada();
    configurarValidacionDOM();
    
    setTimeout(() => {
        console.log('🎥 DEMO LISTA - Mostrando manipulación DOM en tiempo real');
    }, 3000);
});
