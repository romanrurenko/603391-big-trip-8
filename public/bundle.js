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

/***/ "./src/data.js":
/*!*********************!*\
  !*** ./src/data.js ***!
  \*********************/
/*! exports provided: filtersData, pointData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filtersData", function() { return filtersData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pointData", function() { return pointData; });
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
const pointData = {
  type: [{
    name: `Taxi`,
    icon: `🚕`,
    text: `Taxi to `
  }, {
    name: `Bus`,
    icon: `🚌`,
    text: `Bus to `
  }, {
    name: `Train`,
    icon: `🚂`,
    text: `Train to `
  }, {
    name: `Ship`,
    icon: `🛳️`,
    text: `Ship to `
  }, {
    name: `Transport`,
    icon: `🚊`,
    text: `Transport to `
  }, {
    name: `Drive`,
    icon: `🚗`,
    text: `Drive to `
  }, {
    name: `Flight`,
    icon: `✈`,
    text: `Flight to`
  }, {
    name: `Check-in`,
    icon: `🏨`,
    text: `Check into a `
  }, {
    name: `Sightseeing`,
    icon: `🏛️`,
    text: `Sightseeing `
  }, {
    name: `Restaurant`,
    icon: `🍴`,
    text: `Check into a`
  }],
  city: [`Amsterdam`, `Geneva`, `Chamonix`],
  offers: [`Add luggage`, `Switch to comfort class`, `Add meal`, `Choose seats`],
  description: [`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`, `Cras aliquet varius magna, non porta ligula feugiat eget.`, `Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.`, `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`, `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`, `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`, `Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.`, `Nunc fermentum tortor ac porta dapibus.`, `In rutrum ac purus sit amet tempus`]
};

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! exports provided: generatePoints */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generatePoints", function() { return generatePoints; });
/* harmony import */ var _src_make_filter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/make-filter */ "./src/make-filter.js");
/* harmony import */ var _src_make_points__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../src/make-points */ "./src/make-points.js");
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./data */ "./src/data.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ "./src/utils.js");





const pointsContainer = document.querySelector(`.trip-points`);
const filtersContainer = document.querySelector(`.trip-filter`);

const handler = () => {
  filtersContainer.removeEventListener(`click"`, handler);
  Object(_utils__WEBPACK_IMPORTED_MODULE_3__["clearElement"])(pointsContainer);
  renderPoints(Object(_utils__WEBPACK_IMPORTED_MODULE_3__["getRandom"])(1, 8));
};

const renderPoints = data => {
  pointsContainer.insertAdjacentHTML(`beforeend`, Object(_src_make_points__WEBPACK_IMPORTED_MODULE_1__["default"])(data));
};

const renderFilters = () => {
  for (const it of _data__WEBPACK_IMPORTED_MODULE_2__["filtersData"]) {
    filtersContainer.insertAdjacentHTML(`beforeend`, Object(_src_make_filter__WEBPACK_IMPORTED_MODULE_0__["default"])(it.caption, it.checked));
  }
};

const generatePoints = data => {
  const array = {
    type: data.type[Object(_utils__WEBPACK_IMPORTED_MODULE_3__["getRandom"])(0, 9)],
    city: data.city[Object(_utils__WEBPACK_IMPORTED_MODULE_3__["getRandom"])(0, 2)],
    photo: `http://picsum.photos/300/150?r=${Math.random()}`,
    description: data.description[Object(_utils__WEBPACK_IMPORTED_MODULE_3__["getRandom"])(0, 9)],
    offers: data.offers[Object(_utils__WEBPACK_IMPORTED_MODULE_3__["getRandom"])(0, 3)],
    date: Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,
    price: Object(_utils__WEBPACK_IMPORTED_MODULE_3__["getRandom"])(1, 10) * 100
  };
  return array;
}; // start script

Object(_utils__WEBPACK_IMPORTED_MODULE_3__["clearElement"])(filtersContainer); //clearElement(pointsContainer);

const points = generatePoints(_data__WEBPACK_IMPORTED_MODULE_2__["pointData"]);
renderFilters();
renderPoints(points);
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
const makeElements = data => {
  let acc = ``;
  const element = `<article class="trip-point">
          <i class="trip-icon">${data.type.icon}</i>
          <h3 class="trip-point__title">${data.type.text}${data.city}</h3>
          <p class="trip-point__schedule">
            <span class="trip-point__timetable">10:00&nbsp;&mdash; 11:00</span>
            <span class="trip-point__duration">1h 30m</span>
          </p>
          <p class="trip-point__price">&euro;&nbsp;${data.price}</p>
          <ul class="trip-point__offers">
             ${`<li>
              <button class="trip-point__offer">${data.offers}</button>
            </li>`}
          </ul>
        </article>`;
  acc = acc + element;
  return acc;
};

/* harmony default export */ __webpack_exports__["default"] = (data => `<section class="trip-day">
      <article class="trip-day__info">
        <span class="trip-day__caption">Day</span>
        <p class="trip-day__number">1</p>
        <h2 class="trip-day__title">Mar 18</h2>
      </article>
      <div class="trip-day__items">
    ${makeElements(data)}
      </div>
    </section>`);

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: getRandom, clearElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandom", function() { return getRandom; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearElement", function() { return clearElement; });
const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};
const clearElement = element => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map