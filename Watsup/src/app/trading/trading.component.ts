import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TradingService } from '../services/trading.service';

@Component({
  selector: 'app-trading',
  templateUrl: './trading.component.html',
  styleUrls: ['./trading.component.css']
})
export class TradingComponent implements OnInit {

  constructor(private tradingService: TradingService, private route: Router) { }

  public asset!: string;

  ngOnInit(): void {
    this.getAssetsInfo()
  }
  getAssetsInfo() {
    this.tradingService.getAssetsInfo(this.asset).subscribe(response => {
      console.log(response);
    })
  }
}
