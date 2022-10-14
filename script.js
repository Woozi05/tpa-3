let url = "https://api.themoviedb.org/3/movie/popular?api_key=03c4740bf6aca0f5a0d1ffe8f0210adc&page=1"
let imageUrl = 'https://image.tmdb.org/t/p/w500/'

let cardMovies = (movie) => {
    return `<div class="col g-3 d-flex justify-content-center">
        <div class="card" style="width: 18rem;">
            <img src="${imageUrl + movie.poster_path}" class="card-img-top" alt="${movie.title}">
            <div class="card-body">
                <div class= "d-flex justify-content-between">
                    <h5 class="card-title">${movie.title}</h5>
                     <p class="card-rating fw-bold">${movie.vote_average}</p>
                </div>
                <p class="card-date mt-4 mb-1">${movie.release_date}</p> 
            </div>
        </div>
    </div>`
}

// Get data movies
let listMovies = document.querySelector(".list-movies")
let getMovies = async () => {
    let response = await fetch(url)
    let data = await response.json()
    let movies = ""

    data.results.forEach((item, index) => {
        movies += cardMovies(item)
        listMovies.innerHTML = movies
    })
}
getMovies()

// Pencarian movies
let searchMovies = async (input) => {
        let response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=03c4740bf6aca0f5a0d1ffe8f0210adc&query=${input}&page=1`);
        let movies = await response.json();
        return movies.results
}

let inputSearch = document.querySelector(".search")
inputSearch.addEventListener("keyup", async (event) => {
    let search = await searchMovies(event.target.value);
    if (search) {
         listMovies.innerHTML = search.map(movie => cardMovies(movie))
    } else {
        getMovies();
    }
});