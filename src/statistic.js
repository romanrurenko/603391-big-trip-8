import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {transportType, travelToData, travelType} from "./data/mock-data";
import {formatDuration, getDuration} from "./utils";
import moment from 'moment';

const moneyCtx = document.querySelector(`.statistic__money`);
const transportCtx = document.querySelector(`.statistic__transport`);
const timeSpendCtx = document.querySelector(`.statistic__time-spend`);


const getEventsStats = (eventsArray) => {
  const eventsStats = {};
  const eventsPrices = {
    'labels': [],
    'data': [],
  };
  for (const it of travelType) {
    eventsStats[it]=0;
  }
  for (const it of eventsArray) {
    eventsStats[it.type] += it.price;
  }
  for (const it of travelType) {
    eventsPrices.data.push(eventsStats[it]);
    eventsPrices.labels.push(`${travelToData[it].name} ${travelToData[it].icon}`);
  }
  return eventsPrices;
};

const getTransportStats = (eventsArray) => {
  const transportStats = {
    'labels': [],
    'data': [],
  };

  const array = [];
  for (const it of eventsArray) {
    array.push(it.type);
  }

  for (const it of transportType) {
    const sum = array.filter((elem) => {
      return elem === it;
    }).length;
    transportStats.data.push(sum);
    transportStats.labels.push(`${travelToData[it].name} ${travelToData[it].icon}`);
  }

  return transportStats;
};

const getTimeStats = (eventsArray) => {
  const eventsStats = {};
  const eventsTime = {
    'labels': [],
    'data': [],
  };
  for (const it of travelType) {
    eventsStats[it]=0;
  }
  for (const it of eventsArray) {
    eventsStats[it.type] += getDuration(new Date(it.dateFrom),new Date(it.dateTo));
  }
  for (const it of travelType) {
    eventsTime.data.push(eventsStats[it]);
    eventsTime.labels.push(`${travelToData[it].name} ${travelToData[it].icon}`);
  }
  return eventsTime;
};

export const showChart = (eventsData) => {

  const eventsStats = Object.assign({}, getEventsStats(eventsData));
  const transportStats = Object.assign({}, getTransportStats(eventsData));
  const timeStats = Object.assign({}, getTimeStats(eventsData));

  const BAR_HEIGHT = 55;
  moneyCtx.height = BAR_HEIGHT * 10;
  transportCtx.height = BAR_HEIGHT * 7;
  timeSpendCtx.height = BAR_HEIGHT * 10;

 const moneyChart = new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: eventsStats.labels,
      datasets: [{
        data: eventsStats.data,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `€ ${val}`
        }
      },
      title: {
        display: true,
        text: `MONEY`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });

 const transportChart = new Chart(transportCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: transportStats.labels,
      datasets: [{
        data: transportStats.data,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}x`
        }
      },
      title: {
        display: true,
        text: `TRANSPORT`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });

 const timeChart = new Chart(timeSpendCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: timeStats.labels,
      datasets: [{
        data: timeStats.data,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${formatDuration(val)}`
        }
      },
      title: {
        display: true,
        text: `TIME`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });





};

