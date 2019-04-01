import {offersData} from "./data";

export const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export const clearElement = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};


export const getTotalPrice = (data, price) => {
  let sum = 0;
  for (const it of data) {
    sum += Number(offersData[it].cost);
  }
  sum += Number(price);
  return sum;
};
