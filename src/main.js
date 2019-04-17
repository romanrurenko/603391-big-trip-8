import {clearElement, createElement, getTotalPrice, showMessage} from "./utils";
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

const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZA=${Math.random()}`;
const END_POINT = `https://es8-demo-srv.appspot.com/big-trip`;
const api = new Api({endPoint: END_POINT, authorization: AUTHORIZATION});
const pointsContainer = document.querySelector(`.trip-points`);
const eventsContainer = document.querySelector(`.trip-day__items`);
const totalPrice = document.querySelector(`.trip__total-cost`);
export const filtersContainer = document.querySelector(`.trip-filter`);
export const sortFiltersContainer = document.querySelector(`.trip-sorting`);
const newEventButton = document.querySelector(`.new-event`);
export let offersData = [];
export let destinationsData = [];
let filterName = `filter-everything`;
let sortFilterName = `sorting-event`;
let lastSortName = ``;
let revers = true;
let filtredArray = [];
const filtersComponents = [];
const sortFiltersComponents = [];

const block = (component = editEventComponent) => {
  const elements = component.element.querySelectorAll('form input, form select, form button');
  elements.forEach(elem => {
    return elem.setAttribute("disabled", "disabled");
  });
  component.element.querySelector(`[type=submit]`).disabled = true;
};
const unblock = (component = editEventComponent) => {
  const elements = component.element.querySelectorAll('form input, form select, form button');
  elements.forEach(elem => {
      return elem.removeAttribute("disabled");
    });
  component.element.querySelector(`[type=submit]`).disabled = false;
};
export const blockButton = () => {
  newEventButton.removeEventListener('click', createNewEvent);
  newEventButton.style.opacity = 0.2;
};
export const unblockButton = () => {
  newEventButton.addEventListener('click', createNewEvent);
  newEventButton.style.opacity = 1;
};
const bindButton = () => {
  newEventButton.addEventListener('click', createNewEvent);
};
const dayTemplate = (date, i) => {
  return `
<section class="trip-day">
      <article class="trip-day__info">
        <span class="trip-day__caption">Day</span>
        <p class="trip-day__number">${i}</p>
        <h2 class="trip-day__title">${moment(date).format('MMM').toUpperCase()} ${moment(date).format('D')}</h2>
      </article>
      <div class="trip-day__items day${date}">
      </div>
</section>
`.trim();
};
const createNewEvent = () => {
  blockButton();
  const newEditComponent = new EventEdit(newEmptyEvent);
  newEditComponent.onSubmit = (newObject) => {

    block(newEditComponent);
    newEditComponent.element.querySelector(`form [type=submit]`).innerText = `Saving...`;
    newEditComponent.element.classList.remove('point--error');
    api.createEvent({event: toRAW2(newObject)})
      .then((x) => {
        console.log(x);
        unblockButton();
        unblock(newEditComponent);
        newEditComponent.unrender();
        init();
      })
      .catch((err) => {
        newEditComponent.element.classList.add('point--error');
        newEditComponent.element.querySelector(`form [type=submit]`).innerText = `Save`;
        console.log(err);
        newEditComponent.shake();
        unblock(newEditComponent);
      });

  };
  newEditComponent.onExit = () => {
    unblockButton();
    bindButton();
    newEditComponent.unrender();
  };
  newEditComponent.onDelete = () => {
    unblockButton();
    bindButton();
    newEditComponent.unrender();
  };
  pointsContainer.insertAdjacentElement('afterBegin',newEditComponent.render());
};
const renderDaysContainer = (array) => {
  let i = 0;
  for (let i = 0; i < array.length; i++) {
    if (filterDays(array[i], filterName)) {
      const template = dayTemplate(array[i], i + 1);
      const pointsContainer = document.querySelector(`.trip-points`);
      pointsContainer.appendChild(createElement(template));
    }
  }
  ;
};
const stampToDate = (stamp) => {
  const date = moment(new Date(stamp.getFullYear(), stamp.getMonth(), stamp.getDate()).valueOf())._i;
  return date;
};
const createDays = (array) => {
  const days = new Set();
  for (const it of array) {
    days.add(stampToDate(it.dateFrom));
  }
  return days;
};
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
const setSortEvent = (array) => {
  for (const it of sortFiltersComponents) {
    it.onFilter = (evt) => {
      lastSortName = sortFilterName;
      sortFilterName = evt.target.id;
      callRender(array);
    };

  }
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
const filterDays = (element, filterName) => {
  switch (filterName) {
    case `filter-everything`:
      return true;
    case `filter-future`:
      return (moment(element) > (moment(Date.now()))) ? true : false;
    case `filter-past`:
      return (moment(Date.now()) > moment(element)) ? true : false;
  }
  return true;
};
const sortEvents = (array, filterName) => {
  const sortByEvent = (a, b) => {
    return a.id - b.id;
  };
  const sortByPrice = (a, b) => {
    if (a.price > b.price) {
      return 1;
    }
    if (a.price < b.price) {
      return -1;
    }
  };
  const sortByTime = (a, b) => {
    if (a.dateFrom > b.dateFrom) {
      return 1;
    }
    if (a.dateFrom < b.dateFrom) {
      return -1;
    }
  };
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
const callRender = (array) => {
  let filtredArray = filterEvents(array, filterName);

  let sortedArray = sortEvents(filtredArray, sortFilterName);
  console.log(sortedArray);
  if (lastSortName === sortFilterName) {
    revers = !revers;
  }
  console.log(lastSortName, sortFilterName);
  if (revers) {
    sortedArray.reverse();
  }


  const days = [...createDays(array)].sort(function compareNumeric(a, b) {
    return a - b;
  });
  pointsContainer.innerHTML = ``;
  renderDaysContainer(days);
  renderPoints(sortedArray);
};
const renderPoints = (events) => {
  if (events && events.length) {
    for (const event of events) {
      if (!event.deleted) {
        const eventComponent = new Event(event);
        const editEventComponent = new EventEdit(event);
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
        const eventsContainer = document.querySelector(`.day${stampToDate(event.dateFrom)}`);
        eventsContainer.appendChild(eventComponent.render());
      }
      ;
    }
  }
  showChart(events);
  setSwitcher();
};
const toRAW2 = (data) => {

  return {
    'id': data.id,
    'type': data.type,
    'base_price': data.price,
    'date_from': data.dateFrom,
    'date_to': data.dateTo,
    'is_favorite': data.isFavorite,
    'destination': {
      description: data.description,
      name: data.city,
      pictures: data._photos
    },
    'offers': [...data.offers],
  }
};
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
      if (offers.length && destinations.length && (points.length || []) ) {
        destinationsData = destinations;
        offersData = offers;
        calculateAmount(points);
        setFilterEvent(points);
        setSortEvent(points);

        callRender(points);

      }
    });


};
const createFilters = () => {
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
};
const newEmptyEvent = {
  city: '',
  dateFrom: new Date(Date.now()),
  dateTo: new Date(Date.now()),
  description: '',
  id: '',
  isFavorite: false,
  offers: new Set([]),
  photos: [],
  price: 0,
  totalPrice: 0,
  type: `taxi`,
};

// begin
clearElement(pointsContainer);
clearElement(filtersContainer);
clearElement(sortFiltersContainer);
createFilters();
bindButton();
init();

