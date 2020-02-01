export interface IMovieInfo {
    data: {
        title: string;
        id: number;
        // Not including 'adult' options cuz let's just skip it
        posterPath: string;
        overview: string;
        releaseDate: string;
        rating: string; // Is this supposed to be popularity or vote_average?
        genreIDs: number[];
        // length: string; API doesn't include movie length.
        //                  We'd have to implement IMDB or some
        //                  other API for that.
    }
}
