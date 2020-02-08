import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IMovieInfo } from '../imovie-info';
import { MovieAPIService } from '../movie-api.service';
import { Movie } from './movie.class';
import { WatchlistService } from '../watchlist.service';
import { isUndefined } from 'util';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  title: string;
  id: number;
  posterPath: string;
  overview: string;
  releaseDate: string;
  rating: number;
  genreIDs: number[] = [];
  genreNames: string[] = [];
  length: string;
  showModal: boolean = false;
  @Input() srcMovie: any;


  toggleModal() {
    this.showModal = true;
  }

  isSaved() {
    return this.watchlistService.hasMovieId(this.id);
  }

  toggleSaved(movieId: number) {
    if (!this.watchlistService.hasMovieId(movieId)) {
      this.watchlistService.addMovie(movieId);
    } else {
      this.watchlistService.removeMovie(movieId);
    }

  }

  constructor(private movieApiService: MovieAPIService, private watchlistService: WatchlistService) { }

  ngOnInit() {
    this.title = this.srcMovie.title;
    this.id = this.srcMovie.id;
    this.overview = this.srcMovie.overview;
    this.releaseDate = this.srcMovie.releaseDate;
    this.rating = this.movieApiService.getRating(this.srcMovie);
    this.posterPath = this.movieApiService.getPosterPath(this.srcMovie);
    this.genreIDs = this.movieApiService.getGenreIds(this.srcMovie);
    this.genreNames = this.movieApiService.getGenreNames(this.genreIDs);
    this.movieApiService.searchMovieDetails(this.id).subscribe((data: any) => this.length = data.runtime);
  }
}
