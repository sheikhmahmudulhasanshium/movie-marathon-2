import { useState, useEffect } from 'react';
import useMovies from './use-movies';
import useTVShows from './use-tv-shows';
import usePersons from './use-persons';
import useOMDB from './use-omdb';
import { CombinedSearchResult } from '@/components/type';

const useSearch = (searchKey: string) => {
  const [combinedData, setCombinedData] = useState<CombinedSearchResult[]>([]);
  const { data: moviesData, loading: moviesLoading, error: moviesError } = useMovies(searchKey);
  const { data: tvData, loading: tvLoading, error: tvError } = useTVShows(searchKey);
  const { data: personsData, loading: personsLoading, error: personsError } = usePersons(searchKey);
  const { data: omdbData, loading: omdbLoading, error: omdbError } = useOMDB(searchKey);

  const isLoading = moviesLoading || tvLoading || personsLoading || omdbLoading;
  const error = moviesError || tvError || personsError || omdbError;

  useEffect(() => {
    if (searchKey) {
      const combinedResults: CombinedSearchResult[] = [
        ...moviesData,
        ...tvData,
        ...personsData,
        ...omdbData,
      ];
      setCombinedData(combinedResults);
    } else {
      setCombinedData([]);
    }
  }, [searchKey, moviesData, tvData, personsData, omdbData]);
  console.log(omdbData)

  return { data: combinedData, loading: isLoading, error };
};

export default useSearch;
