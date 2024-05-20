document.addEventListener("DOMContentLoaded", function() {
    // Obtener los parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const peliculaId = urlParams.get('id');
    
    const apiKey = 'e2410efe2fd04f32f34cbbdb3810a0ed'; // API Key de TMDb
    const apiReadAccessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjQxMGVmZTJmZDA0ZjMyZjM0Y2JiZGIzODEwYTBlZCIsInN1YiI6IjY2NDE4NzlkZWZiODBhNzVkMjk2NTk2YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rpA4a4Xyct-QAe0cVjCMm49duTc6pzKRRsYqjdTQwIg'; // Token de acceso de lectura de la API de TMDb

    // Realizar una solicitud para obtener los detalles de la película usando el ID
    // y mostrar los detalles en la página
    obtenerDetallesPelicula(peliculaId);

    function obtenerDetallesPelicula(id) {
        const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=es`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                mostrarDetallesPelicula(data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    function mostrarDetallesPelicula(pelicula) {
        const detallesPelicula = document.getElementById("detalles-pelicula");
        detallesPelicula.innerHTML = `
            <h2>${pelicula.title}</h2>
            <img src="https://image.tmdb.org/t/p/w500${pelicula.poster_path}" alt="${pelicula.title}" class="movie-poster">
            <p><strong>Descripción:</strong> ${pelicula.overview}</p>
            <p><strong>Fecha de lanzamiento:</strong> ${pelicula.release_date}</p>
            <p><strong>Puntuación:</strong> ${pelicula.vote_average}</p>
            <p><strong>Géneros:</strong> ${pelicula.genres.map(genre => genre.name).join(", ")}</p>
        `;
    }
});
