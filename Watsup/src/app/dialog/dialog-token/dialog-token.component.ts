import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogTokenData } from 'src/app/interface/dialog-token-data.model';

@Component({
  selector: 'app-dialog-token',
  templateUrl: './dialog-token.component.html',
  styleUrls: ['./dialog-token.component.css']
})
export class DialogTokenComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<DialogTokenComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogTokenData
              ) { }

  ngOnInit(): void {
  }
}
