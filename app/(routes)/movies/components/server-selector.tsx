import { useState } from "react";
import { LucideInfo, PlayIcon } from "lucide-react";

// Define a type for the server list items
interface Server {
    server_name: string;
    base_url: string;
    movie_format?: string;
    series_format?: string;
    season_format?: string;
    episode_format?: string;
    default_subtitle?: string;
}

const serverList: Server[] = [
    {
        server_name: "vidsrc.net",
        base_url: "https://vidsrc.net",
        movie_format: "https://vidsrc.net/embed/movie/{id}?ds_lang=en",
        series_format: "https://vidsrc.net/embed/tv/{id}?ds_lang=en",
        episode_format: "https://vidsrc.net/embed/tv/{id}?&season={season_number}&episode={episode_number}&ds_lang=en",
        default_subtitle: "en"
    },
    {
        server_name: "vidsrc.xyz",
        base_url: "https://vidsrc.xyz",
        movie_format: "https://vidsrc.xyz/embed/movie/{id}?ds_lang=en",
        series_format: "https://vidsrc.xyz/embed/tv/{id}?ds_lang=en",
        episode_format: "https://vidsrc.xyz/embed/tv/{id}/{season_number}-{episode_number}&ds_lang=en",
        default_subtitle: "en"
    },
    {
        server_name: "vidsrc.in",
        base_url: "https://vidsrc.in",
        movie_format: "https://vidsrc.in/embed/movie/{id}?&ds_lang=en",
        series_format: "https://vidsrc.in/embed/tv/{id}?&ds_lang=en",
        episode_format: "https://vidsrc.in/embed/tv?tmdb={id}&season={season_number}&episode={episode_number}&ds_lang=en",
        default_subtitle: "en"
    },
    {
        server_name: "2embed.cc",
        base_url: "https://www.2embed.cc",
        movie_format: "https://www.2embed.cc/embed/{id}",
        season_format: "https://www.2embed.cc/embedtvfull/{id}",
        episode_format: "https://www.2embed.cc/embedtv/{id}&s={season_number}&e={episode_number}",
    },
    {
        server_name: "2embed.skin",
        base_url: "https://www.2embed.skin",
        movie_format: "https://www.2embed.skin/embed/{id}",
        season_format: "https://www.2embed.skin/embedtvfull/{id}",
        episode_format: "https://www.2embed.skin/embedtv/{id}&s={season_number}&e={episode_number}",
    },
];

interface ServerSelectorProps {
    movieId: string;
    onServerSelect: (url: string) => void;
}

const ServerSelector: React.FC<ServerSelectorProps> = ({ movieId, onServerSelect }) => {
    const [selectedServer, setSelectedServer] = useState<Server | null>(null);

    const handleServerSelect = (server: Server) => {
        setSelectedServer(server);
        if (server.movie_format) {
            const videoUrl = server.movie_format.replace("{id}", movieId);
            onServerSelect(videoUrl);
        }
    };

    return (
        <div className="shadow-xl shadow-accent-foreground my-12 flex flex-col items-center w-10/12 pt-4 justify-between" id="video-player-button">
            <div className="flex flex-wrap items-center py-6 justify-center gap-4">
                {serverList.map((server) => (
                    <div
                        key={server.server_name}
                        className={`flex text-xl border p-3 rounded-xl items-center gap-2 cursor-pointer ${
                            selectedServer?.server_name === server.server_name
                                ? "bg-cyan-900 text-white"
                                : "bg-accent hover:bg-cyan-900 hover:text-white"
                        }`}
                        onClick={() => handleServerSelect(server)}
                        aria-selected={selectedServer?.server_name === server.server_name}
                        role="button"
                    >
                        <PlayIcon />
                        <div className="flex flex-col">
                            <p className="font-light">Server</p>
                            <p className="font-bold">{server.server_name}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex text-center pb-4 justify-center items-center text-base gap-1 text-slate-500">
                <LucideInfo className="text-sm" />
                <p>If the current server doesn&apos;t work, please try other servers above.</p>
            </div>
        </div>
    );
};

export default ServerSelector;
