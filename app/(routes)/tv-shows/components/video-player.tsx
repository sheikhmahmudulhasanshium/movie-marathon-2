import { useState } from "react";
import { TVShow } from "@/components/type";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";
import ServerSelector from "./server-selector";

interface VideoPlayerProps {
    series?: TVShow | null;
    season_number?: number;
    episode_number?: number;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ series, season_number, episode_number }) => {
    const [videoUrl, setVideoUrl] = useState<string | null>(null);

    // Function to handle server selection
    const handleServerSelect = (url: string) => {
        setVideoUrl(url);
    };

    // Function to scroll to video player button
    const handleScrollToButton = () => {
        const element = document.getElementById("video-player-button");
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Derive backdrop image URL if available
    const backdropImageUrl = series?.backdrop_path
        ? `url(https://media.themoviedb.org/t/p/w500/${series.backdrop_path})`
        : 'url(/path/to/default/backdrop.jpg)'; // Provide a default backdrop

    // Ensure seriesId is a string and provide a fallback value if not available
    const seriesId = series?.id ? series.id.toString() : "";

    return (
        <div className="py-6 w-full my-12 flex flex-col items-center justify-center">
            {!videoUrl ? (
                <div
                    className="flex justify-center items-center bg-cover bg-center w-10/12 h-[calc(100vh-3rem)]" // Adjusted height for better responsiveness
                    style={{ backgroundImage: backdropImageUrl }}
                >
                    <Button
                        id="video-player-button"
                        variant="ghost"
                        size="icon"
                        className="rounded-full w-40 h-40 hover:opacity-30 text-cyan-900"
                        onClick={handleScrollToButton}
                    >
                        <PlayCircle className="w-40 h-40" />
                    </Button>
                </div>
            ) : (
                <div className="w-10/12 h-screen flex justify-center items-center">
                    <iframe
                        src={videoUrl}
                        title="Video Player"
                        className="w-full h-full"
                        frameBorder="0"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                    />
                </div>
            )}
            <ServerSelector
                seriesId={seriesId}
                season_number={season_number}
                episode_number={episode_number}
                onServerSelect={handleServerSelect}
            />
        </div>
    );
};

export default VideoPlayer;
