import React from 'react';
import Image from 'next/image';
import Description from './description';
import SampleCard from '@/components/sample-card';
import { CompanyResponse, Movie, TVShow } from '@/components/type';
import { formatDate } from '@/lib/format-date';
import { formatTime } from '@/lib/format-time';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';

interface BodyProps {
    companyResponse: CompanyResponse;
    onPageChange: (page: number, type: 'movies' | 'series') => void;
    moviePage: number;
    seriesPage: number;
}

const Body: React.FC<BodyProps> = ({ companyResponse, onPageChange, moviePage, seriesPage }) => {
    const { company, movies, series } = companyResponse;
    const totalMoviePages = 8; // Update this based on actual total pages if available
    const totalSeriesPages = 8; // Update this based on actual total pages if available

    const goToPreviousMoviePage = () => {
        if (moviePage > 1) onPageChange(moviePage - 1, 'movies');
    };

    const goToNextMoviePage = () => {
        if (moviePage < totalMoviePages) onPageChange(moviePage + 1, 'movies');
    };

    const goToMoviePage = (page: number) => {
        onPageChange(page, 'movies');
    };

    const goToPreviousSeriesPage = () => {
        if (seriesPage > 1) onPageChange(seriesPage - 1, 'series');
    };

    const goToNextSeriesPage = () => {
        if (seriesPage < totalSeriesPages) onPageChange(seriesPage + 1, 'series');
    };

    const goToSeriesPage = (page: number) => {
        onPageChange(page, 'series');
    };

    return (
        <div className="my-6 flex flex-col items-center w-full px-4">
            <div className="flex flex-col items-center w-full max-w-6xl" id='all'>
                <div className="py-12 flex justify-center items-center">
                    <Image
                        src={`https://image.tmdb.org/t/p/w500/${company.logo_path || 'default-logo.png'}`}
                        alt={company.name}
                        height={500}
                        width={500}
                        quality={100}
                        loading="lazy"
                        className="animate-pulse"
                    />
                </div>
                <Description company={company} />

                {movies.length > 0 && (
                    <div id="movies" className='flex flex-col justify-between my-8 w-full'>
                        <p className='text-2xl font-semibold flex pl-4 pb-8'>
                            Movies
                        </p>
                        <div className='flex flex-wrap gap-4 justify-center'>
                            {movies.map((movie: Movie) => (
                                <div key={movie.id} className='w-full sm:w-1/3 md:w-1/4 lg:w-1/5'>
                                    <SampleCard
                                        id={movie.id}
                                        title={movie.title}
                                        posterPath={movie.poster_path || ''}
                                        certification={movie.certification || 'N/A'}
                                        releaseDate={formatDate(movie.release_date)}
                                        runtime={formatTime(Number(movie.runtime) || 0)}
                                        media_type="movie"
                                    />
                                </div>
                            ))}
                        </div>
                        {totalMoviePages > 1 && (
                            <Pagination className='flex justify-center mt-4'>
                                <PaginationContent className='my-6'>
                                    <PaginationItem>
                                        <PaginationPrevious onClick={goToPreviousMoviePage} />
                                    </PaginationItem>
                                    {[...Array(totalMoviePages)].map((_, index) => (
                                        <PaginationItem key={index}>
                                            <PaginationLink
                                                onClick={() => goToMoviePage(index + 1)}
                                                className={moviePage === index + 1 ? 'font-bold border' : ''}
                                            >
                                                {index + 1}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}
                                    <PaginationItem>
                                        <PaginationNext onClick={goToNextMoviePage} />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        )}
                    </div>
                )}

                {series.length > 0 && (
                    <div id="tv-shows" className='flex flex-col justify-between my-8 w-full'>
                        <p className='text-2xl font-semibold flex pl-4 pb-8'>
                            TV Shows
                        </p>
                        <div className='flex flex-wrap gap-4 justify-center'>
                            {series.map((tvShow: TVShow) => (
                                <div key={tvShow.id} className='w-full sm:w-1/3 md:w-1/4 lg:w-1/5'>
                                    <SampleCard
                                        id={tvShow.id}
                                        title={tvShow.name}
                                        posterPath={tvShow.poster_path || ''}
                                        certification={tvShow.content_ratings.results[0]?.rating || 'N/A'}
                                        releaseDate={formatDate(tvShow.first_air_date)}
                                        runtime={tvShow.runtime?.length > 0 ? formatTime(parseInt(tvShow.runtime)) : 'N/A'}
                                        media_type="tv"
                                    />
                                </div>
                            ))}
                        </div>
                        {totalSeriesPages > 1 && (
                            <Pagination className='flex justify-center mt-4'>
                                <PaginationContent className='my-6'>
                                    <PaginationItem>
                                        <PaginationPrevious onClick={goToPreviousSeriesPage} />
                                    </PaginationItem>
                                    {[...Array(totalSeriesPages)].map((_, index) => (
                                        <PaginationItem key={index}>
                                            <PaginationLink
                                                onClick={() => goToSeriesPage(index + 1)}
                                                className={seriesPage === index + 1 ? 'font-bold border' : ''}
                                            >
                                                {index + 1}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}
                                    <PaginationItem>
                                        <PaginationNext onClick={goToNextSeriesPage} />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Body;
