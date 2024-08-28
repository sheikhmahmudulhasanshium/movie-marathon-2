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
  runtime: number;
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

// Define the Network interface
export interface Network {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
  homepage?: string;
  description?: string;
  established_year?: number;
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
  english_name: string;
  iso_639_1: string;
  name: string;
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
  runtime: number | string | null;
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
  runtime: number;
  formatted_runtime?: string;
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
  descriptors: string[];
  iso_3166_1: string;
  rating: string;
}

// Define the Credits interface
export interface Credits {
  cast: CastMember[];
  crew: CrewMember[];
  guest_stars: GuestStar[];
}

// Define the GuestStar interface
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

// Define the SeasonEpisodes interface
export interface SeasonEpisodes {
  season_number: number;
  episodes: Episode[];
}

// Define the Country interface
export interface Country {
  iso_3166_1: string;
  english_name: string;
  native_name: string;
}

export interface AlternativeName {
  name: string;
  type: string;
}

export interface Image {
  aspect_ratio: number;
  file_path: string;
  height: number;
  id: string;
  file_type: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface CompanyData {
  description: string;
  headquarters: string;
  homepage: string;
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
  parent_company: string | null;
  alternative_names: {
      results: AlternativeName[];
  };
  images: {
      logos: Image[];
  };
}
// Define the structure of the company response
export interface CompanyResponse {
  company: CompanyData;
  movies: Movie[];
  series: TVShow[];
}
export interface PersonDetailsResponse {
  id: number;
  name: string;
  biography: string;
  birthday: string;
  deathday?: string;
  place_of_birth: string;
  profile_path?: string;
  original_name?: string;
  gender: number;
  known_for_department: string;
  also_known_as: string[];
  credits: {
    cast: any[];
    crew: any[];
  };
  external_ids: {
    imdb_id?: string;
    facebook_id?: string;
    instagram_id?: string;
    twitter_id?: string;
    tiktok_id?: string;
    youtube_id?: string;
  };
  known_for: KnownForMovies[]
}
