"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  backdrop_path: string;
  // Add other relevant fields
}

const useMovie = (id: string) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setError('No movie ID provided');
      return;
    }

    const fetchMovie = async () => {
      try {
        setLoading(true);
        const response = await axios.get<Movie>(`https://api.themoviedb.org/3/movie/${id}`, {
          params: {
            api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
          },
        });
        setMovie(response.data);
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

    fetchMovie();
  }, [id]);

  return { movie, loading, error };
};

export default useMovie;
