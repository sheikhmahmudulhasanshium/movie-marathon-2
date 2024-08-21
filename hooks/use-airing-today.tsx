import { useState, useEffect } from 'react';
import axios from 'axios';
import useMovieCertifications from './use-certifications-list'; 
import useMovieLanguages from './use-language'; 
import { formatDate } from '@/lib/format-date'; 
import { formatTime } from '@/lib/format-time';  

interface ProductionCountry {
    iso_3166_1: string;
}

interface ReleaseDate {
    iso_3166_1: string;
    release_dates: { certification: string }[];
}

interface AiringToday {
    id: number;
    title: string;
    original_language: string;
    poster_path: string;
    certification: string;
    vote_average: number;
    overview: string;
    formatted_release_date: string;
    formatted_runtime: string;
    media_type: 'tv' | 'movie';
}

interface UseAiringTodayResult {
    data: any | null; // Raw data from the API
    airing_today: AiringToday[] | null; // Processed airing_today
    loading: boolean;
    error: string | null;
}

const useAiringToday = (media_type: 'tv' | 'movie'): UseAiringTodayResult => {
    const [data, setData] = useState<any | null>(null); // Raw data state
    const [airing_today, setAiringToday] = useState<AiringToday[] | null>(null); // Processed airing_today state
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { certifications } = useMovieCertifications();
    const { languageMap } = useMovieLanguages();

    useEffect(() => {
        const fetchAiringToday = async () => {
            try {
                setLoading(true);

                // Fetch airing_today list
                const response = await axios.get(`https://api.themoviedb.org/3/${media_type}/airing_today`, {
                    params: {
                        api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
                    },
                });

                const airingTodayResults = response.data.results;
                setData(response.data);

                // Fetch additional details for each airing_today
                const detailedAiringToday = await Promise.all(
                    airingTodayResults.map(async (item: any) => {
                        try {
                            const detailResponse = await axios.get(`https://api.themoviedb.org/3/${media_type}/${item.id}`, {
                                params: {
                                    api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
                                    append_to_response: 'release_dates',
                                },
                            });

                            const detailData = detailResponse.data;

                            // Map original language to formatted language name
                            const originalLanguage = languageMap[detailData.original_language] || detailData.original_language;

                            // Extract certification
                            let certification = 'Not Rated';
                            if (certifications) {
                                const productionCountries = detailData.production_countries?.map((country: ProductionCountry) => country.iso_3166_1) || [];

                                productionCountries.forEach((countryCode: string) => {
                                    const countryCertifications = certifications[countryCode] || [];
                                    const releaseDates = detailData.release_dates?.results?.find((release: ReleaseDate) => release.iso_3166_1 === countryCode);

                                    if (releaseDates) {
                                        const releaseCertification = releaseDates.release_dates.find((relDate: { certification: string }) => relDate.certification);
                                        if (releaseCertification) {
                                            certification = releaseCertification.certification;
                                        }
                                    }
                                });
                            }

                            return {
                                id: item.id,
                                title: detailData.title || detailData.name,
                                original_language: originalLanguage,
                                poster_path: detailData.poster_path,
                                certification: certification,
                                vote_average: detailData.vote_average,
                                overview: detailData.overview,
                                formatted_release_date: formatDate(detailData.release_date || detailData.first_air_date),
                                formatted_runtime: formatTime(detailData.runtime || detailData.episode_run_time?.[0] || 0),
                                media_type: media_type,
                            };
                        } catch (err) {
                            console.error(`Error fetching details for airing_today item ID ${item.id}:`, err);
                            return null; // Handle individual item errors gracefully
                        }
                    })
                );

                // Filter out any null results from the detailedAiringToday array
                setAiringToday(detailedAiringToday.filter(item => item !== null) as AiringToday[]);
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    setError(`Error fetching airing_today: ${err.message}`);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchAiringToday();
    }, [media_type, certifications, languageMap]);

    return { data, airing_today, loading, error };
};

export default useAiringToday;
