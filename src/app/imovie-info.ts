export interface IMovieInfo {
    title: string;
    id: number;
    // Not including 'adult' options cuz let's just skip it
    posterPath: string;
    overview: string;
    releaseDate: string;
    rating: number; // Is this supposed to be popularity or vote_average?
    genreIDs: number[];
    length: string;
}
