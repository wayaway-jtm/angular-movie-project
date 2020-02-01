// I've read it's best to import a service first
import { MovieAPIService } from "../movie-api.service";
import { Component, OnInit } from "@angular/core";
import { IMovieInfo } from "../imovie-info";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {

  movies: IMovieInfo[];

  constructor(private movieApiService: MovieAPIService) {}

  ngOnInit() {}

  // calls the movie api from movie-api service
  callMovies() {
    this.movieApiService.fetchMovieApi().subscribe((data: any) => {
      this.movies = data;
      console.log(data);
    });
  }
}
