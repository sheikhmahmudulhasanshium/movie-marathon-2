import { useState, useEffect } from 'react';
import axios from 'axios';
import useMovieCertifications from './use-certification';  
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

interface Upcoming {
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

interface UseUpcomingResult {
    data: any | null; // Raw data from the API
    upcoming: Upcoming[] | null; // Processed upcoming
    loading: boolean;
    error: string | null;
}

const useUpcoming = (media_type: 'tv' | 'movie'): UseUpcomingResult => {
    const [data, setData] = useState<any | null>(null); // Raw data state
    const [upcoming, setUpcoming] = useState<Upcoming[] | null>(null); // Processed upcoming state
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { certifications } = useMovieCertifications();
    const { languageMap } = useMovieLanguages();

    useEffect(() => {
        const fetchUpcoming = async () => {
            try {
                setLoading(true);

                // Fetch upcoming list
                const response = await axios.get(`https://api.themoviedb.org/3/${media_type}/upcoming`, {
                    params: {
                        api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
                    },
                });

                const upcomingResults = response.data.results;
                setData(response.data);

                // Fetch additional details for each upcoming
                const detailedUpcoming = await Promise.all(
                    upcomingResults.map(async (item: any) => {
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
                            let certification: string = 'Not Rated';
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
                            console.error(`Error fetching details for upcoming item ID ${item.id}:`, err);
                            return null; // Handle individual item errors gracefully
                        }
                    })
                );

                // Filter out any null results from the detailedUpcoming array
                setUpcoming(detailedUpcoming.filter(item => item !== null) as Upcoming[]);
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    setError(`Error fetching upcoming: ${err.message}`);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUpcoming();
    }, [media_type, certifications, languageMap]);

    return { data, upcoming, loading, error };
};

export default useUpcoming;
