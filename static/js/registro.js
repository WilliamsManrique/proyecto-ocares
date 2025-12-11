// static/js/registro.js

document.addEventListener('DOMContentLoaded', function() {
    const registroForm = document.getElementById('registroForm');
    
    if (registroForm) {
        // Validación de contraseñas coincidentes
        registroForm.addEventListener('submit', function(e) {
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm_password').value;
            const email = document.getElementById('email').value;
            const telefono = document.getElementById('telefono').value;
            
            // Validar que las contraseñas coincidan
            if (password !== confirmPassword) {
                e.preventDefault();
                showAlert('Las contraseñas no coinciden. Por favor, verifica.', 'error');
                return;
            }
            
            // Validar longitud mínima de contraseña
            if (password.length < 6) {
                e.preventDefault();
                showAlert('La contraseña debe tener al menos 6 caracteres.', 'error');
                return;
            }
            
            // Validar formato de email
            if (!isValidEmail(email)) {
                e.preventDefault();
                showAlert('Por favor, ingresa un correo electrónico válido.', 'error');
                return;
            }
            
            // Validar teléfono (mínimo 9 dígitos)
            if (telefono && !isValidPhone(telefono)) {
                e.preventDefault();
                showAlert('Por favor, ingresa un número de teléfono válido.', 'error');
                return;
            }
            
            // Mostrar mensaje de procesamiento
            showAlert('Procesando tu registro...', 'info');
            
            // El formulario se enviará automáticamente al servidor Flask
            // Flask se encargará de enviar el email de bienvenida automáticamente
        });

        // Mostrar/ocultar contraseñas
        setupPasswordToggle();
        
        // Validación en tiempo real
        setupRealTimeValidation();
    }
});

// Función para mostrar alertas personalizadas
function showAlert(message, type = 'info') {
    // Remover alertas existentes
    const existingAlert = document.querySelector('.custom-alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    const alert = document.createElement('div');
    alert.className = `custom-alert alert-${type}`;
    alert.innerHTML = `
        <div class="alert-content">
            <span class="alert-message">${message}</span>
            <button class="alert-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Estilos para la alerta
    alert.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
        min-width: 300px;
        max-width: 500px;
        background: ${type === 'error' ? '#f8d7da' : type === 'success' ? '#d4edda' : '#d1ecf1'};
        color: ${type === 'error' ? '#721c24' : type === 'success' ? '#155724' : '#0c5460'};
        border: 1px solid ${type === 'error' ? '#f5c6cb' : type === 'success' ? '#c3e6cb' : '#bee5eb'};
        border-radius: 8px;
        padding: 15px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    `;
    
    document.body.appendChild(alert);
    
    // Auto-remover después de 5 segundos
    setTimeout(() => {
        if (alert.parentElement) {
            alert.remove();
        }
    }, 5000);
}

// Función para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Función para validar teléfono
function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[(]?[\d\s\-\(\)]{8,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Configurar toggle para mostrar/ocultar contraseña
function setupPasswordToggle() {
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm_password');
    
    // Crear botones de toggle si no existen
    [passwordInput, confirmPasswordInput].forEach((input, index) => {
        if (input) {
            const toggleButton = document.createElement('button');
            toggleButton.type = 'button';
            toggleButton.innerHTML = '👁️';
            toggleButton.className = 'password-toggle';
            toggleButton.style.cssText = `
                position: absolute;
                right: 10px;
                top: 50%;
                transform: translateY(-50%);
                background: none;
                border: none;
                cursor: pointer;
                font-size: 16px;
            `;
            
            const inputContainer = input.parentElement;
            inputContainer.style.position = 'relative';
            input.style.paddingRight = '40px';
            
            toggleButton.addEventListener('click', function() {
                const type = input.type === 'password' ? 'text' : 'password';
                input.type = type;
                this.innerHTML = type === 'password' ? '👁️' : '🔒';
            });
            
            inputContainer.appendChild(toggleButton);
        }
    });
}

// Configurar validación en tiempo real
function setupRealTimeValidation() {
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm_password');
    const email = document.getElementById('email');
    
    if (password && confirmPassword) {
        [password, confirmPassword].forEach(input => {
            input.addEventListener('input', function() {
                validatePasswords();
            });
        });
    }
    
    if (email) {
        email.addEventListener('blur', function() {
            validateEmail();
        });
    }
}

// Validar contraseñas en tiempo real
function validatePasswords() {
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm_password');
    
    if (!password || !confirmPassword) return;
    
    const passwordValue = password.value;
    const confirmValue = confirmPassword.value;
    
    // Remover estilos previos
    password.style.borderColor = '';
    confirmPassword.style.borderColor = '';
    
    if (passwordValue && confirmValue) {
        if (passwordValue !== confirmValue) {
            password.style.borderColor = '#dc3545';
            confirmPassword.style.borderColor = '#dc3545';
        } else {
            password.style.borderColor = '#28a745';
            confirmPassword.style.borderColor = '#28a745';
        }
    }
    
    // Validar fortaleza de contraseña
    if (passwordValue) {
        const strength = getPasswordStrength(passwordValue);
        updatePasswordStrength(strength);
    }
}

// Validar email en tiempo real
function validateEmail() {
    const email = document.getElementById('email');
    if (!email) return;
    
    const emailValue = email.value;
    
    if (emailValue && !isValidEmail(emailValue)) {
        email.style.borderColor = '#dc3545';
    } else if (emailValue) {
        email.style.borderColor = '#28a745';
    } else {
        email.style.borderColor = '';
    }
}

// Calcular fortaleza de contraseña
function getPasswordStrength(password) {
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/\d/)) strength++;
    if (password.match(/[^a-zA-Z\d]/)) strength++;
    
    return strength;
}

// Actualizar indicador de fortaleza de contraseña
function updatePasswordStrength(strength) {
    let strengthBar = document.getElementById('password-strength-bar');
    let strengthText = document.getElementById('password-strength-text');
    
    if (!strengthBar) {
        const passwordContainer = document.getElementById('password').parentElement;
        strengthBar = document.createElement('div');
        strengthBar.id = 'password-strength-bar';
        strengthBar.style.cssText = `
            height: 4px;
            background: #e9ecef;
            border-radius: 2px;
            margin-top: 5px;
            overflow: hidden;
        `;
        
        strengthText = document.createElement('div');
        strengthText.id = 'password-strength-text';
        strengthText.style.cssText = `
            font-size: 12px;
            margin-top: 2px;
            color: #6c757d;
        `;
        
        passwordContainer.appendChild(strengthBar);
        passwordContainer.appendChild(strengthText);
    }
    
    const colors = ['#dc3545', '#fd7e14', '#ffc107', '#28a745'];
    const texts = ['Muy débil', 'Débil', 'Moderada', 'Fuerte'];
    
    strengthBar.innerHTML = `
        <div style="width: ${(strength / 4) * 100}%; height: 100%; background: ${colors[strength] || '#dc3545'}; transition: all 0.3s ease;"></div>
    `;
    strengthText.textContent = `Fortaleza: ${texts[strength] || 'Muy débil'}`;
    strengthText.style.color = colors[strength] || '#dc3545';
}

// Función para manejar el éxito del registro (si usas AJAX)
function handleRegistrationSuccess(response) {
    showAlert('¡Registro exitoso! Se ha enviado un email de bienvenida a tu correo.', 'success');
    
    // Redirigir después de 2 segundos
    setTimeout(() => {
        window.location.href = '/login';
    }, 2000);
}

// Función para manejar errores del registro (si usas AJAX)
function handleRegistrationError(error) {
    showAlert('Error en el registro: ' + (error.message || 'Por favor, intenta nuevamente.'), 'error');
}

// Inicializar tooltips o información adicional
function initTooltips() {
    // Tooltip para el campo de intereses
    const interesesSelect = document.getElementById('intereses');
    if (interesesSelect) {
        const tooltip = document.createElement('div');
        tooltip.className = 'form-tooltip';
        tooltip.textContent = 'Esto nos ayuda a personalizar tu experiencia';
        tooltip.style.cssText = `
            font-size: 12px;
            color: #6c757d;
            margin-top: 5px;
        `;
        
        interesesSelect.parentElement.appendChild(tooltip);
    }
}

// Llamar a la inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initTooltips();
});