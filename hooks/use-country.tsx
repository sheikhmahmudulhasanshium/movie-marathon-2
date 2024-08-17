import { useState, useEffect } from "react";
import axios from "axios";

import { Movie, TVShow } from '@/components/type';

interface UseCountryResponse {
    movies: Movie[];
    tvShows: TVShow[];
    loading: boolean;
    error: string | null;
}

const useCountry = (countryCode: string, moviePage: number, tvPage: number): UseCountryResponse => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [tvShows, setTvShows] = useState<TVShow[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

    useEffect(() => {
        const fetchData = async () => {
            const movieUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_origin_country=${countryCode}&page=${moviePage}`;
            const tvUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_origin_country=${countryCode}&page=${tvPage}`;

            try {
                const [movieResponse, tvResponse] = await Promise.all([
                    axios.get(movieUrl),
                    axios.get(tvUrl)
                ]);

                setMovies(movieResponse.data.results);
                setTvShows(tvResponse.data.results);
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    setError(err.message);
                } else {
                    setError("An unexpected error occurred.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [countryCode, moviePage, tvPage, API_KEY]);

    return { movies, tvShows, loading, error };
};

export default useCountry;
