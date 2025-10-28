// Espera a que todo el contenido (HTML, CSS) se cargue primero
document.addEventListener('DOMContentLoaded', () => {

    // Seleccionamos los elementos que vamos a usar
    const splashScreen = document.getElementById('splash-screen');
    const enterButton = document.getElementById('enter-button');
    const musica = document.getElementById('musica-fondo');
    const contenidoPrincipal = document.getElementById('contenido-principal');

    // Ponemos un "escuchador" en el botón "Entrar"
    enterButton.addEventListener('click', () => {

        // 1. Intenta reproducir la música
        musica.play().catch(error => {
            // En caso de que haya un error al cargar la música
            console.warn("La música no se pudo reproducir:", error);
        });

        // 2. Oculta la pantalla de bienvenida (con la transición de CSS)
        splashScreen.style.opacity = '0';

        // 3. Espera a que termine la animación de salida (1.5 segundos)
        setTimeout(() => {
            // Oculta la pantalla de bienvenida completamente
            splashScreen.style.display = 'none';
            
            // Muestra el contenido principal de la web
            contenidoPrincipal.style.display = 'block';
        }, 1500); // 1500ms = 1.5 segundos
    });

});
