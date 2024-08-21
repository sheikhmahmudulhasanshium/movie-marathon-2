import { useState, useEffect } from 'react';
import axios from 'axios';
import { CompanyResponse, TVShow, Certification } from '@/components/type';
import useCertificationsList from './use-certifications-list'; // Adjust path if necessary

const useCompany = (companyId: number) => {
    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY as string;
    const [companyData, setCompanyData] = useState<CompanyResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    // Fetch movie certifications (assuming useCertificationsList hook is implemented)
    const { certifications, loading: certificationsLoading, error: certificationsError } = useCertificationsList();

    useEffect(() => {
        const fetchCompanyData = async () => {
            try {
                setLoading(true);

                // Fetch company details
                const companyResponse = await axios.get(`https://api.themoviedb.org/3/company/${companyId}`, {
                    params: {
                        api_key: API_KEY,
                        append_to_response: 'alternative_names,images'
                    }
                });
                const companyDetails = companyResponse.data;

                // Fetch movies and TV series associated with the company
                const [moviesResponse, seriesResponse] = await Promise.all([
                    axios.get(`https://api.themoviedb.org/3/discover/movie`, {
                        params: {
                            api_key: API_KEY,
                            with_companies: companyId
                        }
                    }),
                    axios.get(`https://api.themoviedb.org/3/discover/tv`, {
                        params: {
                            api_key: API_KEY,
                            with_companies: companyId
                        }
                    })
                ]);

                const movies = moviesResponse.data.results;
                const series = seriesResponse.data.results;

                // Fetch detailed information for each movie
                const movieDetailsPromises = movies.map((movie: { id: number }) =>
                    axios.get(`https://api.themoviedb.org/3/movie/${movie.id}`, {
                        params: {
                            api_key: API_KEY,
                            append_to_response: 'release_dates'
                        }
                    })
                );
                const movieDetailsResponses = await Promise.all(movieDetailsPromises);

                const detailedMovies = movieDetailsResponses.map(response => {
                    const movieData = response.data;
                    const productionCountries = movieData.production_countries.map((country: any) => country.iso_3166_1);
                    let certification = 'Not Rated';

                    // Use release_dates to get certification
                    productionCountries.forEach((countryCode: string) => {
                        const releaseDates = movieData.release_dates?.results.find((release: any) => release.iso_3166_1 === countryCode);
                        if (releaseDates) {
                            const releaseCertification = releaseDates.release_dates.find((relDate: any) => relDate.certification);
                            if (releaseCertification) {
                                certification = releaseCertification.certification;
                            }
                        }
                    });

                    return {
                        ...movieData,
                        certification
                    };
                });

                // Fetch detailed information for each series
                const seriesDetailsPromises = series.map((show: { id: number }) =>
                    axios.get(`https://api.themoviedb.org/3/tv/${show.id}`, {
                        params: {
                            api_key: API_KEY,
                            append_to_response: 'content_ratings'
                        }
                    })
                );
                const seriesDetailsResponses = await Promise.all(seriesDetailsPromises);

                const detailedSeries = seriesDetailsResponses.map(response => {
                    const showData = response.data;
                    const certification = showData.content_ratings?.results.find((rating: any) => rating.iso_3166_1 === 'US')?.rating || 'Not Rated';

                    return {
                        ...showData,
                        runtime: showData.episode_run_time || [],
                        certification
                    };
                });

                // Combine the data
                setCompanyData({
                    company: {
                        description: companyDetails.description,
                        headquarters: companyDetails.headquarters,
                        homepage: companyDetails.homepage,
                        id: companyDetails.id,
                        name: companyDetails.name,
                        logo_path: companyDetails.logo_path,
                        origin_country: companyDetails.origin_country,
                        parent_company: companyDetails.parent_company,
                        alternative_names: companyDetails.alternative_names,
                        images: companyDetails.images
                    },
                    movies: detailedMovies,
                    series: detailedSeries
                });
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchCompanyData();
    }, [companyId, API_KEY, certifications]);

    // Return loading state, error, and company data including certifications
    return { companyData, loading: loading || certificationsLoading, error: error || certificationsError };
};

export default useCompany;
