// make-points.js

const makeElements = (data) => {
  let acc = ``;
  const element = `<article class="trip-point">
          <i class="trip-icon">${data.type.icon}</i>
          <h3 class="trip-point__title">${data.type.text}${data.city}</h3>
          <p class="trip-point__schedule">
            <span class="trip-point__timetable">10:00&nbsp;&mdash; 11:00</span>
            <span class="trip-point__duration">1h 30m</span>
          </p>
          <p class="trip-point__price">&euro;&nbsp;${data.price}</p>
          <ul class="trip-point__offers">
             ${`<li>
              <button class="trip-point__offer">${data.offers}</button>
            </li>`}
          </ul>
        </article>`;
  acc = acc + element;
  return acc;
};

export default (data) => `<section class="trip-day">
      <article class="trip-day__info">
        <span class="trip-day__caption">Day</span>
        <p class="trip-day__number">1</p>
        <h2 class="trip-day__title">Mar 18</h2>
      </article>
      <div class="trip-day__items">
    ${makeElements(data)}
      </div>
    </section>`;
