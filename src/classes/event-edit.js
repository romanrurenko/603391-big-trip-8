import {Component} from "./component";
import {destinationsData} from "../main";
import {travelToData, travelType} from "../data/mock-data";
import {getElementPrice} from "../utils";
import moment from 'moment';
import flatpickr from 'flatpickr';
import {offersData} from "../main";

export class EventEdit extends Component {
  constructor(data) {
    super();
    this._id = data.id;
    this._type = data.type;
    this._city = data.city;
    this._photos = data.photos;
    this._description = data.description;
    this._dateFrom = data.dateFrom;
    this._dateTo = data.dateTo;
    this._price = data.price;
    this._offers = data.offers;
    this._element = null;
    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);
    this._onDeleteClick = this._onDeleteClick.bind(this);
    this._onTravelClick = this._onTravelClick.bind(this);
    this._onEscPress = this._onEscPress.bind(this);
    this._onChangeDestination = this._onChangeDestination.bind(this);
    this._onChangeFavorite = this._onChangeFavorite.bind(this);
    this._onExit = null;
    this._onSubmit = null;
    this._isFavorite = false;
    this._totalPrice = getElementPrice(data.offers, data.price);
    this._deleted = data.deleted;
    this._onDelete = null;
  }

  _processForm(formData) {
    const entry = {
      day: new Date(),
      type: ``,
      city: ``,
      dateFrom: new Date(),
      dateTo: new Date(),
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
    for (let value of this._offers) {
      if (newData.offers.has(value.title)) {
        value.accepted = true;
      } else {
        value.accepted = false;
      }
    }
    newData.offers = new Set([...this._offers]);
    newData.dateFrom = this._dateFrom;
    newData.dateTo = this._dateTo;
    typeof this._onSubmit === `function` && this._onSubmit(newData);
    this.update(newData);
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  _onDeleteClick() {
    typeof this._onDelete() === `function` && this._onDelete(this._id);
  }

  _changeOffers(newOffer) {
    for (let it of offersData) {
      if (it.type === newOffer) {
        this._offers = it.offers;
      }
    }
    this._renderOffers();
  }

  _onChangeDestination(evt) {
    let newTarget = evt.target.value;
    let data = null;
    this._city = newTarget;
    for (const it of destinationsData) {
      if (it.name === newTarget) {
        data = it;
        console.log(it);
      }
    }
    if (data === null) {
      data = {pictures: [], description: ``, name: ``};
      this._description = ``;
      this._photos = [];
    }

    const offersContainer = this._element.querySelector(`.point .point__destination`);
    offersContainer.innerHTML = `${this._getDestinationTemplate(data)}`;


  }

  _getDestinationTemplate(data) {
    return `
        <h3 class="point__details-title">Destination</h3>
        <p class="point__destination-text">${data.description}</p>
        <div class="point__destination-images">
        ${(Array.from(data.pictures).map((it) => (`
          <img src="${it.src}" alt="${it.description}" class="point__destination-image">
         `.trim()
    ))).join(``)}
        </div>`;
  }

  _onTravelClick(evt) {
    let newTravelType = evt.target.value;
    if ((newTravelType) && travelType.indexOf(newTravelType) > -1) {
      if (this._type !== newTravelType) {
        this._type = newTravelType;
        this._changeOffers(newTravelType);
      }
      this.unbind();
      this.redraw();
    }
  }

  _onEscPress(evt) {

    if (evt.key === `Escape` || evt.code === `Escape`) {
      typeof this._onExit === `function` && this._onExit();
    }
  }

  set onExit(fn) {
    this._onExit = fn;
  }

  _onChangeFavorite() {
    this._isFavorite = !this._isFavorite;
  }

  _renderOffers() {
    const offersContainer = this._element.querySelector(`.point .point__offers-wrap`);
    offersContainer.innerHTML = `${this._getOffers()}`;
  }

  _getOffers() {
    return `${[...this._offers].map((offer) => (`
          <input class="point__offers-input visually-hidden" type="checkbox" id="${offer.title}" 
        name="offer" value="${offer.title}" ${(offer.accepted) ? `checked` : ``}>
          <label for="${offer.title}" class="point__offers-label">
          <span class="point__offer-service">${offer.title}</span> +€<span class="point__offer-price">${offer.price}</span>
        </label>`.trim()
    )).join(``)}`;
  }

  set onDelete(fn) {
    this._onDelete = fn;
  }

  get template() {
    return `
      <article class="point">
        <form class="event__form" method="get">
          <header class="point__header">
          <label class="point__date">
              choose day
              <input class="point__input" type="text" placeholder="MAR 18" name="day" value="">
            </label>
            <div class="travel-way">
              <label class="travel-way__label" for="travel-way__toggle-${this._id}">${travelToData[this._type].icon}</label>

                <input type="checkbox" class="travel-way__toggle visually-hidden" id="travel-way__toggle-${this._id}"> 

              <div class="travel-way__select">
                <div class="travel-way__select-group">

                        ${(Array.from(travelType).map((it) => (`
                  <input class="travel-way__select-input visually-hidden" type="radio"
                   id="travel-way-${it}-${this._id}" name="travel-way" value="${it}"  ${(this._type === it) ? `checked` : ``}>
                  <label class="travel-way__select-label" for="travel-way-${it}-${this._id}">
                  ${travelToData[it].icon} ${it}</label>`.trim()))).join(``)}


                </div>
              </div>
            </div>

            <div class="point__destination-wrap">
              <label class="point__destination-label" for="destination">${travelToData[this._type].text}</label>
              <input class="point__destination-input" list="destination-select" id="destination" value="${this._city}" name="destination">
              <datalist id="destination-select">



               ${(destinationsData.map((it) => (`<option value="${it.name}"></option>`.trim()))).join(``)}


              </datalist>
            </div>


            <div class="point__time">
              choose time
              <input class="point__input" id="date-start" type="text" value="${moment(this._dateFrom)}" name="date-start" placeholder="19:00">
              <input class="point__input" id="date-end"  type="text" value="${moment(this._dateTo)}" name="date-end" placeholder="21:00">
            </div>

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
              <input type="checkbox" class="point__favorite-input visually-hidden" id="favorite" name="favorite" ${this._isFavorite ? `checked` : ``}>
              <label class="point__favorite" for="favorite">favorite</label>
            </div>

          </header>

          <section class="point__details">
            <section class="point__offers">
              <h3 class="point__details-title">offers</h3>

              <div class="point__offers-wrap">
                  ${this._getOffers()}
              </div>

            </section>
            <section class="point__destination">
               ${this._getDestinationTemplate({
      name: this._description,
      description: this._description,
      pictures: this._photos,
    })}
            </section>
            <input type="" class="point__total-price visually-hidden" name="total-price" value="${this._totalPrice}">
          </section>
        </form>
      </article>`.trim();
  }

  shake() {
    const ANIMATION_TIMEOUT = 600;
    this._element.style.animation = `shake ${ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      this._element.style.animation = ``;
    }, ANIMATION_TIMEOUT);
  }

  bind() {

    this._element.querySelector(`.point__destination-input`)
      .addEventListener(`change`, this._onChangeDestination);

    this._element.addEventListener(`keydown`, this._onEscPress);

    this._element.querySelector(`.travel-way__select`)
      .addEventListener(`click`, this._onTravelClick);

    this._element.querySelector(`.event__form`)
      .addEventListener(`submit`, this._onSubmitButtonClick);

    this._element.querySelector(`[type=reset]`)
      .addEventListener(`click`, this._onDeleteClick);

    this._element.querySelector(`.point__favorite`)
      .addEventListener(`click`, this._onChangeFavorite);

    flatpickr(this._element.querySelector(`#date-start`),
      {
        defaultDate: this._dateFrom,
        time_24hr: true, enableTime: true, altInput: true, dateFormat: `H:i`, altFormat: `H:i`,
        onChange: (data) => {
          this._dateFrom = data;
        },
      });

    flatpickr(this._element.querySelector(`#date-end`),
      {
        defaultDate: this._dateTo,
        time_24hr: true, enableTime: true, altInput: true, dateFormat: `H:i`, altFormat: `H:i`,
        onChange: (data) => {
          this._dateTo = data;
        },
      });
  }

  unbind() {
    document.removeEventListener(`keydown`, this._onEscPress);

    this._element.querySelector(`.travel-way__select`)
      .removeEventListener(`click`, this._onTravelClick);

    this._element.querySelector(`.event__form`)
      .removeEventListener(`submit`, this._onSubmitButtonClick);

    this._element.querySelector(`[type=reset]`)
      .removeEventListener(`click`, this._onDeleteClick);

    this._element.querySelector(`.point__favorite`)
      .removeEventListener(`click`, this._onChangeFavorite);

    this._element.querySelector(`.point__destination-input`)
      .removeEventListener(`change`, this._onChangeDestination);

    flatpickr(this._element.querySelector(`#date-start`),
      {
        defaultDate: this._dateFrom,
        time_24hr: true, enableTime: true, altInput: true, dateFormat: `H:i`, altFormat: `H:i`,
        onChange: (data) => {
          this._dateFrom = data;
        },
      });

    flatpickr(this._element.querySelector(`#date-end`),
      {
        defaultDate: this._dateTo,
        time_24hr: true, enableTime: true, altInput: true, dateFormat: `H:i`, altFormat: `H:i`,
        onChange: (data) => {
          this._dateTo = data;
        },
      });
  }

  update(data) {
    this._type = data.type;
    this._day = data.day;
    this._city = data.city;
    this._dateFrom = data.dateFrom;
    this._dateTo = data.dateTo;
    this._price = Number(data.price);
    this._totalPrice = getElementPrice(data.offers, data.price);
    this._isFavorite = data.isFavorite;
  }

  static createMapper(target) {
    return {
      "price": (value) => target.price = Number(value),
      "destination": (value) => target.city = value,
      "day": (value) => target.day = value,
      "favorite": (value) => target.isFavorite = (value === `on`) ? true : false,
      "offer": (value) => target.offers.add(value),
      "travel-way": (value) => target.type = value,
      "total-price": (value) => target.totalPrice = value,
    };
  }

}
