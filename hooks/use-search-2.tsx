import useCompanies from "./use-companies";
import useCountries from "./use-countries-2";
import useGenres from "./use-genres-2";
import useKeywords from "./use-keywords";
import useMovies from "./use-movies";
import usePersons from "./use-persons";
import useTVShows from "./use-tv-shows";

const useSearch = (searchKey: string, variant: string) => {
    const { data: movieData, loading: movieLoading, error: movieError } = useMovies(searchKey);
    const { data: seriesData, loading: seriesLoading, error: seriesError } = useTVShows(searchKey);
    const { data: personData, loading: personLoading, error: personError } = usePersons(searchKey);
    const { data: genreData, loading: genreLoading, error: genreError } = useGenres(searchKey);
    const { data: countryData, loading: countryLoading, error: countryError } = useCountries(searchKey);
    const { data: companyData, loading: companyLoading, error: companyError } = useCompanies(searchKey);
    const { data: keywordData, loading: keywordLoading, error: keywordError } = useKeywords(searchKey);

    const getData = () => {
        switch (variant) {
            case 'Movie':
                return {
                    data: movieData.map(item => ({ ...item, displayName: item.title })),
                    loading: movieLoading,
                    error: movieError || '',
                    source: 'Movie'
                };
            case 'Series':
                return {
                    data: seriesData.map(item => ({ ...item, displayName: item.name })),
                    loading: seriesLoading,
                    error: seriesError || '',
                    source: 'Series'
                };
            case 'Person':
                return {
                    data: personData.map(item => ({ ...item, displayName: item.name })),
                    loading: personLoading,
                    error: personError || '',
                    source: 'Person'
                };
            case 'Country':
                const countryResults = [
                    ...countryData.filteredFamousCountries.map(item => ({ ...item, displayName: item.english_name })),
                    ...countryData.filteredCountries.map(item => ({ ...item, displayName: item.english_name })),
                ];
                return {
                    data: countryResults,
                    loading: countryLoading,
                    error: countryError || '',
                    source: 'Country'
                };
            case 'Genre':
                return {
                    data: genreData.map(item => ({ ...item, displayName: item.name })),
                    loading: genreLoading,
                    error: genreError || '',
                    source: 'Genre'
                };
            case 'Company':
                return {
                    data: companyData.map(item => ({ ...item, displayName: item.name })),
                    loading: companyLoading,
                    error: companyError || '',
                    source: 'Company'
                };
            case 'Keyword':
                return {
                    data: keywordData.map(item => ({ ...item, displayName: item.name })),
                    loading: keywordLoading,
                    error: keywordError || '',
                    source: 'Keyword'
                };
            case 'All':
                const allResults = [
                    ...movieData.map(item => ({ ...item, displayName: item.title, source: 'Movie' })),
                    ...seriesData.map(item => ({ ...item, displayName: item.name, source: 'Series' })),
                    ...personData.map(item => ({ ...item, displayName: item.name, source: 'Person' })),
                    ...countryData.filteredFamousCountries.map(item => ({ ...item, displayName: item.english_name, source: 'Country' })),
                    ...countryData.filteredCountries.map(item => ({ ...item, displayName: item.english_name, source: 'Country' })),
                    ...genreData.map(item => ({ ...item, displayName: item.name, source: 'Genre' })),
                    ...companyData.map(item => ({ ...item, displayName: item.name, source: 'Company' })),
                    ...keywordData.map(item => ({ ...item, displayName: item.name, source: 'Keyword' })),
                ].filter(item => item);

                return {
                    data: allResults,
                    loading: movieLoading || seriesLoading || personLoading || countryLoading || genreLoading || companyLoading || keywordLoading,
                    error: movieError || seriesError || personError || countryError || genreError || companyError || keywordError || '',
                };
            default:
                return { data: [], loading: false, error: '' };
        }
    };

    return getData();
};

export default useSearch;
