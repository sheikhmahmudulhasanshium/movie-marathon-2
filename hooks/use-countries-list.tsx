import { useState, useEffect } from "react";
import axios from "axios";

interface Country {
    iso_3166_1: string;
    english_name: string;
    native_name: string;
}

// Define the order of famous countries by their prominence
const famousCountryCodes = [
    "US",  // United States
    "IN",  // India
    "CN",  // China
    "JP",  // Japan
    "KR",  // South Korea
    "FR",  // France
    "GB",  // United Kingdom
    "DE",  // Germany
    "IT",  // Italy
    "ES",  // Spain
    "MX",  // Mexico
    "BR",  // Brazil
    "AU",  // Australia
    "RU",  // Russia
    "CA",  // Canada
    "ZA",  // South Africa
    "SE",  // Sweden
    "HK",  // Hong Kong
    "NL",  // Netherlands
    "AR"   // Argentina
];

const useCountriesList = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [famousCountries, setFamousCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const COUNTRIES_URL = `https://api.themoviedb.org/3/configuration/countries?api_key=${API_KEY}`;

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get<Country[]>(COUNTRIES_URL);
                const allCountries = response.data;

                // Sort all countries alphabetically by English name
                const sortedAllCountries = allCountries.sort((a, b) =>
                    a.english_name.localeCompare(b.english_name)
                );
                setCountries(sortedAllCountries);

                // Filter and sort famous countries by the predefined order
                const sortedFamousCountries = famousCountryCodes
                    .map(code => allCountries.find(country => country.iso_3166_1 === code))
                    .filter(country => country !== undefined) as Country[];
                setFamousCountries(sortedFamousCountries);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    setError(error.message);
                } else {
                    setError("An unexpected error occurred.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchCountries();
    }, [COUNTRIES_URL]);

    return { countries, famousCountries, loading, error };
};

export default useCountriesList;
