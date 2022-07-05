import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { TradingService } from '../services/trading.service';

@Component({
  selector: 'app-trading',
  templateUrl: './trading.component.html',
  styleUrls: ['./trading.component.css']
})
export class TradingComponent implements OnInit {

  res : any;

  constructor(private tradingService: TradingService, private route: Router) { }

  public asset!: string;

  ngOnInit(): void {
    this.getAssetsInfo()
    // interval(10000).subscribe((val) => this.getAssetsInfo());
  }
  getAssetsInfo() {
    this.tradingService.getAssetsInfo("ETH").subscribe(response => {
      this.res = response[Object.keys(response)[0]];
      console.log(response);
    })
  }
}
