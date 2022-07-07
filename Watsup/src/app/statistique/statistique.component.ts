import { Component, OnInit, NgModule } from '@angular/core';
import { StatistiqueService } from '../services/statistique.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

declare var google: any;

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.css'],
})
export class StatistiqueComponent implements OnInit {

  res : any ;
  res2 : any;
  res3 : any;
  plateformes : any;
  tab : [];

  constructor(private statistiqueService: StatistiqueService, private route: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.getAssetsInfo()
    this.getUsersPlateformes()
  }

  getAssetsInfo() {
    this.statistiqueService.getAssetsInfo("BTC").subscribe(response => {
      this.res = response[Object.keys(response)[0]];
      console.log(response);
    })

    this.statistiqueService.getAssetsInfo("ETH").subscribe(response => {
      this.res2 = response[Object.keys(response)[0]];
      console.log(response);
    })

    this.statistiqueService.getAssetsInfo("USDT").subscribe(response => {
      this.res3 = response[Object.keys(response)[0]];
      console.log(response);
    })

  }

  getUsersPlateformes(){
    this.statistiqueService.userPlateformes(this.userService.user.id).subscribe(res => {
      this.plateformes = res;
      console.log(this.tab)
    })
  }

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

    columnNames: ['LTC', 'Ethereum', 'Bitcoin', 'USDT'],
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

    width: 900,
    height: 300,
  };
  pieData: any = {
    type: 'PieChart',
    data: [
      ['Bitcoin', 69703.5],

      ['Ethereum', 9633.8],

      ['USDT', 475.5714],
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
      width: 600,
      height: 300,
    },
  };
}
