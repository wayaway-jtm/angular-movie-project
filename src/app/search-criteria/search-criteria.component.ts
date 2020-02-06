import { Component, OnInit } from '@angular/core';
import { MovieAPIService } from '../movie-api.service';

@Component({
  selector: 'search-criteria',
  templateUrl: './search-criteria.component.html',
  styleUrls: ['./search-criteria.component.css']
})
export class SearchCriteriaComponent implements OnInit {

  constructor(public service : MovieAPIService) { }

  dropDown : boolean = false;

  ngOnInit() {
  }

  // opens side menu to filter search content
  openSide() {
    this.dropDown = true;
  }

  selectGenre(genreId) {
    this.service.settings.genre.push(genreId);
  }
  // closes side menu
  closeSide() {
    this.dropDown = false;
  }

}
