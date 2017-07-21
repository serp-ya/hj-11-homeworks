const request = new XMLHttpRequest();
const booksWraper = document.getElementById('content');

let booksList;
request.open('GET', 'https://netology-fbb-store-api.herokuapp.com/book/');
request.send();
request.addEventListener('load', getBooksList);
request.addEventListener('error', onRequestError);
request.addEventListener('loadend', fillBooksWraper);

function getBooksList(event) {
    if (event.target.status !== 200) {
        console.error('Видимо, что-то пошло не так и ответ мною получен не верный!');
    }
    booksList = JSON.parse(request.responseText);
}

function onRequestError(event) {
    console.error("Can't get request, network error");
}

function createBook(book) {
    let listItem = document.createElement('li');
    listItem.dataset.title = book.title;
    listItem.dataset.author = book.author.name;
    listItem.dataset.info = book.info;
    listItem.dataset.price = book.price;
    listItem.innerHTML = `<img src="${book.cover.small}">`;

    return listItem;

}

function fillBooksWraper() {
    for (let book of booksList) {
        booksWraper.appendChild(createBook(book));
    }
    booksWraper.firstChild.nextElementSibling.remove();
}