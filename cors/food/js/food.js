'use strict';
const clearPortFromURLPattern = /:{1}\d+/;
const callbackSourcesForPromises = [
  'https://neto-api.herokuapp.com/food/42',
  'https://neto-api.herokuapp.com/food/42/rating',
  'https://neto-api.herokuapp.com/food/42/consumers'
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
    document.querySelector(`[data-consumers]`).innerHTML = data.consumers.reduce(function (result, consumer) {
      return result += `<img src="${consumer.pic.replace(clearPortFromURLPattern, '')}" title="${consumer.name}">`;
    }, '');

    const total = document.createElement('span');
    total.innerText = `(+${data.total})`;
    document.querySelector(`[data-consumers]`).appendChild(total);
  }
};

addScriptWithPromises(callbackSourcesForPromises[0], 'whatever')
  .then(callbackRegistry.loadRecipe)
  .then(() => addScriptWithPromises(callbackSourcesForPromises[1], 'whatever'))
.then(callbackRegistry.loadRating)
  .then(() => addScriptWithPromises(callbackSourcesForPromises[2], 'whatever'))
.then(callbackRegistry.loadConsumers);

function addScriptWithPromises(url, callbackName) {
  return new Promise((done, fail) => {
      let callbackUrl = `${url}?callback=${callbackName}`;
  window[callbackName]= done;

  const script = document.createElement('script');
  script.src = callbackUrl;
  document.body.appendChild(script);
});
}
