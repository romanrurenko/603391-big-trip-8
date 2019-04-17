import {Component} from "./component";

export class SortFilter extends Component {
  constructor(data) {
    super();
    this._caption = data.caption;
    this._checked = data.checked;
    this._onFilterButtonClick = this._onFilterButtonClick.bind(this);
  }

  _onFilterButtonClick(evt) {
    this._checked = true;
    typeof this._onFilter === `function` && this._onFilter(evt);
  }

  set onFilter(fn) {
    this._onFilter = fn;
  }

  get template() {
    return `
    <span>
    <input type="radio" name="trip-sorting" id="sorting-${this._caption}" value="${this._caption}" ${(this._checked) ? `checked` : ``}>
    <label class="trip-sorting__item trip-sorting__item--${this._caption}" for="sorting-${this._caption}">${this._caption.toUpperCase()}</label>
    </span>
   `.trim();
  }

  bind() {
    this._element.querySelector(`input`)
      .addEventListener(`click`, this._onFilterButtonClick);
  }

  unbind() {
    this._element.querySelector(`#sorting--${this._caption.toLowerCase()}`)
      .removeEventListener(`click`, this._onFilterButtonClick);
  }

}
