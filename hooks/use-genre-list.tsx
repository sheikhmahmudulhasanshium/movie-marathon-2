import { useState, useEffect } from 'react';
import axios from 'axios';

interface Genre {
  id: number;
  name: string;
}

interface GenreListResponse {
  genres: Genre[];
}

interface CombinedGenre extends Genre {
  source: 'movie' | 'tv' | 'both';  
}

const useGenreList = () => {
  const [combinedGenres, setCombinedGenres] = useState<CombinedGenre[]>([]);
  const [movieGenres, setMovieGenres] = useState<Genre[]>([]);
  const [tvGenres, setTvGenres] = useState<Genre[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const movieGenreListUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`;
  const tvGenreListUrl = `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}`;

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        setLoading(true);
        const [movieResponse, tvResponse] = await Promise.all([
          axios.get<GenreListResponse>(movieGenreListUrl),
          axios.get<GenreListResponse>(tvGenreListUrl),
        ]);

        const movieGenres = movieResponse.data.genres;
        const tvGenres = tvResponse.data.genres;

        setMovieGenres(movieGenres);
        setTvGenres(tvGenres);

        // Combine genres with unique names
        const genreMap = new Map<number, CombinedGenre>();

        movieGenres.forEach(genre => {
          if (!genreMap.has(genre.id)) {
            genreMap.set(genre.id, { ...genre, source: 'movie' });
          }
        });

        tvGenres.forEach(genre => {
          if (!genreMap.has(genre.id)) {
            genreMap.set(genre.id, { ...genre, source: 'tv' });
          } else {
            // If genre exists from movies, update to include 'both' if it's also in TV
            const existingGenre = genreMap.get(genre.id);
            if (existingGenre && existingGenre.source === 'movie') {
              genreMap.set(genre.id, { ...existingGenre, source: 'both' });
            }
          }
        });

        // Convert map to array and sort by name
        const sortedGenres = Array.from(genreMap.values()).sort((a, b) => a.name.localeCompare(b.name));

        setCombinedGenres(sortedGenres);
      } catch (err) {
        setError('Failed to fetch genres');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, [movieGenreListUrl, tvGenreListUrl]);

  return { combinedGenres, movieGenres, tvGenres, error, loading };
};

export default useGenreList;
