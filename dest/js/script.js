//Slider

let btnPrev = document.querySelector('.btn-prev')
let btnNext = document.querySelector('.btn-next')
let slider = document.querySelector('.slider__content')
let scroll = 0

btnPrev.addEventListener('click', function() {
    scroll -= 300
    if (scroll < 0) {
        scroll = 0
    }
    slider.style.left = -scroll + 'px'
})
btnNext.addEventListener('click', function() {
    scroll += 300
    slider.style.left = -scroll + 'px'
}) 

// API

const API_KEY = 'api_key=d0548a89e2db1b6fb34a78e57eacad0d'
const API_URL = 'https://api.themoviedb.org/3'
const URL = API_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500'
const content = document.querySelector('.slider__content')
const movieMain = document.querySelector('.movie__main')
const mainContent = document.querySelector('.main__content')
getMovies(URL)

function getMovies(url) {
    fetch(url).then(resp => resp.json()).then(data => {
       console.log(data.results) 
       showMovies(data.results)
       changePoster(data.results)
    }) 
}

function changePoster(data) {
    let arrPoster = []
    let arrTitle = []
    let arrRatting = []
    let arrOverview = []
    for (let film of data) {
        let poster = film.backdrop_path
        let title = film.title
        let ratting = film.vote_average
        let overview = film.overview
        arrPoster.push(poster)
        arrTitle.push(title) 
        arrRatting.push(ratting) 
        arrOverview.push(overview)   
    }
    for (let i = 0; i < arrPoster.length; i++) {
        setTimeout( () => { 
            movieMain
                .style.backgroundImage = `
                url('../img/back1.png'), 
                url('${IMAGE_URL + arrPoster[i]}')`
            mainContent.innerHTML = `
            <h2 class="movie-name">${arrTitle[i]}</h2>
            <h4 class="movie-rating ${getColor(arrRatting[i])}">${arrRatting[i]}</h4>
            <p class="movie-description">${arrOverview[i]} </p>`
        }, (i+1) * 5000)     
    }
}


function showMovies(data) {
    content.innerHTML = ''
    data.forEach(movie => {
        let title = movie.title
        let ratting = movie.vote_average
        let overview = movie.overview
        let poster = movie.poster_path
        let cardMovie = document.createElement('div')
        cardMovie.classList.add('slider__card')
        cardMovie.innerHTML = `
        <img src="${IMAGE_URL + poster}" alt="${title}">
        <div class="card__description">
            <h2 class="movie-name">${title}</h2>
            <h4 class="movie-rating ${getColor(ratting)}">${ratting}</h4>
        </div>
        <div class="card__description-hidden">
            <p class="movie-description">${overview}</p>
        </div>
        `
        content.append(cardMovie)
    })  
    
}

function getColor(value) {
    if (value >= 8) {
        return 'green'
    } else if (value >= 5) {
        return 'yellow'
    } else {
        return 'red'
    }
}

