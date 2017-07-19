const soundsNames = [
    'first.mp3',
    'second.mp3',
    'third.mp3',
    'fourth.mp3',
    'fifth.mp3'
];
const piano = document.querySelector('.set');
const keys = piano.querySelectorAll('li');

function modification(event) {
    piano.classList.remove('middle');

    if (event.altKey) {
        piano.classList.add('higher');
    } else if(event.shiftKey) {
        piano.classList.add('lower');
    }
}

function reset() {
    piano.classList.remove('lower', 'higher');
    piano.classList.add('middle');
}

function setSoundsSrc(keys) {
    let i = 0;
    for (let key of keys) {
        key.querySelector('audio').setAttribute('src', soundsNames[i]);
        i++;
    }
}

function playSound() {
    setSoundsSrc(keys);
    let thisAudio = this.querySelector('audio');
    let thisSound = thisAudio.getAttribute('src');

    if (piano.classList.contains('lower')) {
        thisAudio.setAttribute('src', './sounds/lower/' + thisSound);
    } else if (piano.classList.contains('higher')) {
        thisAudio.setAttribute('src', './sounds/higher/' + thisSound);
    } else {
        thisAudio.setAttribute('src', './sounds/middle/' + thisSound);
    }
    thisAudio.play();
}

for (let key of keys) {
    key.addEventListener('click', playSound);
}

document.addEventListener('keydown', modification);
document.addEventListener('keyup', reset);