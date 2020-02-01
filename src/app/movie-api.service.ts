import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MovieAPIService {

  constructor(
    private http: HttpClient
  ) { }

  // calls movie api
  fetchMovieApi() {
    return this.http.get('https://api.themoviedb.org/3/movie/550?api_key=56e67f6023e668760235d525751be987');
  }
}
