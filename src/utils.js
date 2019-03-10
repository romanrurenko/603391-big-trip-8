
export const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export const clearElement = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

