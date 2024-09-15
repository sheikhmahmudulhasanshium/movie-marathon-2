import { useState, useEffect } from 'react';
import axios from 'axios';
import { Keyword, Movie, TVShow } from '@/components/type';

const useKeyword = (id: number | string) => {
    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const [data, setData] = useState<{ keyword: Keyword[], movies: Movie[], series: TVShow[] }>({ keyword: [], movies: [], series: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const keywordUrl = `https://api.themoviedb.org/3/keyword/${id}?api_key=${API_KEY}`;
                const movieUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_keywords=${id}`;
                const seriesUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_keywords=${id}`;

                const [keywordResponse, movieResponse, seriesResponse] = await Promise.all([
                    axios.get(keywordUrl),
                    axios.get(movieUrl),
                    axios.get(seriesUrl)
                ]);

                setData({
                    keyword: [keywordResponse.data],  // Assuming API returns a single keyword object
                    movies: movieResponse.data.results,
                    series: seriesResponse.data.results
                });
            } catch (error: any) {
                setError(error.message || 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, API_KEY]);

    return { data, loading, error };
};

export default useKeyword;
