import {Component} from "./component";
import {travelToData} from "../data/mock-data";
import moment from 'moment';
import {getDuration, formatDuration} from "../utils";

export class Event extends Component
{
  constructor(data) {
    super();
    this._type = data.type;
    this._city = data.city;
    this._dateFrom = data.dateFrom;
    this._dateTo = data.dateTo;
    this._price = data.price;
    this._offers = data.offers;
    this._element = null;
    this._onEditButtonClick = this._onEditButtonClick.bind(this);
  }

  _onEditButtonClick() {
    typeof this._onEdit === `function` && this._onEdit();
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  get template() {
    const durationDate = getDuration(this._dateFrom, this._dateTo);
    return `<article class="trip-point">
          <i class="trip-icon">${travelToData[this._type].icon}</i>
          <h3 class="trip-point__title">${travelToData[this._type].text} ${this._city}</h3>
          <p class="trip-point__schedule">
            <span class="trip-point__timetable">${moment(this._dateFrom).format(`HH:mm`)} - ${moment(this._dateTo).format(`HH:mm`)}</span>
            <span class="trip-point__duration">${formatDuration(durationDate)}</span>
          </p>
          <p class="trip-point__price">&euro;&nbsp;${this._price}</p>
          <ul class="trip-point__offers">                       
      ${(Array.from(this._offers).map((offer) => (((offer.accepted) ? `<li><button class="trip-point__offer">
 ${offer.title}+&euro;${offer.price}</button></li>` : ``).trim())).join(``))}
          </ul>
        </article>`.trim();
  }

  bind() {
    this._element.addEventListener(`click`, this._onEditButtonClick);
  }

  unbind() {
    this._element.querySelector(`.trip-icon`)
      .removeEventListener(`click`, this._onEditButtonClick);
  }

  update(data) {
    this._type = data.type;
    this._city = data.city;
    this._dateFrom = data.dateFrom;
    this._dateTo = data.dateTo;
    this._price = data.price;
    this._offers = data.offers;
  }
}


