import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username!: string;
  public password!: string;


  constructor(private userService: UserService, private route: Router) { }

  ngOnInit(): void {
  }

  connectUserWithAPI() {
    this.userService.connectUser(this.username, this.password).subscribe(response => {
      this.userService.user = response;
      console.log(this.userService.user);
      this.route.navigate(['']);
    },
    error=>{
      console.log(error);
    });
  }


}
