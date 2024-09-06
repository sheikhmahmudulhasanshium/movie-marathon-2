import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AvatarIcon, InstagramLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons';
import { Facebook, Youtube } from 'lucide-react';

import { PersonDetailsResponse } from './type';
import { formatDate } from '@/lib/format-date';
import { Button } from './ui/button';
import SampleCard from './sample-card';
import { formatTime } from '@/lib/format-time';

interface DetailsProps {
    personData: PersonDetailsResponse | null;
}

const PersonDetails: React.FC<DetailsProps> = ({ personData }) => {
    const [isExpanded, setIsExpanded] = useState(false);
   
    if (!personData) {
        return <div>No person data available</div>;
    }
    
    const truncatedBiography = personData.biography.split(' ').slice(0, 200).join(' '); 
    
    // Determine gender description
    const getGenderDescription = (gender: number) => {
        switch (gender) {
            case 0: return "Not Specified";
            case 1: return "Female";
            case 2: return "Male";
            default: return "Non Binary";
        }
    };
    
    return (
        <div className="flex justify-center my-4 py-8 items-center px-4 shadow-xl bg-accent w-full overflow-hidden">
            <div className='flex flex-col max-w-2xl lg:max-w-4xl w-full px-4'>
                <div className='flex gap-8 sm:gap-8 md:gap-6 lg:gap-12 px-4'>
                    <div className='w-4/12 flex flex-col justify-start items-start'>
                        {personData.profile_path ? (
                            <Image
                                src={`https://image.tmdb.org/t/p/w500${personData.profile_path}`}
                                alt={personData.name}
                                width={200}
                                height={300}
                                quality={100}
                                className='pb-4'
                            />
                        ) : (
                            <div className='pt-4'>
                                <AvatarIcon className='w-32 h-32 bg-slate-400 text-white rounded-full flex items-center justify-center text-3xl'/>
                            </div>
                        )}
                        
                        <p className='text-2xl pb-4 font-bold'>{personData.name}</p>
                        <div className='flex flex-wrap items-center gap-2 text-lg'>
                            <p className='font-bold'>Known for:</p>
                            <p>{personData.known_for_department}</p>
                        </div>
                        <div className='flex flex-wrap items-center gap-2 text-lg'>
                            <p className='font-bold'>Gender:</p>
                            <p>{getGenderDescription(personData.gender)}</p>
                        </div>
                        <div className='flex flex-wrap items-center gap-2 text-lg'>
                            <p className='font-bold'>Birthday:</p>
                            <p>{formatDate(personData.birthday)}</p>
                        </div>
                        <div className='flex flex-wrap items-center gap-2 text-lg'>
                            <p className='font-bold'>BirthPlace:</p>
                            <p>{personData.place_of_birth}</p>
                        </div>
                        <div className='flex flex-col flex-wrap items-start gap-2 text-lg'>
                            <p className='font-bold'>Also Known As:</p>
                            {personData.also_known_as.length > 0 ? (
                                personData.also_known_as.map((name, index, array) => (
                                    <span key={index}>
                                        {name}{index < array.length - 1 ? ', ' : '.'}
                                    </span>
                                ))
                            ) : (
                                <p>Not available</p>
                            )}
                        </div>
                        {personData.deathday && <div className='flex flex-wrap items-center gap-2 text-lg'>
                            <p className='font-bold'>Died:</p>
                            <p>{formatDate(personData.deathday)}</p>
                        </div>}
                    </div>

                    <div className='w-8/12 flex flex-col justify-start items-start'>
                        
                        <div className='flex flex-col pt-2 gap-2 text-lg w-full'>
                            {personData.original_name && (
                                <div className='flex'>
                                    <p className='font-bold'>Original Name:</p>
                                    <p>{personData.original_name}</p>
                                </div>
                            )}
                                                
                        </div>
                        <div className='flex flex-wrap items-center gap-2 text-lg'>
                            <p className='font-bold'>Biography:</p>
                            <p className='text-justify'>
                                {isExpanded ? personData.biography : truncatedBiography}
                                {personData.biography.split(' ').length > 200 && (
                                    <button
                                        onClick={() => setIsExpanded(!isExpanded)}
                                        className='text-blue-500 underline ml-2'
                                    >
                                        {isExpanded ? 'See Less' : 'See More'}
                                    </button>
                                )}
                            </p>
                        </div>
                        
                        {/* Visit Section */}
                        <div className='flex flex-col my-4 w-full gap-2 items-start '>
                            <p className='font-bold text-lg'>Social: </p>
                            {personData.external_ids && (
                                <div className='flex flex-wrap gap-2'>
                                    {personData.external_ids.tiktok_id && (
                                        <Button size='icon' variant="outline" className='m-3'>
                                            <Link href={`https://www.tiktok.com/${personData.external_ids.tiktok_id}`}>
                                                <div className='w-8 h-8 bg-cover bg-tiktok-logo' />
                                            </Link>
                                        </Button>
                                    )}
                                    {personData.external_ids.youtube_id && (
                                        <Button size='icon' variant="outline" className='m-3'>
                                            <Link href={`https://www.youtube.com/watch?v=${personData.external_ids.youtube_id}`}>
                                                <Youtube className='w-8 h-8' />
                                            </Link>
                                        </Button>
                                    )}
                                    {personData.external_ids.imdb_id && (
                                        <Button size='icon' variant="outline" className='m-3'>
                                            <Link href={`https://www.imdb.com/name/${personData.external_ids.imdb_id}`}>
                                                <div className='w-8 h-8 bg-imdb dark:bg-imdb-dark'></div>
                                            </Link>
                                        </Button>
                                    )}
                                    {personData.external_ids.facebook_id && (
                                        <Button size='icon' variant="outline" className='m-3'>
                                            <Link href={`https://www.facebook.com/${personData.external_ids.facebook_id}`}>
                                                <Facebook className='w-8 h-8' />
                                            </Link>
                                        </Button>
                                    )}
                                    {personData.external_ids.twitter_id && (
                                        <Button size='icon' variant="outline" className='m-3'>
                                            <Link href={`https://twitter.com/${personData.external_ids.twitter_id}`}>
                                                <TwitterLogoIcon className='w-8 h-8' />
                                            </Link>
                                        </Button>
                                    )}
                                    {personData.external_ids.instagram_id && (
                                        <Button size='icon' variant="outline" className='m-3'>
                                            <Link href={`https://www.instagram.com/${personData.external_ids.instagram_id}`}>
                                                <InstagramLogoIcon className='w-8 h-8' />
                                            </Link>
                                        </Button>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className='flex flex-col flex-wrap items-start gap-2 text-lg'>
                                {personData.known_for.length>0&&<>
                                    <p className='font-bold pb-4'>Known For:</p>
                                    <div className='flex w-full flex-wrap gap-2 justify-between'>
                                        {personData.known_for.map((work) => (
                                            <div key={work.id} className='w-6/12'>
                                                <SampleCard 
                                                    id={work.id} 
                                                    title={work.title||work.name} 
                                                    posterPath={work.backdrop_path || work.poster_path || ''} 
                                                    certification={"Not Rated"} 
                                                    releaseDate={formatDate(work.release_date||work.first_air_date)} 
                                                    runtime={formatTime(0)} 
                                                    media_type={work.media_type} 
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonDetails;
