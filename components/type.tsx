// Define interfaces for nested objects
export interface KnownForMovies {
  backdrop_path: string | null;
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
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

// Define the Movies interface
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

// Define the MoviesResponse interface
export interface MoviesResponse {
  page: number;
  results: Movies[];
  total_pages: number;
  total_results: number;
}

// Define the TVShows interface
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

// Define the TVShowsResponse interface
export interface TVShowsResponse {
  page: number;
  results: TVShows[];
  total_pages: number;
  total_results: number;
}

// Define a combined search result type
export type CombinedSearchResult = Movies | TVShows | Persons;

// Define the CastMember interface
export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

// Define the CrewMember interface
export interface CrewMember {
  id: number;
  name: string;
  job: string;
  profile_path: string | null;
}

// Define the ProductionCompany interface
export interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

// Define the Genre interface
export interface Genre {
  id: number;
  name: string;
}

// Define the ExternalIds interface
export interface ExternalIds {
  imdb_id?: string;
  facebook_id?: string;
  instagram_id?: string;
  twitter_id?: string;
  tiktok_id?: string;
  youtube_id?: string;
}

// Define the Keywords interface
export interface Keywords {
  keywords: {
    id: number;
    name: string;
  }[];
}

// Define the Certification interface
export interface Certification {
  certification: string;
  meaning: string;
  order: number;
}

export interface CertificationsResponse {
  certifications: {
      [key: string]: Certification[];
  };
}
// Define the Language interface
export interface Language {
  english_name: string; // English name of the language
  iso_639_1: string;    // ISO 639-1 code
  name: string;         // Native name of the language (if available)
}

// Define the LanguagesResponse interface
export interface LanguagesResponse {
  languages: Language[];
}

// Define the LanguageMap type for the formatted names
export type LanguageMap = { [key: string]: string };


// Define the AlternativeTitles interface
export interface AlternativeTitles {
  titles: {
    iso_3166_1: string;
    title: string;
    type: string;
  }[];
}

// Define the Movie interface
export interface Movie {
  id: number;
  title: string;
  original_language: string;
  overview: string;
  release_date: string;
  runtime: string | null;
  poster_path: string | null;
  backdrop_path: string | null;
  genres: Genre[];
  vote_average: number;
  certification: string;
  status: string;
  budget: number;
  revenue: number;
  cast: CastMember[];
  crew: CrewMember[];
  production_companies: ProductionCompany[];
  production_countries: { iso_3166_1: string; name: string }[];
  images: { backdrops: { file_path: string; }[]; posters: { file_path: string; }[]; };
  keywords: Keywords;
  recommendations: { Movie: any }; // Adapt as needed
  videos: { results: { key: string; name: string; site: string; }[]; };
  alternative_titles: AlternativeTitles;
  external_ids?: ExternalIds;
  formatted_release_date: string;
}
