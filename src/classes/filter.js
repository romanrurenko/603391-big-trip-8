import {createContainer} from "../utils";

export class Filter {
  constructor(data) {
    this._caption = data.caption;
    this._checked = data.checked;
  }

  _onEditButtonClick() {
    typeof this._onEdit === `function` && this._onEdit();
  }

  get element() {
    return this._element;
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

  render() {
    this._element = createContainer(this.template);
    this.bind();
    return this._element;
  }

  unbind() {
    this._element.querySelector(`.filter-${this._caption.toLowerCase()}`)
      .addEventListener(`click`, this._onEditButtonClick.bind(this));
  }

  unrender() {
    this.unbind();
    this._element = null;
  }


}
