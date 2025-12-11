document.addEventListener('DOMContentLoaded', function() {
    const slider = document.getElementById("slider");
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const indicators = document.querySelectorAll('.indicator');
    
    let currentIndex = 0;
    let autoSlideInterval;
    
    // Configurar el evento para el botón "next"
    nextBtn.addEventListener("click", () => {
        stopAutoSlide();
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
        startAutoSlide();
    });
    
    // Configurar el evento para el botón "prev"
    prevBtn.addEventListener("click", () => {
        stopAutoSlide();
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider();
        startAutoSlide();
    });
    
    // Actualizar el slider
    function updateSlider() {
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Actualizar indicadores
        indicators.forEach((indicator, i) => {
            if (i === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
        
        // Actualizar clases activas para animaciones
        slides.forEach((slide, i) => {
            if (i === currentIndex) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
    }
    
    // Iniciar autoplay
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlider();
        }, 8000);
    }
    
    // Detener autoplay
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    // Configurar eventos para indicadores
    indicators.forEach((indicator, i) => {
        indicator.addEventListener('click', () => {
            stopAutoSlide();
            currentIndex = i;
            updateSlider();
            startAutoSlide();
        });
    });
    
    // Soporte para gestos táctiles
    let startX = 0;
    let endX = 0;
    
    slider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        stopAutoSlide();
    });
    
    slider.addEventListener('touchmove', (e) => {
        endX = e.touches[0].clientX;
    });
    
    slider.addEventListener('touchend', () => {
        handleSwipe();
        startAutoSlide();
    });
    
    // Soporte para ratón (drag)
    slider.addEventListener('mousedown', (e) => {
        startX = e.clientX;
        stopAutoSlide();
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    });
    
    function mouseMoveHandler(e) {
        endX = e.clientX;
    }
    
    function mouseUpHandler() {
        handleSwipe();
        startAutoSlide();
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
    }
    
    function handleSwipe() {
        const minSwipeDistance = 50;
        const difference = startX - endX;
        
        if (Math.abs(difference) > minSwipeDistance) {
            if (difference > 0) {
                // Swipe izquierda - siguiente slide
                currentIndex = (currentIndex + 1) % slides.length;
            } else {
                // Swipe derecha - slide anterior
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            }
            updateSlider();
        }
    }
    
    // Pausar autoplay al interactuar con el slider
    slider.addEventListener('mouseenter', stopAutoSlide);
    slider.addEventListener('mouseleave', startAutoSlide);
    
    // Inicializar slider
    updateSlider();
    startAutoSlide();
});

// JavaScript para el menú móvil

// ===== MENÚ MÓVIL =====
const menuButton = document.getElementById('mobile-menu-button');
const menu = document.getElementById('mobile-menu');

if (menuButton && menu) {
    menuButton.addEventListener('click', () => {
        menu.classList.toggle('active');
        // Opcional: cerrar el menú al hacer clic en un enlace
        const navLinks = menu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
            });
        });
    });

    // Cerrar menú al hacer clic fuera de él
    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !menuButton.contains(e.target)) {
            menu.classList.remove('active');
        }
    });
}




// Animación al hacer scroll
document.addEventListener('DOMContentLoaded', function() {
    const whyChooseSection = document.querySelector('.why-us-section');
    const cards = document.querySelectorAll('.feature-card');
    
    function checkScroll() {
        const sectionPosition = whyChooseSection.getBoundingClientRect();
        const screenPosition = window.innerHeight / 1.3;
        
        if (sectionPosition.top < screenPosition) {
            cards.forEach(card => {
                card.classList.add('animated');
            });
            
            // Remover el event listener después de activar las animaciones
            window.removeEventListener('scroll', checkScroll);
        }
    }
    
    // Verificar al cargar y al hacer scroll
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Verificar al cargar la página
});










// Efectos de hover adicionales
document.querySelectorAll('.why-choose-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
        this.style.boxShadow = '0 25px 50px rgba(0,0,0,0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
    });
});







// Manejo del dropdown en móviles del desplegable de productos
document.addEventListener('DOMContentLoaded', function() {
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    
    // Solo para móviles
    if (window.innerWidth <= 768) {
        dropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            dropdownMenu.classList.toggle('active');
        });
    }
    
    // Cerrar dropdown al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            dropdownMenu.classList.remove('active');
        }
    });
});











 // Redirección a compraproducts.html con parámetro de categoría
        document.querySelectorAll('.view-products-btn').forEach(button => {
            button.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                window.location.href = `compraproducts.html?category=${category}`;
            });
        });

        // Sistema básico del carrito (puedes mover esto a un archivo JS separado)
        document.addEventListener('DOMContentLoaded', function() {
            const cartIcon = document.getElementById('cart-icon');
            const cartModal = document.getElementById('cart-modal');
            const closeCart = document.getElementById('close-cart');
            const overlay = document.getElementById('overlay');
            
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            updateCartCount();

            // Abrir carrito
            cartIcon.addEventListener('click', function() {
                cartModal.style.display = 'block';
                overlay.style.display = 'block';
                document.body.style.overflow = 'hidden';
                updateCartModal();
            });
            
            // Cerrar carrito
            closeCart.addEventListener('click', function() {
                cartModal.style.display = 'none';
                overlay.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
            
            // Cerrar carrito al hacer clic en el overlay
            overlay.addEventListener('click', function() {
                cartModal.style.display = 'none';
                overlay.style.display = 'none';
                document.body.style.overflow = 'auto';
            });

            function updateCartCount() {
                const cartCount = document.querySelector('.cart-count');
                const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
                cartCount.textContent = totalItems;
            }

            function updateCartModal() {
                const cartItems = document.getElementById('cart-items');
                const cartTotal = document.getElementById('cart-total');
                
                cartItems.innerHTML = '';
                let total = 0;

                cart.forEach((item, index) => {
                    const itemTotal = item.price * item.quantity;
                    total += itemTotal;
                    
                    const cartItemElement = document.createElement('div');
                    cartItemElement.className = 'cart-item';
                    cartItemElement.innerHTML = `
                        <div class="cart-item-details">
                            <div class="cart-item-name">${item.name}</div>
                            <div class="cart-item-price">$${item.price.toFixed(2)} x ${item.quantity}</div>
                            <button class="remove-item" data-index="${index}">Eliminar</button>
                        </div>
                    `;
                    cartItems.appendChild(cartItemElement);
                });

                cartTotal.textContent = total.toFixed(2);

                // Añadir eventos a los botones eliminar
                document.querySelectorAll('.remove-item').forEach(button => {
                    button.addEventListener('click', function() {
                        const index = parseInt(this.getAttribute('data-index'));
                        cart.splice(index, 1);
                        localStorage.setItem('cart', JSON.stringify(cart));
                        updateCartModal();
                        updateCartCount();
                    });
                });
            }

            // Procesar compra
            
        });




        // ==========================================================
// ✅ VALIDACIÓN DEL FORMULARIO DE CONTACTO - VERSIÓN SEGURA
// ==========================================================
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            let isValid = true;

            // Limpiar mensajes de error anteriores
            document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

            // Validar nombre
            const name = document.getElementById('name');
            const nameError = document.getElementById('nameError');
            if (name && name.value.trim().length < 2) {
                if (nameError) nameError.textContent = 'El nombre debe tener al menos 2 caracteres';
                isValid = false;
            }

            // Validar email
            const email = document.getElementById('email');
            const emailError = document.getElementById('emailError');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email && !emailRegex.test(email.value)) {
                if (emailError) emailError.textContent = 'Por favor ingresa un email válido';
                isValid = false;
            }

            // Validar mensaje
            const message = document.getElementById('message');
            const messageError = document.getElementById('messageError');
            if (message && message.value.trim().length < 10) {
                if (messageError) messageError.textContent = 'El mensaje debe tener al menos 10 caracteres';
                isValid = false;
            }

            // Si hay errores, se detiene el envío
            if (!isValid) {
                e.preventDefault();
                return;
            }

            // Deshabilitar el botón al enviar
            const submitBtn = document.getElementById('submitBtn');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Enviando...';
            }
        });
    } else {
        console.warn('⚠️ No se encontró el formulario con ID "contactForm". Verifica tu HTML.');
    }
});

// ======================================================
// 🌿 web.js — Código limpio, optimizado y sin errores
// ======================================================

document.addEventListener('DOMContentLoaded', function() {

    // ======================================================
    // 📖 EFECTO "LEER MÁS / LEER MENOS" EN BLOG
    // ======================================================
    const botones = document.querySelectorAll('.leer-mas-btn');

    botones.forEach(boton => {
        boton.innerHTML = 'Leer más <span class="arrow">↓</span>';

        boton.addEventListener('click', function() {
            const card = this.closest('.blog-card');
            const textoExtra = card.querySelector('.more-text');

            if (!textoExtra) return; // seguridad

            textoExtra.classList.toggle('mostrar');

            if (textoExtra.classList.contains('mostrar')) {
                this.innerHTML = 'Leer menos <span class="arrow">↑</span>';
                this.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                this.innerHTML = 'Leer más <span class="arrow">↓</span>';
            }
        });
    });

    // ======================================================
    // ✨ ANIMACIONES DE SECCIÓN “WHY US” (solo si existe)
    // ======================================================
    const whyChooseSection = document.querySelector('.why-us-section');
    const cards = document.querySelectorAll('.feature-card');

    if (whyChooseSection && cards.length > 0) {
        function checkScroll() {
            const sectionPosition = whyChooseSection.getBoundingClientRect();
            const screenPosition = window.innerHeight / 1.3;

            if (sectionPosition.top < screenPosition) {
                cards.forEach(card => card.classList.add('animated'));
                window.removeEventListener('scroll', checkScroll);
            }
        }

        window.addEventListener('scroll', checkScroll);
        checkScroll();
    }

    // ======================================================
    // 🎯 EFECTO DE MENÚ ACTIVO (resalta sección visible)
    // ======================================================
    const secciones = document.querySelectorAll('section');
    const enlacesNav = document.querySelectorAll('nav a');

    window.addEventListener('scroll', () => {
        let actual = '';
        secciones.forEach(sec => {
            const top = window.scrollY;
            const offset = sec.offsetTop - 100;
            const height = sec.offsetHeight;
            if (top >= offset && top < offset + height) {
                actual = sec.getAttribute('id');
            }
        });

        enlacesNav.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + actual) {
                link.classList.add('active');
            }
        });
    });

    // ======================================================
    // 💡 ANIMACIÓN SUAVE EN LOS BOTONES DE NAVEGACIÓN
    // ======================================================
    const enlaces = document.querySelectorAll('a[href^="#"]');
    enlaces.forEach(enlace => {
        enlace.addEventListener('click', function(e) {
            const destino = document.querySelector(this.getAttribute('href'));
            if (destino) {
                e.preventDefault();
                destino.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ======================================================
    // 🌙 MODO OSCURO / CLARO (si está implementado)
    // ======================================================
    const toggleTheme = document.querySelector('.toggle-theme');
    if (toggleTheme) {
        toggleTheme.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            toggleTheme.textContent = isDark ? '☀️' : '🌙';
        });
    }

    // ======================================================
    // 🧭 MENÚ RESPONSIVO (abrir/cerrar)
    // ======================================================
    const menuBtn = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            menuBtn.classList.toggle('open');
        });
    }

    // ======================================================
    // 🧪 MENSAJE DE CONFIRMACIÓN EN LA CONSOLA (debug)
    // ======================================================
    console.log('✅ web.js cargado correctamente y sin errores 🚀');
});

// Código de diagnóstico - agrégalo temporalmente después del código anterior
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado - verificando botones Leer Más...');
    
    const botones = document.querySelectorAll('.leer-mas-btn');
    console.log(`Se encontraron ${botones.length} botones Leer Más`);
    
    botones.forEach((boton, index) => {
        const textoExtra = boton.closest('.blog-card').querySelector('.more-text');
        console.log(`Botón ${index + 1}:`, {
            boton: boton,
            textoExtra: textoExtra,
            tieneClaseMostrar: textoExtra.classList.contains('mostrar')
        });
        
        // Verificar que el evento se está agregando
        boton.addEventListener('click', function() {
            console.log(`Botón ${index + 1} clickeado`);
        });
    });
});



// Toggle del formulario de dirección en perfil.html

document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.querySelector('.btn-toggle-form');
    const addressForm = document.querySelector('.address-form');
    
    if (toggleBtn && addressForm) {
        toggleBtn.addEventListener('click', function() {
            addressForm.classList.toggle('hidden');
            this.textContent = addressForm.classList.contains('hidden') ? 
                'Agregar Dirección' : 'Cancelar';
        });
    }
});



// ===== MANEJO DEL MODAL DE LOGIN =====
// ===== MANEJO DEL MODAL DE LOGIN =====
document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.getElementById('login-btn');
    const loginModal = document.getElementById('login-modal');
    const closeBtn = document.querySelector('.close-btn');
    const loginForm = document.getElementById('login-form');
    const loginMessages = document.getElementById('login-messages');

    // Abrir modal de login
    if (loginBtn && loginModal) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.style.display = 'block';
            // Limpiar mensajes anteriores
            if (loginMessages) {
                loginMessages.innerHTML = '';
            }
        });
    }

    // Cerrar modal de login
    if (closeBtn && loginModal) {
        closeBtn.addEventListener('click', function() {
            loginModal.style.display = 'none';
        });
    }

    // Cerrar modal al hacer clic fuera
    window.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
        }
    });

    // Manejar envío del formulario de login
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevenir envío normal
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const remember = document.querySelector('input[name="remember"]').checked;
            
            const submitBtn = this.querySelector('.login-submit-btn');
            
            // Mostrar estado de carga
            submitBtn.disabled = true;
            submitBtn.textContent = 'Iniciando sesión...';
            
            // Limpiar mensajes anteriores
            if (loginMessages) {
                loginMessages.innerHTML = '';
            }

            // Validación básica frontend
            if (!email || !password) {
                showLoginError('Por favor completa todos los campos');
                submitBtn.disabled = false;
                submitBtn.textContent = 'Iniciar sesión';
                return;
            }

            // Enviar datos via Fetch API
            fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&remember=${remember}`
            })
            .then(response => {
                if (response.redirected) {
                    // Si hay redirección, fue exitoso
                    window.location.href = response.url;
                } else {
                    return response.text().then(text => {
                        try {
                            return JSON.parse(text);
                        } catch {
                            return { success: false, message: 'Error en el servidor' };
                        }
                    });
                }
            })
            .then(data => {
                if (data && !data.success) {
                    // Mostrar error
                    showLoginError(data.message || 'Error en el inicio de sesión');
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Iniciar sesión';
                }
                // Si fue exitoso, la redirección ya se manejó arriba
            })
            .catch(error => {
                console.error('Error:', error);
                showLoginError('Error de conexión con el servidor');
                submitBtn.disabled = false;
                submitBtn.textContent = 'Iniciar sesión';
            });
        });
    }

    function showLoginError(message) {
        if (loginMessages) {
            loginMessages.innerHTML = `<div class="alert error">${message}</div>`;
        }
    }

    function showLoginSuccess(message) {
        if (loginMessages) {
            loginMessages.innerHTML = `<div class="alert success">${message}</div>`;
        }
    }

    // Cerrar modal con tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && loginModal && loginModal.style.display === 'block') {
            loginModal.style.display = 'none';
        }
    });
});


<script async src="https://www.googletagmanager.com/gtag/js?id=G-610MXRKJNZ"></script>

  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-610MXRKJNZ');




// El resto de tu código JavaScript existente...
// (slider, menú móvil, animaciones, etc.)