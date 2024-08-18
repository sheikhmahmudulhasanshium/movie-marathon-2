import React, { useState } from 'react';
import SampleCard from '@/components/sample-card';
import useCountriesData from '@/hooks/use-countries';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
interface Movie {
    id: string; // Changed to string to match expected type
    name: string;
    poster: string;
    release_date: string;
    duration: number;
}

interface TVSeries {
    id: string; // Changed to string to match expected type
    name: string;
    poster: string;
    first_air_date: string;
    duration: number;
}

interface CountryData {
    country_name: string;
    movie_list: Movie[];
    iso_3166_1: string;
    tvseries_list: TVSeries[];
}

interface BodyProps {
    selectedOption: string;
}

const Body: React.FC<BodyProps> = ({ selectedOption }) => {
    const { famousCountriesData, countriesData, loading, error } = useCountriesData();
    const [visibleCountries, setVisibleCountries] = useState(0);

    const loadMoreCountries = () => {
        setVisibleCountries(prev => prev + 20);
    };

    if (loading) return <div className="flex justify-center items-center h-screen text-xl">Loading...</div>;
    if (error) return <div className="flex justify-center items-center h-screen text-red-600 text-xl">Error: {error}</div>;

    const renderMovies = (movies: Movie[], index: number) => (
        movies.map((movie) => (
            <SampleCard
                key={movie.id}
                id={parseInt(movie.id)} // Using movie ID which is now a string
                title={movie.name}
                posterPath={movie.poster}
                certification="Not Rated" // Add actual certification if available
                releaseDate={movie.release_date}
                runtime={movie.duration.toString()}
                media_type="movie"
            />
        ))
    );

    const renderTVShows = (tvSeries: TVSeries[], index: number) => (
        tvSeries.map((tv) => (
            <SampleCard
                key={tv.id}
                id={parseInt(tv.id)} // Using TV show ID which is now a string
                title={tv.name}
                posterPath={tv.poster}
                certification="Not Rated" // Add actual certification if available
                releaseDate={tv.first_air_date}
                runtime={tv.duration.toString()}
                media_type="tv"
            />
        ))
    );

    const renderCountryContent = (country: CountryData, index: number) => (
        <div key={index} className="border rounded-xl p-6 bg-white shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-center text-blue-600 flex gap-2">
                {country.country_name}
                <Image src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${country.iso_3166_1}.svg`} alt={country.country_name} height={60} width={40} className='border p-1'/>
            </h3>
            <div className="space-y-8">
                {(selectedOption === "All" || selectedOption === "Movies") && (
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-gray-700">Movies</h4>
                        <div className="flex flex-wrap gap-6 justify-center">
                            {renderMovies(country.movie_list, index)}
                        </div>
                    </div>
                )}
                {(selectedOption === "All" || selectedOption === "TV Shows") && (
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-gray-700">TV Shows</h4>
                        <div className="flex flex-wrap gap-6 justify-center">
                            {renderTVShows(country.tvseries_list, index)}
                        </div>
                    </div>
                )}
                <Link href={`/country/${country.iso_3166_1}`} className='flex justify-center items-center w-full text-xl '>
                        <Button variant='outline' >
                            See More...
                        </Button>
                </Link>
                
            </div>
            
        </div>
    );

    return (
        <div className="p-8 space-y-16">
            {/* Render Famous Countries Data */}
            <div>
                <h2 className="text-3xl font-light mb-8 text-center text-gray-800">Discover Movies And Tv Shows From &quot;Famous Countries&quot;</h2>
                <div className="space-y-12">
                    {famousCountriesData.map(renderCountryContent)}
                </div>
            </div>

            {/* Render Other Countries Data */}
            {visibleCountries > 0 && (
                <div>
                    <h2 className="text-3xl font-light mb-8 text-center text-gray-800">Discover Movies And Tv Shows From &quot;All Countries&quot;</h2>
                    <div className="space-y-12">
                        {countriesData.slice(0, visibleCountries).map(renderCountryContent)}
                    </div>
                </div>
            )}

            {/* Show More Button */}
            <div className="flex justify-center">
                {visibleCountries < countriesData.length && (
                    <button
                        onClick={loadMoreCountries}
                        className="px-6 py-3 mt-8 text-lg font-semibold text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700 transition-colors"
                    >
                        Show More
                    </button>
                )}
            </div>
        </div>
    );
};

export default Body;
