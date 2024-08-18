import { useState, useEffect } from "react";
import axios from "axios";
import useCountriesList from "./use-countries-list";
import { Country } from "@/components/type";

interface Movie {
    id: string|number;
    title: string;
    release_date: string;
    runtime: number;
    poster_path: string;
}

interface TVSeries {
    id: string|number;
    name: string;
    first_air_date: string;
    episode_run_time: number[];
    poster_path: string;
}

interface CountryData {
    country_name: string;
    iso_3166_1:string;
    movie_list: {
        id: string;
        name: string;
        release_date: string;
        duration: number;
        poster: string;
    }[];
    tvseries_list: {
        id: string;
        name: string;
        first_air_date: string;
        duration: number;
        poster: string;
    }[];
}

const useCountriesData = () => {
    const { countries, famousCountries, loading: countriesLoading, error: countriesError } = useCountriesList();
    const [countriesData, setCountriesData] = useState<CountryData[]>([]);
    const [famousCountriesData, setFamousCountriesData] = useState<CountryData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

    useEffect(() => {
        if (countriesLoading) return;

        const fetchCountryData = async (country: Country): Promise<CountryData> => {
            const { iso_3166_1, english_name } = country;

            const movieUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_origin_country=${iso_3166_1}`;
            const tvUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_origin_country=${iso_3166_1}`;

            try {
                const [movieResponse, tvResponse] = await Promise.all([
                    axios.get(movieUrl),
                    axios.get(tvUrl)
                ]);

                const movie_list = movieResponse.data.results.map((movie: Movie) => ({
                    id: movie.id,
                    name: movie.title,
                    release_date: movie.release_date,
                    duration: movie.runtime || 0, // Assuming runtime is available, otherwise set to 0
                    poster: movie.poster_path
                }));

                const tvseries_list = tvResponse.data.results.map((tv: TVSeries) => ({
                    id: tv.id,
                    name: tv.name,
                    first_air_date: tv.first_air_date,
                    duration: tv.episode_run_time?.[0] || 0, // Safely access the first runtime, or default to 0
                    poster: tv.poster_path
                }));

                return {
                    
                    country_name: english_name,
                    iso_3166_1:iso_3166_1,
                    movie_list,
                    tvseries_list
                };
            } catch (err) {
                console.error(`Error fetching data for country ${english_name}:`, err);
                throw err; // Re-throw the error to handle it in the outer catch block
            }
        };

        const fetchAllCountriesData = async () => {
            setLoading(true);
            try {
                const countriesPromises = countries.map(country => fetchCountryData(country));
                const allCountriesData = await Promise.all(countriesPromises);
                setCountriesData(allCountriesData);

                const famousCountriesPromises = famousCountries.map(country => fetchCountryData(country));
                const allFamousCountriesData = await Promise.all(famousCountriesPromises);
                setFamousCountriesData(allFamousCountriesData);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error("Axios error:", error.response?.data || error.message);
                    setError(error.message);
                } else {
                    console.error("Unexpected error:", error);
                    setError("An unexpected error occurred.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchAllCountriesData();
    }, [countries, famousCountries, countriesLoading, API_KEY]);

    return { famousCountriesData, countriesData, loading, error };
};

export default useCountriesData;
