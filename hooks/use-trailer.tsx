import { useState, useEffect } from 'react';
import axios from 'axios';

export interface Video {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: string;
    id: string;
}

export interface UseVideoResult {
    videos: Video[] | null;
    loading: boolean;
    error: string | null;
}

const useVideo = (tmdbID: string, media_type: string): UseVideoResult => {
    const [videos, setVideos] = useState<Video[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    let seriesId = tmdbID;
    let season_number = '';
    let episode_number = '';
    let isEpisode = false;

    // Handle TV episodes combined ID case
    if (media_type === 'tv' && typeof tmdbID === 'string' && tmdbID.includes('-')) {
        const parts = tmdbID.split('-');
        if (parts.length === 3) {
            seriesId = parts[0];
            season_number = parts[1];
            episode_number = parts[2];
            isEpisode = true;
        }
    }

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                setLoading(true);

                const url = isEpisode
                    ? `https://api.themoviedb.org/3/tv/${seriesId}/season/${parseInt(season_number)}/episode/${parseInt(episode_number)}/videos`
                    : `https://api.themoviedb.org/3/${media_type}/${tmdbID}/videos`;

                console.log('Fetching URL:', url);

                const response = await axios.get(url, {
                    params: {
                        api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
                    },
                });

                console.log('API Response:', response.data); // Log the response

                if (response.data.results.length === 0) {
                    console.warn('No videos found for this episode.');
                }

                setVideos(response.data.results);
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    setError(`Error fetching videos: ${err.message}`);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, [tmdbID, media_type, seriesId, season_number, episode_number, isEpisode]);

    useEffect(() => {
        console.log('Videos state updated:', videos);
    }, [videos]);

    return { videos, loading, error };
};

export default useVideo;
