document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("editar-pelicula-form");
    const backButton = document.getElementById("back-button");

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        // Lógica para actualizar la película en la base de datos
        // Aquí puedes llamar a una función para actualizar la película usando AJAX o Fetch API
        // Después de la actualización, puedes redirigir al usuario de regreso al catálogo de películas
        window.location.href = "index.html";
    });

    backButton.addEventListener("click", function() {
        // Redirigir al usuario de regreso al catálogo de películas
        window.location.href = "index.html";
    });
});
