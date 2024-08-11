import { useState, useEffect } from 'react';
import axios from 'axios';

interface OmdbSearchItem {
  Title: string;
  Year: string;
  imdbID: string;
  Type: 'movie' | 'series';
  Poster: string;
}

interface OmdbResponse {
  Search: OmdbSearchItem[];
  totalResults: string;
  Response: string;
  Error?: string;
}

const useOMDB = (searchKey: string) => {
  const [data, setData] = useState<{ movies: any[]; tvShows: any[] }>({
    movies: [],
    tvShows: [],
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const OMDB_API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;
  const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      if (searchKey.length <= 5) {
        setData({ movies: [], tvShows: [] });
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Step 1: Search OMDB API
        const omdbResponse = await axios.get<OmdbResponse>('https://www.omdbapi.com/', {
          params: {
            apikey: OMDB_API_KEY,
            s: searchKey,
          },
        });

        if (omdbResponse.data.Response === 'False') {
          throw new Error(omdbResponse.data.Error);
        }

        const imdbIds = omdbResponse.data.Search.map((item: OmdbSearchItem) => ({
          imdbID: item.imdbID,
          type: item.Type,
        }));

        // Step 2: Fetch details from TMDB for each IMDb ID
        const tmdbRequests = imdbIds.map(({ imdbID }) =>
          axios.get(`https://api.themoviedb.org/3/find/${imdbID}`, {
            params: {
              api_key: TMDB_API_KEY,
              external_source: 'imdb_id',
            },
          })
        );

        const tmdbResponses = await Promise.all(tmdbRequests);

        // Step 3: Sort results into movies and TV shows, and filter out items without an 'id'
        const movies = tmdbResponses
          .flatMap((response: any, index: number) => {
            const { movie_results } = response.data;
            const { type } = imdbIds[index];

            return type === 'movie' ? movie_results : [];
          })
          .filter((item: any) => item.id); // Filter out items without 'id'

        const tvShows = tmdbResponses
          .flatMap((response: any, index: number) => {
            const { tv_results } = response.data;
            const { type } = imdbIds[index];

            return type === 'series' ? tv_results : [];
          })
          .filter((item: any) => item.id); // Filter out items without 'id'

        setData({ movies, tvShows });
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchKey, OMDB_API_KEY, TMDB_API_KEY]);

  return { data, loading, error };
};

export default useOMDB;
