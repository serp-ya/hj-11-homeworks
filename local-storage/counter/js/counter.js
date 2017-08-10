'use strict';
const counter = document.getElementById('counter');
const controlElements = document.querySelector('.wrap-btns');

document.addEventListener('DOMContentLoaded', countChanges);
controlElements.addEventListener('click', countChanges);

function countChanges(event) {
  if (event.target.id === 'increment') {
    localStorage.counter++;

  } else if (event.target.id === 'decrement' && localStorage.counter > 0) {
    localStorage.counter--;

  } else if (event.target.id === 'reset' || !localStorage.counter) {
    localStorage.counter = 0;
  }
  counter.innerHTML = localStorage.counter;
}