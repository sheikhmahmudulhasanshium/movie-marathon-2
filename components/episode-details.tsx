import { Calendar, ChevronLeft, ChevronRight, Clock, Facebook, VideoIcon, Youtube } from "lucide-react";
import { CrewMember, Genre, ExternalIds, ProductionCountry, Images, Episode, TVShow } from "./type";
import Image from "next/image";
import { RadialChart } from "./ui/radial-chart";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Button } from "./ui/button";
import { AvatarIcon, InstagramLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { Card, CardContent, CardDescription, CardFooter } from "./ui/card";

interface DetailsProps {
    episode: Episode | null;
    series: TVShow ;
}

const Details: React.FC<DetailsProps> = ({ episode, series}) => {
    if (!episode) {
        return <p>No episode details available.</p>;
    }

    function onClickTrailerButton() {
        const element = document.getElementById("trailer-button");
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    return (
        <div className="flex justify-center my-4 py-8 items-center px-4 shadow-xl bg-accent w-full overflow-hidden">
            <div className='flex flex-col max-w-2xl lg:max-w-4xl w-full px-4'>
                <div className='flex gap-8 sm:gap-8 md:gap-6 lg:gap-12 px-4'>
                    <div className='w-4/12 flex flex-col justify-start items-start'>
                        {episode.still_path && (
                            <Image
                                src={`https://media.themoviedb.org/t/p/w500/${episode.still_path}`}
                                alt={episode.name}
                                width={200}
                                height={300}
                                quality={100}
                                className='pb-4'
                            />
                        )}
                        <div className='text-xl flex flex-col items-center pt-2 gap-2'>
                            <p className='font-bold'>Duration:</p>
                            <p className='flex items-center gap-1.5'><Clock />{episode.formatted_runtime}</p>
                        </div>
                        <div className='text-xl flex flex-col items-start pt-2 gap-2'>
                            <p className='font-bold'>Release Date:</p>
                            <p className='flex items-center gap-1.5'><Calendar />{episode.air_date}</p>
                        </div>
                        <div className='text-xl flex  items-center pt-2 gap-2'>
                            <p className='font-bold'>Rated:</p>
                            <p className='border bg-white p-1 shadow-lg shadow-accent-foreground text-lg rounded-lg text-secondary-foreground bg-opacity-5'>
                                {series.content_ratings?.results.length > 0
                                    ? series.content_ratings.results[0].rating
                                    : 'Not Available'}
                            </p>
                        </div>
                        <div className='flex pt-2 gap-2 text-xl flex-col'>
                            <p className='font-bold'>Rating:</p>
                            <RadialChart voteAverage={episode.vote_average} />
                        </div>
                        {series.keywords?.keywords && (
                            <div className='text-lg flex flex-col items-start pt-2 gap-2'>
                                <p className='font-bold'>Keywords:</p>
                                <p className='text-sm flex flex-wrap gap-1 w-full'>
                                    {series.keywords.keywords.map((keyword) => (
                                        <Link key={keyword.id} href={`/keyword/${keyword.id}`} className='hover:opacity-35'>
                                            <p className='p-1 rounded-lg bg-white w-max text-secondary-foreground dark:text-primary-foreground'>
                                                {keyword.name}
                                            </p>
                                        </Link>
                                    ))}
                                </p>
                            </div>
                        )}
                        {series.production_companies && (
                            <div className='pt-2 text-lg w-full'>  
                                <p className='font-bold'>Production Companies:</p>
                                <div>
                                    {series.production_companies.map((company, index) => (
                                        <Link href={`/companies/${company.id}`} key={company.id} className='hover:underline hover:text-blue-600'>
                                            {company.name}
                                            {index < series.production_companies.length - 1 ? ', ' : '.'}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                        {series.networks && (
                            <div className='pt-2 text-lg w-full'>  
                                <p className='font-bold'>Networks:</p>
                                <div>
                                    {series.networks.map((company, index) => (
                                        <Link href={`/companies/${company.id}`} key={company.id} className='hover:underline hover:text-blue-600'>
                                            {company.name}
                                            {index < series.networks.length - 1 ? ', ' : '.'}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                        {series.production_countries && series.production_countries.length > 0 && (
                            <div className='text-lg flex flex-col items-start pt-6 gap-2 flex-wrap'>
                                <p className='font-bold'>Countries:</p>
                                <TooltipProvider>
                                    <Tooltip>
                                        {series.production_countries.map((country, index) => (
                                            <Link key={index} href={`/country/${country.iso_3166_1}`}>
                                                <TooltipTrigger>
                                                    <Image
                                                        src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${country.iso_3166_1}.svg`}
                                                        alt={country.name}
                                                        height={60}
                                                        width={40}
                                                    />
                                                </TooltipTrigger>
                                                <TooltipContent>{country.name}</TooltipContent>
                                            </Link>
                                        ))}
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        )}
                    </div>

                    <div className='w-8/12 flex flex-col justify-start items-start'>
                        <p className='text-2xl pb-4 font-bold'>{episode.name}</p>
                        <div className='flex'>
                            <Button variant='outline' className='flex items-center gap-3 text-start text-lg font-bold mb-4' onClick={onClickTrailerButton}>
                                <VideoIcon />
                                <p>Trailer</p>
                            </Button>
                        </div>
                        <div className='flex'>
                            <p className='text-justify'>{episode.overview}</p>
                        </div>
                        <div className='flex pt-2 gap-2 text-lg'>
                            <p className='font-bold'>Series:</p>
                            <Link className="hover:underline hover:text-blue-500" href={`/tv-shows/${series.id}-${series.name.toLowerCase().replace(/[^a-z0-9&]+/g, '-').replace(/(^-|-$)+/g, '') }`}>{series.name}</Link>
                        </div>
                        
                        <div className='flex pt-2 gap-2 text-lg'>
                            <p className='font-bold'>Season:</p>
                            <p>{episode.season_number}</p>
                        </div>
                        <div className='flex pt-2 gap-2 text-lg'>
                            <p className='font-bold'>Episode:</p>
                            <p>{episode.episode_number}</p>
                        </div>
                        
                        {/* Visit Section */}
                        { <div className='flex my-4 w-full gap-2 items-center'>
                            <p className='font-bold text-lg'>Websites:</p>
                            {episode.external_ids && (
                                <div className='flex gap-2'>
                                    {episode.external_ids.tiktok_id && (
                                        <Button size='icon' variant="outline" className='m-3'>
                                            <Link href={`https://www.tiktok.com/${episode.external_ids.tiktok_id}`}>
                                                <Youtube className='w-8 h-8' />
                                            </Link>
                                        </Button>
                                    )}
                                    {episode.external_ids.youtube_id && (
                                        <Button size='icon' variant="outline" className='m-3'>
                                            <Link href={`https://www.youtube.com/watch?v=${episode.external_ids.youtube_id}`}>
                                                <Youtube className='w-8 h-8' />
                                            </Link>
                                        </Button>
                                    )}
                                    {episode.external_ids.imdb_id && (
                                        <Button size='icon' variant="outline" className='m-3'>
                                            <Link href={`https://www.imdb.com/title/${episode.external_ids.imdb_id}`}>
                                                <div className='w-8 h-8 bg-imdb dark:bg-imdb-dark'></div>
                                            </Link>
                                        </Button>
                                    )}
                                    {episode.external_ids.facebook_id && (
                                        <Button size='icon' variant="outline" className='m-3'>
                                            <Link href={`https://www.facebook.com/${episode.external_ids.facebook_id}`}>
                                                <Facebook className='w-8 h-8' />
                                            </Link>
                                        </Button>
                                    )}
                                    {episode.external_ids.twitter_id && (
                                        <Button size='icon' variant="outline" className='m-3'>
                                            <Link href={`https://twitter.com/${episode.external_ids.twitter_id}`}>
                                                <TwitterLogoIcon className='w-8 h-8' />
                                            </Link>
                                        </Button>
                                    )}
                                    {episode.external_ids.instagram_id && (
                                        <Button size='icon' variant="outline" className='m-3'>
                                            <Link href={`https://www.instagram.com/${episode.external_ids.instagram_id}`}>
                                                <InstagramLogoIcon className='w-8 h-8' />
                                            </Link>
                                        </Button>
                                    )}
                                </div>
                            )}
                        </div> }
                        <div className='flex pt-2 gap-2 text-lg'>
                            <p className='font-bold'>Genres:</p>
                            <p>
                                {series.genres.length > 0
                                    ? series.genres.map((genre, index) => (
                                        <span key={genre.id}>
                                            <Link href={`/genres/${genre.name.toLowerCase().replace(/[^a-z0-9&]+/g, '-').replace(/(^-|-$)+/g, '')}`} className='hover:text-blue-500 hover:underline'>
                                                {genre.name}
                                            </Link>
                                            {index < series.genres.length - 1 ? ', ' : '.'}
                                        </span>
                                    ))
                                    : 'Not Available'}
                            </p>
                        </div>
                        <div className='flex flex-col pt-2 gap-2 text-lg w-full'>
                            <p className='font-bold'>Cast:</p>
                            <div className='flex overflow-x-auto gap-2'>
                                {episode.credits.cast.length > 0 ? (
                                    <>
                                        {episode.credits.cast.map((profile) => (
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
                                                            <div className='pt-4'>
                                                                <AvatarIcon className='w-16 h-16 bg-slate-400 text-white rounded-full flex items-center justify-center text-sm' />
                                                            </div>
                                                        )}
                                                    </CardContent>
                                                    <CardDescription><p>As {profile.character}</p></CardDescription>
                                                    <CardFooter><p className='text-base'>({profile.name})</p></CardFooter>
                                                </Link>
                                            </Card>
                                        ))}
                                    </>
                                ) : 'No cast available'}
                            </div>
                        </div>
                        <div className='flex flex-col pt-2 gap-2 text-lg w-full'>
                            <p className='font-bold'>Guest Stars:</p>
                            <div className='flex overflow-x-auto gap-2'>
                                {episode.guest_stars.length > 0 ? (
                                    <>
                                        {episode.guest_stars.map((profile) => (
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
                                                            <div className='pt-4'>
                                                                <AvatarIcon className='w-16 h-16 bg-slate-400 text-white rounded-full flex items-center justify-center text-sm' />
                                                            </div>
                                                        )}
                                                    </CardContent>
                                                    <CardDescription><p>As {profile.character}</p></CardDescription>
                                                    <CardFooter><p className='text-base'>({profile.name})</p></CardFooter>
                                                </Link>
                                            </Card>
                                       ))}
                                    </>
                                ) : 'No guest stars available'}
                            </div>
                        </div>
                        <div className='flex flex-col pt-2 gap-2 text-lg w-full'>
                            <p className='font-bold'>Crew:</p>
                            <div className='flex overflow-x-auto gap-2'>
                                {episode.crew.length > 0 ? (
                                    <>
                                        {episode.crew.map((profile) => (
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
                                                            <div className='pt-4'>
                                                                <AvatarIcon className='w-16 h-16 bg-slate-400 text-white rounded-full flex items-center justify-center text-sm' />
                                                            </div>
                                                        )}
                                                    </CardContent>
                                                    <CardDescription><p>{profile.job}</p></CardDescription>
                                                    <CardFooter><p className='text-base'>({profile.name})</p></CardFooter>
                                                </Link>
                                            </Card>
                                       ))}
                                    </>
                                ) : 'No crew available'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;
