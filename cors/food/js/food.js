'use strict';
const clearPortFromURLPattern = /:{1}\d+/;
const callbackSources = [
  'https://neto-api.herokuapp.com/food/42?callback=callbackRegistry.loadRecipe',
  'https://neto-api.herokuapp.com/food/42/rating?callback=callbackRegistry.loadRating',
  'https://neto-api.herokuapp.com/food/42/consumers?callback=callbackRegistry.loadConsumers'
];
const callbackRegistry = {
  'loadRecipe': function (data) {
    document.querySelector(`[data-pic]`).style.backgroundImage = `url(${data.pic.replace(clearPortFromURLPattern, '')})`;
    document.querySelector(`[data-title]`).innerText = data.title;
    document.querySelector(`[data-ingredients]`).innerText = data.ingredients.join(', ');
  },

  'loadRating': function (data) {
    document.querySelector(`[data-rating]`).innerText = data.rating.toFixed(2);
    document.querySelector(`[data-star]`).style.width = `${data.rating * 10}%`;
    document.querySelector(`[data-votes]`).innerText = `(${data.votes} оценок)`;
  },

  'loadConsumers': function (data) {
    document.querySelector(`[data-consumers]`).innerHTML = data.list.reduce(function (result, consumer) {
      return result += `<img src="${consumer.pic.replace(clearPortFromURLPattern, '')}" title="${consumer.name}">`;
    }, '');

    const total = document.createElement('span');
    total.innerText = `(+${data.total})`;
    document.querySelector(`[data-consumers]`).appendChild(total);
  }
};

function addScript(srcArr) {
  srcArr.forEach((link) => {
    const elem = document.createElement("script");
    elem.src = link;
    document.body.appendChild(elem);
  })
}

addScript(callbackSources);