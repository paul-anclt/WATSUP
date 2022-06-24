import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-info',
  templateUrl: './change-info.component.html',
  styleUrls: ['./change-info.component.css'],
  host: {'class': 'w-4/6'}
})
export class ChangeInfoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
