document.addEventListener("DOMContentLoaded", function() {
    const apiKey = 'e2410efe2fd04f32f34cbbdb3810a0ed'; // API Key de TMDb
    const apiReadAccessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjQxMGVmZTJmZDA0ZjMyZjM0Y2JiZGIzODEwYTBlZCIsInN1YiI6IjY2NDE4NzlkZWZiODBhNzVkMjk2NTk2YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rpA4a4Xyct-QAe0cVjCMm49duTc6pzKRRsYqjdTQwIg'; // Token de acceso de lectura de la API de TMDb

    const peliculasList = document.getElementById("peliculas-list");
    const pagination = document.getElementById("pagination");
    const moviesPerPage = 8;
    let currentPage = 1;
    let totalPages;
    let peliculas; // Variable global para almacenar la lista de películas

    function obtenerPeliculas() {
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es&page=1`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                peliculas = data.results; // Almacenar la lista de películas en la variable global
                totalPages = Math.ceil(peliculas.length / moviesPerPage);
                mostrarPeliculasPorPagina(currentPage);
                mostrarPaginacion();
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    function mostrarPeliculasPorPagina(page) {
        const startIndex = (page - 1) * moviesPerPage;
        const endIndex = startIndex + moviesPerPage;
        const peliculasPagina = peliculas.slice(startIndex, endIndex);
        mostrarPeliculas(peliculasPagina);
    }

    function mostrarPeliculas(peliculas) {
        peliculasList.innerHTML = "";
        peliculas.forEach(pelicula => {
            const li = document.createElement("li");
            li.classList.add("movie-card");
            li.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w500${pelicula.poster_path}" alt="${pelicula.title}" class="movie-poster">
                <h3 class="movie-title">${pelicula.title}</h3>
                <p class="movie-overview">${pelicula.overview}</p>
                <button class="edit-button" data-id="${pelicula.id}">Editar</button>
                <button class="detail-button" data-id="${pelicula.id}">Detalles</button>
                <button class="delete-button" data-id="${pelicula.id}">Eliminar</button> <!-- Botón Eliminar -->
            `;
            li.querySelector('.edit-button').addEventListener('click', (event) => {
                const movieId = event.target.dataset.id;
                abrirFormularioEdicion(movieId);
            });
            li.querySelector('.detail-button').addEventListener('click', (event) => {
                const movieId = event.target.dataset.id;
                mostrarDetallesPelicula(movieId);
            });
            // Agregar evento para el botón Eliminar
            li.querySelector('.delete-button').addEventListener('click', (event) => {
                const movieId = event.target.dataset.id;
                eliminarPelicula(movieId);
            });
            peliculasList.appendChild(li);
        });
    }
    

    function eliminarPelicula(movieId) {
        // Aquí puedes agregar la lógica para eliminar la película con el ID especificado
        // Por ejemplo, podrías enviar una solicitud de eliminación a tu servidor o realizar cualquier otra acción necesaria.
        console.log(`Se eliminará la película con ID: ${movieId}`);
    }
    
    function mostrarPaginacion() {
        pagination.innerHTML = "";
        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement("button");
            button.textContent = i;
            button.addEventListener("click", function() {
                currentPage = i;
                mostrarPeliculasPorPagina(currentPage);
                actualizarPaginacion();
            });
            pagination.appendChild(button);
        }
    }

    function actualizarPaginacion() {
        const buttons = pagination.getElementsByTagName("button");
        for (let i = 0; i < buttons.length; i++) {
            if (i + 1 === currentPage) {
                buttons[i].classList.add("active");
            } else {
                buttons[i].classList.remove("active");
            }
        }
    }
    
    function abrirFormularioEdicion(movieId) {
        // Redirige a la página de edición con el ID de la película como parámetro
        window.location.href = `editar.html?id=${movieId}`;
    }

    function mostrarDetallesPelicula(movieId) {
        // Redirige a la página de detalles con el ID de la película como parámetro
        window.location.href = `detalles.html?id=${movieId}`;
    }

    obtenerPeliculas();
});
