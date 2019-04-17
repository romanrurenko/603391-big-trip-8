import {getRandom} from "../utils";
import flatpickr from 'flatpickr';

export const filtersData = [
  {"caption": `Everything`, "checked": true},
  {"caption": `Future`, "checked": false},
  {"caption": `Past`, "checked": false},
];

export const sortFiltersData = [
  {"caption": `event`, "checked": true},
  {"caption": `time`, "checked": false},
  {"caption": `price`, "checked": false},
  {"caption": `offers`, "checked": false},
];

export const travelType = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`, `check-in`,
  `sightseeing`, `restaurant`];

export const transportType = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`];

export const travelToData = {
  "taxi": {name: `Taxi`, icon: `🚕`, text: `Taxi to `},
  "bus": {name: `Bus`, icon: `🚌`, text: `Bus to `},
  "train": {name: `Train`, icon: `🚂`, text: `Train to `},
  "ship": {name: `Ship`, icon: `🛳️`, text: `Ship to `},
  "transport": {name: `Transport`, icon: `🚊`, text: `Transport to `},
  "drive": {name: `Drive`, icon: `🚗`, text: `Drive to `},
  "flight": {name: `Flight`, icon: `✈`, text: `Flight to`},
  "check-in": {name: `Check-in`, icon: `🏨`, text: `Check into a `},
  "sightseeing": {name: `Sightseeing`, icon: `🏛️`, text: `Sightseeing `},
  "restaurant": {name: `Restaurant`, icon: `🍴`, text: `Check into a`},
};

export const offersData = {
  'add-luggage': {name: `Add luggage`, cost: 100},
  'switch-to-comfort-class': {name: `Switch to comfort class`, cost: 20},
  'add-meal': {name: `Add meal`, cost: 5},
  'choose-seats': {name: `Choose seats`, cost: 30},
};

export const offersTypes = [
  `add-luggage`,
  `switch-to-comfort-class`,
  `add-meal`,
  `choose-seats`,
];

export const cities = [`Amsterdam`, `Geneva`, `Chamonix`, `Novosibirsk`];

export const pointData = () => {
  return {
    id: 0,
    deleted: false,
    day: new Date(),
    type: travelType[getRandom(0, 9)],
    city: cities[getRandom(0, 4)],
    photos: [`http://picsum.photos/100/100?r=${Math.random()}`, `http://picsum.photos/100/100?r=${getRandom(0, 1000)}`, `http://picsum.photos/100/100?r=${Math.random()}`],
    offers: new Set([
      `add-luggage`,
      `switch-to-comfort-class`,
    ]),
    dateFrom: new Date(),
    dateTo: moment(new Date()).add(1, `days`).add(10, `minutes`).toDate(),
    totalPrice: 0,
    price: getRandom(1, 10) * 100,
    description: [`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
      `Cras aliquet varius magna, non porta ligula feugiat eget.`,
      `Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.`,
      `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
      `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
      `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
      `Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.`,
      `Nunc fermentum tortor ac porta dapibus.`,
      `In rutrum ac purus sit amet tempus`][getRandom(0, 9)],
  };
};
