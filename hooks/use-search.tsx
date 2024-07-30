// useSearch.ts
import { useState, useEffect } from 'react';
import useMovies from './use-movies';
import useTVShows from './use-tv-shows';
import usePersons from './use-persons';
import { CombinedSearchResult } from '@/components/type';

const useSearch = (searchKey: string) => {
  const [combinedData, setCombinedData] = useState<CombinedSearchResult[]>([]);
  const { data: moviesData, loading: moviesLoading, error: moviesError } = useMovies(searchKey);
  const { data: tvData, loading: tvLoading, error: tvError } = useTVShows(searchKey);
  const { data: personsData, loading: personsLoading, error: personsError } = usePersons(searchKey);

  const isLoading = moviesLoading || tvLoading || personsLoading;
  const error = moviesError || tvError || personsError;

  useEffect(() => {
    if (searchKey) {
      const combinedResults: CombinedSearchResult[] = [
        ...moviesData,
        ...tvData,
        ...personsData,
      ];
      setCombinedData(combinedResults);
    } else {
      setCombinedData([]);
    }
  }, [searchKey, moviesData, tvData, personsData]);

  return { data: combinedData, loading: isLoading, error };
};

export default useSearch;
