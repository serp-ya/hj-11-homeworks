const contactListHTML = document.querySelector('ul.contacts-list');
const contactList = JSON.parse(loadContacts());

function makeListItem(itemsList) {
    let result = '';
    for (let item of itemsList) {
        result += `<li><strong>${item.name}</strong></li>`;
    }
    return result;
}

function setDataAttr(nodeList, itemsList) {
    for (let node of nodeList) {
        itemsList.forEach((item) => {
            if (node.innerText === item.name) {
                node.dataset.email = item.email;
                node.dataset.phone = item.phone;
            }
        })
    }
}
contactListHTML.innerHTML = makeListItem(contactList);

let contactsNodes = contactListHTML.querySelectorAll('li');
setDataAttr(contactsNodes, contactList);