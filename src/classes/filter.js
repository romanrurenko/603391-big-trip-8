import {Component} from "./component";

export class Filter extends Component {
  constructor(data) {
    super();
    this._caption = data.caption;
    this._checked = data.checked;
  }

  _onFilterButtonClick(evt) {
    this._checked = true;
    typeof this._onFilter === `function` && this._onFilter(evt);
  }

  set onFilter(fn) {
    this._onFilter = fn;
  }


  get template() {
    return `<span><input type="radio" id="filter-${this._caption.toLowerCase()}"
            name="filter" value="${this._caption.toLowerCase()}"
            ${this._checked ? ` checked` : ``}>
            <label class="trip-filter__item filter-${this._caption.toLowerCase()}"
            for="filter-${this._caption.toLowerCase()}">${this._caption}</label></span>`.trim();
  }

  bind() {
    this._element.addEventListener(`click`, this._onFilterButtonClick.bind(this));
  }

  unbind() {
    this._element.addEventListener(`click`, this._onFilterButtonClick.bind(this));
  }

}
