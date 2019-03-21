import {Component} from "./component";

export class Filter extends Component {
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
    this._element.querySelector(`.filter-${this._caption.toLowerCase()}`).addEventListener(`click`,
        this._onEditButtonClick.bind(this));
  }

  unbind() {
    this._element.querySelector(`.filter-${this._caption.toLowerCase()}`)
      .addEventListener(`click`, this._onEditButtonClick.bind(this));
  }

}
