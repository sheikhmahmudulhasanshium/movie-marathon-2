import { useEffect, useState } from 'react';
import axios from 'axios';
import useMovieCertifications from './use-certification'; // Adjust path accordingly
import useMovieLanguages from './use-language'; // Adjust path accordingly
import { Movie, Genre, ExternalIds, CastMember, CrewMember, Keywords } from '@/components/type';

const useMovie = (id: string) => {
    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { certifications, loading: certLoading, error: certError } = useMovieCertifications();
    const { languages, languageMap, loading: langLoading, error: langError } = useMovieLanguages();

    useEffect(() => {
        if (!id) {
            setLoading(false);
            setError('No movie ID provided');
            return;
        }

        const fetchGenres = async (): Promise<Genre[]> => {
            try {
                const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list', {
                    params: {
                        api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
                        language: 'en-US',
                    },
                });
                return response.data.genres;
            } catch (error) {
                console.error('Error fetching genres:', error);
                setError('Failed to fetch genres');
                return [];
            }
        };

        const fetchMovieDetails = async () => {
            try {
                setLoading(true);

                // Fetch movie details
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
                    params: {
                        api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
                        append_to_response: 'credits,production_companies,production_countries,images,keywords,recommendations,videos,release_dates,external_ids,alternative_titles',
                    },
                });

                // Fetch genres
                const genres: Genre[] = await fetchGenres();

                // Check if languages data is available
                if (!languages) {
                    console.error('Languages data is not available');
                    setError('Languages data is not available');
                    setLoading(false);
                    return;
                }

                // Map original language to formatted language name
                const originalLanguage = languageMap[response.data.original_language] || response.data.original_language;

                console.log('Original Language:', originalLanguage);

                // Function to format date as "31 July 2024"
                const formatDate = (dateString: string): string => {
                    const date = new Date(dateString);
                    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'long', year: 'numeric' };
                    return date.toLocaleDateString('en-GB', options);
                };

                // Map genre IDs to genre names
                const movieGenres = response.data.genres.map((genre: { id: number }) => {
                    const genreData = genres.find((g) => g.id === genre.id);
                    return genreData ? genreData : { id: genre.id, name: 'Unknown' };
                });

                // Extract certification based on production countries
                const productionCountries = response.data.production_countries.map((country: { iso_3166_1: string }) => country.iso_3166_1);

                let certification: string = 'Not Rated';

                if (certifications) {
                    productionCountries.forEach((countryCode: string) => {
                        const countryCertifications = certifications[countryCode] || [];
                        const releaseDates = response.data.release_dates.results.find((release: any) => release.iso_3166_1 === countryCode);

                        if (releaseDates) {
                            const releaseCertification = releaseDates.release_dates.find((relDate: any) => relDate.certification);
                            if (releaseCertification) {
                                certification = releaseCertification.certification;
                            }
                        }
                    });
                }

                // Calculate runtime in hours and minutes
                const runtime = response.data.runtime;
                const runtimeFormatted = runtime
                    ? `${Math.floor(runtime / 60)}h ${runtime % 60}m`
                    : 'Runtime not available';

                // Construct movie data object
                const movieData: Movie = {
                    id: response.data.id,
                    title: response.data.title,
                    original_language: originalLanguage,
                    poster_path: response.data.poster_path,
                    status: response.data.status,
                    certification: certification,
                    vote_average: response.data.vote_average,
                    overview: response.data.overview,
                    formatted_release_date: formatDate(response.data.release_date),
                    revenue: response.data.revenue,
                    budget: response.data.budget,
                    genres: movieGenres,
                    keywords: response.data.keywords as Keywords,
                    cast: response.data.credits.cast as CastMember[],
                    crew: response.data.credits.crew as CrewMember[],
                    external_ids: response.data.external_ids as ExternalIds,
                    release_date: response.data.release_date,
                    backdrop_path: response.data.backdrop_path,
                    production_companies: response.data.production_companies,
                    production_countries: response.data.production_countries,
                    images: response.data.images,
                    recommendations: response.data.recommendations.results,
                    videos: response.data.videos,
                    alternative_titles: response.data.alternative_titles || { titles: [] },
                    runtime: runtimeFormatted,
                };

                setMovie(movieData);
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    setError(`Error fetching movie details: ${err.message}`);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        // Wait for languages and certifications to load before fetching movie details
        if (!langLoading && !certLoading) {
            fetchMovieDetails();
        }
    }, [id, certifications, languages, certLoading, langLoading, languageMap]);

    return { movie, loading, error };
};

export default useMovie;
