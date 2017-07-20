const contentWrapper = document.getElementById('content');
const amountInput = document.getElementById('source');
const currencyFrom = document.getElementById('from');
const currencyTo = document.getElementById('to');
const convertResult = document.getElementById('result');
const preloader = document.getElementById('loader');
const currencyRequest = new XMLHttpRequest();

currencyRequest.timeout = 5000;
currencyRequest.addEventListener('loadstart', getCurrencyStart);
currencyRequest.open('GET', 'https://neto-api.herokuapp.com/currency');
currencyRequest.send();
currencyRequest.addEventListener('timeout', timeoutEnd);
currencyRequest.addEventListener('error', onRequestError);
currencyRequest.addEventListener('load', getCurrencySuccess);

function getCurrencyStart() {
    preloader.classList.remove('hidden');
}

function onRequestError() {
    console.error("Can't get request, network error");
}

function timeoutEnd() {
    preloader.classList.add('hidden');
    console.error('Request exceeds timeout');
}

function getCurrencySuccess(event) {
    if (event.target.status !== 200) {
        console.error(`Error: ${event.target.status}`);
        return;
    }

    let currencyArray = JSON.parse(event.target.responseText);
    let currencyHTML = '';

    for (let currency of currencyArray) {
        currencyHTML += `<option data-code="${currency.code}" value="${currency.value}">${currency.title}</option>`;
    }

    currencyFrom.innerHTML = currencyHTML;
    currencyTo.innerHTML = currencyHTML;
    preloader.classList.add('hidden');
    contentWrapper.classList.remove('hidden');
    toCountResult();
}

function toCountResult() {
    convertResult.innerHTML = (currencyFrom.value / currencyTo.value) * amountInput.value;
}

amountInput.addEventListener('input', toCountResult);
currencyFrom.addEventListener('change', toCountResult);
currencyTo.addEventListener('change', toCountResult);