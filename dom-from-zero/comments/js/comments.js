'use strict';

function showComments(list) {
  const commentsContainer = document.querySelector('.comments');
  const comments = list.map(createSafetyComment);
  comments.forEach(comment => commentsContainer.appendChild(comment));
}

function createSafetyComment(data) {
  // Логика функции
  const commentWrapper = document.createElement('div');
  commentWrapper.classList.add('comment-wrap');

  const photoBlock = createPhoto(data.author.name, data.author.pic);
  const commentBlock = createCommentBlock(data.text, data.date);

  [photoBlock, commentBlock].forEach(block => commentWrapper.appendChild(block));

  // Реализация
  function createPhoto(name, photoURL) {
    const photoWrapper = document.createElement('div');
    const avatar = document.createElement('div');

    photoWrapper.classList.add('photo');
    photoWrapper.title = name;

    avatar.classList.add('avatar');
    avatar.style.backgroundImage = `url(${photoURL})`;

    photoWrapper.appendChild(avatar);

    return photoWrapper;
  }

  function createCommentBlock(text, date) {
    const commentBlockWrapper = document.createElement('div');
    commentBlockWrapper.classList.add('comment-block');

    const commentText = document.createElement('p');
    commentText.classList.add('comment-text');
    fillCommentText(text, commentText);

    function fillCommentText(stringOfText, fillableNode) {
      const partsOfText = stringOfText.split('\n');

      partsOfText.forEach((el, i) => {
        fillableNode.appendChild(document.createTextNode(el));

        if (i < (partsOfText.length - 1)) {
          const breakNode = document.createElement('br');
          fillableNode.appendChild(breakNode);
        }
    });
    }

    const commentBottom = document.createElement('div');
    commentBottom.classList.add('bottom-comment');

    [createDate(date), createActionsList()].forEach(item => commentBottom.appendChild(item));

    function createDate(date) {
      const commentDate = document.createElement('div');
      commentDate.classList.add('comment-date');
      commentDate.textContent = new Date(date).toLocaleString('ru-Ru');
      return commentDate
    }

    function createActionsList() {
      const commentActionsList = document.createElement('ul');
      commentActionsList.classList.add('comment-actions');

      const listItemComplain = document.createElement('li');
      const listItemReply = document.createElement('li');

      listItemComplain.classList.add('complain');
      listItemComplain.textContent = 'Пожаловаться';

      listItemReply.classList.add('reply');
      listItemReply.textContent = 'Ответить';


      [listItemComplain, listItemReply].forEach(item => commentActionsList.appendChild(item));

      return commentActionsList;
    }

    [commentText, commentBottom].forEach(block => commentBlockWrapper.appendChild(block));

    return commentBlockWrapper;
  }

  return commentWrapper;
}

fetch('https://neto-api.herokuapp.com/comments')
  .then(res => res.json())
  .then(showComments);