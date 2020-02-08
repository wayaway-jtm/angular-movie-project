import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  rating: string;
  genreIDs: number[] = [];
  genreNames: string[] = [];
  length: string;
  backdropPath: string;


  show : boolean = false;
  @Output() toggle = new EventEmitter()
  @Input() srcMovie: Movie;

  constructor(private movieApiService: MovieAPIService) { }

  ngOnInit() {
    this.title = this.srcMovie.title;
    this.id = this.srcMovie.id;
    this.posterPath = this.movieApiService.getPosterSrc(this.srcMovie.posterPath);
    this.overview = this.srcMovie.overview;
    this.releaseDate = this.srcMovie.releaseDate;
    this.rating = this.srcMovie.rating;
    this.genreIDs = this.srcMovie.genreIDs;
    this.length = this.srcMovie.length;
    for (const genre of this.genreIDs) {
      this.genreNames.push(this.movieApiService.getMovieGenreName(genre));
    }
    this.movieApiService.searchMovieDetails(this.id).subscribe((data: any) => this.length = data.runtime);

  }

  toggleModal() {
    this.toggle.emit()
    console.log("hi");
  }


}
