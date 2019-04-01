import {filtersContainer} from "./main";

export const setSwitcher = () => {
  const mainContainer = document.querySelector(`.main`);
  const statsContainer = document.querySelector(`.statistic`);
  const tableSelector = document.querySelector(`#table-selector`);
  const menuSelector = document.querySelector(`#stats-selector`);

  const showStats = () => {
    mainContainer.classList.add(`visually-hidden`);
    statsContainer.classList.remove(`visually-hidden`);
    // filtersContainer.classList.add('visually-hidden');
    filtersContainer.style = `visibility: hidden;`;
    tableSelector.classList.remove(`view-switch__item--active`);
    menuSelector.classList.add(`view-switch__item--active`);
  };

  const showTable = () => {
    mainContainer.classList.remove(`visually-hidden`);
    statsContainer.classList.add(`visually-hidden`);
    filtersContainer.style = ``;
    tableSelector.classList.add(`view-switch__item--active`);
    menuSelector.classList.remove(`view-switch__item--active`);
  };

  tableSelector.addEventListener(`click`, showTable);
  menuSelector.addEventListener(`click`, showStats);

};
