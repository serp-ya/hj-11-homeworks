const slidesWrapper = document.querySelector('.slides');
const sliderButtons = document.querySelectorAll('.slider-nav a');
const firstSlide = slidesWrapper.firstElementChild;
const lastSlide = slidesWrapper.lastElementChild;
const previousButtons = [sliderButtons[0], sliderButtons[2]];
const nextButtons = [sliderButtons[1], sliderButtons[3]];

function selectThisSlide(slide) {
    slide.classList.add('slide-current');
}

function cleanThisSlide(currentSlide) {
    currentSlide.classList.remove('slide-current');
}

function getCurrentSlide() {
    return document.querySelector('.slide-current')
}

function disablePrevBtns() {
    previousButtons.forEach((btn) => btn.classList.add('disabled'));
}

function disableNextBtns() {
    nextButtons.forEach((btn) => btn.classList.add('disabled'));
}

function enablePrevBtns() {
    previousButtons.forEach((btn) => btn.classList.remove('disabled'));
}

function enableNextBtns() {
    nextButtons.forEach((btn) => btn.classList.remove('disabled'));
}

function changeSlide(event, currentSlide = firstSlide) {
    if (event.type === 'DOMContentLoaded') {
        selectThisSlide(currentSlide);

    } else if (event.target.classList.contains('disabled')) {
        return;

    } else {
        const action = event.target.dataset.action;
        currentSlide = getCurrentSlide();

        if (action === 'prev') {
            selectThisSlide(currentSlide.previousElementSibling);

        } else if (action === 'next') {
            selectThisSlide(currentSlide.nextElementSibling);

        } else if (action === 'first') {
            selectThisSlide(firstSlide);
            enableNextBtns();

        } else if (action === 'last') {
            selectThisSlide(lastSlide);
            enablePrevBtns();
        }
        cleanThisSlide(currentSlide);
    }

    currentSlide = getCurrentSlide();
    if (currentSlide.previousElementSibling === null) {
        disablePrevBtns();

    } else if (currentSlide.nextElementSibling === null) {
        disableNextBtns();

    } else {
        enablePrevBtns();
        enableNextBtns();
    }
}

for (let button of sliderButtons) {
    button.addEventListener('click', changeSlide);
}

document.addEventListener('DOMContentLoaded', changeSlide);