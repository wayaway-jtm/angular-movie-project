import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'search-criteria',
  templateUrl: './search-criteria.component.html',
  styleUrls: ['./search-criteria.component.css']
})
export class SearchCriteriaComponent implements OnInit {

  constructor() { }

  dropDown : boolean = false;

  ngOnInit() {
  }

  openSide() {
    this.dropDown = true;
    console.log("Hello World")
  }
  closeSide() {
    this.dropDown = false;
  }

}
