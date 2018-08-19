'use strict';
/**
 * Модуль управляет модальными окнами профиля и обратной связи
 * @module module:modal
 * @requires module:overlay
 * @requires module:navigation
 */
(function () {

  var btnProfile = document.querySelector('.user-list__link--login');
  var btnFeedback = document.querySelector('.user-list__link--call');

  var modalProfile = document.querySelector('.modal--login');
  var modalFeedback = document.querySelector('.modal--feedback');

  var activeModal = null;

  var profileTabs = new Tabs({
    wrapperClass: 'modal--login',
    tabContainerClass: 'modal__nav',
    tabClass: 'modal__nav-item',
    activeTabClass: 'modal__nav-item--active',
    contentClass: 'modal-form',
    activeContentClass: 'modal-form--active'
  });

  var feedbackTabs = new Tabs({
    wrapperClass: 'modal--feedback',
    tabContainerClass: 'modal__nav',
    tabClass: 'modal__nav-item',
    activeTabClass: 'modal__nav-item--active',
    contentClass: 'modal-form',
    activeContentClass: 'modal-form--active'
  });

  profileTabs.addListener();
  feedbackTabs.addListener();


  var showModal = function (modal) {
    if (window.navigation.isOpened()) {
      window.navigation.hide();
    }
    window.overlay.show();
    modal.classList.add('modal--show');
    modal.querySelector('.modal__close').addEventListener('click', closeModal);
    document.addEventListener('keydown', onEscPress);
    activeModal = modal;
  };

  var closeModal = function () {
    activeModal.classList.remove('modal--show');
    window.overlay.hide();
    activeModal.querySelector('.modal__close').removeEventListener('click', closeModal);
    document.removeEventListener('keydown', onEscPress);
    activeModal = null;
  };


  var showProfile = function (evt) {
    evt.preventDefault();
    showModal(modalProfile);
  };

  var showFeedback = function (evt) {
    evt.preventDefault();
    showModal(modalFeedback);
  };

  var onEscPress = function (evt) {
    if (window.evtKeyPress.isEscPressed(evt)) {
      closeModal();
    }
  };


  btnProfile.addEventListener('click', showProfile);
  btnFeedback.addEventListener('click', showFeedback);
})();
