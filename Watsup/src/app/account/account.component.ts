import { Component, OnInit } from '@angular/core';
import { DialogTokenComponent } from '../dialog/dialog-token/dialog-token.component';
import { MatDialog } from '@angular/material/dialog';
import { AccountService } from '../services/account.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  plateformeList: any;
  connectionList: any;

  constructor(private route: Router, private dialog: MatDialog, private accountService: AccountService, private userService: UserService) { }

  ngOnInit(): void {
    if(this.userService.user == null){
      this.route.navigate(['login']);
    }
    this.accountService.getPlateformes().subscribe(res => {
      this.plateformeList = res;
    });
    this.getUserConnections();
  }

  ngOnChanges(): void {
  }

  searchPlateformeName(id: number){
    var p = this.plateformeList.find(element => element.idplateforme === id)
    return p.nomplateforme
  }

  openTokenDialog(idPlateforme: number){
    var tokens;
    const dialogRef = this.dialog.open(DialogTokenComponent, {
      width: '1000px',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
      tokens = result;
      //console.log(tokens);

      this.addConnection(idPlateforme, this.userService.user.id, tokens.publicToken, tokens.privateToken)
    });
  }

  getUserConnections(){
    this.accountService.userConnections(this.userService.user.id).subscribe(res => {
      this.connectionList = res;
      console.log(res);
    })
  }

  addConnection(idPlateforme, idUser, publicToken, privateToken){
    this.accountService.addConnection(idPlateforme, idUser, publicToken, privateToken).subscribe(res => {
      this.getUserConnections();
    })
  }

  deleteConnection(idConnecter){
    this.accountService.deleteConnection(idConnecter).subscribe( res => {
      this.getUserConnections();

    })
  }
}
