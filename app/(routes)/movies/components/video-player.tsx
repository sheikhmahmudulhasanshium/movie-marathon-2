import { useState } from "react";
import ServerSelector from "@/app/(routes)/movies/components/server-selector";
import { Movie } from "@/components/type";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";

interface VideoPlayerProps {
    movie: Movie | null;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ movie }) => {
    const [videoUrl, setVideoUrl] = useState<string | null>(null);

    const onServerSelect = (url: string) => {
        setVideoUrl(url);
    };

    const onClickVideoPlayerButton = () => {
        const element = document.getElementById("video-player-button");
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const backdropImageUrl = movie?.backdrop_path
        ? `url(https://media.themoviedb.org/t/p/w500/${movie.backdrop_path})`
        : '';

    // Ensure movieId is a string
    const movieId = movie?.id ? movie.id.toString() : "";

    return (
        <div className="py-6 w-full my-12 flex flex-col items-center justify-center">
            {!videoUrl ? (
                <div
                    className="flex justify-center items-center bg-cover bg-center w-10/12 h-svh"
                    style={{ backgroundImage: backdropImageUrl }}
                >
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full w-40 h-40 hover:opacity-30 text-cyan-900"
                        onClick={onClickVideoPlayerButton}
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
            <ServerSelector movieId={movieId} onServerSelect={onServerSelect} />
        </div>
    );
};

export default VideoPlayer;
