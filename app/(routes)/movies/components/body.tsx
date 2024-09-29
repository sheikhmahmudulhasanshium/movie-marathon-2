import useNowPlayingMovies from "@/hooks/use-now-playing";
import SampleCard from "@/components/sample-card";
import useUpcoming from "@/hooks/use-upcoming";
import useTopRated from "@/hooks/use-top-rated";
import usePopular from "@/hooks/use-popular";
import Searchbar from "@/components/modals/search-bar-advanced";

const Body = () => {
    const { now_playing: nowPlayingMovies, loading: nowPlayingMoviesLoading, error: nowPlayingMoviesError } = useNowPlayingMovies('movie');
    const { popular: popularMovies, loading: popularMoviesLoading, error: popularMoviesError } = usePopular('movie');
    const { top_rated: topRatedMovies, loading: topRatedMoviesLoading, error: topRatedMoviesError } = useTopRated('movie');
    const { upcoming: upcomingMovies, loading: upcomingMoviesLoading, error: upcomingMoviesError } = useUpcoming('movie');

    const handleNullValue = (value: string | null, defaultValue: string = 'N/A'): string => value || defaultValue;

    const renderMovieSection = (title: string, movies: any[], loading: boolean, error: string | null) => (
        <section id={title.toLowerCase().replace(' ', '-')} className="w-full max-w-screen-lg mx-auto p-4">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">{title}</h2>
            {loading ? (
                <div className="text-lg text-gray-600">Loading {title}...</div>
            ) : error ? (
                <div className="text-lg text-red-600">Error: {error}</div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {movies.map((movie: any) => (
                        <SampleCard
                            key={movie.id}
                            id={movie.id}
                            title={handleNullValue(movie.title)}
                            posterPath={handleNullValue(movie.poster_path)}
                            certification={handleNullValue(movie.certification)}
                            releaseDate={handleNullValue(movie.formatted_release_date)}
                            runtime={handleNullValue(movie.formatted_runtime, 'N/A')}
                            media_type={movie.media_type || 'N/A'}
                        />
                    ))}
                </div>
            )}
        </section>
    );

    return (
        <div className='flex flex-col mx-4 lg:mx-8 justify-center items-center'>
            <Searchbar Variant={"Movie"} />
            <div className="flex flex-col gap-y-12 w-full">
                {renderMovieSection('Now Playing', nowPlayingMovies || [], nowPlayingMoviesLoading, nowPlayingMoviesError)}
                {renderMovieSection('Popular', popularMovies || [], popularMoviesLoading, popularMoviesError)}
                {renderMovieSection('Top-Rated', topRatedMovies || [], topRatedMoviesLoading, topRatedMoviesError)}
                {renderMovieSection('Upcoming', upcomingMovies || [], upcomingMoviesLoading, upcomingMoviesError)}
            </div>
        </div>
    );
}

export default Body;
