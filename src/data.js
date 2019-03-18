import {getRandom} from "./utils";

export const filtersData = [
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

export const generatePoint = (data) => {
  const array = {
    type: data.type[getRandom(0, 9)],
    city: data.city[getRandom(0, 2)],
    photo: `http://picsum.photos/300/150?r=${Math.random()}`,
    description: data.description[getRandom(0, 9)],
    offers: [data.offers[getRandom(0, 3)], data.offers[getRandom(0, 3)]],
    date: Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,
    price: getRandom(1, 10) * 100,
  };
  return array;
};

export const pointData = {
  type: [
    {name: `Taxi`, icon: `🚕`, text: `Taxi to `},
    {name: `Bus`, icon: `🚌`, text: `Bus to `},
    {name: `Train`, icon: `🚂`, text: `Train to `},
    {name: `Ship`, icon: `🛳️`, text: `Ship to `},
    {name: `Transport`, icon: `🚊`, text: `Transport to `},
    {name: `Drive`, icon: `🚗`, text: `Drive to `},
    {name: `Flight`, icon: `✈`, text: `Flight to`},
    {name: `Check-in`, icon: `🏨`, text: `Check into a `},
    {name: `Sightseeing`, icon: `🏛️`, text: `Sightseeing `},
    {name: `Restaurant`, icon: `🍴`, text: `Check into a`},
  ],
  city: [`Amsterdam`, `Geneva`, `Chamonix`],
  offers: [`Add luggage`, `Switch to comfort class`, `Add meal`, `Choose seats`],
  description: [`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.`,
    `Nunc fermentum tortor ac porta dapibus.`,
    `In rutrum ac purus sit amet tempus`],
};
