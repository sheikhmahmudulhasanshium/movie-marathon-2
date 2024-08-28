import { useState, useEffect } from 'react';
import axios from 'axios';
import { PersonDetailsResponse, KnownForMovies, Persons } from '@/components/type'; // Import necessary types

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3/person';
const SEARCH_URL = 'https://api.themoviedb.org/3/search/person';

const usePerson = (personId: number | string) => {
  const [personData, setPersonData] = useState<PersonDetailsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (personId) {
      const fetchPersonData = async () => {
        try {
          setLoading(true);

          // Fetch basic person details
          const personResponse = await axios.get<PersonDetailsResponse>(`${BASE_URL}/${personId}`, {
            params: {
              api_key: API_KEY,
              append_to_response: 'credits,external_ids',
            },
          });

          const personData = personResponse.data;

          // Fetch search results to get known_for data
          const searchResponse = await axios.get<{ results: Persons[] }>(SEARCH_URL, {
            params: {
              api_key: API_KEY,
              query: personData.name,
            },
          });

          // Find the matching person result by ID
          const matchedPerson = searchResponse.data.results.find(result => result.id === Number(personId));

          // Safely extract known_for data
          const knownForData: KnownForMovies[] = matchedPerson?.known_for || [];

          // Update state with fetched data
          setPersonData({
            ...personData,
            credits: {
              cast: personData.credits.cast || [],
              crew: personData.credits.crew || []
            },
            known_for: knownForData
          });

        } catch (err) {
          if (axios.isAxiosError(err)) {
            setError(err.message);
          } else {
            setError('An unknown error occurred');
          }
        } finally {
          setLoading(false);
        }
      };

      fetchPersonData();
    } else {
      setPersonData(null);
    }
  }, [personId]);

  return { personData, loading, error };
};

export default usePerson;
