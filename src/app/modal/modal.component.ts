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
  rating: string;
  genreIDs: number[] = [];
  genreNames: string[] = [];
  length: string;
  backdropPath: string;


  closeModal : boolean = false;

  @Input() srcMovie: Movie;

  constructor(private movieApiService: MovieAPIService) { }

  ngOnInit() {
  }

  closeSide() {
  }


}
