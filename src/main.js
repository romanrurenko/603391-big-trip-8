import makeFilter from '../src/make-filter';
import makePoints from '../src/make-points';
import {filtersData} from "./data";
import {getRandom, clearElement} from "./utils";
import {pointData} from "./data";

const pointsContainer = document.querySelector(`.trip-points`);
const filtersContainer = document.querySelector(`.trip-filter`);
const handler = () => {
  filtersContainer.removeEventListener(`click"`, handler);
  clearElement(pointsContainer);
  renderPoints(getRandom(1, 8));
};


const renderPoints = (data) => {
  pointsContainer.insertAdjacentHTML(`beforeend`, makePoints(data));
};

const renderFilters = () => {
  for (const it of filtersData) {
    filtersContainer.insertAdjacentHTML(`beforeend`, makeFilter(it.caption, it.checked));
  }
};

export const generatePoints = (data) => {

  const array = {
    type: data.type[getRandom(0, 9)],
    city: data.city[getRandom(0, 2)],
    photo: `http://picsum.photos/300/150?r=${Math.random()}`,
    description: data.description[getRandom(0, 9)],
    offers: data.offers[getRandom(0, 3)],
    date: Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,
    price: getRandom(1, 10) * 100,
  };

  return array;
};


// start script
clearElement(filtersContainer);
clearElement(pointsContainer);
const points = generatePoints(pointData);
renderFilters();

renderPoints(points);
filtersContainer.addEventListener(`click`, handler);
