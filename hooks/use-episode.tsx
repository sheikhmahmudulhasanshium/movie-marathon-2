import { useState, useEffect } from 'react';
import axios from 'axios';
import { Episode } from '@/components/type';

const useEpisode = (id: string, season_number: string, episode_number: string) => {
    const [episode, setEpisode] = useState<Episode | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

    useEffect(() => {
        const fetchEpisode = async () => {
            try {
                const response = await axios.get<Episode>(`https://api.themoviedb.org/3/tv/${id}/season/${season_number}/episode/${episode_number}`, {
                    params: {
                        api_key: API_KEY,
                    },
                });
                setEpisode(response.data);
            } catch (err) {
                setError('Failed to fetch episode data.');
            } finally {
                setLoading(false);
            }
        };

        fetchEpisode();
    }, [id, season_number, episode_number, API_KEY]);

    return { episode, loading, error };
}

export default useEpisode;
