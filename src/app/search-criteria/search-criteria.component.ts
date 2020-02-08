import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MovieAPIService } from '../movie-api.service';
import { Movie } from '../movie/movie.class';
import { isUndefined } from 'util';

@Component({
  selector: 'search-criteria',
  templateUrl: './search-criteria.component.html',
  styleUrls: ['./search-criteria.component.css']
})
export class SearchCriteriaComponent implements OnInit {

  sideMenu: boolean = false;
  genreID: [];
  releaseDateUrl: string;
  ratingID: string;
  searchResults: any[] = [];
  genres = [
    { name: 'Action', checked: false },
    { name: 'Comedy', checked: false },
    { name: 'Adventure', checked: false },
    { name: 'Crime', checked: false },
    { name: 'Drama', checked: false },
    { name: 'Epics', checked: false },
    { name: 'Thriller', checked: false },
    { name: 'Musicals/Dance', checked: false },
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
  selectedRating: number = 0;
  minDate = '1800-01-01';
  maxDate = '';
  movieTitle = '';

  @Output() userSearch = new EventEmitter<Movie[]>();

  constructor(public service: MovieAPIService) {
    this.maxDate = service.getISODateNoTime(new Date());
  }

  ngOnInit() {
  }

  toggleSide() {
    this.sideMenu = !this.sideMenu;
  }

  filter() {
    // get selected genres
    let selectedGenres = this.genres.filter(g => g.checked);

    // selected release dates & rating already handled
    // Filtering out user-provided movie title
    if (this.movieTitle === '') {
      this.service.getFilteredMovies(this.minDate, this.maxDate, this.selectedRating, selectedGenres).subscribe(
        (data: any) => this.searchResults = data.results,
        err => console.log('Error: ', err),
        () => this.userSearch.emit(this.searchResults));
    } else {
      console.log('Searching...');
      this.service.searchMovieByName(this.movieTitle).subscribe(
        (data: any) => this.searchResults = data.results,
        err => console.log('Error: ', err),
        () => {
          if (this.minDate !== '1800-01-01') {
            this.searchResults = this.searchResults.filter(m => {
              if (isUndefined(m.releaseDate)) {
                return m.release_date > this.minDate;
              } else {
                return m.releaseDate > this.minDate;
              }
            });
          }
          console.log(this.searchResults);
          if (this.maxDate !== this.service.getISODateNoTime(new Date())) {
            this.searchResults = this.searchResults.filter(m => {
              if (isUndefined(m.releaseDate)) {
                return m.release_date < this.maxDate;
              } else {
                return m.releaseDate < this.maxDate;
              }
            });
          }
          console.log(this.searchResults);
          if (this.selectedRating > 0) {
            this.searchResults = this.searchResults.filter(m => {
              if (isUndefined(m.rating)) {
                return m.vote_average > this.selectedRating;
              } else {
                return m.rating > this.selectedRating;
              }
            });
          }
          console.log(this.searchResults);
          if (selectedGenres.length > 0) {
            this.searchResults = this.searchResults.filter(m => {
              for (const genre of selectedGenres) {
                if (m.genre_ids.includes(this.service.getGenreId(genre.name))) {
                  return true;
                }
              }
              return false;
            });
          }
          console.log(this.searchResults);
          this.userSearch.emit(this.searchResults);
        });
    }
  }

  titleSearch() {
    this.service.searchMovieByName(this.movieTitle).subscribe(
      (data: any) => this.searchResults = data.results,
      err => console.log('Error: ', err),
      () => this.userSearch.emit(this.searchResults));
  }

  checkRating(hitRating) {
    this.selectedRating = hitRating;
  }

  openSide() {
    this.sideMenu = true;
  }

  // closes side menu
  closeSide() {
    this.sideMenu = false;
  }
  // // selects genres
  // selectGenre(genreId) {
  //   this.service.settings.genre.push(genreId);
  // }
  // // chooses release date times 
  // selectReleaseDate(releaseDateUrl) {
  //   this.service.settings.releaseDate.push(releaseDateUrl);
  // }
  // // sets desired MAX rating
  // selectRating(ratingId) {
  //   this.service.settings.rating.push(ratingId);
  //   console.log("10 Star");
  // }

}
