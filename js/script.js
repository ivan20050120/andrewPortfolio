/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/libs/slider.js":
/*!*******************************!*\
  !*** ./src/js/libs/slider.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const slider = () => {
  //BildSlider
  let sliders = document.querySelectorAll('._swiper');

  if (sliders) {
    for (let index = 0; index < sliders.length; index++) {
      let slider = sliders[index];

      if (!slider.classList.contains('swiper-bild')) {
        let slider_items = slider.children;

        if (slider_items) {
          for (let index = 0; index < slider_items.length; index++) {
            let el = slider_items[index];
            el.classList.add('swiper-slide');
          }
        }

        let slider_content = slider.innerHTML;
        let slider_wrapper = document.createElement('div');
        slider_wrapper.classList.add('swiper-wrapper');
        slider_wrapper.innerHTML = slider_content;
        slider.innerHTML = '';
        slider.appendChild(slider_wrapper);
        slider.classList.add('swiper-bild');

        if (slider.classList.contains('_swiper_scroll')) {
          let sliderScroll = document.createElement('div');
          sliderScroll.classList.add('swiper-scrollbar');
          slider.appendChild(sliderScroll);
        }
      }

      if (slider.classList.contains('_gallery')) {//slider.data('lightGallery').destroy(true);
      }
    }

    sliders_bild_callback();
  }

  function sliders_bild_callback(params) {}

  let sliderScrollItems = document.querySelectorAll('._swiper_scroll');

  if (sliderScrollItems.length > 0) {
    for (let index = 0; index < sliderScrollItems.length; index++) {
      const sliderScrollItem = sliderScrollItems[index];
      const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
      const sliderScroll = new Swiper(sliderScrollItem, {
        observer: true,
        observeParents: true,
        direction: 'vertical',
        slidesPerView: 'auto',
        freeMode: true,
        scrollbar: {
          el: sliderScrollBar,
          draggable: true,
          snapOnRelease: false
        },
        mousewheel: {
          releaseOnEdges: true
        }
      });
      sliderScroll.scrollbar.updateSize();
    }
  }

  function sliders_bild_callback(params) {} // let slider_about = new Swiper('.about__slider', {
  //     /*
  //     effect: 'fade',
  //     autoplay: {
  //         delay: 3000,
  //         disableOnInteraction: false,
  //     },
  //     */
  //     observer: true,
  //     observeParents: true,
  //     slidesPerView: 1,
  //     spaceBetween: 0,
  //     autoHeight: true,
  //     speed: 800,
  //     //touchRatio: 0,
  //     //simulateTouch: false,
  //     //loop: true,
  //     //preloadImages: false,
  //     //lazy: true,
  //     // Dotts
  //     //pagination: {
  //     //	el: '.slider-quality__pagging',
  //     //	clickable: true,
  //     //},
  //     // Arrows
  //     navigation: {
  //         nextEl: '.about__more .more__item_next',
  //         prevEl: '.about__more .more__item_prev',
  //     },
  //     /*
  //     breakpoints: {
  //         320: {
  //             slidesPerView: 1,
  //             spaceBetween: 0,
  //             autoHeight: true,
  //         },
  //         768: {
  //             slidesPerView: 2,
  //             spaceBetween: 20,
  //         },
  //         992: {
  //             slidesPerView: 3,
  //             spaceBetween: 20,
  //         },
  //         1268: {
  //             slidesPerView: 4,
  //             spaceBetween: 30,
  //         },
  //     },
  //     */
  //     on: {
  //         lazyImageReady: function () {
  //             ibg();
  //         },
  //     }
  //     // And if we need scrollbar
  //     //scrollbar: {
  //     //	el: '.swiper-scrollbar',
  //     //},
  // });


  if (document.querySelector('.portfolio__wrapper')) {
    new Swiper('.portfolio__wrapper', {
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      spaceBetween: 20,
      speed: 800,
      loop: true,
      watchOverflow: true,
      // Arrows
      navigation: {
        nextEl: '.portfolio__next',
        prevEl: '.portfolio__prev'
      }
    });
  }
};

/* harmony default export */ __webpack_exports__["default"] = (slider);

/***/ }),

/***/ "./src/js/libs/spoller.js":
/*!********************************!*\
  !*** ./src/js/libs/spoller.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const spoller = () => {
  //=================

  /*
  Для родителя слойлеров пишем атрибут data-spollers
  Для заголовков слойлеров пишем атрибут data-spoller
  Если нужно включать\выключать работу спойлеров на разных размерах экранов
  пишем параметры ширины и типа брейкпоинта.
  Например: 
  data-spollers="992,max" - спойлеры будут работать только на экранах меньше или равно 992px
  data-spollers="768,min" - спойлеры будут работать только на экранах больше или равно 768px
  
  Если нужно что бы в блоке открывался болько один слойлер добавляем атрибут data-one-spoller
  */
  // SPOLLERS
  const spollersArray = document.querySelectorAll('[data-spollers]');

  if (spollersArray.length > 0) {
    // Получение обычных слойлеров
    const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
      return !item.dataset.spollers.split(",")[0];
    }); // Инициализация обычных слойлеров

    if (spollersRegular.length > 0) {
      initSpollers(spollersRegular);
    } // Получение слойлеров с медиа запросами


    const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
      return item.dataset.spollers.split(",")[0];
    }); // Инициализация слойлеров с медиа запросами

    if (spollersMedia.length > 0) {
      const breakpointsArray = [];
      spollersMedia.forEach(item => {
        const params = item.dataset.spollers;
        const breakpoint = {};
        const paramsArray = params.split(",");
        breakpoint.value = paramsArray[0];
        breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
        breakpoint.item = item;
        breakpointsArray.push(breakpoint);
      }); // Получаем уникальные брейкпоинты

      let mediaQueries = breakpointsArray.map(function (item) {
        return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
      });
      mediaQueries = mediaQueries.filter(function (item, index, self) {
        return self.indexOf(item) === index;
      }); // Работаем с каждым брейкпоинтом

      mediaQueries.forEach(breakpoint => {
        const paramsArray = breakpoint.split(",");
        const mediaBreakpoint = paramsArray[1];
        const mediaType = paramsArray[2];
        const matchMedia = window.matchMedia(paramsArray[0]); // Объекты с нужными условиями

        const spollersArray = breakpointsArray.filter(function (item) {
          if (item.value === mediaBreakpoint && item.type === mediaType) {
            return true;
          }
        }); // Событие

        matchMedia.addListener(function () {
          initSpollers(spollersArray, matchMedia);
        });
        initSpollers(spollersArray, matchMedia);
      });
    } // Инициализация


    function initSpollers(spollersArray) {
      let matchMedia = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      spollersArray.forEach(spollersBlock => {
        spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;

        if (matchMedia.matches || !matchMedia) {
          spollersBlock.classList.add('_init');
          initSpollerBody(spollersBlock);
          spollersBlock.addEventListener("click", setSpollerAction);
        } else {
          spollersBlock.classList.remove('_init');
          initSpollerBody(spollersBlock, false);
          spollersBlock.removeEventListener("click", setSpollerAction);
        }
      });
    } // Работа с контентом


    function initSpollerBody(spollersBlock) {
      let hideSpollerBody = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');

      if (spollerTitles.length > 0) {
        spollerTitles.forEach(spollerTitle => {
          if (hideSpollerBody) {
            spollerTitle.removeAttribute('tabindex');

            if (!spollerTitle.classList.contains('_active')) {
              spollerTitle.nextElementSibling.hidden = true;
            }
          } else {
            spollerTitle.setAttribute('tabindex', '-1');
            spollerTitle.nextElementSibling.hidden = false;
          }
        });
      }
    }

    function setSpollerAction(e) {
      const el = e.target;

      if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
        const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
        const spollersBlock = spollerTitle.closest('[data-spollers]');
        const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;

        if (!spollersBlock.querySelectorAll('._slide').length) {
          if (oneSpoller && !spollerTitle.classList.contains('_active')) {
            hideSpollersBody(spollersBlock);
          }

          spollerTitle.classList.toggle('_active');

          _slideToggle(spollerTitle.nextElementSibling, 500);
        }

        e.preventDefault();
      }
    }

    function hideSpollersBody(spollersBlock) {
      const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');

      if (spollerActiveTitle) {
        spollerActiveTitle.classList.remove('_active');

        _slideUp(spollerActiveTitle.nextElementSibling, 500);
      }
    }
  } //=================
  //SlideToggle


  let _slideUp = function (target) {
    let duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;

    if (!target.classList.contains('_slide')) {
      target.classList.add('_slide');
      target.style.transitionProperty = 'height, margin, padding';
      target.style.transitionDuration = duration + 'ms';
      target.style.height = target.offsetHeight + 'px';
      target.offsetHeight;
      target.style.overflow = 'hidden';
      target.style.height = 0;
      target.style.paddingTop = 0;
      target.style.paddingBottom = 0;
      target.style.marginTop = 0;
      target.style.marginBottom = 0;
      window.setTimeout(() => {
        target.hidden = true;
        target.style.removeProperty('height');
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        target.style.removeProperty('overflow');
        target.style.removeProperty('transition-duration');
        target.style.removeProperty('transition-property');
        target.classList.remove('_slide');
      }, duration);
    }
  };

  let _slideDown = function (target) {
    let duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;

    if (!target.classList.contains('_slide')) {
      target.classList.add('_slide');

      if (target.hidden) {
        target.hidden = false;
      }

      let height = target.offsetHeight;
      target.style.overflow = 'hidden';
      target.style.height = 0;
      target.style.paddingTop = 0;
      target.style.paddingBottom = 0;
      target.style.marginTop = 0;
      target.style.marginBottom = 0;
      target.offsetHeight;
      target.style.transitionProperty = "height, margin, padding";
      target.style.transitionDuration = duration + 'ms';
      target.style.height = height + 'px';
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      window.setTimeout(() => {
        target.style.removeProperty('height');
        target.style.removeProperty('overflow');
        target.style.removeProperty('transition-duration');
        target.style.removeProperty('transition-property');
        target.classList.remove('_slide');
      }, duration);
    }
  };

  let _slideToggle = function (target) {
    let duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;

    if (target.hidden) {
      return _slideDown(target, duration);
    } else {
      return _slideUp(target, duration);
    }
  };
};

/* harmony default export */ __webpack_exports__["default"] = (spoller);

/***/ }),

/***/ "./src/js/modules/addMore.js":
/*!***********************************!*\
  !*** ./src/js/modules/addMore.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const addMore = () => {
  const arrData = [{
    img: '01.png',
    text: 'Working with thise guys was an astonishing expirience for me. I was pleased with theyre work.',
    author: 'sarah robinson'
  }, {
    img: '03.png',
    text: 'Working with thise guys was an astonishing expirience for me. I was pleased with theyre work.',
    author: 'John Smit'
  }, {
    img: '02.png',
    text: 'At first I was not sure about this team but I decided to give them a chance. And they didn’t let me down. Good job, guys',
    author: 'Jeckson Storm'
  }];
  const wrapper = document.querySelector('.people-feedback__body'),
        btn = document.querySelector('.people-feedback__more');

  function appendItems(data) {
    data.forEach(feedBack => {
      const {
        img,
        text,
        author
      } = feedBack;
      const item = document.createElement('div');
      item.classList.add('people-feedback__item');
      item.innerHTML = `    
                <div class="people-feedback__content">
                <div class="people-feedback__image _ibg">
                    <img src="./img/feedback/${img}" alt="person">
                </div>
                <div class="people-feedback__text">${text}</div>
                </div>
                <div class="people-feedback__line"></div>
                <div class="people-feedback__author">${author}</div>
            `;
      wrapper.append(item);
    });
  }

  btn.addEventListener('click', () => appendItems(arrData));
};

/* harmony default export */ __webpack_exports__["default"] = (addMore);

/***/ }),

/***/ "./src/js/modules/burger.js":
/*!**********************************!*\
  !*** ./src/js/modules/burger.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const burger = () => {
  const btn = document.querySelector('.icon-menu'),
        closeBtn = document.querySelector('.menu__close'),
        links = document.querySelectorAll('.menu__link'),
        menu = document.querySelector('.menu__body'); // if(links.length > 0){
  //         links.forEach(item => {
  //             item.addEventListener('click',function(e){
  //                 btn.classList.remove('_active');
  //                 menu.classList.remove('_active');
  //                 document.body.classList.remove('_lock')
  //             })
  //         });
  // }

  function toggleMenu(trigger) {
    trigger.addEventListener('click', function (e) {
      btn.classList.toggle('_active');
      menu.classList.toggle('_active');
      document.body.classList.toggle('_lock');
    });
  }

  toggleMenu(btn);
  toggleMenu(closeBtn);
  links.forEach(link => {
    toggleMenu(link);
  });
};

/* harmony default export */ __webpack_exports__["default"] = (burger);

/***/ }),

/***/ "./src/js/modules/menuScroll.js":
/*!**************************************!*\
  !*** ./src/js/modules/menuScroll.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const menuScroll = () => {
  let links = document.querySelectorAll('.menu__link'),
      speed = 0.4;
  links.forEach((link, i) => {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      let heightTop = document.documentElement.scrollTop,
          //
      // hash = this.hash,//
      toBlock = document.querySelector(link.dataset.goto).getBoundingClientRect().top,
          //Top border to whhat we scroll
      start = null; //start pos

      requestAnimationFrame(step);

      function step(time) {
        if (start === null) {
          start = time;
        }

        let progress = time - start,
            r = toBlock < 0 ? Math.max(heightTop - progress / speed, heightTop + toBlock) : Math.min(heightTop + progress / speed, heightTop + toBlock);
        document.documentElement.scrollTo(0, r);

        if (r !== heightTop + toBlock) {
          requestAnimationFrame(step);
        }
      }
    });
  });
};

/* harmony default export */ __webpack_exports__["default"] = (menuScroll);

/***/ }),

/***/ "./src/js/modules/scrollDown.js":
/*!**************************************!*\
  !*** ./src/js/modules/scrollDown.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const scrollDown = () => {
  let links = document.querySelectorAll('.scrollArrow'),
      speed = 0.4;
  links.forEach((link, i) => {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      let heightTop = document.documentElement.scrollTop,
          //
      // hash = this.hash,//
      toBlock = document.querySelector('.portfolio').getBoundingClientRect().top,
          //Top border to whhat we scroll
      start = null; //start pos

      requestAnimationFrame(step);

      function step(time) {
        if (start === null) {
          start = time;
        }

        let progress = time - start,
            r = toBlock < 0 ? Math.max(heightTop - progress / speed, heightTop + toBlock) : Math.min(heightTop + progress / speed, heightTop + toBlock);
        document.documentElement.scrollTo(0, r);

        if (r !== heightTop + toBlock) {
          requestAnimationFrame(step);
        }
      }
    });
  });
};

/* harmony default export */ __webpack_exports__["default"] = (scrollDown);

/***/ }),

/***/ "./src/js/modules/tabs.js":
/*!********************************!*\
  !*** ./src/js/modules/tabs.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const tabs = () => {
  const tabs = document.querySelectorAll('.content-tabs__item'),
        btns = document.querySelectorAll('.btns-tabs__btn'),
        btnWrapper = document.querySelector('.btns-tabs'),
        texts = document.querySelectorAll('.content-tabs__text'); // function calc() {
  //     btns.forEach((item,i)=>{
  //         const posT = item.getBoundingClientRect().top;
  //         // texts[i].style.top = posT + 'px';
  //         texts[i].style.top = posT + 'px';
  //         console.log(posT);
  //     });
  // }

  function hideTabs() {
    tabs.forEach(tab => {
      tab.style.display = 'none';
      tab.classList.remove('fade');
    });
    btns.forEach(btn => {
      btn.classList.remove('_active');
    });
  }

  function showTab() {
    let i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    // calc();
    tabs[i].classList.add('fade');
    tabs[i].style.display = 'block';
    btns[i].classList.add('_active');
  }

  hideTabs();
  showTab();
  btnWrapper.addEventListener('click', function (e) {
    if (e.target.closest('.btns-tabs__btn')) {
      btns.forEach((btn, i) => {
        if (e.target == btn) {
          hideTabs();
          showTab(i);
        }
      });
    }
  });
};

/* harmony default export */ __webpack_exports__["default"] = (tabs);

/***/ }),

/***/ "./src/js/services/default.js":
/*!************************************!*\
  !*** ./src/js/services/default.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const def = () => {
  var ua = window.navigator.userAgent;
  var isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
    }
  };

  function isIE() {
    ua = navigator.userAgent;
    var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
    return is_ie;
  }

  if (isIE()) {
    document.querySelector('html').classList.add('ie');
  }

  if (isMobile.any()) {
    document.querySelector('html').classList.add('_touch');
  }

  function testWebP(callback) {
    var webP = new Image();

    webP.onload = webP.onerror = function () {
      callback(webP.height == 2);
    };

    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
  }

  testWebP(function (support) {
    if (support == true) {
      document.querySelector('body').classList.add('webp');
    } else {
      document.querySelector('body').classList.add('no-webp');
    }
  }); // function ibg(){
  //     let ibg = document.querySelectorAll("._ibf");
  //     for (var i = 0; i < ibg.length; i++) {
  //         if(ibg[i].querySelector('img')){
  //             ibg[i].style.backgroundImage = 'url('+ibg[i].querySelector('img').getAttribute('src')+')';
  //         }
  //     }
  //     console.log(1);
  // }
  // ibg();
};

/* harmony default export */ __webpack_exports__["default"] = (def);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _libs_spoller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./libs/spoller */ "./src/js/libs/spoller.js");
/* harmony import */ var _libs_slider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./libs/slider */ "./src/js/libs/slider.js");
/* harmony import */ var _services_default__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services/default */ "./src/js/services/default.js");
/* harmony import */ var _modules_burger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/burger */ "./src/js/modules/burger.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/tabs */ "./src/js/modules/tabs.js");
/* harmony import */ var _modules_scrollDown__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/scrollDown */ "./src/js/modules/scrollDown.js");
/* harmony import */ var _modules_menuScroll__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/menuScroll */ "./src/js/modules/menuScroll.js");
/* harmony import */ var _modules_addMore__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/addMore */ "./src/js/modules/addMore.js");
//////////// def


 ////////////
///////////Own




 // import filter from './modules/filter';

 ///////////
// import getResource from './services/request'

window.onload = function () {
  (0,_services_default__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_modules_burger__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_4__["default"])();
  (0,_libs_spoller__WEBPACK_IMPORTED_MODULE_0__["default"])();
  (0,_libs_slider__WEBPACK_IMPORTED_MODULE_1__["default"])();
  (0,_modules_scrollDown__WEBPACK_IMPORTED_MODULE_5__["default"])();
  (0,_modules_menuScroll__WEBPACK_IMPORTED_MODULE_6__["default"])();
  (0,_modules_addMore__WEBPACK_IMPORTED_MODULE_7__["default"])(); // filter();
};
}();
/******/ })()
;
//# sourceMappingURL=script.js.map