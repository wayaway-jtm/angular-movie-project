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
    // this.movieApiService.searchMovieDetails(8681).subscribe((data: any) => this.movieList.push(new Movie(data)));
    // this.movieList.push(newMovie);

    this.movieApiService.getNowPlayingMovies().subscribe((data: any) => {
      for (const movie of data.results) {
        this.movieList.push(new Movie(movie));
      }});
    


  }

}
