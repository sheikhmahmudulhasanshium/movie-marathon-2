import { useState } from "react";
import { LucideInfo, PlayIcon, ShieldAlert } from "lucide-react";

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
    seriesId: string;
    season_number?: number;
    episode_number?: number;
    onServerSelect: (url: string) => void;
}

const ServerSelector: React.FC<ServerSelectorProps> = ({ seriesId, season_number, episode_number, onServerSelect }) => {
    const [selectedServer, setSelectedServer] = useState<Server | null>(null);
    const [serverSelected, setServerSelected] = useState(false);

    // Function to generate video URL based on server format
    const generateVideoUrl = (server: Server) => {
        if (server.episode_format && season_number !== undefined && episode_number !== undefined) {
            return server.episode_format
                .replace("{id}", seriesId)
                .replace("{season_number}", season_number.toString())
                .replace("{episode_number}", episode_number.toString());
        }
        if (server.series_format) {
            return server.series_format.replace("{id}", seriesId);
        }
        return "";
    };

    // Handle server selection and URL generation
    const handleServerSelect = (server: Server) => {
        setSelectedServer(server);
        setServerSelected(true);
        const videoUrl = generateVideoUrl(server);
        if (videoUrl) {
            onServerSelect(videoUrl);
        }
    };

    return (
        <div className="shadow-xl shadow-accent-foreground my-12 flex flex-col items-center w-10/12 pt-4 justify-between" id="video-player-button">
            {!serverSelected && (
                <div className="flex items-center gap-2 text-red-600 mb-4">
                    <ShieldAlert />
                    <p>Select a Server</p>
                </div>
            )}
            <div className="flex flex-wrap items-center py-6 justify-center gap-4">
                {serverList.length === 0 ? (
                    <p>No servers available</p>
                ) : (
                    serverList.map((server) => (
                        <button
                            key={server.server_name}
                            className={`flex text-xl border p-3 rounded-xl items-center gap-2 cursor-pointer ${
                                selectedServer?.server_name === server.server_name
                                    ? "bg-cyan-900 text-white"
                                    : "bg-accent hover:bg-cyan-900 hover:text-white"
                            }`}
                            onClick={() => handleServerSelect(server)}
                            aria-pressed={selectedServer?.server_name === server.server_name}
                            aria-label={`Select ${server.server_name}`}
                        >
                            <PlayIcon />
                            <div className="flex flex-col">
                                <p className="font-light">Server</p>
                                <p className="font-bold">{server.server_name}</p>
                            </div>
                        </button>
                    ))
                )}
            </div>
            <div className="flex text-center pb-4 justify-center items-center text-base gap-1 text-slate-500">
                <LucideInfo className="text-sm" />
                <p>If the current server doesn&apos;t work, please try other servers above.</p>
            </div>
        </div>
    );
};

export default ServerSelector;
