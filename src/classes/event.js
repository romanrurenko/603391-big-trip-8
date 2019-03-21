import {Component} from "./component";

export class Event extends Component {
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
                       
      ${(Array.from(this._offers).map((tag) => (`<li>
              <button class="trip-point__offer">${tag}</button>
            </li>`.trim()
  )).join(``))}
      
          </ul>
        </article>`.trim();
  }


  bind() {
    this._element.querySelector(`.trip-icon`)
      .addEventListener(`click`, this._onEditButtonClick.bind(this));
  }


  unbind() {
    // Удаление обработчиков
  }


}


