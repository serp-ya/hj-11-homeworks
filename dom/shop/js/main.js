const addButtons = document.querySelectorAll('button.add');
const cartCount = document.getElementById('cart-count');
const cartTotalPrice = document.getElementById('cart-total-price');

function addGoods() {
    let goodsCount = parseInt(cartCount.innerText);
    let goodsTotalPrice = parseInt(cartTotalPrice.innerText);
    let thisPrice = parseInt(this.dataset.price);

    cartCount.innerHTML = ++goodsCount;
    cartTotalPrice.innerHTML = goodsTotalPrice + thisPrice;
}

for (let btn of addButtons) {
    btn.addEventListener('click', addGoods);
}