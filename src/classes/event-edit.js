import {Component} from "./component";
import flatpickr from "flatpickr";
import {cities, offersData, offersTypes, travelToData, travelType} from "../data";
import {getTotalPrice} from "../utils";


export class EventEdit extends Component {
  constructor(data) {
    super();
    this._type = data.type;
    this._day = data.day;
    this._city = data.city;
    this._photo = data.photo;
    this._description = data.description;
    this._date = data.date;
    this._price = data.price;
    this._offers = data.offers;
    this._element = null;
    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);
    this._onTravelClick = this._onTravelClick.bind(this);
    this._onSubmit = null;
    this._state.isFavorite = false;
    this._totalPrice = getTotalPrice(data.offers, data.price);
    this._deleted = data.deleted;


    this._onChangeFavorite = this._onChangeFavorite.bind(this);
    this._onDelete = null;
  }

  _processForm(formData) {
    const entry = {
      day: new Date(),
      type: ``,
      city: ``,
      date: ``,
      price: 0,
      offers: new Set(),
      isFavorite: ``,
      totalPrice: 0,
    };

    const eventEditMapper = EventEdit.createMapper(entry);

    for (const pair of formData.entries()) {
      const [property, value] = pair;
      eventEditMapper[property] && eventEditMapper[property](value);
    }
    return entry;
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();
    const formData = new FormData(this._element.querySelector(`.event__form`));
    const newData = this._processForm(formData);
    typeof this._onSubmit === `function` && this._onSubmit(newData);
    this.update(newData);
  }

  _onTravelClick(evt) {
    const newTravelType = evt.target.value;
    if (newTravelType && travelType.indexOf(newTravelType)) {
      const travelIconContainer = this._element.querySelector(`form > header > div.travel-way > label`);
      const travelTypeContainer = this._element.querySelector(`.point__destination-label`);
      this._type = newTravelType;
      travelIconContainer.innerHTML = travelToData[newTravelType].icon;
      travelTypeContainer.innerHTML = travelToData[newTravelType].text;
    }
    const menu = this._element.querySelector(`input.travel-way__toggle`);
    menu.checked = false;
  }

  _onChangeFavorite() {
    this._state.isFavorite = !this._state.isFavorite;
  }

  _partialUpdate() {
    this._element.innerHTML = this.template;
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  set onDelete(fn) {
    this._onDelete = fn;
  }

  get template() {
    return `<article class="point">
  <form class="event__form" method="get">
    <header class="point__header">
      <label class="point__date">
        choose day
        <input class="point__input" type="text" placeholder="MAR 18" name="day" value="${this._day}">
      </label>

      <div class="travel-way">
        <label class="travel-way__label" for="travel-way__toggle">${travelToData[this._type].icon}</label>

        <input type="checkbox" class="travel-way__toggle visually-hidden" id="travel-way__toggle">

        <div class="travel-way__select">
          <div class="travel-way__select-group">
          
                  ${(Array.from(travelType).map((it) => (`
            <input class="travel-way__select-input visually-hidden" type="radio"
             id="travel-way-${it}" name="travel-way" value="${it}"  ${(this._type === it) ? `checked` : ``}>
            <label class="travel-way__select-label" for="travel-way-${it}">
            ${travelToData[it].icon} ${it}</label>`.trim()))).join(``)}
          
                   
          </div>
        </div>
      </div>

      <div class="point__destination-wrap">
        <label class="point__destination-label" for="destination">${travelToData[this._type].text}</label>
        <input class="point__destination-input" list="destination-select" id="destination" value="${this._city}" name="destination">
        <datalist id="destination-select">
        

 
         ${(Array.from(cities).map((it) => (`<option value="${it}"></option>`.trim()))).join(``)}
          
          
        </datalist>
      </div>
      
      
      <label class="point__time">
        choose time
        <input class="point__input " type="text" value="${this._date}" name="time" placeholder="00:00 — 00:00">
      </label>

      <label class="point__price">
        write price
        <span class="point__price-currency">€</span>
        <input class="point__input" type="text" value="${this._price}" name="price">
      </label>

      <div class="point__buttons">
        <button class="point__button point__button--save" type="submit">Save</button>
        <button class="point__button delete" type="reset">Delete</button>
      </div>

      <div class="paint__favorite-wrap">
        <input type="checkbox" class="point__favorite-input visually-hidden" id="favorite" name="favorite" ${this._state.isFavorite ? `checked` : ``}>
        <label class="point__favorite" for="favorite">favorite</label>
      </div>
    </header>

    <section class="point__details">
      <section class="point__offers">
        <h3 class="point__details-title">offers</h3>

        <div class="point__offers-wrap">
        
        
        ${Array.from(offersTypes).map((offer) => (`
          <input class="point__offers-input visually-hidden" type="checkbox" id="${offer}" 
          name="offer" value="${offer}" ${(this._offers.has(offer)) ? `checked` : ``}>
          <label for="${offer}" class="point__offers-label">
            <span class="point__offer-service">${offersData[offer].name}</span> +€<span class="point__offer-price">${offersData[offer].cost}</span>
          </label>`.trim()
  )).join(``)}
        </div>

      </section>
      <section class="point__destination">
        <h3 class="point__details-title">Destination</h3>
        <p class="point__destination-text">${this._description}</p>
        <div class="point__destination-images">


        ${(Array.from(this._photo).map((it) => (`
          <img src="${it}" alt="picture from place" class="point__destination-image">
  `.trim()
  ))).join(``)}

        </div>
      </section>
      <input type="" class="point__total-price" name="total-price" value="${this._totalPrice}">
    </section>
  </form>
</article>
`.trim();

  }

  bind() {
    this._element.querySelector(`.travel-way__select`)
      .addEventListener(`change`, this._onTravelClick);
    this._element.querySelector(`.event__form`)
      .addEventListener(`submit`, this._onSubmitButtonClick);
    this._element.querySelector(`.point__buttons .delete`)
      .addEventListener(`click`, this._onDelete);
    this._element.querySelector(`.point__favorite`)
     .addEventListener(`click`, this._onChangeFavorite);

    flatpickr(`.point__time .point__date`, {mode: `range`, rangeSeparator: ` - `, altInput: true, altFormat: `j F`, dateFormat: `j F`});
  }

  unbind() {
    this._element.querySelector(`.travel-way__select`)
      .removeEventListener(`click`, this._onTravelClick);
    this._element.querySelector(`.event__form`)
      .removeEventListener(`submit`, this._onSubmitButtonClick);
    this._element.querySelector(`.point__buttons .delete`)
        .removeEventListener(`click`, this._onDelete);
    this._element.querySelector(`.point__favorite`)
        .removeEventListener(`click`, this._onChangeFavorite);
  }

  update(data) {
    this._type = data.type;
    this._day = data.day;
    this._city = data.city;
    this._date = data.date;
    this._price = data.price;
    this._totalPrice = getTotalPrice(data.offers, data.price);
    this._offers = data.offers;
    this._state.isFavorite = data.isFavorite;
  }

  static createMapper(target) {
    return {
      "price": (value) => target.price = value,
      "destination": (value) => target.city = value,
      "time": (value) => target.date = value,
      "day": (value) => target.day = value,
      "favorite": (value) => target.isFavorite = (value === `on`) ? true : false,
      "offer": (value) => target.offers.add(value),
      "travel-way": (value) => target.type = value,
      "total-price": (value) => target.totalPrice = value,
    };
  }
}
