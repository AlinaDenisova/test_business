'use strict';

/**
 * Модуль управляет разделом новостей сайта
 * @module module:news
 * @requires module:overlay
 */
(function () {

  var wrapperClass = 'news';
  var tabContainerClass = 'news__tabs';
  var tabClass = 'news__tab';
  var activetabClass = 'news__tab--active';
  var contentClass = 'news__content';
  var activeContentClass = 'news__content--active';

  var wrapper = document.querySelector('.' + wrapperClass);
  var tabs = wrapper.querySelectorAll('.' + tabClass);
  var tabContents = wrapper.querySelectorAll('.' + contentClass);
  var activeTabIndex = 0;
  var tabContainer = wrapper.querySelector('.' + tabContainerClass);

  var newsItems = null;
  var activeNewsIndex = 0;
  var dotsContainer = wrapper.querySelector('.news__dots');
  var dots = null;
  var btnMoreNews = wrapper.querySelector('.news__btn');

  var xhr = new XMLHttpRequest();
  var xhrInProgress = false;

  var BTN_VALUES = [
    'Еще новости',
    'Еще публикации'
  ];
  var TAB_VALUES = [
    'Новости',
    'Публикации'
  ];
  var URL_LIST = [
    'http://localhost:3000/backend/news.json',
    'http://localhost:3000/backend/publications.json'
  ];

  /**
   * Функция возвращает индекс из массива TAB_VALUES, соответствующий значению активного таба
   * @return {Number}
   */
  var getReferenceIndex = function () {
    var activeTabText = tabs[activeTabIndex].textContent;
    return TAB_VALUES.indexOf(activeTabText);
  };

  /**
   * Функция обновляет значение переменной newsItems
   */
  var updateNewsItems = function () {
    newsItems = tabContents[activeTabIndex].querySelectorAll('.news__item');
    activeNewsIndex = [].indexOf.call(newsItems, tabContents[activeTabIndex].querySelector('.news__item--active'));
    if (activeNewsIndex < 0) {
      activeNewsIndex = 0;
    }
  };

  /**
   * Функция удаляет статьи новостей, точки навигации слайдера
   */
  var clearNewsItems = function () {
    tabContents[activeTabIndex].innerHTML = '';
    clearDots();
    updateNewsItems();
  };

  /**
   * Функция обновляет значение переменной dots
   */
  var updateDots = function () {
    dots = dotsContainer.querySelectorAll('.news__dot');
  };

  /**
   * Функция удаляет точки навигации слайдера
   */
  var clearDots = function () {
    dotsContainer.innerHTML = '';
    updateDots();
  };


  /**
   * Функция отрисовывает точки навигации слайдера на странице и выделяет активную
   * @param {Number} n - количество точек для отрисовки
   */
  var renderDots = function (n) {
    var dot = null;

    for (var i = 0; i < n; i++) {
      dot = document.createElement('span');
      dot.classList.add('news__dot');
      dotsContainer.appendChild(dot);
    }
    updateDots();
    activateNewsItem(activeNewsIndex);
  };

  /**
   * Функция переименовывает кнопку для загрузки новостей
   */
  var renameButton = function () {
    btnMoreNews.textContent = BTN_VALUES[getReferenceIndex()];
  };

  /**
   * Функция показывает выбранную новость в слайдере
   * @param {number} n - номер выбранной новости
   */
  var activateNewsItem = function (n) {
    newsItems[activeNewsIndex].classList.remove('news__item--active');
    dots[activeNewsIndex].classList.remove('news__dot--active');
    activeNewsIndex = n;
    newsItems[activeNewsIndex].classList.add('news__item--active');
    dots[activeNewsIndex].classList.add('news__dot--active');
  };


  var sendRequest = function () {
    if (!xhrInProgress) {
      var xhrURL = URL_LIST[getReferenceIndex()];
      xhr.open('GET', xhrURL);
      xhr.send();
    }
  };

  /**
   * @typedef {Object} ItemData - Информация о статье
   * @property {string} title - Заголовок статьи
   * @property {string} link - Ссылка статьи
   * @property {string} text - Текст статьи
   * @property {string} date - Дата публикации статьи
   */

  /**
   * Функция возвращает отрисованную статью
   * @param {ItemData} itemData - объект, содержащий информацию о статье
   * @return {HTMLElement}
   */
  var renderNewsItem = function (itemData) {
    var element = document.createElement('article');
    var title = document.createElement('h3');
    var link = document.createElement('a');
    var text = document.createElement('p');
    var date = document.createElement('span');

    element.classList.add('news__item');
    element.classList.add('article');
    title.classList.add('article__title');
    link.innerHTML = itemData.title;
    link.setAttribute('href', itemData.link);
    title.classList.add('article__link');
    text.classList.add('article__descr');
    text.innerHTML = itemData.text;
    date.classList.add('article__time');
    date.innerHTML = itemData.date;

    element.appendChild(title);
    title.appendChild(link);
    element.appendChild(text);
    element.appendChild(date);

    return element;
  };
  /**
   * Функция отрисовывает статьи и точки навигации слайдера на странице
   * @param {Array.<ItemData>} items - массив со статьями
   */
  var renderItems = function (items) {
    var COUNT = 3;

    if ((items.length > 0) && (items.length - newsItems.length > 0)) {

      if (items.length - newsItems.length > COUNT) {
        items = items.slice(newsItems.length, newsItems.length + COUNT);
      } else {
        items = items.slice(newsItems.length);
      }

      items.forEach(function (item) {
        tabContents[activeTabIndex].appendChild(renderNewsItem(item));
      });
      updateNewsItems();
      renderDots(items.length);
    }
  };

  var onActivateTab = function () {
    clearNewsItems();
    renameButton();
    sendRequest();
  };

  var onErrorLoadData = function () {
    console.log('не удалось загрузить данные');
  };

  var onLoadData = function (evt) {
    if (evt.target.status >= 400) {
      onErrorLoadData(evt);
    } else if (evt.target.status >= 200) {
      renderItems(JSON.parse(evt.target.response));
    }
  };

  var activateTab = function (cb) {
    tabs[activeTabIndex].classList.add(activetabClass);
    tabContents[activeTabIndex].classList.add(activeContentClass);
    if (typeof cb === 'function') {
      cb();
    }
  };

  var deactivateTab = function () {
    [].forEach.call(tabs, function (item) {
      item.classList.remove(activetabClass);
    });
    [].forEach.call(tabContents, function (item) {
      item.classList.remove(activeContentClass);
    });
  };

  var onTabCLick = function (evt) {
    evt.preventDefault();
    var target = evt.target;

    while (target !== tabContainer) {
      if (target.classList.contains(tabClass)) {
        deactivateTab();
        activeTabIndex = [].indexOf.call(tabs, target);
        activateTab(onActivateTab);
        break;
      }
      target = target.parentNode;
    }
  };

  var onDotClick = function (evt) {
    var target = evt.target;

    while (target !== dotsContainer) {
      if (target.classList.contains('news__dot')) {
        activateNewsItem([].indexOf.call(dots, target));
        break;
      }
      target = target.parentNode;
    }
  };

  var onClickMoreNews = function (evt) {
    evt.preventDefault();
    sendRequest();
  };

  updateNewsItems();
  renderDots(newsItems.length);
  dotsContainer.addEventListener('click', onDotClick);
  btnMoreNews.addEventListener('click', onClickMoreNews);
  xhr.addEventListener('error', onErrorLoadData);
  xhr.addEventListener('timeout', onErrorLoadData);
  xhr.addEventListener('load', onLoadData);

  tabContainer.addEventListener('click', onTabCLick);

})();
