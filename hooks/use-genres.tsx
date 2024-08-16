import { useState, useEffect } from 'react';
import axios from 'axios';
import useGenreList from './use-genre-list';
import { MoviesResponse, TVShowsResponse, Genre } from '@/components/type';

type CombinedItem = {
    id: number;
    title?: string;             // For movies
    name?: string;              // For TV shows
    poster_path?: string | null;
    overview?: string;
    vote_average?: number;
    runtime?: string;           
    first_air_date?: string;
    release_date?: string;
    certification?: string;     // Optional
    media_type?: string;        // Optional
};

type UseGenresReturnType = {
    genre: Genre;
    combined: CombinedItem[];
};

const useGenres = () => {
    const { combinedGenres, loading: genreLoading, error: genreError } = useGenreList();
    const [data, setData] = useState<UseGenresReturnType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!combinedGenres || combinedGenres.length === 0) return;

            try {
                setLoading(true);
                setError(null);

                const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

                const results = await Promise.all(
                    combinedGenres.map(async (genre: Genre) => {
                        const genreId = genre.id;
                        const movieUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=1`;
                        const tvShowUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=${genreId}&page=1`;

                        try {
                            const [movieResponse, tvShowResponse] = await Promise.all([
                                axios.get<MoviesResponse>(movieUrl),
                                axios.get<TVShowsResponse>(tvShowUrl),
                            ]);

                            const movieResults = movieResponse.data.results;
                            const tvShowResults = tvShowResponse.data.results;

                            const combined = [
                                ...movieResults.map(movie => ({
                                    id: movie.id,
                                    title: movie.title,
                                    poster_path: movie.poster_path,
                                    overview: movie.overview,
                                    vote_average: movie.vote_average,
                                    runtime: movie.runtime ? `${movie.runtime} min` : 'Runtime not available',
                                    release_date: movie.release_date,
                                    certification: movie.certification || 'Not Rated',
                                    media_type: 'movie',
                                })),
                                ...tvShowResults.map(tvShow => ({
                                    id: tvShow.id,
                                    name: tvShow.name,
                                    poster_path: tvShow.poster_path,
                                    overview: tvShow.overview,
                                    vote_average: tvShow.vote_average,
                                    runtime: 'Runtime not available',
                                    release_date: tvShow.first_air_date,
                                    certification: 'Not Rated',
                                    media_type: 'tv-show',
                                })),
                            ];

                            return {
                                genre,
                                combined,
                            };
                        } catch (err) {
                            console.error(`Failed to fetch data for genre ID ${genreId}:`, err);
                            return {
                                genre,
                                combined: [],
                            };
                        }
                    })
                );

                setData(results);
            } catch (err) {
                setError('Failed to fetch genre data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [combinedGenres]);

    return { data, loading: genreLoading || loading, error: genreError || error };
};

export default useGenres;
