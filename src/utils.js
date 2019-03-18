
export const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export const clearElement = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};


export const createContainer = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};
