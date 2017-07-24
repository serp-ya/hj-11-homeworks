const addButtons = document.querySelectorAll('button.add');
const cartCount = document.getElementById('cart-count');
const cartTotalPrice = document.getElementById('cart-total-price');
let goodsCount = parseInt(cartCount.innerText);
let goodsTotalPrice = parseInt(cartTotalPrice.innerText);

function addGoods(event) {
    goodsCount += 1;
    goodsTotalPrice += parseInt(event.target.dataset.price);

    cartCount.innerHTML = goodsCount;
    cartTotalPrice.innerHTML = getPriceFormatted(goodsTotalPrice);
}

for (let btn of addButtons) {
    btn.addEventListener('click', addGoods);
}