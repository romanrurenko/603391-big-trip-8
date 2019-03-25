import {clearElement} from "./utils";
import {filtersData, pointData} from "./data";
import {Event} from "./classes/event";
import {EventEdit} from "./classes/event-edit";
import {Filter} from "./classes/filter";


const eventsContainer = document.querySelector(`.trip-day__items`);
const filtersContainer = document.querySelector(`.trip-filter`);
export const moment = require(`moment`);

clearElement(filtersContainer);
clearElement(eventsContainer);

// const eventComponents = [];
// const editEventComponents = [];
const filtersComponents = [];

for (let i = 0; i < 3; i++) {
  filtersComponents[i] = new Filter(filtersData[i]);
  filtersContainer.appendChild(filtersComponents[i].render());
}

const eventComponents = new Event(pointData);
const editEventComponents = new EventEdit(pointData);

eventsContainer.appendChild(eventComponents.render());

eventComponents.onEdit = () => {
  editEventComponents.render();
  eventsContainer.replaceChild(editEventComponents.element, eventComponents.element);
  eventComponents.unrender();
};

editEventComponents.onSubmit = (newObject) => {
  event.type = newObject.type;
  event.price = newObject.price;
  event.city = newObject.city;
  event.description = newObject.description;
  event.date = newObject.date;
  event.isFavorite = newObject.isFavorite;
  event.offers = newObject.offers;

  eventComponents.update(event);
  eventComponents.render();
  eventsContainer.replaceChild(eventComponents.element, editEventComponents.element);
  editEventComponents.unrender();
};

