import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../movie/movie.class';

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
  closeResult: string;

  @Input() srcMovie: Movie;

  constructor() { }

  ngOnInit() {
    this.title = this.srcMovie.title;
    this.id = this.srcMovie.id;
    this.posterPath = this.srcMovie.posterPath;
    this.overview = this.srcMovie.overview;
    this.releaseDate = this.srcMovie.releaseDate;
    this.rating = this.srcMovie.rating;
    this.genreIDs = this.srcMovie.genreIDs;
  }

  openModal(id: string) {

  }

  closeModal(id: string) {

  }


}
