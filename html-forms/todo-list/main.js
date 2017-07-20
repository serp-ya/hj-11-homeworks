const wrapper = document.querySelector('.list-block');
const checkBoxes = document.querySelectorAll('.list-block input[type="checkbox"]');
const counter = document.querySelector('.list-block output');

function changeCounter() {
    let checkedCount = Array.from(checkBoxes).filter((el) => (el.checked)).length;
    counter.innerHTML = `${checkedCount} из ${checkBoxes.length}`;

    if (checkedCount === checkBoxes.length) {
        wrapper.classList.add('complete');
    } else {
        wrapper.classList.remove('complete');
    }
}

for (let box of checkBoxes) {
    box.addEventListener('change', changeCounter);
}

document.addEventListener('DOMContentLoaded', changeCounter);