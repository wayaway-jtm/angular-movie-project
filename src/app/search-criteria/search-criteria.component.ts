import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MovieAPIService } from '../movie-api.service';
import { Movie } from '../movie/movie.class';

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
  searchResults: Movie[] = [];
  genres = [
    { name: 'Action', checked: false},
    { name: 'Comedy', checked: false},
    { name: 'Adventure', checked: false},
    { name: 'Crime', checked: false},
    { name: 'Drama', checked: false},
    { name: 'Epics', checked: false},
    { name: 'Thriller', checked: false},
    { name: 'Musicals/Dance', checked: false},
  ];
  ratings = [
    { value: 10, checked: false },
    { value: 9, checked: false },
    { value: 8, checked: false },
    { value: 7, checked: false },
    { value: 6, checked: false },
    { value: 5, checked: false },
    { value: 4, checked: false },
    { value: 3, checked: false },
    { value: 2, checked: false },
    { value: 1, checked: false }
  ];

  @Output() userSearch = new EventEmitter<Movie[]>();

  ngOnInit() {
  }

  toggleSide() {
    this.sideMenu = !this.sideMenu;
  }

  search() {
    
  }

  chooseRating(eventVar: number) {
    this.ratings[this.ratings.findIndex(x => x.value === eventVar)].checked = true;
    console.log(this.ratings);
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
  // chooses release date times 
  selectReleaseDate(releaseDateUrl) {
    this.service.settings.releaseDate.push(releaseDateUrl);
  }
  // sets desired MAX rating
  selectRating(ratingId) {
    this.service.settings.rating.push(ratingId);
    console.log("10 Star");
  }

}
