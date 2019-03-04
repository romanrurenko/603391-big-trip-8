import makeFilter from '../src/make-filter';
import makePoints from '../src/make-points';

const pointsContainer = document.querySelector(`.trip-points`);
const filtersContainer = document.querySelector(`.trip-filter`);
const filtersData = [
  {
    "caption": `Everything`,
    "checked": true
  },
  {
    "caption": `Future`,
    "checked": false
  },
  {
    "caption": `Past`,
    "checked": false
  },
];

const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const clearElement = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

const handler = () => {
  filtersContainer.removeEventListener(`click"`, handler);
  clearElement(pointsContainer);
  renderPoints(getRandom(1, 8));
};

const renderPoints = () => {
  pointsContainer.insertAdjacentHTML(`beforeend`, makePoints());
};

const renderFilters = () => {
  for (const it of filtersData) {
    filtersContainer.insertAdjacentHTML(`beforeend`, makeFilter(it.caption, it.checked));
  }
};


// start script
clearElement(filtersContainer);
clearElement(pointsContainer);
renderFilters();
renderPoints(1);
filtersContainer.addEventListener(`click`, handler);
