const navBar = document.querySelector('body > nav');
const secretBar = document.querySelector('.secret');
const secretCode = [
    'KeyY',
    'KeyT',
    'KeyN',
    'KeyJ',
    'KeyK',
    'KeyJ',
    'KeyU',
    'KeyB',
    'KeyZ'
];
let userCode = [];

function openNav(event) {
    if (event.altKey && event.ctrlKey && event.code === 'KeyT') {
        navBar.classList.toggle('visible');
    }
}

function codeInput(event) {
    if (event.code === secretCode[userCode.length]) {
        userCode.push(event.code);
    } else {
        userCode = [];
        secretBar.classList.remove('visible');
    }

    if (secretCode.length === userCode.length) {
        secretBar.classList.toggle('visible');
    }

}

document.addEventListener('keydown', openNav);
document.addEventListener('keydown', codeInput);