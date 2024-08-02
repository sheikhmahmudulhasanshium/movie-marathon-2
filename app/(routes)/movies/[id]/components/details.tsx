import { Movie } from '@/components/type';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { RadialChart } from '@/components/ui/radial-chart';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { InstagramLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons';
import { Calendar, Clock, Facebook, VideoIcon, Youtube } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface MovieDetailsProps {
    movie: Movie | null;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie }) => {
    if (!movie) {
        return <p>No movie details available.</p>;
    }

    return (
        <div className="flex justify-center my-4 py-8 items-center px-4 shadow-xl bg-accent w-full overflow-hidden">
            <div className='flex flex-col max-w-2xl lg:max-w-4xl w-full px-4'>
                <div className='flex gap-8 sm:gap-8 md:gap-6 lg:gap-12 px-4'>
                    <div className='w-4/12 flex flex-col justify-start items-start'>
                        <Image
                            src={`https://media.themoviedb.org/t/p/w500/${movie.poster_path}`}
                            alt={movie.title}
                            width={200}
                            height={300}
                            quality={100}
                            className='pb-4'
                        />
                        <div className='text-xl flex items-center pt-2 gap-2'>
                            <p className='font-bold'>Status:</p>
                            <p>{movie.status}</p>
                        </div>
                        <div className='text-xl flex flex-col items-center pt-2 gap-2'>
                            <p className='font-bold'>Duration:</p>
                            <p className='flex items-center gap-1.5'><Clock/>{movie.runtime}</p>
                        </div>
                        <div className='text-xl flex items-center pt-2 gap-2'>
                            <p className='font-bold'>Rated:</p>
                            <p className='border bg-white p-1 shadow-lg shadow-accent-foreground text-lg rounded-lg text-secondary-foreground bg-opacity-5'>
                                {movie.certification || 'Not Available'}
                            </p>
                        </div>
                        <div className='flex pt-2 gap-2 text-lg'>
                            <RadialChart voteAverage={movie.vote_average} />
                        </div>
                        {movie.keywords && (
                            <div className='text-lg flex flex-col items-start pt-2 gap-2'>
                                <p className='font-bold'>Keywords:</p>
                                <p className='text-sm flex flex-wrap gap-1 w-full'>
                                    {movie.keywords.keywords.map((keyword) => (
                                        <Link key={keyword.id} href={`/keyword/${keyword.id}`} className='hover:opacity-35'>
                                            <p className='p-1 rounded-lg bg-white w-max text-secondary-foreground dark:text-primary-foreground'>
                                                {keyword.name}
                                            </p>
                                        </Link>
                                    ))}
                                </p>
                            </div>
                        )}
                        {movie.revenue && (
                            <div className='text-lg flex items-start pt-6 gap-2'>
                                <p className='font-bold'>Revenue:</p>
                                <p>${movie.revenue.toLocaleString()}</p>
                            </div>
                        )}
                        {movie.budget && (
                            <div className='text-lg flex items-start pt-6 gap-2'>
                                <p className='font-bold'>Budget:</p>
                                <p>${movie.budget.toLocaleString()}</p>
                            </div>
                        )}
                        {movie.original_language && (
                            <div className='text-lg flex flex-col items-start pt-6 gap-2'>
                                <p className='font-bold'>Original Language:</p>
                                <p>{movie.original_language}</p>
                            </div>
                        )}
                        {
                            movie.production_companies && (
                                <div className='pt-2 text-lg w-full'>  
                                    <p className='font-bold'>Production Companies: </p>
                                    <div>
                                        {movie.production_companies.map((company,index)=>(
                                            <Link href={`/companies/${company.id}`} key={company.id} className='hover:underline hover:text-blue-600'>
                                                {company.name}
                                                {index<movie.production_companies.length-1?', ':'. '}
                                            </Link>
                                        ))}
                                    </div>

                                </div>
                            )
                        }
                        {
                            movie.production_countries && (
                                <div className='text-lg flex flex-col items-start pt-6 gap-2 flex-wrap'>
                                    <p className='font-bold'>Countries:</p>
                                    <TooltipProvider>{(movie.production_countries.length>0)&&
                                        <Tooltip>{(movie.production_countries.map((country,index)=>(
                                            <>
                                            <TooltipTrigger key={index}>

                                                <Image src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${country.iso_3166_1}.svg`} alt={country.name} height={60} width={40}/> 
                                            </TooltipTrigger>
                                            <TooltipContent>{country.name}</TooltipContent>
                                            </>
                                        )))}
                                        </Tooltip> 
                                        }
                                    </TooltipProvider>
                                </div>
                            )
                        }
                        
                    </div>

                    <div className='w-8/12 flex flex-col justify-start items-start'>
                        <p className='text-2xl pb-4 font-bold'>{movie.title}</p>
                        <div className='flex'>
                            <Button variant='outline'  className='flex items-center gap-3 text-start text-lg font-bold mb-4'>
                                <VideoIcon/>
                                <p className=''>Trailer</p>
                            </Button>
                        </div>
                        <div className='flex'>
                            <p className='text-justify'>{movie.overview}</p></div>

                        {/* Visit Section */}
                        <div className='flex  my-4 w-full gap-2 items-center '>
                            <p className='font-bold text-lg'>Websites: </p>
                            {movie.external_ids && (
                                <div className='flex gap-2'>
                                    {movie.external_ids.tiktok_id && (
                                        <Button size='icon' variant="outline" className='m-3'>
                                            <Link href={`https://www.tiktok.com/${movie.external_ids.tiktok_id}`}>
                                                <Youtube className='w-8 h-8' />
                                            </Link>
                                        </Button>
                                    )}
                                    {movie.external_ids.youtube_id && (
                                        <Button size='icon' variant="outline" className='m-3'>
                                            <Link href={`https://www.youtube.com/watch?v=${movie.external_ids.youtube_id}`}>
                                                <Youtube className='w-8 h-8' />
                                            </Link>
                                        </Button>
                                    )}
                                    {movie.external_ids.imdb_id && (
                                        <Button size='icon' variant="outline" className='m-3'>
                                            <Link href={`https://www.imdb.com/title/${movie.external_ids.imdb_id}`}>
                                                <div className='w-8 h-8 bg-imdb dark:bg-imdb-dark'></div>
                                            </Link>
                                        </Button>
                                    )}
                                    {movie.external_ids.facebook_id && (
                                        <Button size='icon' variant="outline" className='m-3'>
                                            <Link href={`https://www.facebook.com/${movie.external_ids.facebook_id}`}>
                                                <Facebook className='w-8 h-8' />
                                            </Link>
                                        </Button>
                                    )}
                                    {movie.external_ids.twitter_id && (
                                        <Button size='icon' variant="outline" className='m-3'>
                                            <Link href={`https://twitter.com/${movie.external_ids.twitter_id}`}>
                                                <TwitterLogoIcon className='w-8 h-8' />
                                            </Link>
                                        </Button>
                                    )}
                                    {movie.external_ids.instagram_id && (
                                        <Button size='icon' variant="outline" className='m-3'>
                                            <Link href={`https://www.instagram.com/${movie.external_ids.instagram_id}`}>
                                                <InstagramLogoIcon className='w-8 h-8' />
                                            </Link>
                                        </Button>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className='flex pt-2 gap-2 text-lg'>
                            <p className='font-bold'>Released: </p>
                            <p className='text-justify gap-2 flex'><Calendar/>{movie.formatted_release_date}</p>
                        </div>

                        <div className='flex pt-2 gap-2 text-lg'>
                            <p className='font-bold'>Genres: </p>
                            <p>
                                {movie.genres.length > 0
                                    ? movie.genres.map((genre, index) => (
                                        <span key={genre.id}>
                                            <Link href={`/genres/${genre.id}`} className='hover:text-blue-500 hover:underline'>
                                                {genre.name}
                                            </Link>
                                            {index < movie.genres.length - 1 ? ', ' : '.'}
                                        </span>
                                    ))
                                    : 'No genres available'}
                            </p>
                        </div>

                        <div className='flex flex-col pt-2 gap-2 text-lg w-full'>
                            <p className='font-bold'>Cast: </p>
                            <div className='flex overflow-x-auto gap-2'>
                                {movie.cast.length > 0 ? (
                                    movie.cast.map((profile) => (
                                        <Card key={profile.id} className='hover:opacity-75 w-36 bg-accent'>
                                            <Link href={`/persons/${profile.id}`} className='flex flex-col justify-center items-center'>
                                                <CardContent>
                                                    {profile.profile_path ? (
                                                        <Image
                                                            src={`https://media.themoviedb.org/t/p/w500/${profile.profile_path}`}
                                                            alt={profile.name}
                                                            width={60}
                                                            height={90}
                                                            quality={100}
                                                            className='rounded-full'
                                                        />
                                                    ) : (
                                                        <div className='w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-sm'>
                                                            No Image
                                                        </div>
                                                    )}
                                                </CardContent>
                                                <CardDescription><p>As {profile.character}</p></CardDescription>
                                                <CardFooter><p className='text-base'>({profile.name})</p></CardFooter>
                                            </Link>
                                        </Card>
                                    ))
                                ) : 'No cast available'}
                            </div>
                        </div>

                        <div className='flex flex-col pt-2 gap-2 text-lg w-full'>
                            <p className='font-bold'>Crew: </p>
                            <div className='flex overflow-x-auto gap-2'>
                                {movie.crew.length > 0 ? (
                                    movie.crew.map((profile) => (
                                        <Card key={profile.id} className='hover:opacity-75 w-36 bg-accent'>
                                            <Link href={`/persons/${profile.id}`} className='flex flex-col justify-center items-center'>
                                                <CardContent>
                                                    {profile.profile_path ? (
                                                        <Image
                                                            src={`https://media.themoviedb.org/t/p/w500/${profile.profile_path}`}
                                                            alt={profile.name}
                                                            width={60}
                                                            height={90}
                                                            quality={100}
                                                            className='rounded-full'
                                                        />
                                                    ) : (
                                                        <div className='w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-sm'>
                                                            No Image
                                                        </div>
                                                    )}
                                                </CardContent>
                                                <CardDescription><p>{profile.job}</p></CardDescription>
                                                <CardFooter><p className='text-base'>({profile.name})</p></CardFooter>
                                            </Link>
                                        </Card>
                                    ))
                                ) : 'No crew available'}
                            </div>
                        </div>
                        {(movie.alternative_titles.titles.length>0)&&
                            <div className='flex flex-col  gap-3 pt-2'>
                                <p className='font-bold text-lg'>
                                    Alternative Titles:
                                </p>
                                <div className=' flex flex-wrap gap-2'>
                                    {movie.alternative_titles.titles.map((title,index)=>(
                                        <span key={index} className=''>
                                            {title.title}
                                            {index<(movie.alternative_titles.titles.length-1)?',':'. '
                                                
                                            }
                                        </span>
                                        
                                        
                                    ))}
                                </div>
                            </div>
                            }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;
