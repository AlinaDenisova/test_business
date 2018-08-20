'use strict';

//создание экземпляра со свойствами из аргумента options
var Tabs = function (options) {
  this.wrapper = document.querySelector('.' + options.wrapperClass);
  this.tabContainerClass = options.tabContainerClass;
  this.tabClass = options.tabClass;
  this.activeTabClass = options.activeTabClass;
  this.contentClass = options.contentClass;
  this.activeContentClass = options.activeContentClass;

  this.tabs = this.wrapper.querySelectorAll('.' + this.tabClass);
  this.tabContents = this.wrapper.querySelectorAll('.' + this.contentClass);
  this.activeTabIndex = null;
  this.tabContainer = this.wrapper.querySelector('.' + this.tabContainerClass);

  this.cb = options.cb;
};

//активация таб и его выполнение
Tabs.prototype.activateTab = function (tabsObj) {
  tabsObj.tabs[tabsObj.activeTabIndex].classList.add(tabsObj.activeTabClass);
  tabsObj.tabContents[tabsObj.activeTabIndex].classList.add(tabsObj.activeContentClass);
  if (typeof tabsObj.cb === 'function') {
    tabsObj.cb();
  }
};

//деактивация табов
Tabs.prototype.deactivateTab = function (tabsObj) {
  [].forEach.call(tabsObj.tabs, function (item) {
    item.classList.remove(tabsObj.activeTabClass);
  });
  [].forEach.call(tabsObj.tabContents, function (item) {
    item.classList.remove(tabsObj.activeContentClass);
  });
};

//активация выбранного таба
Tabs.prototype.onTabCLick = function (evt) {
  evt.preventDefault();
  var target = evt.target;

  while (target !== this.tabContainer) {
    if (target.classList.contains(this.tabClass)) {
      Tabs.prototype.deactivateTab(this);
      this.activeTabIndex = [].indexOf.call(this.tabs, target);
      Tabs.prototype.activateTab(this);
      break;
    }
    target = target.parentNode;
  }
};

//добавление обработчик с привязаным this к контейнеру с табами
Tabs.prototype.addListener = function () {
  this.tabContainer.addEventListener('click', this.onTabCLick.bind(this));
};
