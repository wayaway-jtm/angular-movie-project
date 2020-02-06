import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MovieAPIService {
  private apiKey: string = '56e67f6023e668760235d525751be987';
  private imgQueryBase: string = 'https://image.tmdb.org/t/p';
  private poster_sizes: string[] = ["w92", "w154", "w185", "w342", "w500", "w780", "original"];
  private genreContainer: any[] = [];

  public settings : any;

  constructor(
    private http: HttpClient
  ) { 
    this.http.get('https://api.themoviedb.org/3/genre/movie/list?api_key=56e67f6023e668760235d525751be987&language=en-US').subscribe((data: any) => this.genreContainer = data.genres);
  
    // all of the search criteria
    this.settings = {
      genres: [],
      rating: null,
      releaseDate: {
        start: null,
        end: null
      }
    }
  }

  // calls movie api
  fetchMovieApi() {
    return this.http.get(`https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}&sort_by=release_date.desc`);
  }

  searchMovieByName(movieName: string) {
    // Returns English non-adult movies matching the given string
    return this.http.get(`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&language=en-US&query=${movieName}&page=1&include_adult=false`);
  }

  searchMovieDetails(movieID: number) {
    return this.http.get(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${this.apiKey}&language=en-US`);
  }

  getPosterImg(imgURL: string, width: number = 3) {
    // Filtering out invalid width numbers
    if (!(width < 0 || width > (this.poster_sizes.length - 1))) {
      return this.http.get(`${this.imgQueryBase}/w${width}${imgURL}`)
    }
  }

  getPosterSrc(imgUrl: string, width: number = 3) {
    return String(`${this.imgQueryBase}/${this.poster_sizes[width]}/${imgUrl}`);
  }

  getMovieGenreName(genreID: number) {
    
    return this.genreContainer.find(x => x.id === genreID).name;
  }

  // gets release date info and sends it to search criteria.ts
  getReleaseDatesURL(url : string) {

    if ( this.settings.releaseDate.start ) {
      url += '&release_date.gte=' + this.settings.releaseDate.start;
    }

    if ( this.settings.releaseDate.end ) {
      url += '&release_date.lte=' + this.settings.releaseDate.end;
    }

    return url;
  }

  // get rating info and sends it to search criteria.ts
  getRatingURL(url : string) {
    if (this.settings.rating ) {
      url += '&vote_count.gte' + this.settings.rating;
    }
  }

  getFullUrl() {
    let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${this.apiKey}&language=en-US&page=1`;

    url = this.getReleaseDatesURL(url)

    return url;
  }

  getNowPlayingMovies() {
    // returns movies that are now playing
    return this.http.get( this.getFullUrl() );
  }
}
