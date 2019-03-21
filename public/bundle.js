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

/***/ "./src/classes/component.js":
/*!**********************************!*\
  !*** ./src/classes/component.js ***!
  \**********************************/
/*! exports provided: Component */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return Component; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/utils.js");

class Component {
  constructor() {
    if (new.target === Component) {
      throw new Error(`Can't instantiate BaseComponent, only concrete one.`);
    }

    this._element = null;
    this._state = {};
  }

  get element() {
    return this._element;
  }

  get template() {
    throw new Error(`You have to define template.`);
  }

  render() {
    this._element = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["createElement"])(this.template);
    this.bind();
    return this._element;
  }

  bind() {}

  unbind() {}

  unrender() {
    this.unbind();

    this._element.remove();

    this._element = null;
  }

}

/***/ }),

/***/ "./src/classes/event-edit.js":
/*!***********************************!*\
  !*** ./src/classes/event-edit.js ***!
  \***********************************/
/*! exports provided: EventEdit */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventEdit", function() { return EventEdit; });
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./component */ "./src/classes/component.js");

class EventEdit extends _component__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(data) {
    super();
    this._type = data.type;
    this._city = data.city;
    this._photo = data.photo;
    this._description = data.description;
    this._date = data.date;
    this._price = data.price;
    this._offers = data.offers;
    this._element = null;
    this._onSubmit = null;
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();
    typeof this._onSubmit === `function` && this._onSubmit();
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  get template() {
    return `<article class="point">
  <form action="" method="get">
    <header class="point__header">
      <label class="point__date">
        choose day
        <input class="point__input" type="text" placeholder="MAR 18" name="day">
      </label>

      <div class="travel-way">
        <label class="travel-way__label" for="travel-way__toggle">${this._type.icon}</label>

        <input type="checkbox" class="travel-way__toggle visually-hidden" id="travel-way__toggle">

        <div class="travel-way__select">
          <div class="travel-way__select-group">
            <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-taxi" name="travel-way" value="taxi">
            <label class="travel-way__select-label" for="travel-way-taxi">🚕 taxi</label>

            <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-bus" name="travel-way" value="bus">
            <label class="travel-way__select-label" for="travel-way-bus">🚌 bus</label>

            <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-train" name="travel-way" value="train">
            <label class="travel-way__select-label" for="travel-way-train">🚂 train</label>

            <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-flight" name="travel-way" value="train" checked>
            <label class="travel-way__select-label" for="travel-way-flight">✈️ flight</label>
          </div>

          <div class="travel-way__select-group">
            <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-check-in" name="travel-way" value="check-in">
            <label class="travel-way__select-label" for="travel-way-check-in">🏨 check-in</label>

            <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-sightseeing" name="travel-way" value="sight-seeing">
            <label class="travel-way__select-label" for="travel-way-sightseeing">🏛 sightseeing</label>
          </div>
        </div>
      </div>

      <div class="point__destination-wrap">
        <label class="point__destination-label" for="destination">${this._type.text}</label>
        <input class="point__destination-input" list="destination-select" id="destination" value="${this._city}" name="destination">
        <datalist id="destination-select">
          <option value="airport"></option>
          <option value="Geneva"></option>
          <option value="Chamonix"></option>
          <option value="hotel"></option>
        </datalist>
      </div>

      <label class="point__time">
        choose time
        <input class="point__input" type="text" value="00:00 — 00:00" name="time" placeholder="00:00 — 00:00">
      </label>

      <label class="point__price">
        write price
        <span class="point__price-currency">€</span>
        <input class="point__input" type="text" value="160" name="price">
      </label>

      <div class="point__buttons">
        <button class="point__button point__button--save" type="submit">Save</button>
        <button class="point__button" type="reset">Delete</button>
      </div>

      <div class="paint__favorite-wrap">
        <input type="checkbox" class="point__favorite-input visually-hidden" id="favorite" name="favorite">
        <label class="point__favorite" for="favorite">favorite</label>
      </div>
    </header>

    <section class="point__details">
      <section class="point__offers">
        <h3 class="point__details-title">offers</h3>

        <div class="point__offers-wrap">
          <input class="point__offers-input visually-hidden" type="checkbox" id="add-luggage" name="offer" value="add-luggage">
          <label for="add-luggage" class="point__offers-label">
            <span class="point__offer-service">Add luggage</span> + €<span class="point__offer-price">30</span>
          </label>

          <input class="point__offers-input visually-hidden" type="checkbox" id="switch-to-comfort-class" name="offer" value="switch-to-comfort-class">
          <label for="switch-to-comfort-class" class="point__offers-label">
            <span class="point__offer-service">Switch to comfort class</span> + €<span class="point__offer-price">100</span>
          </label>

          <input class="point__offers-input visually-hidden" type="checkbox" id="add-meal" name="offer" value="add-meal">
          <label for="add-meal" class="point__offers-label">
            <span class="point__offer-service">Add meal </span> + €<span class="point__offer-price">15</span>
          </label>

          <input class="point__offers-input visually-hidden" type="checkbox" id="choose-seats" name="offer" value="choose-seats">
          <label for="choose-seats" class="point__offers-label">
            <span class="point__offer-service">Choose seats</span> + €<span class="point__offer-price">5</span>
          </label>
        </div>

      </section>
      <section class="point__destination">
        <h3 class="point__details-title">Destination</h3>
        <p class="point__destination-text">Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.</p>
        <div class="point__destination-images">
          <img src="http://picsum.photos/330/140?r=123" alt="picture from place" class="point__destination-image">
          <img src="http://picsum.photos/300/200?r=1234" alt="picture from place" class="point__destination-image">
          <img src="http://picsum.photos/300/100?r=12345" alt="picture from place" class="point__destination-image">
          <img src="http://picsum.photos/200/300?r=123456" alt="picture from place" class="point__destination-image">
          <img src="http://picsum.photos/100/300?r=1234567" alt="picture from place" class="point__destination-image">
        </div>
      </section>
      <input type="hidden" class="point__total-price" name="total-price" value="">
    </section>
  </form>
</article>
`.trim();
  }

  bind() {
    this._element.querySelector(`.point__button--save`).addEventListener(`submit`, this._onSubmitButtonClick.bind(this));
  }

  unbind() {
    this._element.querySelector(`.point__button--save`).removeEventListener(`submit`, this._onSubmitButtonClick.bind(this));
  }

}

/***/ }),

/***/ "./src/classes/event.js":
/*!******************************!*\
  !*** ./src/classes/event.js ***!
  \******************************/
/*! exports provided: Event */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Event", function() { return Event; });
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./component */ "./src/classes/component.js");

class Event extends _component__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(data) {
    super();
    this._type = data.type;
    this._city = data.city;
    this._photo = data.photo;
    this._description = data.description;
    this._date = data.date;
    this._price = data.price;
    this._offers = data.offers;
    this._element = null;
    this._state = {
      isEdit: false
    };
  }

  _onEditButtonClick() {
    typeof this._onEdit === `function` && this._onEdit();
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  get template() {
    return `<article class="trip-point">
          <i class="trip-icon">${this._type.icon}</i>
          <h3 class="trip-point__title">${this._type.text}${this._city}</h3>
          <p class="trip-point__schedule">
            <span class="trip-point__timetable">10:00&nbsp;&mdash; 11:00</span>
            <span class="trip-point__duration">1h 30m</span>
          </p>
          <p class="trip-point__price">&euro;&nbsp;${this._price}</p>
          <ul class="trip-point__offers">
                       
      ${Array.from(this._offers).map(tag => `<li>
              <button class="trip-point__offer">${tag}</button>
            </li>`.trim()).join(``)}
      
          </ul>
        </article>`.trim();
  }

  bind() {
    this._element.querySelector(`.trip-icon`).addEventListener(`click`, this._onEditButtonClick.bind(this));
  }

  unbind() {// Удаление обработчиков
  }

}

/***/ }),

/***/ "./src/classes/filter.js":
/*!*******************************!*\
  !*** ./src/classes/filter.js ***!
  \*******************************/
/*! exports provided: Filter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Filter", function() { return Filter; });
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./component */ "./src/classes/component.js");

class Filter extends _component__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(data) {
    super();
    this._caption = data.caption;
    this._checked = data.checked;
  }

  _onEditButtonClick() {
    typeof this._onEdit === `function` && this._onEdit();
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  get template() {
    return `<span><input type="radio" id="filter-${this._caption.toLowerCase()}"
            name="filter-${this._caption.toLowerCase()}" value="${this._caption.toLowerCase()}"
            ${this._checked ? ` checked` : ``}><label class="trip-filter__item filter-${this._caption.toLowerCase()}"
            for="filter-${this._caption.toLowerCase()}">${this._caption}</label></span>`.trim();
  }

  bind() {
    this._element.querySelector(`.filter-${this._caption.toLowerCase()}`).addEventListener(`click`, this._onEditButtonClick.bind(this));
  }

  unbind() {
    this._element.querySelector(`.filter-${this._caption.toLowerCase()}`).addEventListener(`click`, this._onEditButtonClick.bind(this));
  }

}

/***/ }),

/***/ "./src/data.js":
/*!*********************!*\
  !*** ./src/data.js ***!
  \*********************/
/*! exports provided: filtersData, generatePoint, pointData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filtersData", function() { return filtersData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generatePoint", function() { return generatePoint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pointData", function() { return pointData; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils.js");

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
const generatePoint = data => {
  const array = {
    type: data.type[Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getRandom"])(0, 9)],
    city: data.city[Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getRandom"])(0, 2)],
    photo: `http://picsum.photos/300/150?r=${Math.random()}`,
    description: data.description[Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getRandom"])(0, 9)],
    offers: [data.offers[Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getRandom"])(0, 3)], data.offers[Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getRandom"])(0, 3)]],
    date: Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,
    price: Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getRandom"])(1, 10) * 100
  };
  return array;
};
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
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils.js");
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data */ "./src/data.js");
/* harmony import */ var _classes_event__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./classes/event */ "./src/classes/event.js");
/* harmony import */ var _classes_event_edit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./classes/event-edit */ "./src/classes/event-edit.js");
/* harmony import */ var _classes_filter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./classes/filter */ "./src/classes/filter.js");





const eventsContainer = document.querySelector(`.trip-day__items`);
const filtersContainer = document.querySelector(`.trip-filter`);
Object(_utils__WEBPACK_IMPORTED_MODULE_0__["clearElement"])(filtersContainer);
Object(_utils__WEBPACK_IMPORTED_MODULE_0__["clearElement"])(eventsContainer);
const eventComponents = [];
const editEventComponents = [];
const filtersComponents = [];

for (let i = 0; i < 3; i++) {
  filtersComponents[i] = new _classes_filter__WEBPACK_IMPORTED_MODULE_4__["Filter"](_data__WEBPACK_IMPORTED_MODULE_1__["filtersData"][i]);
  filtersContainer.appendChild(filtersComponents[i].render());
}

for (let i = 0; i < 4; i++) {
  const point = Object(_data__WEBPACK_IMPORTED_MODULE_1__["generatePoint"])(_data__WEBPACK_IMPORTED_MODULE_1__["pointData"]);
  eventComponents[i] = new _classes_event__WEBPACK_IMPORTED_MODULE_2__["Event"](point);
  editEventComponents[i] = new _classes_event_edit__WEBPACK_IMPORTED_MODULE_3__["EventEdit"](point);
  eventsContainer.appendChild(eventComponents[i].render());

  eventComponents[i].onEdit = () => {
    editEventComponents[i].render();
    eventsContainer.replaceChild(editEventComponents[i].element, eventComponents[i].element);
    eventComponents[i].unrender();
  };

  editEventComponents[i].onSubmit = () => {
    eventComponents[i].render();
    eventsContainer.replaceChild(eventComponents[i].element, editEventComponents[i].element);
    editEventComponents[i].unrender();
  };
}

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: getRandom, clearElement, createElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandom", function() { return getRandom; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearElement", function() { return clearElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return createElement; });
const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};
const clearElement = element => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};
const createElement = template => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map