'use strict';
const itemsList = document.querySelector('.items-list');
itemsList.addEventListener('click', transferGoods);

function transferGoods(event) {
    if (event.target.tagName === 'A') {
      let goods = {
        title: event.target.dataset.title,
        price: event.target.dataset.price
      };

      event.preventDefault();
      addToCart(goods);
    }
}