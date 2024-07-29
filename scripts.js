document.addEventListener('DOMContentLoaded', function () {
    const offcanvasNavbar = document.getElementById('offcanvasNavbar');
    const navLinks = document.querySelectorAll('.offcanvas-body .nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasNavbar);
            if (offcanvas) {
                offcanvas.hide();
            }
        });
    });
});

// Añade un oyente de eventos 'submit' al formulario para manejar la validación personalizada
document.getElementById('formulario').addEventListener('submit', function(event) {
    const inputs = document.querySelectorAll('#formulario .controls');
    let valid = true;

    inputs.forEach(function(input) {
        if (!input.checkValidity()) {
            input.classList.add('invalid');
            valid = false;
        } else {
            input.classList.remove('invalid');
        }
    });

    if (!valid) {
        event.preventDefault(); // Evita el envío del formulario si hay campos inválidos
    }
});

// Formatea el CUIL mientras se escribe
function formatCUIL(input) {
    let value = input.value.replace(/\D/g, '');  // Elimina todos los caracteres que no sean dígitos

    // Formatea el valor de acuerdo con el patrón 00-00000000-0
    if (value.length > 2 && value.length <= 10) {
        value = `${value.slice(0, 2)}-${value.slice(2)}`;
    } else if (value.length > 10) {
        value = `${value.slice(0, 2)}-${value.slice(2, 10)}-${value.slice(10)}`;
    }

    input.value = value;
}

// Añade un oyente de eventos 'input' al campo 'cuil' que llama a 'formatCUIL' para actualizar el valor formateado cada vez que el usuario ingresa un número.
document.getElementById('cuil').addEventListener('input', function() {
    formatCUIL(this);
});

// Calcula la edad basada en la fecha de nacimiento
function calcularEdad() {
    const fechaNacimiento = document.getElementById('fechaNacimiento').value;
    const edadInput = document.getElementById('edad');
    const fechaFin = new Date('2024-12-31');
    const nacimiento = new Date(fechaNacimiento);

    let edad = fechaFin.getFullYear() - nacimiento.getFullYear();
    const mes = fechaFin.getMonth() - nacimiento.getMonth();

    if (mes < 0 || (mes === 0 && fechaFin.getDate() < nacimiento.getDate())) {
        edad--;
    }

    edadInput.value = edad;
}

// Muestra campos adicionales para licencia de conducir si se selecciona 'Sí'
function mostrarCamposLicencia() {
    const licenciaConducir = document.getElementById('licenciaConducir').value;
    const camposLicencia = document.getElementById('camposLicencia');

    if (licenciaConducir === 'si') {
        camposLicencia.style.display = 'block';
    } else {
        camposLicencia.style.display = 'none';
    }
}

// Limita la longitud máxima de los campos
function maxLengthCheck(object) {
    if (object.value.length > object.maxLength) {
        object.value = object.value.slice(0, object.maxLength);
    }
}