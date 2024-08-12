import { useState, useEffect } from 'react';
import axios from 'axios';
import { SeasonEpisodes } from '@/components/type';

const useEpisodesList = (tmdbId: number, number_of_seasons: number) => {
    const [episodes, setEpisodes] = useState<SeasonEpisodes[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY; // Ensure this is set

    useEffect(() => {
        const fetchEpisodes = async () => {
            setLoading(true);
            try {
                const allSeasons: SeasonEpisodes[] = [];
                let firstAvailableSeason: number | null = null;

                // Fetch the "Specials" season first if it exists (season_number = 0)
                try {
                    const specialsResponse = await axios.get(`https://api.themoviedb.org/3/tv/${tmdbId}/season/0`, {
                        params: {
                            api_key: API_KEY,
                        },
                    });

                    if (specialsResponse.data.episodes && specialsResponse.data.episodes.length > 0) {
                        const specialEpisodes: SeasonEpisodes = {
                            season_number: 0,
                            episodes: specialsResponse.data.episodes.map((ep: any) => ({
                                id: ep.id,
                                name: ep.name,
                                overview: ep.overview,
                                episode_number: ep.episode_number,
                                season_number: ep.season_number,
                                air_date: ep.air_date,
                                still_path: ep.still_path,
                                vote_average: ep.vote_average,
                                vote_count: ep.vote_count,
                            })),
                        };
                        allSeasons.push(specialEpisodes);
                    }
                } catch (err) {
                    // Season 0 does not exist or failed to fetch
                }

                // Fetch the remaining seasons
                for (let season = 1; season <= number_of_seasons; season++) {
                    const response = await axios.get(`https://api.themoviedb.org/3/tv/${tmdbId}/season/${season}`, {
                        params: {
                            api_key: API_KEY,
                        },
                    });

                    if (response.data.episodes && response.data.episodes.length > 0) {
                        if (firstAvailableSeason === null) {
                            firstAvailableSeason = season; // Set the first available season
                        }

                        const seasonEpisodes: SeasonEpisodes = {
                            season_number: season,
                            episodes: response.data.episodes.map((ep: any) => ({
                                id: ep.id,
                                name: ep.name,
                                overview: ep.overview,
                                episode_number: ep.episode_number,
                                season_number: ep.season_number,
                                air_date: ep.air_date,
                                still_path: ep.still_path,
                                vote_average: ep.vote_average,
                                vote_count: ep.vote_count,
                            })),
                        };

                        allSeasons.push(seasonEpisodes);
                    }
                }

                if (firstAvailableSeason !== null && allSeasons.length === 0) {
                    // Handle case where no seasons were fetched
                    setEpisodes([]);
                } else {
                    setEpisodes(allSeasons);
                }
                
            } catch (err) {
                setError('Failed to fetch episodes.');
            } finally {
                setLoading(false);
            }
        };

        if (tmdbId && number_of_seasons >= 0) {
            fetchEpisodes();
        }
    }, [tmdbId, number_of_seasons, API_KEY]);

    return { episodes, loading, error };
};

export default useEpisodesList;
