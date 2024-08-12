import { useEffect, useState } from 'react';
import axios from 'axios';
import useMovieCertifications from './use-certification'; // Adjust path accordingly
import useMovieLanguages from './use-language'; // Adjust path accordingly
import { TVShow, Genre, ExternalIds, CastMember, CrewMember, Keywords, ProductionCountry, Season, Images, AlternativeTitles } from '@/components/type';

const useSeries = (id: string) => {
    const [series, setSeries] = useState<TVShow | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { certifications, loading: certLoading, error: certError } = useMovieCertifications();
    const { languages, languageMap, loading: langLoading, error: langError } = useMovieLanguages();

    useEffect(() => {
        if (!id) {
            setLoading(false);
            setError('No series ID provided');
            return;
        }

        const fetchGenres = async (): Promise<Genre[]> => {
            try {
                const response = await axios.get('https://api.themoviedb.org/3/genre/tv/list', {
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

        const fetchSeriesDetails = async () => {
            try {
                setLoading(true);

                // Fetch series details
                const response = await axios.get(`https://api.themoviedb.org/3/tv/${id}`, {
                    params: {
                        api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
                        append_to_response: 'credits,production_companies,production_countries,images,keywords,external_ids,alternative_titles,certification',
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

                // Function to format date as "31 July 2024"
                const formatDate = (dateString: string): string => {
                    const date = new Date(dateString);
                    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'long', year: 'numeric' };
                    return date.toLocaleDateString('en-GB', options);
                };

                // Map genre IDs to genre names
                const seriesGenres = response.data.genres.map((genre: { id: number }) => {
                    const genreData = genres.find((g) => g.id === genre.id);
                    return genreData ? genreData : { id: genre.id, name: 'Unknown' };
                });

                // Extract certification based on production countries
                const productionCountries: ProductionCountry[] = response.data.production_countries;
                const productionCountryCodes = productionCountries.map((country) => country.iso_3166_1);

                let certification: string = 'Not Rated';

                if (certifications) {
                    productionCountryCodes.forEach((countryCode: string) => {
                        const countryCertifications = certifications[countryCode] || [];
                        const releaseDates = response.data.release_dates?.results?.find((release: any) => release.iso_3166_1 === countryCode);

                        if (releaseDates) {
                            const releaseCertification = releaseDates.release_dates.find((relDate: any) => relDate.certification);
                            if (releaseCertification) {
                                certification = releaseCertification.certification;
                            }
                        }
                    });
                }

                // Calculate runtime in hours and minutes
                const episodeRunTime = response.data.episode_run_time;
                const runtimeFormatted = episodeRunTime.length > 0
                    ? `${Math.floor(episodeRunTime[0] / 60)}h ${episodeRunTime[0] % 60}m`
                    : 'Runtime not available';

                // Construct series data object
                const seriesData: TVShow = {
                    id: response.data.id,
                    name: response.data.name,
                    original_name: response.data.original_name,
                    tagline:response.data.tagline,
                    original_language: originalLanguage,
                    poster_path: response.data.poster_path,
                    backdrop_path: response.data.backdrop_path,
                    overview: response.data.overview,
                    status: response.data.status,
                    first_air_date: formatDate(response.data.first_air_date),
                    last_air_date: formatDate(response.data.last_air_date),
                    vote_average: response.data.vote_average,
                    genres: seriesGenres,
                    production_companies: response.data.production_companies,
                    production_countries: productionCountries,
                    external_ids: response.data.external_ids as ExternalIds,
                    cast: response.data.credits.cast as CastMember[],
                    crew: response.data.credits.crew as CrewMember[],
                    keywords: response.data.keywords as Keywords,
                    seasons: response.data.seasons as Season[],
                    number_of_episodes: response.data.number_of_episodes,
                    number_of_seasons: response.data.number_of_seasons,
                    homepage: response.data.homepage,
                    certification: certification,
                    runtime: runtimeFormatted,
                    images: response.data.images as Images,
                    alternative_titles: response.data.alternative_titles as AlternativeTitles,
                };

                setSeries(seriesData);
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    setError(`Error fetching series details: ${err.message}`);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        // Wait for languages and certifications to load before fetching series details
        if (!langLoading && !certLoading) {
            fetchSeriesDetails();
        }
    }, [id, certifications, languages, certLoading, langLoading, languageMap]);

    return { series, loading, error };
};

export default useSeries;
