const request = new XMLHttpRequest();
const booksWrapper = document.getElementById('content');

let booksList;
request.open('GET', 'https://netology-fbb-store-api.herokuapp.com/book/');
request.send();
request.addEventListener('load', getBooksList);
request.addEventListener('error', onRequestError);
request.addEventListener('loadend', fillBooksWrapper);

function getBooksList(event) {
    if (event.target.status !== 200) {
        console.error('Видимо, что-то пошло не так и ответ мною получен не верный!');
    }
    booksList = JSON.parse(request.responseText);
}

function onRequestError(event) {
    console.error("Can't get request, network error");
}

function fillBooksWrapper() {
  booksWrapper.innerHTML = booksList.reduce(function(result, book) {
    return result += `<li data-title="${book.title}" data-author="${book.author.name}" data-info="${book.info}" data-price="${book.price}">
      <img src ="${book.cover.small}">
    </li>`;
  }, "");
}