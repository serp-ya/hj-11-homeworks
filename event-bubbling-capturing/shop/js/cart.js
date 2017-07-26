'use strict';
const itemsList = document.querySelector('.items-list');
const showMoreBtn = document.querySelector('.show-more');
let buttons;

function updateButtonsList() {
    buttons = itemsList.querySelectorAll('a.add-to-cart');
    for (let btn of buttons) {
        btn.addEventListener('click', transferGoods)
    }
}

function transferGoods(event) {
    let good = {
        title: event.target.dataset.title,
        price: event.target.dataset.price
    };

    event.preventDefault();
    addToCart(good);
}

document.addEventListener('DOMContentLoaded', updateButtonsList);
showMoreBtn.addEventListener('click', updateButtonsList);