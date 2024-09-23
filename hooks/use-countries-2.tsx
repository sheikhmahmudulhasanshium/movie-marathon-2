import useCountriesList from "./use-countries-list";

interface Country {
    iso_3166_1: string;
    english_name: string;
    native_name: string;
}

interface UseCountriesResult {
    data: {
        filteredFamousCountries: Country[];
        filteredCountries: Country[];
    };
    loading: boolean;
    error: string | null;
}

const useCountries = (searchKey: string): UseCountriesResult => {
    const { countries, famousCountries, loading, error } = useCountriesList();

    // Function to filter countries based on search key
    const filterCountries = (countryList: Country[], key: string) => {
        return countryList.filter(
            country =>
                country.english_name.toLowerCase().includes(key.toLowerCase()) ||
                country.iso_3166_1.toLowerCase().includes(key.toLowerCase())
        );
    };

    // Filter famous countries based on the search key
    const filteredFamousCountries = filterCountries(famousCountries, searchKey);

    // If the search key matches any famous country, we only return the famous countries
    // Otherwise, filter all countries
    const filteredCountries = filteredFamousCountries.length > 0
        ? [] // No need to search all countries if there are matches in famous countries
        : filterCountries(countries, searchKey);

    return {
        data: {
            filteredFamousCountries,
            filteredCountries
        },
        loading,
        error
    };
};

export default useCountries;
