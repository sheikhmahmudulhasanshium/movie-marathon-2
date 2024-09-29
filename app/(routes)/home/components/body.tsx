import SampleCard from "@/components/sample-card";
import useTopRated from "@/hooks/use-top-rated";
import usePopular from "@/hooks/use-popular";
import useAiringToday from "@/hooks/use-airing-today";
import useOnAir from "@/hooks/use-on-air";
import useNowPlayingMovies from "@/hooks/use-now-playing";
import useUpcoming from "@/hooks/use-upcoming";
import Searchbar from "@/components/modals/search-bar-advanced";

const Body = () => {
    // TV Series Hooks
    const { airing_today: airingTodaySeries, loading: airingTodaySeriesLoading, error: airingTodaySeriesError } = useAiringToday('tv');
    const { popular: popularSeries, loading: popularSeriesLoading, error: popularSeriesError } = usePopular('tv');
    const { top_rated: topRatedSeries, loading: topRatedSeriesLoading, error: topRatedSeriesError } = useTopRated('tv');
    const { on_air: onAirSeries, loading: onAirSeriesLoading, error: onAirSeriesError } = useOnAir('tv');

    // Movie Hooks
    const { now_playing: nowPlayingMovies, loading: nowPlayingMoviesLoading, error: nowPlayingMoviesError } = useNowPlayingMovies('movie');
    const { popular: popularMovies, loading: popularMoviesLoading, error: popularMoviesError } = usePopular('movie');
    const { top_rated: topRatedMovies, loading: topRatedMoviesLoading, error: topRatedMoviesError } = useTopRated('movie');
    const { upcoming: upcomingMovies, loading: upcomingMoviesLoading, error: upcomingMoviesError } = useUpcoming('movie');

    // Utility function to handle null values
    const handleNullValue = (value: string | null, defaultValue: string = 'N/A'): string => value || defaultValue;

    // Render TV Series Section
    const renderSeriesSection = (title: string, series: any[], loading: boolean, error: string | null) => (
        <section id={title.toLowerCase().replace(' ', '-')} className="w-full max-w-screen-lg mx-auto p-6 bg-gray-50 rounded-lg shadow-lg mb-8">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">{title}</h2>
            {loading ? (
                <div className="flex items-center justify-center h-40 text-lg text-gray-600">Loading {title}...</div>
            ) : error ? (
                <div className="text-lg text-red-600">{error}</div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {series.map((item: any) => (
                        <SampleCard
                            key={item.id}
                            id={item.id}
                            title={handleNullValue(item.title)}
                            posterPath={handleNullValue(item.poster_path)}
                            certification={handleNullValue(item.certification)}
                            releaseDate={handleNullValue(item.formatted_release_date)}
                            runtime={handleNullValue(item.formatted_runtime, 'N/A')}
                            media_type={item.media_type || 'N/A'}
                        />
                    ))}
                </div>
            )}
        </section>
    );

    // Render Movie Section
    const renderMovieSection = (title: string, movies: any[], loading: boolean, error: string | null) => (
        <section id={title.toLowerCase().replace(' ', '-')} className="w-full max-w-screen-lg mx-auto p-6 bg-gray-50 rounded-lg shadow-lg mb-8">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">{title}</h2>
            {loading ? (
                <div className="flex items-center justify-center h-40 text-lg text-gray-600">Loading {title}...</div>
            ) : error ? (
                <div className="text-lg text-red-600">{error}</div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
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
            <p className="font-light text-2xl pt-4 mb-8 text-gray-700">Explore Movies, TV Shows, and More</p>
            <Searchbar Variant={"All"} />
            <div className="flex flex-col gap-y-12 w-full">
                {/* Movie Sections */}
                {renderMovieSection('Movies Now Playing', nowPlayingMovies || [], nowPlayingMoviesLoading, nowPlayingMoviesError)}
                {renderMovieSection('Popular Movies', popularMovies || [], popularMoviesLoading, popularMoviesError)}
                {renderMovieSection('Top-Rated Movies', topRatedMovies || [], topRatedMoviesLoading, topRatedMoviesError)}
                {renderMovieSection('Upcoming Movies', upcomingMovies || [], upcomingMoviesLoading, upcomingMoviesError)}

                {/* TV Sections */}
                {renderSeriesSection('Shows On the Air', onAirSeries || [], onAirSeriesLoading, onAirSeriesError)}
                {renderSeriesSection('Shows Airing Today', airingTodaySeries || [], airingTodaySeriesLoading, airingTodaySeriesError)}
                {renderSeriesSection('Popular Shows', popularSeries || [], popularSeriesLoading, popularSeriesError)}
                {renderSeriesSection('Top-Rated Shows', topRatedSeries || [], topRatedSeriesLoading, topRatedSeriesError)}
            </div>
        </div>
    );
}

export default Body;
