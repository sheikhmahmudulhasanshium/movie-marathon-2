import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, ClockIcon, ImageOff } from "lucide-react";
import Link from 'next/link';
interface SampleCardProps {
    id: number;
    title: string;
    posterPath: string;
    certification: string;
    releaseDate: string;
    runtime: string;
    media_type: string;
    character?: string; // Optional
    job?: string; // Optional
}

const SampleCard: React.FC<SampleCardProps> = ({ id, title, posterPath, certification, releaseDate, runtime, media_type, job, character }) => {
    const truncatedTitle = title.length > 15 ? `${title.slice(0, 15)}...` : title;

    const url_media_type = media_type !== 'N/A' ? (media_type === 'movie' ? 'movies' : 'tv-shows') : '';
    const formatText = (text: string) => {
        return text
            .toLowerCase()
            .replace(/[^a-z0-9&]+/g, '-') // Replace non-alphanumeric characters with dashes
            .replace(/(^-|-$)+/g, '');  // Remove leading and trailing dashes
    };

    return (
        <Card className="relative flex flex-col justify-between bg-secondary dark:bg-secondary rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
            <Link href={`/${url_media_type}/${id}-${formatText(title)}`} className='flex flex-col h-full'>
                {certification !== 'Not Rated' && (
                    <CardHeader className="absolute top-2 left-2 bg-opacity-60 bg-black rounded-full p-1">
                        <CardTitle className="text-yellow-400 text-xs font-bold">
                            {certification}
                        </CardTitle>
                        {character && <CardTitle className="text-white text-xs">{character}</CardTitle>}
                    </CardHeader>
                )}
                <CardContent className="flex-grow pt-12">
                {(posterPath!==''&&posterPath!==null)?
                    <div
                        className="bg-cover bg-center h-52 w-full rounded-t-lg"
                        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${posterPath})` }}
                    />
                    :
                    <div className='h-52  rounded-t-lg justify-center items-center flex flex-col px-4 w-full'>
                        <ImageOff className='w-full h-full'/>
                        <p>No Image Available</p>                    
                    </div>
                }
                </CardContent>
                <CardDescription className="text-center mt-2 px-3 py-1 bg-gray-700 text-white">
                    <p>{truncatedTitle}</p>
                </CardDescription>
                <CardFooter className="flex flex-col items-center text-xs text-gray-300 bg-gray-800 py-2">
                    <div className="flex gap-3">
                        {releaseDate !== '' && (
                            <div className="flex items-center gap-1">
                                <CalendarIcon className="w-4 h-4" />
                                <p>{releaseDate}</p>
                            </div>
                        )}
                        {runtime !== 'Runtime not available' && runtime !== 'Time not available' && (
                            <div className="flex items-center gap-1">
                                <ClockIcon className="w-4 h-4" />
                                <p>{runtime}</p>
                            </div>
                        )}
                    </div>
                    <div className="mt-2 px-2 py-1 rounded-lg bg-gray-600 text-center">
                        {media_type.toLocaleUpperCase()}
                    </div>
                </CardFooter>
            </Link>
        </Card>
    );
};

export default SampleCard;
