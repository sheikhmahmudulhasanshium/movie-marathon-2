import { useEffect, useState } from 'react';
import axios from 'axios';

interface NativeName {
    official: string;
    common: string;
}

interface Name {
    common: string;
    official: string;
    nativeName?: {
        [languageCode: string]: NativeName;
    };
}

interface Flag {
    png: string;
    svg?: string;
    alt?: string;
}

interface Currency {
    name: string;
    symbol: string;
}

interface PostalCode {
    format: string;
    regex: string;
}

interface CoatOfArms {
    png: string;
    svg?: string;
}

interface CountryDetails {
    name: Name;
    capital: string[];
    population: number;
    area: number;
    region: string;
    subregion: string;
    flags: Flag;
    languages?: { [languageCode: string]: string };
    currencies?: { [currencyCode: string]: Currency };
    timezones?: string[];
    maps?: {
        googleMaps: string;
        openStreetMaps?: string;
    };
    demonyms?: { [languageCode: string]: { f: string; m: string } };
    gini?: { [year: number]: number };
    fifa?: string;
    car?: {
        signs: string[];
        side: string;
    };
    continents?: string[];
    startOfWeek?: string;
    postalCode?: PostalCode;
    coatOfArms?: CoatOfArms;
    capitalInfo?: {
        latlng: [number, number];
    };
    borders?: string[];
    tld?: string[];
    cca2?: string;
    cca3?: string;
    ccn3?: string;
    cioc?: string;
    independent?: boolean;
    unMember?: boolean;
    status?: string;
    idd?: {
        root: string;
        suffixes: string[];
    };
    altSpellings?: string[];
}

interface BorderCountry {
    cca2: any;
    flags: any;
    name: {
        common: string;
        flags: {
            png: string;
            svg?: string;
        };
    };
}

const useCountryDetails = (id: string) => {
    const [data, setData] = useState<CountryDetails | null>(null);
    const [borders, setBorders] = useState<BorderCountry[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://restcountries.com/v3.1/alpha/${id}`);
                const countryData = response.data[0]; 
                setData(countryData);

                // Fetch border countries
                if (countryData.borders) {
                    const borderPromises = countryData.borders.map(async (borderCode: string) => {
                        const borderResponse = await axios.get(`https://restcountries.com/v3.1/alpha/${borderCode}`);
                        return borderResponse.data[0];
                    });

                    const borderCountries = await Promise.all(borderPromises);
                    setBorders(borderCountries);
                }
            } catch (err) {
                setError('Error fetching country details.');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]);

    return { data, borders, loading, error };
};

export default useCountryDetails;
