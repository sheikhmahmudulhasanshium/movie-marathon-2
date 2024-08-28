import React from 'react';
import useCelebList from '@/hooks/use-person-list'; // Adjust the import path as needed
import PersonCard from '../../components/profile-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Recommendations: React.FC = () => {
    const { data, loading, error } = useCelebList(1);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    // Safely destructure data
    const results = data?.results || [];

    return (
        <div className='flex flex-col justify-between w-10/12'>
            <div className='pl-12 text-2xl font-semibold py-4'>
                <p>People you may like</p>
            </div>
            {results.length > 0 ? (
                <div className="flex flex-wrap justify-center">
                    {/* Display celebrity cards */}
                    {results.map(person => (
                        <PersonCard key={person.id} person={person} />
                    ))}
                </div>
            ) : (
                <p>No celebrities found.</p>
            )}
            <Link className='  my-8 justify-center items-center flex' href={`/persons/`}>
                <Button variant='outline' className='p-4  text-xl'>
                    See More
                </Button>
            </Link>
        </div>
    );
};

export default Recommendations;
