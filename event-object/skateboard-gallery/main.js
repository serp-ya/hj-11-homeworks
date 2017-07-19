const view = document.getElementById('view');
const preViews = document.querySelectorAll('#nav a');

function changeImage(event) {
    let thisHref = this.getAttribute('href');
    event.preventDefault();
    view.setAttribute('src', thisHref);

    for (let icon of preViews) {
        icon.classList.remove('gallery-current');
    }

    this.classList.add('gallery-current');
}

for (let icon of preViews) {
    icon.addEventListener('click', changeImage);
}