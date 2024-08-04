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

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`https://api.themoviedb.org/3/${media_type}/${tmdbID}/videos`, {
                    params: {
                        api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
                    },
                });
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
    }, [tmdbID,media_type]);

    return { videos, loading, error };
};

export default useVideo;
