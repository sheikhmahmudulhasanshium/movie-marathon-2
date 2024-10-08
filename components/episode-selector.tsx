import { useState, useEffect } from "react";
import { SeasonEpisodes, TVShow, Episode } from "@/components/type"; // Import Episode type
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useEpisodes from "@/hooks/use-episodes-list";
import { List, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface EpisodeSelectorProps {
    series: TVShow;
    default_season: number;
    default_episode: number;
}

const EpisodeSelector: React.FC<EpisodeSelectorProps> = ({ series, default_season, default_episode }) => {
    const { episodes, loading, error } = useEpisodes(series.id, series.number_of_seasons);
    const [selectedSeason, setSelectedSeason] = useState<number | null>(default_season);
    const [selectedEpisode, setSelectedEpisode] = useState<number | null>(default_episode);

    useEffect(() => {
        // Reset selected season and episode if default_season or default_episode changes
        setSelectedSeason(default_season);
        setSelectedEpisode(default_episode);
    }, [default_season, default_episode]);

    if (loading) {
        return <div>Loading episodes...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleSeasonChange = (seasonNumber: string) => {
        const newSeason = parseInt(seasonNumber, 10);
        setSelectedSeason(newSeason);
        // Reset selected episode when season changes
        setSelectedEpisode(null);
    };

    const filteredEpisodes = selectedSeason !== null
        ? episodes.find((season: SeasonEpisodes) => season.season_number === selectedSeason)?.episodes || []
        : [];

    const trimTitle = (title: string) => {
        return title.length > 20 ? title.slice(0, 17) + "..." : title;
    };

    // Utility function to format a string into a URL-friendly format
    const formatText = (text: string) => {
        return text
            .toLowerCase()
            .replace(/[^a-z0-9&]+/g, '-') // Replace non-alphanumeric characters with dashes
            .replace(/(^-|-$)+/g, '');  // Remove leading and trailing dashes
    };

    return (
        <div className="flex flex-col w-full my-6 py-6 px-6 bg-cyan-950 text-white min-h-[20rem]">
            {episodes.length > 0 && (
                <>
                    <Select value={selectedSeason?.toString()} onValueChange={handleSeasonChange}>
                        <SelectTrigger className="w-4/12 sm:w-4/12 md:w-4/12 lg:w-2/12 text-lg flex font-semibold justify-start gap-2">
                            <List className="justify-start" />
                            <SelectValue placeholder="Select Season" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {episodes.map((season: SeasonEpisodes) => (
                                    <SelectItem key={season.season_number} value={season.season_number.toString()}>
                                        {season.season_number === 0 ? "Specials" : `Season ${season.season_number}`}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredEpisodes.length > 0 ? (
                            filteredEpisodes.map((episode: Episode) => ( // Explicitly type 'episode'
                                <Button
                                    key={episode.id}
                                    variant='outline'
                                    className={`w-full text-left flex items-center justify-between p-3 transition-all duration-300 ${
                                        episode.episode_number === selectedEpisode
                                            ? 'bg-cyan-700 text-white'
                                            : 'hover:bg-cyan-800 hover:text-white'
                                    }`}
                                >
                                    <Link 
                                        href={`/tv-shows/${series.id}-${formatText(series.name)}/${formatText(`${series.id} ${selectedSeason} ${episode.episode_number}`)}`}
                                        className={`flex items-center w-full ${
                                            episode.episode_number === selectedEpisode ? 'text-white ' : 'text-cyan-700 hover:text-white'
                                        }`}
                                    >
                                        <Play className="h-4 w-4 mr-2" />
                                        <p className="flex-1 text-sm md:text-base truncate">
                                            Episode {episode.episode_number}: {trimTitle(episode.name)}
                                        </p>
                                    </Link>
                                </Button>
                            ))
                        ) : (
                            selectedSeason !== null && <div>No episodes available for this season.</div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default EpisodeSelector;
