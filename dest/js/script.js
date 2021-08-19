//Slider

let btnPrev = document.querySelector('.btn-prev')
let btnNext = document.querySelector('.btn-next')
let slider = document.querySelector('.slider__content')
let scroll = 0

btnPrev.addEventListener('click', function() {
    scroll -= 200
    if (scroll < 0) {
        scroll = 0
    }
    slider.style.left = -scroll + 'px'
    console.log(scroll)
})
btnNext.addEventListener('click', function() {
    scroll += 200
    slider.style.left = -scroll + 'px'
    console.log(scroll)
}) 



