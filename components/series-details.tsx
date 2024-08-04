import { Calendar, ChevronLeft, ChevronRight, Clock, Facebook, VideoIcon, Youtube } from "lucide-react";
import { TVShow, CastMember, CrewMember, Genre, ExternalIds, ProductionCountry, Images, AlternativeTitles } from "./type";
import Image from "next/image";
import { RadialChart } from "./ui/radial-chart";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Button } from "./ui/button";
import { AvatarIcon, InstagramLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { Card, CardContent, CardDescription, CardFooter } from "./ui/card";

interface DetailsProps {
    series: TVShow | null;
}

const Details: React.FC<DetailsProps> = ({ series }) => {
    if (!series) {
        return <p>No series details available.</p>;
    }

    return (
        <div className="flex justify-center my-4 py-8 items-center px-4 shadow-xl bg-accent w-full overflow-hidden">
            <div className='flex flex-col max-w-2xl lg:max-w-4xl w-full px-4'>
                <div className='flex gap-8 sm:gap-8 md:gap-6 lg:gap-12 px-4'>
                    <div className='w-4/12 flex flex-col justify-start items-start'>
                        <Image
                            src={`https://media.themoviedb.org/t/p/w500/${series.poster_path}`}
                            alt={series.name}
                            width={200}
                            height={300}
                            quality={100}
                            className='pb-4'
                        />
                        <div className='text-xl flex items-center pt-2 gap-2'>
                            <p className='font-bold'>Status:</p>
                            <p>{series.status}</p>
                        </div>
                        
                        <div className='text-xl flex flex-col items-center pt-2 gap-2'>
                            <p className='font-bold'>Duration:</p>
                            <p className='flex items-center gap-1.5'><Clock/>{series.runtime}</p>
                        </div>
                        <div className='text-xl flex items-center pt-2 gap-2'>
                            <p className='font-bold'>Rated:</p>
                            <p className='border bg-white p-1 shadow-lg shadow-accent-foreground text-lg rounded-lg text-secondary-foreground bg-opacity-5'>
                                {series.certification || 'Not Available'}
                            </p>
                        </div>
                        <div className='flex pt-2 gap-2 text-lg'>
                            <RadialChart voteAverage={series.vote_average} />
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
                        {series.original_language && (
                            <div className='text-lg flex flex-col items-start pt-6 gap-2'>
                                <p className='font-bold'>Original Language:</p>
                                <p>{series.original_language}</p>
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
                        {series.production_countries && (
                            <div className='text-lg flex flex-col items-start pt-6 gap-2 flex-wrap'>
                                <p className='font-bold'>Countries:</p>
                                <TooltipProvider>
                                    {series.production_countries.length > 0 && (
                                        <Tooltip>
                                            {series.production_countries.map((country, index) => (
                                                <div key={index}>
                                                    <TooltipTrigger>
                                                        <Image 
                                                            src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${country.iso_3166_1}.svg`} 
                                                            alt={country.name} 
                                                            height={60} 
                                                            width={40} 
                                                        />
                                                    </TooltipTrigger>
                                                    <TooltipContent>{country.name}</TooltipContent>
                                                </div>
                                            ))}
                                        </Tooltip>
                                    )}
                                </TooltipProvider>
                            </div>
                        )}
                    </div>

                    <div className='w-8/12 flex flex-col justify-start items-start'>
                        <p className='text-2xl pb-4 font-bold'>{series.name}</p>
                        <div className='flex'>
                            <Button variant='outline' className='flex items-center gap-3 text-start text-lg font-bold mb-4'>
                                <VideoIcon/>
                                <p>Trailer</p>
                            </Button>
                        </div>
                        <div className='flex'>
                            <p className='text-justify'>{series.overview}</p>
                        </div>

                        {/* Visit Section */}
                        <div className='flex my-4 w-full gap-2 items-center'>
                            <p className='font-bold text-lg'>Websites:</p>
                            {series.external_ids && (
                                <div className='flex gap-2'>
                                    {series.external_ids.tiktok_id && (
                                        <Button size='icon' variant="outline" className='m-3'>
                                            <Link href={`https://www.tiktok.com/${series.external_ids.tiktok_id}`}>
                                                <Youtube className='w-8 h-8' />
                                            </Link>
                                        </Button>
                                    )}
                                    {series.external_ids.youtube_id && (
                                        <Button size='icon' variant="outline" className='m-3'>
                                            <Link href={`https://www.youtube.com/watch?v=${series.external_ids.youtube_id}`}>
                                                <Youtube className='w-8 h-8' />
                                            </Link>
                                        </Button>
                                    )}
                                    {series.external_ids.imdb_id && (
                                        <Button size='icon' variant="outline" className='m-3'>
                                            <Link href={`https://www.imdb.com/title/${series.external_ids.imdb_id}`}>
                                                <div className='w-8 h-8 bg-imdb dark:bg-imdb-dark'></div>
                                            </Link>
                                        </Button>
                                    )}
                                    {series.external_ids.facebook_id && (
                                        <Button size='icon' variant="outline" className='m-3'>
                                            <Link href={`https://www.facebook.com/${series.external_ids.facebook_id}`}>
                                                <Facebook className='w-8 h-8' />
                                            </Link>
                                        </Button>
                                    )}
                                    {series.external_ids.twitter_id && (
                                        <Button size='icon' variant="outline" className='m-3'>
                                            <Link href={`https://twitter.com/${series.external_ids.twitter_id}`}>
                                                <TwitterLogoIcon className='w-8 h-8' />
                                            </Link>
                                        </Button>
                                    )}
                                    {series.external_ids.instagram_id && (
                                        <Button size='icon' variant="outline" className='m-3'>
                                            <Link href={`https://www.instagram.com/${series.external_ids.instagram_id}`}>
                                                <InstagramLogoIcon className='w-8 h-8' />
                                            </Link>
                                        </Button>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className='flex pt-2 gap-2 text-lg'>
                            <p className='font-bold'>Genres:</p>
                            <p>
                                {series.genres.length > 0
                                    ? series.genres.map((genre, index) => (
                                        <span key={genre.id}>
                                            <Link href={`/genres/${genre.id}`} className='hover:text-blue-500 hover:underline'>
                                                {genre.name}
                                            </Link>
                                            {index < series.genres.length - 1 ? ', ' : '.'}
                                        </span>
                                    ))
                                    : 'No genres available'}
                            </p>
                        </div>

                        <div className='flex flex-col pt-2 gap-2 text-lg w-full'>
                            <p className='font-bold'>Cast:</p>
                            <div className='flex overflow-x-auto gap-2'>
                                {series.cast.length > 0 ? (
                                    <>
                                        <div className='z-20 absolute left-80 lg:left-[36rem] items-center flex -bottom-[20rem] w-12 justify-center text-cyan-950'>
                                            <ChevronLeft className='w-12 h-12 animate-pulse' />
                                        </div>
                                        {series.cast.map((profile) => (
                                            <Card key={profile.id} className='hover:opacity-75 w-36 bg-accent'>
                                                <Link href={`/persons/${profile.id}`} className='flex flex-col justify-center items-center relative'>
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
                                                                <AvatarIcon className='w-16 h-16 bg-slate-400 text-white rounded-full flex items-center justify-center text-sm'/>
                                                            </div>
                                                        )}
                                                    </CardContent>
                                                    <CardDescription><p>As {profile.character}</p></CardDescription>
                                                    <CardFooter><p className='text-base'>({profile.name})</p></CardFooter>
                                                </Link>
                                            </Card>
                                        ))}
                                        <div className='z-20 absolute sm:-right-0 lg:right-4 items-center flex -bottom-[20rem] w-12 justify-center text-cyan-950'>
                                            <ChevronRight className='w-12 h-12 animate-pulse' />
                                        </div>
                                    </>
                                ) : 'No cast available'}
                            </div>
                        </div>

                        <div className='flex flex-col pt-2 gap-2 text-lg w-full'>
                            <p className='font-bold'>Crew:</p>
                            <div className='flex overflow-x-auto gap-2'>
                                {series.crew.length > 0 ? (
                                    <>
                                        <div className='z-30 absolute left-80 lg:left-[36rem] items-center flex -bottom-[40rem] w-12 justify-center text-cyan-950'>
                                            <ChevronLeft className='w-12 h-12 animate-pulse' />
                                        </div>
                                        {series.crew.map((profile) => (
                                            <Card key={profile.id} className='hover:opacity-75 w-36 bg-accent'>
                                                <Link href={`/persons/${profile.id}`} className='flex flex-col justify-center items-center relative'>
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
                                                                <AvatarIcon className='w-16 h-16 bg-slate-400 text-white rounded-full flex items-center justify-center text-sm'/>
                                                            </div>
                                                        )}
                                                    </CardContent>
                                                    <CardDescription><p>{profile.job}</p></CardDescription>
                                                    <CardFooter><p className='text-base'>({profile.name})</p></CardFooter>
                                                </Link>
                                            </Card>
                                        ))}
                                        <div className='z-30 absolute sm:-right-0 lg:right-4 items-center flex -bottom-[40rem] w-12 justify-center text-cyan-950'>
                                            <ChevronRight className='w-12 h-12 animate-pulse' />
                                        </div>
                                    </>
                                ) : 'No crew available'}
                            </div>
                        </div>

                        {series.alternative_titles?.titles && series.alternative_titles.titles.length > 0 && (
                            <div className='flex flex-col gap-3 pt-2'>
                                <p className='font-bold text-lg'>Alternative Titles:</p>
                                <div className='flex flex-wrap gap-2'>
                                    {series.alternative_titles.titles.map((title, index) => (
                                        <span key={index}>
                                            {title.title}
                                            {index < series.alternative_titles.titles.length - 1 ? ', ' : '.'}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;
