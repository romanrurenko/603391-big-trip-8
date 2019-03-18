import {clearElement} from "./utils";
import {filtersData, pointData, generatePoint} from "./data";
import {Event} from "./classes/event";
import {EventEdit} from "./classes/event-edit";
import {Filter} from "./classes/filter";


const eventsContainer = document.querySelector(`.trip-day__items`);
const filtersContainer = document.querySelector(`.trip-filter`);

clearElement(filtersContainer);
clearElement(eventsContainer);

const eventComponents = [];
const editEventComponents = [];
const filtersComponents = [];

for (let i = 0; i < 3; i++) {
  filtersComponents[i] = new Filter(filtersData[i]);

  filtersContainer.appendChild(filtersComponents[i].render());
}

for (let i = 0; i < 4; i++) {
  const point = generatePoint(pointData);
  eventComponents[i] = new Event(point);
  editEventComponents[i] = new EventEdit(point);

  eventsContainer.appendChild(eventComponents[i].render());

  eventComponents[i].onEdit = () => {
    editEventComponents[i].render();
    eventsContainer.replaceChild(editEventComponents[i].element, eventComponents[i].element);
    eventComponents[i].unrender();
  };

  editEventComponents[i].onSubmit = () => {
    eventComponents[i].render();
    eventsContainer.replaceChild(eventComponents[i].element, editEventComponents[i].element);
    editEventComponents[i].unrender();
  };

}


