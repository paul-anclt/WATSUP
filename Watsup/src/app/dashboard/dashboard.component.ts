import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileComponent } from '../profile/profile.component';
import { DashboardService } from '../services/dashboard.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  host: {'class': 'w-4/6'}

})
export class DashboardComponent implements OnInit {

  res : any ;
  res2 : any;

  constructor(private dashboardService: DashboardService, private route: Router) {}

  ngOnInit(): void {
    this.getAssetsInfo()
  }

  getAssetsInfo() {
    this.dashboardService.getAssetsInfo("BTC").subscribe(response => {
      this.res = response[Object.keys(response)[0]];
      console.log(response);
    })

    this.dashboardService.getAssetsInfo("ETH").subscribe(response => {
      this.res2 = response[Object.keys(response)[0]];
      console.log(response);
    })

  }
}

