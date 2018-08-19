'use strict';

//управление слайдером
(function () {
  var slider = document.querySelector('.slider');
  var slides = slider.querySelectorAll('.slider__slide');
  var activeSlideIndex = [].indexOf.call(slides, slider.querySelector('.slider__slide--active'));

  var dots = null;
  var dotsContainer = slider.querySelector('.slider__dots');

  var btnPrev = slider.querySelector('.slider__btn--prev');
  var btnNext = slider.querySelector('.slider__btn--next');

  var PREV = 'prev';
  var NEXT = 'next';


  var renderDots = function () {
    var dot = null;

    for (var i = 0; i < slides.length; i++) {
      dot = document.createElement('li');
      dot.classList.add('slider__dot');
      dotsContainer.appendChild(dot);
    }

    dots = dotsContainer.querySelectorAll('.slider__dot');
    dots[activeSlideIndex].classList.add('slider__dot--active');
  };

  var activateSlide = function () {
    slides[activeSlideIndex].classList.add('slider__slide--active');
    dots[activeSlideIndex].classList.add('slider__dot--active');
  };

  var deactivateSlide = function () {
    slides[activeSlideIndex].classList.remove('slider__slide--active');
    dots[activeSlideIndex].classList.remove('slider__dot--active');
  };

  var nextSlide = function (direction) {
    deactivateSlide();
    switch (direction) {
      case PREV:
        if (--activeSlideIndex < 0) {
          activeSlideIndex = slides.length - 1;
        }
        break;
      case NEXT:
        if (++activeSlideIndex > slides.length - 1) {
          activeSlideIndex = 0;
        }
        break;
    }
    activateSlide();
  };

  var onDotCLick = function (evt) {
    var target = evt.target;

    while (target !== dotsContainer) {
      if (target.classList.contains('slider__dot')) {
        deactivateSlide();
        activeSlideIndex = [].indexOf.call(dots, target);
        activateSlide();
        break;
      }
      target = target.parentNode;
    }

  };
  var onClickPrev = function () {
    nextSlide(PREV);
  };

  var onClickNext = function () {
    nextSlide(NEXT);
  };

  renderDots();
  dotsContainer.addEventListener('click', onDotCLick);
  btnPrev.addEventListener('click', onClickPrev);
  btnNext.addEventListener('click', onClickNext);
})();
