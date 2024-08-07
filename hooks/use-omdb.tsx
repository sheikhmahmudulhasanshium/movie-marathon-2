import { useState, useEffect } from 'react';
import axios from 'axios';

const useSearch = (searchKey: string) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const OMDB_API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;
  const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      if (searchKey.length <= 5) {
        setData([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Step 1: Search OMDB API
        const omdbResponse = await axios.get('https://www.omdbapi.com/', {
          params: {
            apikey: OMDB_API_KEY,
            s: searchKey,
          },
        });

        if (omdbResponse.data.Response === 'False') {
          throw new Error(omdbResponse.data.Error);
        }

        const imdbIds = omdbResponse.data.Search.map((item: any) => item.imdbID);

        // Step 2: Fetch details from TMDB for each IMDb ID
        const tmdbRequests = imdbIds.map((id: string) =>
          axios.get(`https://api.themoviedb.org/3/find/${id}`, {
            params: {
              api_key: TMDB_API_KEY,
              external_source: 'imdb_id',
            },
          })
        );

        const tmdbResponses = await Promise.all(tmdbRequests);
        const detailedResults = tmdbResponses.map((response: any) => response.data);

        setData(detailedResults);
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
  }, [searchKey, OMDB_API_KEY, TMDB_API_KEY]); // Added OMDB_API_KEY and TMDB_API_KEY to the dependency array

  return { data, loading, error };
};

export default useSearch;
