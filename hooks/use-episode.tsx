import { useEffect, useState } from 'react';
import axios from 'axios';
import { Episode } from '@/components/type';

const useEpisode = (id: string, season_number: string, episode_number: string) => {
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  useEffect(() => {
    const fetchEpisode = async () => {
      if (!id || !season_number || !episode_number) {
        setError('Invalid parameters');
        setLoading(false);
        return;
      }

      try {
        // Fetch episode details
        const response = await axios.get<Episode>(
          `https://api.themoviedb.org/3/tv/${id}/season/${season_number}/episode/${episode_number}`, 
          {
            params: {
              api_key: API_KEY,
              append_to_response: 'external_ids,credits',
            },
          }
        );

        const episodeData = response.data;

        // Format runtime
        const totalMinutes = episodeData.runtime;
        let formattedRuntime = 'Runtime not available';

        if (totalMinutes) {
          const hours = Math.floor(totalMinutes / 60);
          const minutes = totalMinutes % 60;

          formattedRuntime = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
        }

        // Format air_date manually
        const formattedAirDate = episodeData.air_date
          ? formatDate(episodeData.air_date)
          : 'Air date not available';

        // Update episode state with formatted runtime and air_date
        const updatedEpisodeData: Episode = {
          ...episodeData,
          formatted_runtime: formattedRuntime,
          air_date: formattedAirDate, // Overwrite air_date with formatted value
        };

        setEpisode(updatedEpisodeData);
      } catch (err) {
        setError('Failed to fetch episode data.');
      } finally {
        setLoading(false);
      }
    };

    fetchEpisode();
  }, [id, season_number, episode_number, API_KEY]);

  return { episode, loading, error };
};

// Function to format date manually
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  };
  return date.toLocaleDateString('en-GB', options); // 'en-GB' gives format like '13 August 2024'
};

export default useEpisode;
