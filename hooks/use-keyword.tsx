import { useState, useEffect } from 'react';
import axios from 'axios';
interface Keyword {
    id: number;
    name: string;
}

interface Movie {
    id: number;
    title: string;
    poster_path?: string;
    certification?: string;
    release_date?: string;
    runtime?: number;
}

interface Series {
    id: number;
    name: string;
    poster_path?: string;
    first_air_date?: string;
    runtime?: number;
}

interface MovieResponse {
    total_pages: number;
    results: Movie[];
}

interface SeriesResponse {
    total_pages: number;
    results: Series[];
}

interface UseKeywordResponse {
    keyword: Keyword;
    movies: MovieResponse;
    series: SeriesResponse;
}

const useKeyword = (id: number | string, movie_page?: number, tv_page?: number) => {
    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const [data, setData] = useState<UseKeywordResponse>({
        keyword: { id: 0, name: '' },
        movies: { total_pages: 0, results: [] },
        series: { total_pages: 0, results: [] }
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                // Define the API URLs with optional page parameters
                const keywordUrl = `https://api.themoviedb.org/3/keyword/${id}?api_key=${API_KEY}`;
                const movieUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_keywords=${id}${movie_page ? `&page=${movie_page}` : ''}`;
                const seriesUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_keywords=${id}${tv_page ? `&page=${tv_page}` : ''}`;

                // Fetch data from all APIs concurrently
                const [keywordResponse, movieResponse, seriesResponse] = await Promise.all([
                    axios.get(keywordUrl),
                    axios.get(movieUrl),
                    axios.get(seriesUrl)
                ]);

                // Update state with the fetched data
                setData({
                    keyword: keywordResponse.data,
                    movies: movieResponse.data,
                    series: seriesResponse.data,
                });
            } catch (error: any) {
                setError(error.message || 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, API_KEY, movie_page, tv_page]);

    return { data, loading, error };
};

export default useKeyword;
