import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useGenre = (id: number | string | undefined, moviePageCount: number, tvPageCount: number) => {
    const [movies, setMovies] = useState<any[]>([]);
    const [tvShows, setTvShows] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

    const fetchGenreData = useCallback(async () => {
        if (!id) return;

        const movieUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${id}&page=${moviePageCount + 1}`;
        const tvShowUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=${id}&page=${tvPageCount + 1}`;

        try {
            setLoading(true);

            const [movieResponse, tvShowResponse] = await Promise.all([
                axios.get(movieUrl),
                axios.get(tvShowUrl)
            ]);

            // Update state with fetched data
            setMovies(prevMovies => [...prevMovies, ...movieResponse.data.results]);
            setTvShows(prevTvShows => [...prevTvShows, ...tvShowResponse.data.results]);
        } catch (err) {
            setError('Failed to fetch data');
        } finally {
            setLoading(false);
        }
    }, [id, moviePageCount, tvPageCount, API_KEY]);

    useEffect(() => {
        fetchGenreData();
    }, [fetchGenreData]);

    return { movies, tvShows, loading, error };
};

export default useGenre;
