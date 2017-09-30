'use strict';
const longPoolingBlock = document.querySelector('.long-pooling');
const longPoolingCells = longPoolingBlock.querySelectorAll('div');

makeLongPooling();

function makeLongPooling() {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', event => {
    if (200 <= event.target.status && event.target.status < 300) {
      const responseNumber = +event.target.responseText;
      selectCell(longPoolingCells, responseNumber);
    }

    makeLongPooling();
  });

  xhr.open('GET', 'https://neto-api.herokuapp.com/comet/long-pooling');
  xhr.send();
}