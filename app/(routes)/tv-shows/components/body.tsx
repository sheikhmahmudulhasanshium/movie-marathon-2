import SampleCard from "@/components/sample-card";
import useTopRated from "@/hooks/use-top-rated";
import usePopular from "@/hooks/use-popular";
import useAiringToday from "@/hooks/use-airing-today";
import useOnAir from "@/hooks/use-on-air";
import Searchbar from "@/components/modals/search-bar-advanced";

const Body = () => {
    const { airing_today: airingTodaySeries, loading: airingTodaySeriesLoading, error: airingTodaySeriesError } = useAiringToday('tv');
    const { popular: popularSeries, loading: popularSeriesLoading, error: popularSeriesError } = usePopular('tv');
    const { top_rated: topRatedSeries, loading: topRatedSeriesLoading, error: topRatedSeriesError } = useTopRated('tv');
    const { on_air: onAirSeries, loading: onAirSeriesLoading, error: onAirSeriesError } = useOnAir('tv');

    const handleNullValue = (value: string | null, defaultValue: string = 'N/A'): string => value || defaultValue;

    const renderSeriesSection = (title: string, movies: any[], loading: boolean, error: string | null) => (
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
            <Searchbar Variant={"Series"} />
            <div className="flex flex-col gap-y-12 w-full">
                {renderSeriesSection('On the Air', onAirSeries || [], onAirSeriesLoading, onAirSeriesError)}
                {renderSeriesSection('Airing Today', airingTodaySeries || [], airingTodaySeriesLoading, airingTodaySeriesError)}
                {renderSeriesSection('Popular', popularSeries || [], popularSeriesLoading, popularSeriesError)}
                {renderSeriesSection('Top-Rated', topRatedSeries || [], topRatedSeriesLoading, topRatedSeriesError)}
            </div>
        </div>
    );
}

export default Body;
