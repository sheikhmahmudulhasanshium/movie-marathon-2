import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PersonDetailsResponse } from '@/components/type';

interface PersonCardProps {
    person: PersonDetailsResponse;
}

const PersonCard: React.FC<PersonCardProps> = ({ person }) => {
    return (
        <Link href={`/persons/${person.id}-${person.name.toLowerCase().replace(/[^a-z0-9&]+/g, '-').replace(/(^-|-$)+/g, '')}`} >
            <div className="bg-white shadow-md rounded-lg overflow-hidden w-60 m-4 cursor-pointer">
                {person.profile_path ? (
                    <Image
                        src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                        alt={person.name}
                        width={240}
                        height={360}
                        quality={100}
                        className="w-full h-72 object-cover"
                    />
                ) : (
                    <div className="w-full h-72 bg-gray-200 flex items-center justify-center">
                        <p className="text-gray-600 text-lg">No Image</p>
                    </div>
                )}
                <div className="p-4">
                    <h3 className="text-xl font-semibold truncate">{person.name}</h3>
                    <p className="text-gray-600">{person.known_for_department}</p>
                    <p className="text-blue-500 hover:underline">See Details</p>
                </div>
            </div>
        </Link>
    );
};

export default PersonCard;
