import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import {initialEvents} from "./main";
import {getTotalPrice} from "./utils";
import {travelToData} from "./data";
import {transportType} from "./data";


const getEventsStats = () => {
  const eventsStats= {
    'labels':[],
    'data':[],
  };
for (const it of initialEvents) {
  eventsStats.data.push(getTotalPrice(it.offers,it.price));
  eventsStats.labels.push(`${travelToData[it.type].text}${it.city} ${travelToData[it.type].icon}`);
}
  return eventsStats;
};

const getTransportStats = () => {
  const transportStats= {
    'labels':[],
    'data':[],
  };

  const array = [];
  for (const it of initialEvents) {
    array.push(it.type);
  }

  for (const it of transportType) {
    const sum = array.filter((elem) => {return elem === it}).length;
    transportStats.data.push(sum);
    transportStats.labels.push(`${travelToData[it].name} ${travelToData[it].icon}`);
  };

 return transportStats;
};


export const showChart = () => {

  const eventsStats = Object.assign({},getEventsStats());
  const transportStats = Object.assign({},getTransportStats());
  const moneyCtx = document.querySelector(`.statistic__money`);
  const transportCtx = document.querySelector(`.statistic__transport`);
  const timeSpendCtx = document.querySelector(`.statistic__time-spend`);

  const BAR_HEIGHT = 65;
  moneyCtx.height = BAR_HEIGHT * 6;
  transportCtx.height = BAR_HEIGHT * 4;
  timeSpendCtx.height = BAR_HEIGHT * 4;

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
          anchor: 'end',
          align: 'start',
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
          anchor: 'end',
          align: 'start',
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


};

