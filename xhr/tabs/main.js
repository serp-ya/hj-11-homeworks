const contentBox = document.getElementById('content');
const preloader = document.getElementById('preloader');
const tabs = document.querySelectorAll('nav a');
let defaultActiveTab = document.querySelector('.active');

function preloaderToggle() {
    preloader.classList.toggle('hidden');
}

function loadContent(contentLink) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', contentLink);
    xhr.send();
    xhr.addEventListener('load', onLoad);

    function onLoad() {
        preloaderToggle();
        contentBox.innerHTML = xhr.responseText;
    }
}

function toggleTab(event) {
    event.preventDefault();
    document.querySelector('.active').classList.remove('active');
    preloaderToggle();
    loadContent(this.href);
    this.classList.add('active');
}

for (let tab of tabs) {
    tab.addEventListener('click', toggleTab);
}

preloaderToggle();
document.addEventListener('HTMLContentLoad', loadContent(defaultActiveTab.href));