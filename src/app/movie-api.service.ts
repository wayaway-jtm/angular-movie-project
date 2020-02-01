import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MovieAPIService {
  private apiKey: string = '56e67f6023e668760235d525751be987'

  constructor(
    private http: HttpClient
  ) { }

  // calls movie api
  fetchMovieApi() {
    return this.http.get(`https://api.themoviedb.org/3/movie/550?api_key=${this.apiKey}`);
  }

  searchMovieByName(movieName: string) {
    // Returns English non-adult movies matching the given string
    return this.http.get(`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&language=en-US&query=${movieName}&page=1&include_adult=false`);
  }
}
