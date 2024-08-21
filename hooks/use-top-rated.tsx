import { useState, useEffect } from 'react';
import axios from 'axios';
import useCertificationsList from './use-certifications-list';  
import useMovieLanguages from './use-language';  
import { formatTime } from '@/lib/format-time';
import { formatDate } from '@/lib/format-date'; // Import formatDate function

interface Certification {
    certification: string;
}

interface ReleaseDate {
    iso_3166_1: string;
    release_dates: Certification[];
}

interface LanguageMap {
    [key: string]: string;
}

interface TopRated {
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

interface UseTopRatedResult {
    data: any | null; // Raw data from the API
    top_rated: TopRated[] | null; // Processed top_rated
    loading: boolean;
    error: string | null;
}

const useTopRated = (media_type: 'tv' | 'movie'): UseTopRatedResult => {
    const [data, setData] = useState<any | null>(null); // Raw data state
    const [top_rated, setTopRated] = useState<TopRated[] | null>(null); // Processed top_rated state
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { certifications } = useCertificationsList();
    const { languageMap } = useMovieLanguages();

    useEffect(() => {
        const fetchTopRated = async () => {
            try {
                setLoading(true);

                // Fetch top_rated list
                const { data: responseData } = await axios.get(`https://api.themoviedb.org/3/${media_type}/top_rated`, {
                    params: {
                        api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
                    },
                });

                const topRatedResults = responseData.results;
                setData(responseData);

                // Fetch additional details for each top_rated
                const detailedTopRated = await Promise.all(
                    topRatedResults.map(async (top: any) => {
                        try {
                            const { data: detailData } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${top.id}`, {
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
                                const productionCountries = detailData.production_countries?.map((country: { iso_3166_1: string }) => country.iso_3166_1) || [];

                                productionCountries.forEach((countryCode: string) => {
                                    const countryCertifications = certifications[countryCode] || [];
                                    const releaseDates = detailData.release_dates?.results?.find((release: ReleaseDate) => release.iso_3166_1 === countryCode);

                                    if (releaseDates) {
                                        const releaseCertification = releaseDates.release_dates.find((relDate: Certification) => relDate.certification);
                                        if (releaseCertification) {
                                            certification = releaseCertification.certification;
                                        }
                                    }
                                });
                            }

                            return {
                                id: top.id,
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
                            console.error(`Error fetching details for ID ${top.id}:`, err);
                            return null;
                        }
                    })
                );

                // Filter out any null results from the detailedTopRated array
                setTopRated(detailedTopRated.filter(item => item !== null) as TopRated[]);
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    setError(`Error fetching top_rated: ${err.message}`);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchTopRated();
    }, [media_type, certifications, languageMap]);

    return { data, top_rated, loading, error };
};

export default useTopRated;
