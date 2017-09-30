'use strict';
const poolingBlock = document.querySelector('.pooling');
const poolingCells = poolingBlock.querySelectorAll('div');

makePooling(); // first call
setInterval(makePooling, 1000 * 5);

function makePooling() {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', event => {
    if (event.target.status == 200) {
      const responseNumber = +event.target.responseText;
      selectCell(poolingCells, responseNumber);
    }
  });

  xhr.open('GET', 'https://neto-api.herokuapp.com/comet/pooling');
  xhr.send();
}

function selectCell(blocksArray, position) {
  cleanSelect(blocksArray);
  blocksArray[position - 1].classList.add('flip-it');
}

function cleanSelect(blocksArray) {
  blocksArray.forEach(el => el.classList.remove('flip-it'))
}