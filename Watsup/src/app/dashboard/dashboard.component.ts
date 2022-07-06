import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileComponent } from '../profile/profile.component';
import { DashboardService } from '../services/dashboard.service';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  host: {'class': 'w-4/6'}

})
export class DashboardComponent implements OnInit {

  res : any ;
  res2 : any;
  plateformes : any;
  tab : [];

  constructor(private dashboardService: DashboardService, private route: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.getAssetsInfo()
    this.getUsersPlateformes()
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

  getUsersPlateformes(){
    this.dashboardService.userPlateformes(this.userService.user.id).subscribe(res => {
      this.plateformes = res;
      console.log(this.tab)
    })
  }

 
}

