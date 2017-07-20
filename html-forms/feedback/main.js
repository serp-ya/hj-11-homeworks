const form = document.querySelector('.contentform');
const modal = document.getElementById('output');
const formBtn = form.querySelector('.button-contact');
const modalBtn = modal.querySelector('.button-contact');
const formInputs = form.querySelectorAll('input, textarea');
const numberPattern = /^[0-9]+$/;

function checkNumbers(event) {
    const value = event.currentTarget.value;
    if (!numberPattern.test(value)) {
        event.currentTarget.value = value.slice(0, value.length - 1)
    }
}

function isFullFilled() {
    if (!Array.from(formInputs).some((node) => node.value === '')) {
        formBtn.disabled = false;
    } else {
        formBtn.disabled = true;
    }
}

function toggleModal(event) {
    event.preventDefault();
    form.classList.toggle('hidden');
    modal.classList.toggle('hidden');
}

function transmitValues() {
    for (const field of formInputs) {
        const value = field.value;
        const name = field.name;
        const modalNode = document.getElementById(name);

        if (modalNode) {
            modalNode.innerHTML = value;
        }
    }
}

Array.from(formInputs)
     .find((node) => node.name === 'zip')
     .addEventListener('input', checkNumbers);

for (let node of formInputs) {
    node.addEventListener('input', isFullFilled);
}

form.addEventListener('submit', toggleModal);
form.addEventListener('submit', transmitValues);
modalBtn.addEventListener('click', toggleModal);