import { useState, useEffect } from 'react';
import axios from 'axios';
import useMovieCertifications from './use-certification'; // Adjust path accordingly
import useMovieLanguages from './use-language'; // Adjust path accordingly

interface Recommendation {
    id: number;
    title: string;
    original_language: string;
    poster_path: string;
    certification: string;
    vote_average: number;
    overview: string;
    formatted_release_date: string;
    formatted_runtime: string;
    media_type: 'tv'|'movie';
}

interface UseRecommendationsResult {
    recommendations: Recommendation[] | null;
    loading: boolean;
    error: string | null;
}

const useRecommendations = (id: string, media_type: 'movie'|'tv'): UseRecommendationsResult => {
    const [recommendations, setRecommendations] = useState<Recommendation[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { certifications } = useMovieCertifications();
    const { languages, languageMap } = useMovieLanguages();

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                setLoading(true);

                // Fetch initial recommendation list
                const recommendationsResponse = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/recommendations`, {
                    params: {
                        api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
                    },
                });

                const recommendationResults = recommendationsResponse.data.results;

                // Function to format date
                const formatDate = (dateString: string): string => {
                    const date = new Date(dateString);
                    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'long', year: 'numeric' };
                    return date.toLocaleDateString('en-GB', options);
                };

                // Function to format runtime
                const formatRuntime = (runtime: number): string => {
                    return runtime ? `${Math.floor(runtime / 60)}h ${runtime % 60}m` : 'Runtime not available';
                };

                // Fetch additional details for each recommendation
                const detailedRecommendations = await Promise.all(
                    recommendationResults.map(async (rec: any) => {
                        const detailResponse = await axios.get(`https://api.themoviedb.org/3/${rec.media_type}/${rec.id}`, {
                            params: {
                                api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
                                append_to_response: 'release_dates',
                            },
                        });

                        const detailData = detailResponse.data;

                        // Map original language to formatted language name
                        const originalLanguage = languageMap[detailData.original_language] || detailData.original_language;

                        // Extract certification
                        let certification: string = 'Not Rated';
                        if (certifications) {
                            const productionCountries = detailData.production_countries.map((country: { iso_3166_1: string }) => country.iso_3166_1);

                            productionCountries.forEach((countryCode: string) => {
                                const countryCertifications = certifications[countryCode] || [];
                                const releaseDates = detailData.release_dates?.results?.find((release: any) => release.iso_3166_1 === countryCode);

                                if (releaseDates) {
                                    const releaseCertification = releaseDates.release_dates.find((relDate: any) => relDate.certification);
                                    if (releaseCertification) {
                                        certification = releaseCertification.certification;
                                    }
                                }
                            });
                        }

                        return {
                            id: rec.id,
                            title: detailData.title || detailData.name,
                            original_language: originalLanguage,
                            poster_path: detailData.poster_path,
                            certification: certification,
                            vote_average: detailData.vote_average,
                            overview: detailData.overview,
                            formatted_release_date: formatDate(detailData.release_date || detailData.first_air_date),
                            formatted_runtime: formatRuntime(detailData.runtime || detailData.episode_run_time?.[0] || 0),
                            media_type: rec.media_type,
                        };
                    })
                );

                setRecommendations(detailedRecommendations);
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    setError(`Error fetching recommendations: ${err.message}`);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendations();
    }, [id, media_type, certifications, languages, languageMap]);

    return { recommendations, loading, error };
};

export default useRecommendations;
