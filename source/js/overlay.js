'use strict';
/**
 * Модуль управляет слоем наложения
 * @module module:overlay
 */
window.overlay = (function () {
  var overlay = document.querySelector('.overlay');

  var showOverlay = function () {
    overlay.classList.add('overlay--show');
  };

  var hideOverlay = function () {
    overlay.classList.remove('overlay--show');
  };

  return {
    show: showOverlay,
    hide: hideOverlay
  };
})();
