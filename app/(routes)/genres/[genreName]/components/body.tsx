import React, { useState } from 'react';
import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import useGenre from "@/hooks/use-genre";
import { PlusIcon } from "lucide-react";
import SampleCard from '@/components/sample-card';
import Searchbar from '@/components/modals/search-bar-advanced';

interface CombinedGenre {
    id: string | number;
    name: string;
    source: 'tv' | 'movie' | 'both';
}

interface BodyProps {
    genre_data?: CombinedGenre;
}

const Body: React.FC<BodyProps> = ({ genre_data }) => {
    const [moviePageCount, setMoviePageCount] = useState(0);
    const [tvPageCount, setTvPageCount] = useState(0);
    const { movies, tvShows, loading, error } = useGenre(genre_data?.id, moviePageCount, tvPageCount);

    const handleLoadMoreMovies = () => setMoviePageCount(prev => prev + 1);
    const handleLoadMoreTvShows = () => setTvPageCount(prev => prev + 1);

    return (
        <div className="flex flex-col items-center w-full my-4 px-4" id='all'>
            {/* Title Section */}
            <header className="my-8 text-center">
                <p className="text-2xl font-light">
                    Explore Movies and TV Shows from &quot;{genre_data?.name}&quot; Genre
                </p>
            </header>

            {/* Search Bar */}
            <Searchbar Variant={'Genre'} />

            {/* Movies Section */}
            <section className="w-10/12" id='movies'>
                {loading && <Loading />}
                {error && <p className="text-red-500 text-center">{error}</p>}

                {!loading && !error && movies.length > 0 && (
                    <div className="mb-8">
                        <p className="text-2xl font-semibold mb-4">Movies</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                            {movies.map((movie: any) => (
                                <SampleCard
                                    key={movie.id}
                                    id={movie.id}
                                    title={movie.title}
                                    posterPath={movie.poster_path}
                                    certification={movie.certification || 'Not Rated'}
                                    releaseDate={movie.release_date}
                                    runtime={movie.runtime || 'Runtime not available'}
                                    media_type="movie"
                                />
                            ))}
                        </div>
                        <div className="flex justify-center mt-4">
                            <Button onClick={handleLoadMoreMovies} className="bg-blue-600 text-white hover:bg-blue-700">
                                Load More Movies <PlusIcon />
                            </Button>
                        </div>
                    </div>
                )}
            </section>

            {/* TV Shows Section */}
            <section className="w-10/12" id='tv-shows'>
                {!loading && !error && tvShows.length > 0 && (
                    <div className='mb-8'>
                        <p className="text-2xl font-semibold mb-4">TV Shows</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                            {tvShows.map((tvShow: any) => (
                                <SampleCard
                                    key={tvShow.id}
                                    id={tvShow.id}
                                    title={tvShow.name}
                                    posterPath={tvShow.poster_path}
                                    certification={tvShow.certification || 'Not Rated'}
                                    releaseDate={tvShow.first_air_date}
                                    runtime={tvShow.runtime || 'Runtime not available'}
                                    media_type="tv"
                                />
                            ))}
                        </div>
                        <div className="flex justify-center mt-4">
                            <Button onClick={handleLoadMoreTvShows} className="bg-blue-600 text-white hover:bg-blue-700">
                                Load More TV Shows <PlusIcon />
                            </Button>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
}

export default Body;
