'use strict';

//переключение табов блока особенностей
(function () {
  var featuresTabs = new Tabs({
    wrapperClass: 'features__container',
    tabContainerClass: 'features__list',
    tabClass: 'features__item',
    activeTabClass: 'features__item--active',
    contentClass: 'features__content',
    activeContentClass: 'features__content--active'
  });

  featuresTabs.addListener();
})();
