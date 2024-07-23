document.addEventListener('DOMContentLoaded', () => {
    const filmsList = document.getElementById('films');
    const poster = document.getElementById('poster');
    const title = document.getElementById('title');
    const description = document.getElementById('description');
    const runtime = document.getElementById('runtime');
    const showtime = document.getElementById('showtime');
    const availableTickets = document.getElementById('available-tickets');
    const buyTicketButton = document.getElementById('buy-ticket');

    let currentMovie;


    fetch('http://localhost:3000/films/1')
        .then(response => response.json())
        .then(movie => displayMovieDetails(movie));

    
    fetch('http://localhost:3000/films')
        .then(response => response.json())
        .then(movies => {
            filmsList.innerHTML = '';
            movies.forEach(movie => {
                const li = document.createElement('li');
                li.className = 'film item';
                li.textContent = movie.title;
                li.addEventListener('click', () => displayMovieDetails(movie));
                filmsList.appendChild(li);
            });
        });

    
    function displayMovieDetails(movie) {
        currentMovie = movie;
        poster.src = movie.poster;
        title.textContent = movie.title;
        description.textContent = movie.description;
        runtime.textContent = `Runtime: ${movie.runtime} minutes`;
        showtime.textContent = `Showtime: ${movie.showtime}`;
        updateAvailableTickets(movie);
    }

    // Update available tickets
    function updateAvailableTickets(movie) {
        const available = movie.capacity - movie.tickets_sold;
        availableTickets.textContent = `Available Tickets: ${available}`;
        if (available > 0) {
            buyTicketButton.disabled = false;
            buyTicketButton.textContent = 'Buy Ticket';
        } else {
            buyTicketButton.disabled = true;
            buyTicketButton.textContent = 'Sold Out';
        }
    }

    // Buy ticket event
    buyTicketButton.addEventListener('click', () => {
        if (currentMovie && currentMovie.tickets_sold < currentMovie.capacity) {
            currentMovie.tickets_sold++;
            updateAvailableTickets(currentMovie);
            // Optional: Persist changes to server
            // fetch(`http://localhost:3000/films/${currentMovie.id}`, {
            //     method: 'PATCH',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({ tickets_sold: currentMovie.tickets_sold })
            // });
        }
    });
});
filmsList.innerHTML = ''; // Clear placeholder
movies.forEach(movie => {
    const li = document.createElement('li');
    li.className = 'film item';
    li.textContent = movie.title;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        fetch(`http://localhost:3000/films/${movie.id}`, {
            method: 'DELETE'
        })
        .then(() => li.remove());
    });

    li.appendChild(deleteButton);
    li.addEventListener('click', () => displayMovieDetails(movie));
    filmsList.appendChild(li);
});
