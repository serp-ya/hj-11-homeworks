const tabsContainer = document.getElementById('tabs');
const tabsNav = tabsContainer.querySelector('.tabs-nav');
const tabsContentContainer = tabsContainer.querySelector('.tabs-content');
const tabsContent = tabsContentContainer.children;

function tabsInitialization() {
    let tabNavTemplate = tabsNav.removeChild(tabsNav.firstElementChild);

    for (let article of tabsContent) {
        let newTab = tabNavTemplate.cloneNode(true);
        let newTabContent = newTab.firstElementChild;

        newTabContent.textContent = article.dataset.tabTitle;
        newTabContent.classList.add(article.dataset.tabIcon);
        tabsNav.appendChild(newTab);

        article.classList.add('hidden');
    }

    let tabsList = tabsNav.children;
    tabsNav.firstElementChild.classList.add('ui-tabs-active');
    tabsContentContainer.firstElementChild.classList.remove('hidden');

    function changeTab(event) {
        let thatTab = event.target.parentNode;
        let tabName = thatTab.textContent;

        event.preventDefault();
        tabsNav.querySelector('.ui-tabs-active').classList.remove('ui-tabs-active');
        thatTab.classList.add('ui-tabs-active');

        for (let article of tabsContent) {
            if (article.dataset.tabTitle === tabName) {
                article.classList.remove('hidden');
            } else {
                article.classList.add('hidden');
            }
        }
    }

    for (let tab of tabsList) {
        tab.addEventListener('click', changeTab);
    }
}

document.addEventListener('DOMContentLoaded', tabsInitialization);