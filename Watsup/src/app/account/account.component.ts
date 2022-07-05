import { Component, OnInit } from '@angular/core';
import { DialogTokenComponent } from '../dialog/dialog-token/dialog-token.component';
import { MatDialog } from '@angular/material/dialog';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  plateformeList:any;

  constructor(private dialog: MatDialog, private accountService: AccountService) { }

  ngOnInit(): void {
    this.accountService.getPlateformes().subscribe(res => {
      this.plateformeList = res;
      console.log(res);
    });
  }

  ngOnChanges(): void {
  }

  openTokenDialog(){
    var token;
    const dialogRef = this.dialog.open(DialogTokenComponent, {
      width: '1000px',
      data: {token: token},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      token = result;
      console.log(token);
    });
  }
}
