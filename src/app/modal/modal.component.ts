import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../movie/movie.class';
import { MovieAPIService } from '../movie-api.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  title: string;
  id: number;
  posterPath: string;
  overview: string;
  releaseDate: string;
  rating: number;
  genreIDs: number[] = [];
  genreNames: string[] = [];
  length: string;
  backdropPath: string;


  closeModal : boolean = false;

  @Input() srcMovie: Movie;

  constructor(private movieApiService: MovieAPIService) { }

  ngOnInit() {
    this.title = this.srcMovie.title;
    this.id = this.srcMovie.id;
    this.posterPath = this.movieApiService.getPosterSrc(this.srcMovie.posterPath);
    this.backdropPath = this.movieApiService.getBackdropSrc(this.srcMovie.backdropPath);
    this.overview = this.srcMovie.overview;
    this.releaseDate = this.srcMovie.releaseDate;
    this.rating = this.movieApiService.getRating(this.srcMovie);
    this.genreIDs = this.movieApiService.getGenreIds(this.srcMovie);
    this.genreNames = this.movieApiService.getGenreNames(this.genreIDs);
    this.movieApiService.searchMovieDetails(this.id).subscribe((data: any) => this.length = data.runtime);

  }

  closeSide() {
    this.closeModal = true;
  }


}
