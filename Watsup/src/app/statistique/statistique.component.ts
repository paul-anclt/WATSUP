import { Component, OnInit } from '@angular/core';
declare var google: any;

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.css'],
})
export class StatistiqueComponent {
  title = 'Watsup';
  chartData: any = {
    type: 'LineChart',
    data: [
      [1, 37.8, 80.8, 41.8],
      [2, 30.9, 69.5, 32.4],
      [3, 25.4, 57, 25.7],
      [4, 11.7, 18.8, 10.5],
      [5, 11.9, 17.6, 10.4],
      [6, 8.8, 13.6, 7.7],
      [7, 7.6, 12.3, 9.6],
      [8, 12.3, 29.2, 10.6],
      [9, 16.9, 42.9, 14.8],
      [10, 12.8, 30.9, 11.6],
      [11, 5.3, 7.9, 4.7],
      [12, 6.6, 8.4, 5.2],
    ],

    columnNames: ['LTC', 'Ethereum', 'BUSD', 'Bitcoin'],
    options: {
      hAxis: {
        title: 'Evaluation de votre cryptomonnaie sur 12 mois',
      },
      vAxis: {
        title: 'en millions de dollars (USD)',
      },
      backgroundColor: {
        fill: '#f5f5f5',
        stroke: '#f5f5f5',
      },
      chartArea: {
        backgroundColor: {
          stroke: "transparent",
          fill: "transparent",
        }
      },
    },
    titleTextStyle: {
      bold: 'true',
      color: 'white',
    },

    width: 700,
    height: 500,
  };
  pieData: any = {
    type: 'PieChart',
    data: [
      ['Bitcoin', 5.2],

      ['Dogecoin', 2.8],

      ['Ethereum', 1.2],

      ['BUSD', 0.8],
    ],
    options: {
      title:
        'La part de chaque cryptomonnaie dans votre portefeuille',
      backgroundColor: {
        fill: '#f5f5f5',
        stroke: '#f5f5f5',
      },
      titleTextStyle: {
        bold: 'true',
        color: 'black',
      },
      width: 500,
      height: 300,
    },
  };
}
