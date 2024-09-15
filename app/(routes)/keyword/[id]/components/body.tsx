import SampleCard from "@/components/sample-card";
import Searchbar from "@/components/search-bar";
import { Keyword, Movie, TVShow } from "@/components/type";

interface BodyProps {
    data: {
        keyword: Keyword[];
        movies: Movie[];
        series: TVShow[];
    };
}

const Body = ({ data }: BodyProps) => {
    const { keyword, movies, series } = data;

    return (
        <div className="flex flex-col items-center w-full my-4 px-4" id="all">
            {/* Title Section */}
            <header className="my-8 text-center">
                <p className="text-2xl font-light">
                    Explore Movies and TV Shows from &quot;{keyword[0]?.name || 'Loading...'}&quot; Keyword
                </p>
            </header>

            {/* Search Bar */}
            <Searchbar />

            {/* Movies Section */}
            <div className="flex w-10/12 justify-center items-center">
                {movies.length > 0 ? (
                    <div className="mb-8">
                        <p className="text-2xl font-semibold mb-4">Movies</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                            {movies.map((movie) => (
                                <SampleCard
                                    key={movie.id}
                                    id={movie.id}
                                    title={movie.title}
                                    posterPath={movie.poster_path || ''} // Ensure posterPath is a string
                                    certification={movie.certification || 'Not Rated'}
                                    releaseDate={movie.release_date || 'Unknown Date'}
                                    runtime={movie.runtime?.toString() || 'Runtime not available'}
                                    media_type="movie"
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <p>No movies found.</p>
                )}
            </div>

            {/* TV Shows Section */}
            <div className="flex w-10/12 justify-center items-center">
                {series.length > 0 ? (
                    <div className="mb-8">
                        <p className="text-2xl font-semibold mb-4">TV Shows</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                            {series.map((show) => (
                                <SampleCard
                                    key={show.id}
                                    id={show.id}
                                    title={show.name}  // TV show titles are accessed via `name`
                                    posterPath={show.poster_path || ''} // Ensure posterPath is a string
                                    certification="Not Rated"  // TV shows may not have a certification property
                                    releaseDate={show.first_air_date || 'Unknown Date'} // Use `first_air_date` for TV shows
                                    runtime={show.runtime || 'Runtime not available'}
                                    media_type="tv"
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <p>No TV shows found.</p>
                )}
            </div>
        </div>
    );
};

export default Body;
