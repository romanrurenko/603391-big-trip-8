import moment from 'moment';

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

export const getElementPrice = (data, price) => {
  let sum = 0;
  for (const it of data) {
    sum += Number(it.price);
  }
  sum += Number(price);
  return sum;
};

export const getDuration = (from, to) => {
  const duration = moment.duration((moment(to)).diff(moment(from)));
  return duration;
};

export const formatDuration = (data) => {
  const duration = moment.duration(data);
  const hours = Math.trunc(duration.asHours()) % 24;
  const minutes = Math.trunc(duration.asMinutes() % 60);
  const days = Math.trunc(duration.asDays() % 365);
  const durationFormated  = `${(days)?(days+`D`):``} ${(hours)?(hours+`H`):``} ${(minutes)?(minutes+`M`):``}`;
  return durationFormated;
};



export const showMessage = (text) => {
  const messageContainer = document.querySelector(`.message`);
  messageContainer.classList.remove('visually-hidden');
  messageContainer.innerText = text;
};

export const getTotalPrice = (data) => {
  let sum = 0;
  for (const it of data) {
    it.totalPrice = getElementPrice(it.offers, it.price);
    sum = sum + Number(it.totalPrice);
  }
  return sum;
};
