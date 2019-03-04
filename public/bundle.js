/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_make_filter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/make-filter */ "./src/make-filter.js");
/* harmony import */ var _src_make_points__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../src/make-points */ "./src/make-points.js");


const pointsContainer = document.querySelector(`.trip-points`);
const filtersContainer = document.querySelector(`.trip-filter`);
const filtersData = [{
  "caption": `Everything`,
  "checked": true
}, {
  "caption": `Future`,
  "checked": false
}, {
  "caption": `Past`,
  "checked": false
}];

const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const clearElement = element => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

const handler = () => {
  filtersContainer.removeEventListener(`click"`, handler);
  clearElement(pointsContainer);
  renderPoints(getRandom(1, 8));
};

const renderPoints = () => {
  pointsContainer.insertAdjacentHTML(`beforeend`, Object(_src_make_points__WEBPACK_IMPORTED_MODULE_1__["default"])());
};

const renderFilters = () => {
  for (const it of filtersData) {
    filtersContainer.insertAdjacentHTML(`beforeend`, Object(_src_make_filter__WEBPACK_IMPORTED_MODULE_0__["default"])(it.caption, it.checked));
  }
}; // start script


clearElement(filtersContainer);
clearElement(pointsContainer);
renderFilters();
renderPoints(1);
filtersContainer.addEventListener(`click`, handler);

/***/ }),

/***/ "./src/make-filter.js":
/*!****************************!*\
  !*** ./src/make-filter.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// make-filter.js
/* harmony default export */ __webpack_exports__["default"] = ((caption, isChecked = false) => `<input type="radio" id="filter-${caption.toLowerCase()}" name="filter" value="${caption.toLowerCase()}" 
   ${isChecked ? ` checked` : ``} >
   <label class="trip-filter__item" for="filter-${caption.toLowerCase()}">${caption}</label>`);

/***/ }),

/***/ "./src/make-points.js":
/*!****************************!*\
  !*** ./src/make-points.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// make-points.js
/* harmony default export */ __webpack_exports__["default"] = (() => `<section class="trip-day">
      <article class="trip-day__info">
        <span class="trip-day__caption">Day</span>
        <p class="trip-day__number">1</p>
        <h2 class="trip-day__title">Mar 18</h2>
      </article>

      <div class="trip-day__items">
        <article class="trip-point">
          <i class="trip-icon">🚕</i>
          <h3 class="trip-point__title">Taxi to Airport</h3>
          <p class="trip-point__schedule">
            <span class="trip-point__timetable">10:00&nbsp;&mdash; 11:00</span>
            <span class="trip-point__duration">1h 30m</span>
          </p>
          <p class="trip-point__price">&euro;&nbsp;20</p>
          <ul class="trip-point__offers">
            <li>
              <button class="trip-point__offer">Order UBER +&euro;&nbsp;20</button>
            </li>
            <li>
              <button class="trip-point__offer">Upgrade to business +&euro;&nbsp;20</button>
            </li>
          </ul>
        </article>
        <article class="trip-point">
          <i class="trip-icon">✈️</i>
          <h3 class="trip-point__title">Flight to Geneva</h3>
          <p class="trip-point__schedule">
            <span class="trip-point__timetable">10:00&nbsp;&mdash; 11:00</span>
            <span class="trip-point__duration">1h 30m</span>
          </p>
          <p class="trip-point__price">&euro;&nbsp;20</p>
          <ul class="trip-point__offers">
            <li>
              <button class="trip-point__offer">Upgrade to business +&euro;&nbsp;20</button>
            </li>
            <li>
              <button class="trip-point__offer">Select meal +&euro;&nbsp;20</button>
            </li>
          </ul>
        </article>
        <article class="trip-point">
          <i class="trip-icon">🚗</i>
          <h3 class="trip-point__title">Drive to Chamonix</h3>
          <p class="trip-point__schedule">
            <span class="trip-point__timetable">10:00&nbsp;&mdash; 11:00</span>
            <span class="trip-point__duration">1h 30m</span>
          </p>
          <p class="trip-point__price">&euro;&nbsp;20</p>
          <ul class="trip-point__offers">
            <li>
                <button class="trip-point__offer">Rent a car +&euro;&nbsp;200</button>
              </li>
          </ul>
        </article>
        <article class="trip-point">
          <i class="trip-icon">🏨</i>
          <h3 class="trip-point__title">Check into a hotel</h3>
          <p class="trip-point__schedule">
            <span class="trip-point__timetable">10:00&nbsp;&mdash; 11:00</span>
            <span class="trip-point__duration">1h 30m</span>
          </p>
          <p class="trip-point__price">&euro;&nbsp;20</p>
          <ul class="trip-point__offers">
            <li>
              <button class="trip-point__offer">Add breakfast +&euro;&nbsp;20</button>
            </li>
          </ul>
        </article>
      </div>
    </section>`);

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map