// Cache-Buster: 2026-04-16 10:54:07
// Inicializar sistema de logging
logger.initializeSystem('_Plantilla');
logger.logInfo('Aplicación frontend cargada', 'Frontend');

// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const botonMenuMovil = document.getElementById('botonMenuMovil');
    const menuNavegacionPrincipal = document.getElementById('menuNavegacionPrincipal');
    const menuDesplegableServicios = document.querySelector('.menu-desplegable-servicios');

    // Toggle mobile menu
    if (botonMenuMovil && menuNavegacionPrincipal) {
        botonMenuMovil.addEventListener('click', function() {
            menuNavegacionPrincipal.classList.toggle('activo');
            
            // Animate hamburger button
            const lineas = this.querySelectorAll('.linea-menu-hamburguesa');
            this.classList.toggle('activo');
            
            if (this.classList.contains('activo')) {
                lineas[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                lineas[1].style.opacity = '0';
                lineas[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                lineas[0].style.transform = 'none';
                lineas[1].style.opacity = '1';
                lineas[2].style.transform = 'none';
            }
        });
    }

    // Toggle services submenu on mobile
    if (menuDesplegableServicios) {
        menuDesplegableServicios.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                this.classList.toggle('activo');
            }
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.encabezado-aplicacion-principal')) {
            if (menuNavegacionPrincipal && menuNavegacionPrincipal.classList.contains('activo')) {
                menuNavegacionPrincipal.classList.remove('activo');
                
                const lineas = botonMenuMovil.querySelectorAll('.linea-menu-hamburguesa');
                botonMenuMovil.classList.remove('activo');
                lineas[0].style.transform = 'none';
                lineas[1].style.opacity = '1';
                lineas[2].style.transform = 'none';
            }
        }
    });
});

// Archivo JavaScript para funcionalidad futura
console.log('Plantilla cargada correctamente');
