import { IMovieInfo } from '../imovie-info';

export class Movie implements IMovieInfo {
    title: string;
    id: number;
    posterPath: string;
    overview: string;
    releaseDate: string;
    rating: string;
    genreIDs: number[];
    length: string;

    constructor(srcMovie: any) {
        this.title = srcMovie.title;
        this.id = srcMovie.id;
        this.posterPath = srcMovie.poster_path;
        this.overview = srcMovie.overview;
        this.releaseDate = srcMovie.release_date;
        this.rating = srcMovie.vote_average;
        this.genreIDs = srcMovie.genres;
        this.length = srcMovie.runtime;
    }
}