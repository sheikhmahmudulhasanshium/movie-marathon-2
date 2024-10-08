import { useState, useEffect } from 'react';
import useMovies from './use-movies';
import useTVShows from './use-tv-shows';
import usePersons from './use-person';
import { CombinedSearchResult } from '@/components/type';

// Utility function to decode URL-encoded strings
const decodeSearchKey = (key: string) => {
  return decodeURIComponent(key); // Decode URL-encoded strings
};

const useSearch = (searchKey: string) => {
  const [combinedData, setCombinedData] = useState<CombinedSearchResult[]>([]);

  // Decode the searchKey
  const formattedSearchKey = decodeSearchKey(searchKey);

  const { data: moviesData = [], loading: moviesLoading, error: moviesError } = useMovies(formattedSearchKey);
  const { data: tvData = [], loading: tvLoading, error: tvError } = useTVShows(formattedSearchKey);
  const { personData: personsData = null, loading: personsLoading, error: personsError } = usePersons(formattedSearchKey);

  const isLoading = moviesLoading || tvLoading || personsLoading;
  const error = moviesError || tvError || personsError;

  useEffect(() => {
    console.log("Formatted Search Key:", formattedSearchKey);
    console.log("Movies Data:", moviesData);
    console.log("TV Shows Data:", tvData);
    console.log("Persons Data:", personsData);

    if (formattedSearchKey) {
      const combinedResults: CombinedSearchResult[] = [
        ...moviesData,
        ...tvData,
        ...(Array.isArray(personsData) ? personsData : []) // Ensure personsData is an array
      ];

      setCombinedData(combinedResults);
    } else {
      setCombinedData([]);
    }
  }, [formattedSearchKey, moviesData, tvData, personsData]);

  return { data: combinedData, loading: isLoading, error };
};

export default useSearch;
