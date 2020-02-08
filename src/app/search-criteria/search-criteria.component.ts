import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { MovieAPIService } from "../movie-api.service";
import { Movie } from "../movie/movie.class";

@Component({
  selector: "search-criteria",
  templateUrl: "./search-criteria.component.html",
  styleUrls: ["./search-criteria.component.css"]
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
    { name: 'Music', checked: false },
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
  minDate = '1800-01-01';
  maxDate = '';
  movieTitle = '';

  @Output() userSearch = new EventEmitter<Movie[]>();

  constructor(public service: MovieAPIService) {
    this.maxDate = service.getISODateNoTime(new Date());
  }

  ngOnInit() {}

  toggleSide() {
    this.sideMenu = !this.sideMenu;
  }

  filter() {
    // get selected genres
    let selectedGenres = this.genres.filter(g => g.checked);

    // get selected rating
    let minRating = this.getMinRating();

    // selected release dates already handled
    // Filtering out user-provided movie title
    if (this.movieTitle === '') {
      this.service.getFilteredMovies(this.minDate, this.maxDate, minRating, selectedGenres).subscribe(
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
            this.searchResults = this.searchResults.filter(m => m.releaseDate > this.minDate);
          }
          if (this.maxDate !== this.service.getISODateNoTime(new Date())) {
            this.searchResults = this.searchResults.filter(m => m.releaseDate < this.maxDate);
          }
          if (minRating > 0) {
            this.searchResults = this.searchResults.filter(m => m.rating > minRating);
          }
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

  getMinRating(): number {
    let minRating: number = 0;
    for (const star of this.ratings) {
      if (star.checked) {
        minRating = star.value;
      }
    }
    return minRating;
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
