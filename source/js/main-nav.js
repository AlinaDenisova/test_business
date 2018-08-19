'use strict';

//управление меню навигации
window.navigation = (function () {
  var MOBILE_WIDTH_MAX = 779;

  var nav = document.querySelector('.main-nav');
  var navToggle = nav.querySelector('.main-nav__toggle');
  var siteList = nav.querySelector('.site-list--active');

  var updateSiteList = function () {
    siteList.removeEventListener('click', dropdownItemHandler);
    siteList = nav.querySelector('.site-list--active');
    siteList.addEventListener('click', dropdownItemHandler);
  };

  var navTabs = new Tabs({
    wrapperClass: 'main-nav__container',
    tabContainerClass: 'categories-list',
    tabClass: 'categories-list__link',
    activeTabClass: 'categories-list__link--active',
    contentClass: 'site-list',
    activeContentClass: 'site-list--active',
    cb: updateSiteList
  });

  navTabs.addListener();

  var isNavOpened = function () {
    return nav.classList.contains('main-nav--opened');
  };

  var isMobileScreen = function () {
    return window.innerWidth <= MOBILE_WIDTH_MAX;
  };

  var showNav = function () {
    window.overlay.show();
    nav.classList.remove('main-nav--closed');
    nav.classList.add('main-nav--opened');
    updateSiteList();
    window.addEventListener('resize', resizeWindowHandler);
  };

  var hideNav = function () {
    window.overlay.hide();
    nav.classList.remove('main-nav--opened');
    nav.classList.add('main-nav--closed');
    updateSiteList();
    window.removeEventListener('resize', resizeWindowHandler);
  };

  var onToggleClick = function () {
    if (isNavOpened()) {
      hideNav();
    } else {
      showNav();
    }
  };

  var resizeWindowHandler = function () {
    if (!isMobileScreen() && isNavOpened()) {
      hideNav();
    }
  };

  //раскрытие выбранного выпадающего списка и закрытие остальных списков
  var dropdownItem = function (item) {
    var openedItems = siteList.querySelectorAll('.site-list__link--dropdown');
    [].forEach.call(openedItems, function (openedItem) {
      openedItem !== item && openedItem.classList.remove('site-list__link--dropdown');
    });
    if (item.classList.contains('site-list__link--dropdown')) {
      item.classList.remove('site-list__link--dropdown');
    } else {
      item.classList.add('site-list__link--dropdown');
    }
  };

  //выбор выпадающего списка
  var dropdownItemHandler = function (evt) {
    var target = evt.target;

    if (isMobileScreen()) {
      while (target !== siteList) {
        if (target.classList.contains('site-list__link')) {
          evt.preventDefault();
          dropdownItem(target);
          break;
        }
        target = target.parentNode;
      }
    }
  };

  navToggle.addEventListener('click', onToggleClick);

  return {
    isOpened: isNavOpened,
    show: showNav,
    hide: hideNav
  };

})();
