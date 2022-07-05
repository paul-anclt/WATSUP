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

  ngOnInit(): void {
    this.test()
  }
  test() {
    this.tradingService.test().subscribe(response => {
      console.log(response);
    })
  }
}
