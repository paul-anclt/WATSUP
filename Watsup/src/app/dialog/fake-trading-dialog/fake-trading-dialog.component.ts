import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogData } from 'src/app/interface/dialog-data.model';
import { FakeTradingService } from 'src/app/services/fake-trading.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-fake-trading-dialog',
  templateUrl: './fake-trading-dialog.component.html',
  styleUrls: ['./fake-trading-dialog.component.css']
})
export class FakeTradingDialogComponent implements OnInit {

  valueSell: number = 0;
  valueBuy: number = 0;

  constructor(
    public dialogRef: MatDialogRef<FakeTradingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public fakeTradingService: FakeTradingService,
    public userService: UserService
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }

  getWallets(){
    this.fakeTradingService.getWallets(this.userService.user.id).subscribe(res =>{
      this.fakeTradingService.wallets = res;
      this.fakeTradingService.wallets.sort(function (a, b) { return a.idwallet - b.idwallet; });
    })
  }

  buy(){
    this.fakeTradingService.buyCurrency(this.data.wallet, this.valueBuy).subscribe(res => {
      var e = JSON.parse(JSON.stringify(res));
      this.valueBuy =0;
      this.fakeTradingService.sold = e.sold;
      this.getWallets()
      this.dialogRef.close()
    });
  }

  sell(){
    this.fakeTradingService.sellCurrency(this.data.wallet, this.valueSell).subscribe(res => {
      var e = JSON.parse(JSON.stringify(res));
      this.valueBuy =0;
      this.fakeTradingService.sold = e.sold;
      this.getWallets()
      this.dialogRef.close();
    });
  }
}
