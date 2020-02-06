import { Component, OnInit } from '@angular/core';
import { MovieAPIService } from '../movie-api.service';

@Component({
  selector: 'search-criteria',
  templateUrl: './search-criteria.component.html',
  styleUrls: ['./search-criteria.component.css']
})
export class SearchCriteriaComponent implements OnInit {

  constructor(public service : MovieAPIService) { }

  sideMenu : boolean = false;
  genreID : [];
  releaseDateUrl : string;
  ratingID : string;


  ngOnInit() {
  }

  toggleSide() {
    this.sideMenu = !this.sideMenu;
  }

  openSide() {
    this.sideMenu = true;
  }

  // closes side menu
  closeSide() {
    this.sideMenu = false;
  }
  // selects genres
  selectGenre(genreId) {
    this.service.settings.genre.push(genreId);
  }
  // sets desired MAX rating
  selectRating(ratingId) {
    this.service.settings.push(ratingId);
  }

}
