import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public username!: string;
  public password!: string;


  constructor(private userService: UserService, private route: Router) { }

  ngOnInit(): void {
  }

  createUserWithAPI() {
    this.userService.createUser(this.username, this.password).subscribe(response => {
      this.route.navigate(['']);
    },
    error=>{
      console.log(error);
    });
  }
}