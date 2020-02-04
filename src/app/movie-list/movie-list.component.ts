import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie/movie.class';
import { MovieAPIService } from '../movie-api.service';

@Component({
  selector: 'movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  movieList: Movie[] = [];

  constructor(private movieApiService: MovieAPIService) { }

  ngOnInit() {
    let newMovie = this.movieApiService.searchMovieByname(86813).subscribe((data: any) => this.movieList.push(new Movie(data)));
    this.movieList.push();
  }

}
