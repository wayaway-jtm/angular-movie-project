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

  filterButton() {
    this.dropDown = true;
    console.log("Hello World")
  }

}
