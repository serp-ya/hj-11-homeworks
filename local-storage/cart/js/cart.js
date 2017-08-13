'use strict';
const colorSwatch = document.getElementById('colorSwatch');
const sizeSwatch = document.getElementById('sizeSwatch');
const quickCart = document.getElementById('quick-cart');
const addToCartBtn = document.getElementById('AddToCart');
const cartForm = document.getElementById('AddToCartForm');

colorSwatch.addEventListener('click', saveState);
sizeSwatch.addEventListener('click', saveState);
addToCartBtn.addEventListener('click', sendGood);

function makeColorSnippet(colorName, available, description, selected = false) {
  return `
    <div data-value="${colorName}" class="swatch-element color ${colorName} ${available ? 'available' : 'soldout'}">
      <div class="tooltip">${description}</div>
      <input quickbeam="color" id="swatch-1-${colorName}" type="radio" name="color" value="${colorName}" ${selected ? 'checked' : ''} ${available ? '' : 'disabled'}>
      <label for="swatch-1-${colorName}" style="border-color: ${colorName};">
        <span style="background-color: ${colorName};"></span>
        <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
      </label>
    </div>
  `;
}

function makeSizeSnippet(sizeValue, available, description, selected = false) {
  return `
    <div data-value="${sizeValue}" class="swatch-element plain ${sizeValue} ${available ? 'available' : 'soldout'}">
      <input id="swatch-0-${sizeValue}" type="radio" name="size" value="${sizeValue}" ${selected ? 'checked' : ''} ${available ? '' : 'disabled'}>
      <label for="swatch-0-${sizeValue}">
        ${description}
        <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
      </label>
    </div>
  `;
}

function makeQuickCartSnippet(goodId, imgSrc, goodTitle, count) {
  return `
    <div class="quick-cart-product quick-cart-product-static" id="quick-cart-product-${goodId}" style="opacity: 1;">
      <div class="quick-cart-product-wrap">
        <img src="${imgSrc}" title="${goodTitle}">
        <span class="s1" style="background-color: #000; opacity: .5">$800.00</span>
        <span class="s2"></span>
      </div>
      <span class="count hide fadeUp" id="quick-cart-product-count-${goodId}">${count}</span>
      <span class="quick-cart-product-remove remove" data-id="${goodId}"></span>
    </div>
  `;
}

function makeCartSnippet(count, price) {
  return `
    <a id="quick-cart-pay" quickbeam="cart-pay" class="cart-ico ${count === 0 ? '' : 'open'}">
      <span>
        <strong class="quick-cart-text">Оформить заказ<br></strong>
        <span id="quick-cart-price">$${price}</span>
      </span>
    </a>
  `;
}

Promise.all([
  fetch('https://neto-api.herokuapp.com/cart/colors'),
  fetch('https://neto-api.herokuapp.com/cart/sizes'),
  fetch('https://neto-api.herokuapp.com/cart')
]).then(([colors, sizes, cart]) => {
  if (!(200 <= colors.status) && !(colors.status < 300)) {
    throw new Error(colors.statusText);

  } else if (!(200 <= sizes.status) && !(sizes.status < 300)) {
    throw new Error(sizes.statusText);

  } else if (!(200 <= cart.status) && !(cart.status < 300)) {
    throw new Error(cart.statusText);
  }

  Promise.all([colors.json(), sizes.json(), cart.json()])
    .then(([colors, sizes, cart]) => {
      colorSwatch.innerHTML = colors.reduce(function (result, currentColor){
        return result += makeColorSnippet(currentColor.type, currentColor.isAvailable, currentColor.title);
      }, '');

      sizeSwatch.innerHTML = sizes.reduce(function (result, currentSize) {
        return result += makeSizeSnippet(currentSize.type, currentSize.isAvailable, currentSize.title);
      }, '');

      updateCart(cart);

    }).then(() => {
      let removeBtns = quickCart.querySelectorAll('.remove');

      for (const btn of removeBtns) {
        btn.addEventListener('click', removeGood);
      }

      setStates();
    });
});

function updateCart(data) {
  quickCart.innerHTML = data.reduce(function (result, currentCartItem) {
    return result += makeQuickCartSnippet(currentCartItem.id, currentCartItem.pic, currentCartItem.title, currentCartItem.quantity);
  }, '');

  let totalPrice = data.reduce(function (result, currentGood) {
    return result += currentGood.quantity * currentGood.price;
  }, 0);

  let totalCount = data.reduce(function (result, currentGood) {
    return result += currentGood.quantity;
  }, 0);

  quickCart.innerHTML += makeCartSnippet(totalCount, totalPrice);
}

function saveState(event) {
  if (event.currentTarget.id === 'colorSwatch' && event.target.tagName === 'INPUT') {
    localStorage.selectColorId = event.target.id;
  } else if (event.currentTarget.id === 'sizeSwatch' && event.target.tagName === 'INPUT') {
    localStorage.selectSizeId = event.target.id;
  }
}

function setStates() {
  if (localStorage.selectColorId) {
    document.getElementById(localStorage.selectColorId).checked = true;
  }
  if (localStorage.selectSizeId) {
    document.getElementById(localStorage.selectSizeId).checked = true;
  }
}

function makeRequest(url, data) {
  return fetch(url, {
    body: JSON.stringify(data),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

function sendGood(event) {
  event.preventDefault();
  let formData = new FormData(cartForm);
  let processedData = {productId: cartForm.dataset.productId};

  for (const [key, value] of formData) {
    processedData[key] = value;
  }

  makeRequest('https://neto-api.herokuapp.com/cart', processedData)
    .then(response => {
      if (!(200 <= response.status) && !(response.status < 300)) {
        throw new Error(response.statusText);
      }
      return response.json();

    }).then((data) => {
      if (data.error) {
        throw new Error(data.message);
      }

      return fetch('https://neto-api.herokuapp.com/cart').then((response) => {
        if (!(200 <= response.status) && !(response.status < 300)) {
          throw new Error(response.statusText);
        }
        response.json();

        }).then((data) => {
        updateCart(data);
        });

    }).catch((error) => {
      throw new Error(error);
    });
}

function removeGood(event) {
  makeRequest('https://neto-api.herokuapp.com/cart/remove', event.target.dataset.id).then((response) => {
    if (!(200 <= response.status) && !(response.status < 300)) {
      throw new Error(response.statusText);
    }
    return response.json();
  }).then((data) => {
    if (data.error) {
      throw new Error(data.message);
    }

    updateCart(data);
  })
}