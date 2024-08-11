import { useState, useEffect } from 'react';
import axios from 'axios';
import { TVShows, TVShowsResponse } from '@/components/type';

const useTVShows = (searchKey: string) => {
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const BASE_URL = `https://api.themoviedb.org/3/search/tv`;

  console.log('Search Key:', searchKey);
  const [data, setData] = useState<TVShows[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (searchKey) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await axios.get<TVShowsResponse>(BASE_URL, {
            params: {
              api_key: API_KEY,
              query: searchKey, // Pass searchKey directly
            },
          });

          // Log the complete URL for debugging
          console.log('Request URL:', response.request.responseURL);
          
          if (response.status === 200) {
            setData(response.data.results);
          } else {
            setError(`API returned status code: ${response.status}`);
          }
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

      fetchData();
    } else {
      setData([]);
    }
  }, [searchKey, API_KEY, BASE_URL]);

  return { data, loading, error };
};

export default useTVShows;
