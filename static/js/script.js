document.addEventListener("DOMContentLoaded", function () {
    const loginModal = document.getElementById("login-modal");
    const loginBtn = document.getElementById("login-btn");
    const closeBtn = document.querySelector(".close-btn");
    const loginForm = document.getElementById("login-form");
    const loginMessages = document.getElementById("login-messages");

    // 🔒 Verificación por seguridad
    if (!loginModal || !loginForm) {
        console.error("⚠️ El modal o el formulario de login no existen en el DOM.");
        return;
    }

    // 🟢 Mostrar el modal (asegúrate de tener un botón con id="login-btn")
    if (loginBtn) {
        loginBtn.addEventListener("click", function (e) {
            e.preventDefault();
            loginModal.style.display = "block";
        });
    }

    // 🔴 Cerrar el modal
    if (closeBtn) {
        closeBtn.addEventListener("click", function () {
            loginModal.style.display = "none";
        });
    }

    // ❌ Cerrar al hacer clic fuera
    window.addEventListener("click", function (event) {
        if (event.target === loginModal) {
            loginModal.style.display = "none";
        }
    });

    // 🧾 Enviar formulario (login)
    loginForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const emailInput = document.getElementById("email");
        const passwordInput = document.getElementById("password");

        if (!emailInput || !passwordInput) {
            console.error("⚠️ Faltan campos email o password en el formulario.");
            return;
        }

        const email = emailInput.value;
        const password = passwordInput.value;

        if (!email || !password) {
            loginMessages.innerHTML = `<p style="color:red;">Completa todos los campos.</p>`;
            return;
        }

        try {
            const response = await fetch("/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (data.success) {
                loginMessages.innerHTML = `<p style="color:green;">${data.message}</p>`;
                setTimeout(() => {
                    window.location.href = data.redirect;
                }, 1000);
            } else {
                loginMessages.innerHTML = `<p style="color:red;">${data.message}</p>`;
            }
        } catch (error) {
            console.error("Error:", error);
            loginMessages.innerHTML = `<p style="color:red;">Error en el servidor.</p>`;
        }
    });



    // ================= SLIDER =================
    // (Mantén aquí el código existente de tu slider)
    const slider = document.getElementById('slider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicators = document.querySelectorAll('.indicator');
    
    if (slider && prevBtn && nextBtn) {
        let currentSlide = 0;
        const slides = document.querySelectorAll('.slide');
        const totalSlides = slides.length;

        function updateSlider() {
            slider.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Actualizar indicadores
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentSlide);
            });
        }

        // Event listeners para botones
        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateSlider();
        });

        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlider();
        });

        // Event listeners para indicadores
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentSlide = index;
                updateSlider();
            });
        });

        // Auto-slide cada 5 segundos
        setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlider();
        }, 5000);
    }
});






document.addEventListener('DOMContentLoaded', function() {
                const aboutUsSection = document.querySelector('.about-us-section');
                
                // Función para verificar si un elemento está en el viewport
                function isInViewport(element) {
                    const rect = element.getBoundingClientRect();
                    return (
                        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
                        rect.bottom >= 0
                    );
                }
                
                // Función para manejar el scroll
                function handleScroll() {
                    if (isInViewport(aboutUsSection)) {
                        aboutUsSection.classList.add('animate');
                        // Remover el event listener después de activar la animación
                        window.removeEventListener('scroll', handleScroll);
                    }
                }
                
                // Verificar si la sección ya está en el viewport al cargar la página
                if (isInViewport(aboutUsSection)) {
                    aboutUsSection.classList.add('animate');
                } else {
                    // Agregar event listener para el scroll
                    window.addEventListener('scroll', handleScroll);
                }
            });