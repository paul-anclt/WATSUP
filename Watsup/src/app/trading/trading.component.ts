import { Component, ElementRef, NgModule, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { TradingService } from '../services/trading.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-trading',
  templateUrl: './trading.component.html',
  styleUrls: ['./trading.component.css'],
})

export class TradingComponent implements OnInit {

  res : any;
  asks : any;
  bids : any;
  buyValue : any = 0;
  sellValue : any = 0;


  constructor(private tradingService: TradingService, private route: Router) { }

  public asset!: string;

  ngOnInit(): void {
    this.getAssetsInfo()
    // interval(5000).subscribe((val) => this.getAssetsInfo());
    this.getOrderBook()
    // interval(5000).subscribe((val) => this.getOrderBook());

  }
  getAssetsInfo() {
    this.tradingService.getAssetsInfo("ETH").subscribe(response => {
      this.res = response[Object.keys(response)[0]];
      console.log(response);
    })
  }
  getOrderBook() {
    this.tradingService.getOrderBook("ETH").subscribe(response => {
      this.asks = response[Object.keys(response)[0]].asks;
      this.bids = response[Object.keys(response)[0]].bids;
      this.asks.forEach(element => {
        element[2] = new Date(element[2]*1000).toTimeString().split(" ")[0]
      });
      this.bids.forEach(element => {
        element[2] = new Date(element[2]*1000).toTimeString().split(" ")[0]
      });
      console.log(this.asks);
      console.log(this.bids);
    })
  }
  buy(){
    this.tradingService.buy("buy","market",this.buyValue,"XETHZUSD").subscribe(response => {
      console.log(response);
    })
  }
  sell(){
    this.tradingService.sell("sell","market",this.buyValue,"XETHZUSD").subscribe(response => {
      console.log(response);
    })
  }
}
