import { useState, useEffect } from 'react';
import axios from 'axios';
import { Movies, MoviesResponse } from '@/components/type';

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3/search/movie';

const useMovies = (searchKey: string) => {
  const [data, setData] = useState<Movies[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (searchKey) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await axios.get<MoviesResponse>(BASE_URL, {
            params: {
              api_key: API_KEY,
              query: searchKey,
            },
          });
          setData(response.data.results);
        } catch (err) {
          if (axios.isAxiosError(err)) {
            setError(err.message);
          } else {
            setError('An unknown error occurred');
          }
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    } else {
      setData([]);
    }
  }, [searchKey]);

  return { data, loading, error };
};

export default useMovies;
