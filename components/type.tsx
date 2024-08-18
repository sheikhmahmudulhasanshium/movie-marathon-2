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

// Define the main Persons interface
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
  runtime: number; // Changed to number for consistency with minutes
  certification: string;
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
export interface Network {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
  homepage?: string; // Optional field for the network's website
  description?: string; // Optional field for a brief description of the network
  established_year?: number; // Optional field for the year the network was established
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
  wikidata_id?: string;
  tvdb_id?: string;
  freebase_id?: string;
  tvrage_id?: string;
}

// Define the Keywords interface
export interface Keywords {
  keywords: Keyword[];
}

// Define the Keyword interface
export interface Keyword {
  id: number;
  name: string;
}

// Define the Certification interface
export interface Certification {
  certification: string;
  meaning: string;
  order: number;
}

// Define the CertificationsResponse interface
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
  titles: AlternativeTitle[];
}

// Define the AlternativeTitle interface
export interface AlternativeTitle {
  iso_3166_1: string;
  title: string;
  type: string;
}

// Define the Movie interface
export interface Movie {
  id: number;
  title: string;
  original_language: string;
  overview: string;
  release_date: string;
  runtime: number| string | null; // Changed to number for consistency with minutes
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
  production_countries: ProductionCountry[];
  images: Images;
  keywords: Keywords;
  alternative_titles: AlternativeTitles;
  external_ids?: ExternalIds;
  formatted_release_date: string;
}

// Define the TVShow interface
export interface TVShow {
  id: number;
  name: string;
  original_name: string;
  tagline: string;
  original_language: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  status: string;
  first_air_date: string;
  last_air_date: string;
  vote_average: number;
  genres: Genre[];
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  external_ids: ExternalIds;
  cast: CastMember[];
  crew: CrewMember[];
  keywords: Keywords;
  seasons: Season[];
  number_of_episodes: number;
  number_of_seasons: number;
  homepage: string;
  content_ratings: ContentRatings;
  runtime: string;
  images: Images;
  networks: Network[];
  alternative_titles: AlternativeTitles;
}

// Define the ProductionCountry interface
export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

// Define the Season interface
export interface Season {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
  vote_average: number;
}

// Define the Images interface
export interface Images {
  backdrops: Image[];
  posters: Image[];
}

// Define the Image interface
export interface Image {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1: string | null;
  vote_average: number;
  vote_count: number;
  width: number;
}

// Define the Episode interface with formatted_runtime
export interface Episode {
  id: number;
  name: string;
  overview: string;
  episode_number: number;
  season_number: number;
  air_date: string;
  still_path: string | null;
  vote_average: number;
  vote_count: number;
  production_code?: string;
  runtime: number; // Original runtime in minutes
  formatted_runtime?: string; // Add this field for formatted runtime
  crew: CrewMember[];
  guest_stars: GuestStar[];
  external_ids: ExternalIds;
  credits: Credits;
  alternative_titles: AlternativeTitles;
  content_ratings: ContentRatings;
  keywords?: Keywords;
  genres?: Genre[];
  production_companies?: ProductionCompany[];
  production_countries?: ProductionCountry[];
}
// Define the ContentRatings interface
export interface ContentRatings {
  results: ContentRating[];
}

// Define the ContentRating interface
export interface ContentRating {
  descriptors: string[]; // Array of descriptors (e.g., "violence", "language")
  iso_3166_1: string;   // ISO 3166-1 alpha-2 country code (e.g., "US", "AU")
  rating: string;       // Content rating (e.g., "TV-MA", "R 18+")
}

export interface Credits {
  cast: CastMember[];
  crew: CrewMember[];
  guest_stars: GuestStar[];
}

export interface GuestStar {
  character: string;
  credit_id: string;
  order: number;
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
}

export interface SeasonEpisodes {
  season_number: number;
  episodes: Episode[];
}

export interface Country {
  iso_3166_1: string;
  english_name: string;
  native_name: string;
  
}
