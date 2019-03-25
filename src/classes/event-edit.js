import {Component} from "./component";
import flatpickr from "flatpickr";

export class EventEdit extends Component {
  constructor(data) {
    super();
    this._type = data.type;
    this._city = data.city;
    this._photo = data.photo;
    this._description = data.description;
    this._date = data.date;
    this._price = data.cost;
    this._offers = data.offers;
    this._element = null;
    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);
    this._onSubmit = null;
    this._state.isFavorite = false;


    this._onChangeFavorite = this._onChangeFavorite.bind(this);
    this._onDelete = this._onDelete.bind(this);
  }

  _processForm(formData) {
    const entry = {
      type: ``,
      city: ``,
      photo: new Set(),
      description: ``,
      date: ``,
      price: 0,
      offers: [],
      isFavorite: false,
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

  _onChangeFavorite() {
    this._state.isFavorite = !this._state.isFavorite;
  }

  _onDelete() {
    this.unbind();
    this.unrender();
  }

  _partialUpdate() {
    this._element.innerHTML = this.template;
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  get template() {
    return `<article class="point">
  <form action=""  class="EVENT__form" method="get">
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
        <input class="point__input" id="point__time" type="text" value="00:00 — 00:00" name="time" placeholder="00:00 — 00:00">
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
        
        
        ${(Array.from(this._offers).map((offer) => (`
          <input class="point__offers-input visually-hidden" type="checkbox" id="${offer.styleElement}" name="offer" value="${offer.styleElement}" ${offer.checkedElement ? `checked` : ``}>
          <label for="${offer.styleElement}" class="point__offers-label">
            <span class="point__offer-service">${offer.name}</span> +€<span class="point__offer-price">${offer.cost}</span>
          </label>`.trim()
  ))).join(``)}
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
    this._element.querySelector(`.point__button--save`)
      .addEventListener(`submit`, this._onSubmitButtonClick);
    this._element.querySelector(`.point__buttons .delete`)
        .addEventListener(`click`, this._onDelete);
    this._element.querySelector(`.point__favorite`)
     .addEventListener(`click`, this._onChangeFavorite);

    flatpickr(`#point__time`, {altInput: true, altFormat: `j F`, dateFormat: `j F`});

  }

  unbind() {
    this._element.querySelector(`.point__button--save`)
      .removeEventListener(`submit`, this._onSubmitButtonClick);
    this._element.querySelector(`.point__buttons .delete`)
        .removeEventListener(`click`, this._onDelete);
    this._element.querySelector(`.point__favorite`)
        .removeEventListener(`click`, this._onChangeFavorite);
  }

  update(data) {
    this._title = data.title;
    this._tags = data.tags;
    this._color = data.color;
    this._repeatingDays = data.repeatingDays;
    this._dueDate = data.dueDate;
  }

  static createMapper(target) {
    return {

      photo: (value) => target.photo.add(value),
      description: (value) => target.description = value,
      price: (value) => target.price = value,
      type: (value) => target.type = value,
      city: (value) => target.city = value,
      date: (value) => target.date = value,
      isFavorite: (value) => target.isFavorite = value,
      offers: (value) => target.offers[value],
    };
  }
}
