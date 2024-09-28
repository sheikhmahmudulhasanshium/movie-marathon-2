import React, { useState } from 'react';
import Loading from "@/components/loading";
import Searchbar from "@/components/search-bar";
import { Button } from "@/components/ui/button";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import useCountry from "@/hooks/use-country";
import SampleCard from '@/components/sample-card';
import CountryDetails from './country-details';

interface Movie {
    id: number;
    title: string;
    poster_path: string | null;
    certification?: string | null;
    release_date?: string | null;
    runtime?: number | null;
}

interface TVShow {
    id: number;
    name: string;
    poster_path: string | null;
    first_air_date?: string | null;
    runtime?: number | null;
}

interface CountryData {
    id: string;
    native_name: string;
    english_name: string;
}

interface BodyProps {
    country_data: CountryData;
}

const Body: React.FC<BodyProps> = ({ country_data }) => {
    const [moviePage, setMoviePage] = useState<number>(1);
    const [tvPage, setTvPage] = useState<number>(1);
    const { movies, tvShows, loading, error } = useCountry(country_data?.id, moviePage, tvPage);

    const handleMoviePageChange = (page: number) => setMoviePage(page);
    const handleTvPageChange = (page: number) => setTvPage(page);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div className="text-red-500 text-center">Error: {error}</div>;
    }

    return (
        <div className="flex flex-col items-center w-full my-4 px-4" id='all'>
            <header className="my-8 text-center">
                <p className="text-2xl font-light">
                    Explore Movies and TV Shows from &quot;{country_data?.english_name}&quot;
                </p>
            </header>

            <Searchbar />
            {country_data && <CountryDetails id={country_data.id} />}

            {/* Movies Section */}
            <section className="w-10/12" id='movies'>
                <p className="text-2xl font-semibold mb-4">Movies</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {movies.length > 0 ? (
                        movies.map((movie) => (
                            <SampleCard
                                key={movie.id}
                                id={movie.id}
                                title={movie.title}
                                posterPath={movie.poster_path || ''}
                                certification={movie.certification || 'Not Rated'}
                                releaseDate={movie.release_date || 'Unknown'}
                                runtime={movie.runtime ? `${movie.runtime} min` : 'Runtime not available'}
                                media_type="movie"
                            />
                        ))
                    ) : (
                        <p className="text-center text-gray-600 mt-4">No movies found.</p>
                    )}
                </div>
                <Pagination className='flex flex-col justify-center items-center my-6'>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() => handleMoviePageChange(moviePage > 1 ? moviePage - 1 : 1)}
                                href="#"
                                aria-label="Previous movies page"
                                className={moviePage === 1 ? 'disabled' : ''}
                            />
                        </PaginationItem>
                        {[...Array(5)].map((_, index) => (
                            <PaginationItem key={index}>
                                <PaginationLink
                                    href="#"
                                    onClick={() => handleMoviePageChange(index + 1)}
                                    aria-label={`Go to page ${index + 1}`}
                                    className={moviePage === index + 1 ? 'active' : ''}
                                >
                                    {index + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext
                                onClick={() => handleMoviePageChange(moviePage < 5 ? moviePage + 1 : 5)}
                                href="#"
                                aria-label="Next movies page"
                                className={moviePage === 5 ? 'disabled' : ''}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </section>

            {/* TV Shows Section */}
            <section className="w-10/12" id='tv-shows'>
                <p className="text-2xl font-semibold mb-4">TV Shows</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {tvShows.length > 0 ? (
                        tvShows.map((show) => (
                            <SampleCard
                                key={show.id}
                                id={show.id}
                                title={show.name}
                                posterPath={show.poster_path || ''}
                                certification="Not Rated" // Assuming no certification for TV shows
                                releaseDate={show.first_air_date || 'Unknown'}
                                runtime={show.runtime ? `${show.runtime} min` : 'Runtime not available'}
                                media_type="tv"
                            />
                        ))
                    ) : (
                        <p className="text-center text-gray-600 mt-4">No TV shows found.</p>
                    )}
                </div>
                <Pagination className='flex flex-col justify-center items-center my-6'>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() => handleTvPageChange(tvPage > 1 ? tvPage - 1 : 1)}
                                href="#"
                                aria-label="Previous TV shows page"
                                className={tvPage === 1 ? 'disabled' : ''}
                            />
                        </PaginationItem>
                        {[...Array(5)].map((_, index) => (
                            <PaginationItem key={index}>
                                <PaginationLink
                                    href="#"
                                    onClick={() => handleTvPageChange(index + 1)}
                                    aria-label={`Go to page ${index + 1}`}
                                    className={tvPage === index + 1 ? 'active' : ''}
                                >
                                    {index + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext
                                onClick={() => handleTvPageChange(tvPage < 5 ? tvPage + 1 : 5)}
                                href="#"
                                aria-label="Next TV shows page"
                                className={tvPage === 5 ? 'disabled' : ''}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </section>
        </div>
    );
};

export default Body;
