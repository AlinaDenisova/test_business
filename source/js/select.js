'use strict';

//управление выпадающими списками в форме
(function () {

  var selectType = document.querySelector('.select--type');
  var selectSubject = document.querySelector('.select--subject');

  var activeSelect = null;
  var selectedValue = null;
  var activeDropBlock = null;
  var inputValue = null;

  var showDropBlock = function () {
    activeSelect.classList.add('select--dropdown');
    activeDropBlock.style.display = 'block';
    activeDropBlock.addEventListener('click', onOptionClick);
    selectedValue.classList.remove('select__value--active');
  };

  var hideDropBlock = function () {
    activeSelect.classList.remove('select--dropdown');
    activeDropBlock.style.display = 'none';
    activeDropBlock.removeEventListener('click', onOptionClick);
    if (inputValue.value) {
      selectedValue.classList.add('select__value--active');
    }
  };

  var onOptionClick = function (evt) {
    var target = evt.target;

    while (target !== activeDropBlock) {
      if (target.classList.contains('select__option')) {
        selectedValue.textContent = target.textContent;
        inputValue.value = target.getAttribute('data-value');
        break;
      }
      target = target.parentNode;
    }
  };

  var onSelectClick = function (evt) {
    var target = evt.target;

    while (!target.classList.contains('select')) {
      target = target.parentNode;
    }

    if (activeSelect && activeSelect !== target) {
      hideDropBlock();
    }

    activeSelect = target;
    selectedValue = activeSelect.querySelector('.select__value');
    activeDropBlock = activeSelect.querySelector('.select__dropdown');
    inputValue = activeSelect.querySelector('input[type="hidden"]');

    if (activeSelect.classList.contains('select--dropdown')) {
      hideDropBlock();
    } else {
      showDropBlock();
    }
  };

  selectType.addEventListener('click', onSelectClick);
  selectSubject.addEventListener('click', onSelectClick);
})();
