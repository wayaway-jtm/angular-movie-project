import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MovieAPIService {
  private apiKey: string = '56e67f6023e668760235d525751be987'
  private imgQueryBase: string = 'https://image.tmdb.org/t/p';
  private poster_sizes: string[] = ["w92", "w154", "w185", "w342", "w500", "w780", "original"]

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

  searchMovieByID(movieID: number) {
    return this.http.get(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${this.apiKey}&language=en-US`);
  }

  getPosterImg(imgURL: string, width: number = 3) {
    // Filtering out invalid width numbers
    if (!(width < 0 || width > (this.poster_sizes.length - 1))) {
      return this.http.get(`${this.imgQueryBase}/w${width}${imgURL}`)
    }
  }

  getMovieGenreName(genreID: number) {
    let genreContainer: any = this.http.get('https://api.themoviedb.org/3/genre/movie/list?api_key=56e67f6023e668760235d525751be987&language=en-US');
    let genreList: any[] = genreContainer.genres;
    return genreList.find(x => x.id === genreID);
  }
}
