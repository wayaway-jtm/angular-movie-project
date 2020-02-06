import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../movie/movie.class';
import { MovieAPIService } from '../movie-api.service';

@Component({
  selector: 'movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  @Input() movieList: Movie[] = [];

  constructor(private movieApiService: MovieAPIService) { }

  ngOnInit() {
    // this.movieApiService.getNowPlayingMovies().subscribe((data: any) => {
    //   for (const movie of data.results) {
    //     this.movieList.push(new Movie(movie));
    //   }
    // });
  }

  displayMovies(movies: Movie[]) {
    this.movieList = movies;
  }
}
