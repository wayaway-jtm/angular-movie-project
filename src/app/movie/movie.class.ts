import { IMovieInfo } from '../imovie-info';
import { MovieAPIService } from '../movie-api.service';
import { isUndefined } from 'util';

export class Movie implements IMovieInfo {
    title: string;
    id: number;
    posterPath: string;
    overview: string;
    releaseDate: string;
    rating: string;
    genreIDs: number[] = [];
    length: string;
    backdropPath: string;

    constructor(srcMovie: any) {
        this.title = srcMovie.title;
        this.id = srcMovie.id;
        this.posterPath = srcMovie.poster_path;
        this.backdropPath = srcMovie.backdrop_path;
        this.overview = srcMovie.overview;
        this.releaseDate = srcMovie.release_date;
        this.rating = srcMovie.vote_average;
        if(isUndefined(srcMovie.genre_ids)) {
            for (const genre of srcMovie.genres) {
                this.genreIDs.push(genre.id);
            }
        } else {
            this.genreIDs = srcMovie.genre_ids;
        }
    }
}