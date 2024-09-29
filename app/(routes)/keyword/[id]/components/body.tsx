import React, { useState } from 'react';
import SampleCard from "@/components/sample-card";
import useKeyword from "@/hooks/use-keyword";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"; // Adjust based on your actual import
import Searchbar from '@/components/modals/search-bar-advanced';

interface BodyProps {
    id: number;
}

const Body: React.FC<BodyProps> = ({ id }) => {
    // Pagination state
    const [moviePage, setMoviePage] = useState(1);
    const [tvPage, setTvPage] = useState(1);

    // Fetch data using current page
    const { data, loading, error } = useKeyword(id, moviePage, tvPage);
    const { keyword, movies, series } = data || { keyword: {}, movies: { total_pages: 0, results: [] }, series: { total_pages: 0, results: [] } };
    const totalMoviesPage = movies.total_pages;
    const totalSeriesPage = series.total_pages;

    // Pagination handlers
    const handleMoviePageChange = (page: number) => {
        if (page > 0 && page <= totalMoviesPage) {
            setMoviePage(page);
        }
    };

    const handleTvPageChange = (page: number) => {
        if (page > 0 && page <= totalSeriesPage) {
            setTvPage(page);
        }
    };

    // Generate page numbers to display
    const getPaginationPages = (currentPage: number, totalPages: number) => {
        const pages = [];
        const maxPagesToShow = 5;
        const half = Math.floor(maxPagesToShow / 2);

        let start = Math.max(1, currentPage - half);
        let end = Math.min(totalPages, currentPage + half);

        if (end - start < maxPagesToShow - 1) {
            if (currentPage < half) {
                end = Math.min(totalPages, maxPagesToShow);
            } else {
                start = Math.max(1, totalPages - maxPagesToShow + 1);
            }
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        return pages;
    };

    const moviePages = getPaginationPages(moviePage, totalMoviesPage);
    const tvPages = getPaginationPages(tvPage, totalSeriesPage);

    return (
        <div className="flex flex-col items-center w-full my-4 px-4" id="all">
            {/* Title Section */}
            <header className="my-8 text-center">
                <p className="text-2xl font-light">
                    Explore Movies and TV Shows from &quot;{keyword?.name || 'Loading...'}&quot; Keyword
                </p>
            </header>

            {/* Search Bar */}
            <Searchbar Variant={'Keyword'} />

            {/* Movies Section */}
            <div className="w-full max-w-screen-lg mx-auto">
                {loading ? (
                    <p>Loading movies...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : movies.results.length > 0 ? (
                    <>
                        <p className="text-2xl font-semibold mb-4">Movies</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                            {movies.results.map((movie) => (
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
                        {/* Pagination for Movies */}
                        <Pagination className="my-4">
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        onClick={() => handleMoviePageChange(moviePage - 1)}
                                        className={moviePage === 1 ? 'cursor-not-allowed opacity-50' : ''}
                                        href="#"
                                    >
                                        Previous
                                    </PaginationPrevious>
                                </PaginationItem>
                                {moviePages.map((page) => (
                                    <PaginationItem key={page}>
                                        <PaginationLink
                                            href="#"
                                            isActive={page === moviePage}
                                            onClick={() => handleMoviePageChange(page)}
                                        >
                                            {page}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}
                                {totalMoviesPage > 5 && (
                                    <PaginationItem>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                )}
                                <PaginationItem>
                                    <PaginationNext
                                        onClick={() => handleMoviePageChange(moviePage + 1)}
                                        className={moviePage === totalMoviesPage ? 'cursor-not-allowed opacity-50' : ''}
                                        href="#"
                                    >
                                        Next
                                    </PaginationNext>
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </>
                ) : (
                    <p>No movies found.</p>
                )}
            </div>

            {/* TV Shows Section */}
            <div className="w-full max-w-screen-lg mx-auto">
                {loading ? (
                    <p>Loading TV shows...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : series.results.length > 0 ? (
                    <>
                        <p className="text-2xl font-semibold mb-4">TV Shows</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                            {series.results.map((show) => (
                                <SampleCard
                                    key={show.id}
                                    id={show.id}
                                    title={show.name}  // TV show titles are accessed via `name`
                                    posterPath={show.poster_path || ''} // Ensure posterPath is a string
                                    certification="Not Rated"  // TV shows may not have a certification property
                                    releaseDate={show.first_air_date || 'Unknown Date'} // Use `first_air_date` for TV shows
                                    runtime={show.runtime?.toString() || 'Runtime not available'}
                                    media_type="tv"
                                />
                            ))}
                        </div>
                        {/* Pagination for TV Shows */}
                        <Pagination className="my-4">
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        onClick={() => handleTvPageChange(tvPage - 1)}
                                        className={tvPage === 1 ? 'cursor-not-allowed opacity-50' : ''}
                                        href="#"
                                    >
                                        Previous
                                    </PaginationPrevious>
                                </PaginationItem>
                                {tvPages.map((page) => (
                                    <PaginationItem key={page}>
                                        <PaginationLink
                                            href="#"
                                            isActive={page === tvPage}
                                            onClick={() => handleTvPageChange(page)}
                                        >
                                            {page}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}
                                {totalSeriesPage > 5 && (
                                    <PaginationItem>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                )}
                                <PaginationItem>
                                    <PaginationNext
                                        onClick={() => handleTvPageChange(tvPage + 1)}
                                        className={tvPage === totalSeriesPage ? 'cursor-not-allowed opacity-50' : ''}
                                        href="#"
                                    >
                                        Next
                                    </PaginationNext>
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </>
                ) : (
                    <p>No TV shows found.</p>
                )}
            </div>
        </div>
    );
};

export default Body;
