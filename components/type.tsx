// Define interfaces for nested objects
export interface KnownForMovies {
    backdrop_path: string | null;
    id: number;
    title: string;
    original_title: string;
    overview: string;
    poster_path: string;
    media_type: 'movie' | 'tv';
    adult: boolean;
    original_language: string;
    genre_ids: number[];
    popularity: number;
    release_date: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

// Define the main Person interface
export interface Persons {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null;
    known_for: KnownForMovies[];
}

export interface Movies {
    adult: boolean;
    backdrop_path: string | null;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }

  export interface MoviesResponse {
    page: number;
    results: Movies[];
    total_pages: number;
    total_results: number;
  }
  
// Define TypeScript interfaces
 export interface TVShows {
    backdrop_path: string | null;
    first_air_date: string;
    genre_ids: number[];
    id: number;
    name: string;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    vote_average: number;
    vote_count: number;
  }
  
export  interface TVShowsResponse {
    page: number;
    results: TVShows[];
    total_pages: number;
    total_results: number;
  }
  
export type CombinedSearchResult = Movies | TVShows | Persons;
