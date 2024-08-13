import { useEffect, useState } from 'react';
import axios from 'axios';
import { Episode } from '@/components/type';
import { formatTime } from '@/lib/format-time';
import { formatDate } from '@/lib/format-date';

// Utility functions

const useEpisode = (id: string, season_number: string, episode_number: string) => {
    const [episode, setEpisode] = useState<Episode | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

    useEffect(() => {
        const fetchEpisode = async () => {
            if (!id || !season_number || !episode_number || !API_KEY) {
                setError('Invalid parameters or missing API key');
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
                const formattedRuntime = formatTime(episodeData.runtime);

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

export default useEpisode;
