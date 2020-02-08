import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { isUndefined } from 'util';

@Injectable({
  providedIn: "root"
})
export class MovieAPIService {
  private apiKey: string = "56e67f6023e668760235d525751be987";
  private imgQueryBase: string = "https://image.tmdb.org/t/p";
  private baseQueryUrl: string = "https://api.themoviedb.org/3";
  private baseFilterUrl: string =
    `${this.baseQueryUrl}/discover/movie?api_key=${this.apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
  private poster_sizes: string[] = [
    "w92",
    "w154",
    "w185",
    "w342",
    "w500",
    "w780",
    "original"
  ];
  private genreContainer: any[] = [];

  constructor(private http: HttpClient) {
    this.http
      .get(
        `${this.baseQueryUrl}/genre/movie/list?api_key=56e67f6023e668760235d525751be987&language=en-US`
      )
      .subscribe((data: any) => (this.genreContainer = data.genres));
  }

  // calls movie api
  fetchMovieApi() {
    return this.http.get(
      `${this.baseQueryUrl}/discover/movie?api_key=${this.apiKey}&sort_by=release_date.desc`
    );
  }

  searchMovieByName(movieName: string) {
    // Returns English non-adult movies matching the given string
    return this.http.get(
      `${this.baseQueryUrl}/search/movie?api_key=${this.apiKey}&language=en-US&query=${movieName}&page=1&include_adult=false`
    );
  }

  searchMovieDetails(movieID: number) {
    return this.http.get(
      `${this.baseQueryUrl}/movie/${movieID}?api_key=${this.apiKey}&language=en-US`
    );
  }

  getPosterImg(imgURL: string, width: number = 3) {
    // Filtering out invalid width numbers
    if (!(width < 0 || width > this.poster_sizes.length - 1)) {
      return this.http.get(`${this.imgQueryBase}/w${width}${imgURL}`);
    }
  }

  getPosterSrc(imgUrl: string, width: number = 3) {
    return String(`${this.imgQueryBase}/${this.poster_sizes[width]}/${imgUrl}`);
  }

  // // mattes edits for backdrop img and src
  // getBackdropImg(imgURL: string, width: number = 3) {
  //   // Filtering out invalid width numbers
  //   if (!(width < 0 || width > (this.poster_sizes.length - 1))) {
  //     return this.http.get(`${this.imgQueryBase}/w${width}${imgURL}`)
  //   }
  // }

  // // matts edits
  // getBackdropSrc(imgUrl: string, width: number = 3) {
  //   return String(`${this.imgQueryBase}/${this.poster_sizes[width]}/${imgUrl}`);
  // }

  getMovieGenreName(genreID: number) {
    return this.genreContainer.find(x => x.id === genreID).name;
  }

  getNowPlayingMovies() {
    // returns movies that are now playing
    return this.http.get(`${this.baseQueryUrl}/movie/now_playing?api_key=${this.apiKey}&language=en-US&page=1`);
  }

  getFilteredMovies(minReleaseDate: string = '1800-01-01', maxReleaseDate: string = this.getISODateNoTime(new Date()),
    minRating: number = 0, genreIDs: any[] = []) {
    // Oldest movie in API db as of 2020-02-07 is 1874-12-09
    let queryString = `${this.baseFilterUrl}`
    if (minReleaseDate !== '1800-01-01') {
      queryString += `&release_date.gte=${minReleaseDate}`;
    }
    if (maxReleaseDate !== this.getISODateNoTime(new Date())) {
      queryString += `&release_date.lte=${maxReleaseDate}`;
    }
    if (minRating > 0) {
      queryString += `&vote_average.gte=${minRating}`;
    }
    if (genreIDs.length > 0) {
      if (genreIDs.length === 1) {
        queryString += `&with_genres=${this.getGenreId(genreIDs[0].name)}`;
      } else {
        queryString += '&with_genres=';
        for (const genreID of genreIDs) {
          // Filtering out last one for different format
          if (genreIDs.indexOf(genreID) !== (genreIDs.length - 1)) {
            // %2C%20 is apparently how they do commas
            queryString += `${this.getGenreId(genreIDs[0].name)}%2C%20`;
          } else {
            queryString += `${this.getGenreId(genreIDs[0].name)}`;
          }
        }
      }
    }
    return this.http.get(queryString);
  }

  getGenreId(genreName: string) {
    return this.genreContainer.find(g => g.name === genreName).id;
  }

  getISODateNoTime(newDate: Date): string {
    return newDate.toISOString().substring(0, 10);
  }

  getRating(movie: any): number {
    if (isUndefined(movie.rating)) {
      return movie.vote_average;
    } else {
      return movie.rating;
    }
  }

  getPosterPath(movie: any): string {
    if (isUndefined(movie.posterPath)) {
      return this.getPosterSrc(movie.poster_path);
    } else {
      return this.getPosterSrc(movie.posterPath);
    }
  }

  getGenreIds(movie: any): any[] {
    if (isUndefined(movie.genreIDs)) {
      return movie.genre_ids;
    } else {
      return movie.genreIDs;
    }
  }

  getGenreNames(genres: any[]): string[] {
    let genreNames = [];
    for (const genre of genres) {
      genreNames.push(this.getMovieGenreName(genre));
    }
    return genreNames;
  }
}
