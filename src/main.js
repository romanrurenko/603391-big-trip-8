import {clearElement, getTotalPrice, showMessage} from "./utils";
import {filtersData, sortFiltersData} from "./data/mock-data";
import {Event} from "./classes/event";
import {EventEdit} from "./classes/event-edit";
import {Filter} from "./classes/filter";
import {SortFilter} from "./classes/sort-filter";
import {Api} from "./classes/api";
import {setSwitcher} from "./setSwitcher";
import {ModelEvent} from "./models/events";
import {ModelOffers} from "./models/offers";
import {showChart} from "./statistic";
import moment from 'moment';

export const _ = require('lodash');
const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZA=${Math.random()}`;
const END_POINT = `https://es8-demo-srv.appspot.com/big-trip`;
const api = new Api({endPoint: END_POINT, authorization: AUTHORIZATION});

const eventsContainer = document.querySelector(`.trip-day__items`);
const totalPrice = document.querySelector(`.trip__total-cost`);
export const filtersContainer = document.querySelector(`.trip-filter`);
export const sortFiltersContainer = document.querySelector(`.trip-sorting`);
export let offersData = [];
export let destinationsData = [];
let filterName = `filter-everything`;
let sortFilterName = `event`;
let filtredArray = [];
const filtersComponents = [];
const sortFiltersComponents = [];

const calculateAmount = (data) => {
  totalPrice.innerHTML = `€ ${getTotalPrice(data)}`;
};

const setFilterEvent = (points) => {
  for (const it of filtersComponents) {
    it.onFilter = (evt) => {
      filterName = evt.target.id;
      callRender(points);
    };
  }
};

const setSortEvent = (points) => {
  for (const it of sortFiltersComponents) {
    it.onFilter = (evt) => {
      sortFilterName = evt.target.id;
      console.log(sortFilterName);
      callRender(points);
    };

  }
};
const sortByEvent = (a, b) => {
  return a.id-b.id;
};

const sortByPrice = (a, b) => {
  if (a.price > b.price) return 1;
  if (a.price < b.price) return -1;
};

const sortByTime = (a, b) => {
  if (a.dateFrom > b.dateFrom) return 1;
  if (a.dateFrom < b.dateFrom) return -1;
};


const callRender = (points) => {
  const filtredArray = filterEvents(points, filterName);
  const sortedArray = sortEvents(filtredArray, sortFilterName);
  renderPoints(filtredArray);
};

const filterEvents = (array, filterName) => {
  switch (filterName) {
    case `filter-everything`:
      return array;
    case `filter-future`:
      return array.filter((it) => moment(it.dateFrom) > (moment(Date.now())));
    case `filter-past`:
      return array.filter((it) => moment(Date.now()) > moment(it.dateTo));
  }
  return [];
};

const sortEvents = (array, filterName) => {
  switch (filterName) {
    case `sorting-event`:
      return array.sort(sortByEvent);
    case `sorting-time`:
      return array.sort(sortByTime);
    case `sorting-price`:
      return array.sort(sortByPrice);
    case `sorting-offers`:
      return array;
  }
  return [];
};

const updateEvent = (events, i, newEvent) => {
  events[i] = Object.assign({}, events[i], newEvent);
  return events[i];
};

const renderPoints = (events) => {

  eventsContainer.innerHTML = ``;

  console.log(events);

  if (events) {
    for (const event of events) {
      if (!event.deleted) {
        const eventComponent = new Event(event);
        const editEventComponent = new EventEdit(event);

        const block = () => {
          editEventComponent.element.querySelectorAll('form input, form select, form textarea, form button')
            .forEach(elem => elem.setAttribute("disabled", "disabled"));
          editEventComponent.element.querySelector(`[type=submit]`).disabled = true;
        };
        const unblock = () => {
          editEventComponent.element.querySelectorAll('form input, form select, form textarea, form button')
            .forEach(elem => elem.removeAttribute("disabled"));
          editEventComponent.element.querySelector(`[type=submit]`).disabled = false;
        };

        editEventComponent.onSubmit = (newObject) => {
          Object.assign(event, newObject);
          block();
          editEventComponent.element.querySelector(`form [type=submit]`).innerText = `Saving...`;
          editEventComponent.element.classList.remove('point--error');
          api.updateEvent({id: event.id, data: event.toRAW()})
            .then((newEvent) => {
                unblock();
                eventComponent.update(newEvent);
                eventComponent.render();
                eventsContainer.replaceChild(eventComponent.element,
                  editEventComponent.element);
                editEventComponent.unrender();
              })
            .catch((err) => {
              editEventComponent.element.classList.add('point--error');
              editEventComponent.element.querySelector(`form [type=submit]`).innerText = `Save`;
              console.log(err);
              editEventComponent.shake();
              unblock();
            });

          totalPrice.innerHTML = `€ ${getTotalPrice(events)}`;
        };

        editEventComponent.onExit = () => {
          eventComponent.render();
          eventsContainer.replaceChild(
            eventComponent.element,
            editEventComponent.element);
          editEventComponent.unrender();
        };

        editEventComponent.onDelete = () => {
          block();
          editEventComponent.element.querySelector(`form [type=reset]`).innerText = `Deleting...`;
          editEventComponent.element.classList.remove('point--error');
          api.deleteEvent(editEventComponent._id)
            .then(() => {
              unblock();
              event.deleted = true;
              editEventComponent.unrender();
              init();
            })
            .catch((err) => {
              console.log(err);
              editEventComponent.element.classList.add('point--error');
              editEventComponent.element.querySelector(`[type=reset]`).innerText = `Delete`;
              editEventComponent.shake();
              unblock();
            });
        };

        eventComponent.onEdit = () => {
          editEventComponent.render();
          eventsContainer.replaceChild(editEventComponent.element, eventComponent.element);
          eventComponent.unrender();
        };

        eventsContainer.appendChild(eventComponent.render());
      }
      ;
    }
  }


  showChart(events);
  setSwitcher();
};

clearElement(eventsContainer);
clearElement(filtersContainer);
clearElement(sortFiltersContainer);

if (filtersComponents.length < 1) {
  for (let i = 0; i < filtersData.length; i++) {
    filtersComponents[i] = new Filter(filtersData[i]);
    filtersContainer.appendChild(filtersComponents[i].render());
  }
}

if (sortFiltersComponents.length < 1) {
      for (let i = 0; i < sortFiltersData.length; i++) {
    sortFiltersComponents[i] = new SortFilter(sortFiltersData[i]);
    sortFiltersContainer.appendChild(sortFiltersComponents[i].render());
  }
}


const init = () => {
  eventsContainer.innerHTML = `Loading route...`;

  Promise.all([
    api.getModelData(`offers`, ModelOffers.parseOffers),
    api.getData(`destinations`),
    api.getModelData(`points`, ModelEvent.parseEvents),
  ])
    .catch((err) => {
      showMessage(`Something went wrong while loading your route info. Check your connection or try again later.`);
      throw err;
    })
    .then(([
             offers,
             destinations,
             points,
           ]) => {

      if (offers.length && destinations.length && points.length) {
        destinationsData = destinations;
        offersData = offers;
        calculateAmount(points);
        setFilterEvent(points);
        setSortEvent(points);
        callRender(points);

      }
    });


};


init();

