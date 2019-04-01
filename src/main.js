import {clearElement} from "./utils";
import {filtersData, pointData} from "./data";
import {Event} from "./classes/event";
import {EventEdit} from "./classes/event-edit";
import {Filter} from "./classes/filter";

import {showChart} from "./show-stats";
import {setSwitcher} from "./setSwitcher";

const eventsContainer = document.querySelector(`.trip-day__items`);
export const filtersContainer = document.querySelector(`.trip-filter`);
clearElement(filtersContainer);
clearElement(eventsContainer);

export const moment = require(`moment`);
export const initialEvents =  new Array(7).fill(7).map(pointData);



const filtersComponents = [];
for (let i = 0; i < filtersData.length; i++) {
  filtersComponents[i] = new Filter(filtersData[i]);
  filtersContainer.appendChild(filtersComponents[i].render());


  filtersComponents[i].onFilter = (evt) => {
    const filterName = evt.target.id;
    const filteredEvents = sortEvents(initialEvents, filterName);
    renderTasks(filteredEvents, eventsContainer);
  };
}

const updateEvent = (events, i, newEvent) => {
  events[i] = Object.assign({}, events[i], newEvent);
  return events[i];
};

const sortEvents = (events, filterName) => {
  switch (filterName) {
    case `filter-everything`:
      return initialEvents;
    case `filter-future`:
      return initialEvents.filter((it) => it.day > Date.now());
    case `filter-past`:
      return initialEvents.filter((it) => it.day < Date.now());
  }
  return null;
};

const renderTasks = (events) => {
  eventsContainer.innerHTML = ``;
  if (events !== null && !events.deleted) {

    for (let i = 0; i < events.length; i++) {
      const event = events[i];
      const eventComponent = new Event(event);
      const editEventComponent = new EventEdit(event);

      eventComponent.onEdit = () => {

        editEventComponent.render();
        eventsContainer.replaceChild(
            editEventComponent.element,
            eventComponent.element);
        eventComponent.unrender();
      };
      editEventComponent.onSubmit = (newObject) => {
        const updatedEvent = updateEvent(events, i, newObject);
        eventComponent.update(updatedEvent);
        eventComponent.render();
        eventsContainer.replaceChild(
            eventComponent.element,
            editEventComponent.element);
        editEventComponent.unrender();
      };
      editEventComponent.onDelete = () => {
        editEventComponent.unrender();
        events[i].deleted = true;
        console.log(events);
      };
      eventsContainer.appendChild(eventComponent.render());
    }


    showChart();
    setSwitcher();

  }

};




renderTasks(initialEvents, eventsContainer);




