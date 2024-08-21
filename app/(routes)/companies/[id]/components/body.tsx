import React from 'react';
import Image from 'next/image';
import Description from './description';
import SampleCard from '@/components/sample-card';
import { CompanyResponse, Movie, TVShow } from '@/components/type'; // Ensure this import reflects updated type definitions
import { formatDate } from '@/lib/format-date';
import { formatTime } from '@/lib/format-time';

const Body: React.FC<{ companyResponse: CompanyResponse }> = ({ companyResponse }) => {
    const { company, movies, series } = companyResponse;
    //console.log(series)
    return (
        <div className="my-6 flex flex-col items-center w-full px-4">
            <div className="flex flex-col items-center w-full max-w-6xl">
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
                    <div className='flex flex-col justify-between my-8 w-full'>
                        <p className='text-2xl font-semibold flex pl-4 pb-8'>
                            Movies
                        </p>
                        <div className='flex flex-wrap gap-4 justify-center'>
                            {movies.map((movie: Movie) => (
                                <div key={movie.id} className='w-full sm:w-1/3 md:w-1/4 lg:w-1/5'>
                                    <SampleCard
                                        id={movie.id}
                                        title={movie.title}
                                        posterPath={movie.poster_path || ''}  // Fallback to empty string if null
                                        certification={movie.certification || 'N/A'}  // Fallback to 'N/A' if null
                                        releaseDate={formatDate(movie.release_date)}
                                        runtime={formatTime(Number(movie.runtime) || 0)}  // Convert runtime to number if necessary
                                        media_type="movie"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {series.length > 0 && (
                    <div className='flex flex-col justify-between my-8 w-full'>
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
                                        certification= {tvShow.content_ratings.results[0].rating}
                                        releaseDate={formatDate(tvShow.first_air_date)}
                                        runtime={tvShow.runtime?.length > 0 ? formatTime(parseInt(tvShow.runtime)) : 'N/A'} // Convert runtime to string
                                        media_type="tv"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Body;
