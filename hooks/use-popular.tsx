import { useState, useEffect } from 'react';
import axios from 'axios';
import useMovieCertifications from './use-certification';  
import useMovieLanguages from './use-language';  
import { formatTime } from '@/lib/format-time';
import { formatDate } from '@/lib/format-date'; // Import formatDate function

interface ProductionCountry {
    iso_3166_1: string;
}

interface ReleaseDate {
    iso_3166_1: string;
    release_dates: { certification: string }[];
}

interface LanguageMap {
    [key: string]: string;
}

interface Popular {
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

interface UsePopularResult {
    data: any | null; // Raw data from the API
    popular: Popular[] | null; // Processed popular
    loading: boolean;
    error: string | null;
}

const usePopular = (media_type: 'movie' | 'tv'): UsePopularResult => {
    const [data, setData] = useState<any | null>(null); // Raw data state
    const [popular, setPopular] = useState<Popular[] | null>(null); // Processed popular state
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { certifications } = useMovieCertifications();
    const { languages, languageMap } = useMovieLanguages();

    useEffect(() => {
        const fetchPopular = async () => {
            try {
                setLoading(true);

                // Fetch popular list
                const { data: responseData } = await axios.get(`https://api.themoviedb.org/3/${media_type}/popular`, {
                    params: {
                        api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
                    },
                });

                const popularResults = responseData.results;
                setData(responseData);

                // Fetch additional details for each popular item
                const detailedPopular = await Promise.all(
                    popularResults.map(async (pop: any) => {
                        try {
                            const { data: detailData } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${pop.id}`, {
                                params: {
                                    api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
                                    append_to_response: 'release_dates',
                                },
                            });

                            // Map original language to formatted language name
                            const originalLanguage = languageMap[detailData.original_language] || detailData.original_language;

                            // Extract certification
                            let certification = 'Not Rated';
                            if (certifications) {
                                const productionCountries: string[] = detailData.production_countries?.map((country: ProductionCountry) => country.iso_3166_1) || [];
                                
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
                                id: pop.id,
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
                            console.error(`Error fetching details for popular item ID ${pop.id}:`, err);
                            return null; // Handle individual item errors gracefully
                        }
                    })
                );

                // Filter out any null results from the detailedPopular array
                setPopular(detailedPopular.filter(item => item !== null) as Popular[]);
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    setError(`Error fetching popular: ${err.message}`);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchPopular();
    }, [media_type, certifications, languages, languageMap]);

    return { data, popular, loading, error };
};

export default usePopular;
