import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public userlastname!: string;
  public userfirstname!: string;
  public useremail!: string;
  public password!: string;


  constructor(private userService: UserService, private route: Router) { }

  ngOnInit(): void {
  }

  createUserWithAPI() {
    this.userService.createUser(this.userlastname, this.userfirstname, this.useremail, this.password).subscribe(response => {
      this.route.navigate(['']);
    },
    error=>{
      console.log(error);
    });
  }
}
