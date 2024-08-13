import { useState, useEffect } from 'react';
import axios from 'axios';
import { Movies, MoviesResponse } from '@/components/type';

const useLatest = (media_type: 'movie' | 'tv') => {
  const totalCards: number = 30;
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const BASE_URL = `https://api.themoviedb.org/3/${media_type}/upcoming`;

  const [data, setData] = useState<Movies[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        let currentPage = 1;
        let fetchedMovies: Movies[] = [];

        while (fetchedMovies.length < totalCards) {
          const response = await axios.get<MoviesResponse>(BASE_URL, {
            params: {
              api_key: API_KEY,
              page: currentPage, // Ensure page parameter is added
            },
          });

          if (response.status === 200) {
            fetchedMovies = [...fetchedMovies, ...response.data.results];
            
            // If we have enough movies, trim the list to the required length
            if (fetchedMovies.length >= totalCards) {
              fetchedMovies = fetchedMovies.slice(0, totalCards);
              break;
            }

            currentPage++;
          } else {
            setError(`API returned status code: ${response.status}`);
            break;
          }
        }

        setData(fetchedMovies);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(`Axios error: ${err.message}`);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [API_KEY, BASE_URL, totalCards]); // Use stable values in dependency array

  return { data, loading, error };
};

export default useLatest;
