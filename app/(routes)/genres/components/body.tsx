import React from 'react';
import Searchbar from "@/components/search-bar";
import GenreMenu from "./genre-list";
import useGenres from "@/hooks/use-genres";
import Loading from "@/components/loading";
import SampleCard from '@/components/sample-card'; // Ensure this import path is correct
import { Button } from '@/components/ui/button';
import Link from 'next/link';
type Genre = {
    id: number;
    name: string;
};

type CombinedItem = {
    id: number;
    title?: string;             
    name?: string;              
    poster_path?: string | null;
    overview?: string;
    vote_average?: number;
    runtime?: string;           
    first_air_date?: string;
    release_date?: string;
    certification?: string;     
    media_type?: string;        
};

type UseGenresReturnType = {
    genre: Genre;
    combined: CombinedItem[];
};

type BodyProps = {
    selectedOption: string;
};

const Body: React.FC<BodyProps> = ({ selectedOption }) => {
    const { data, loading, error } = useGenres();

    const formatGenreName = (name: string) => {
        return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9&-]/g, '');
    };

    const filterData = () => {
        if (selectedOption === "All") {
            return data.filter(({ combined }: UseGenresReturnType) => combined.length > 0);
        }
        return data
            .filter(({ combined }: UseGenresReturnType) => combined.some(item => (selectedOption === "Movies" ? item.title : item.name) !== undefined))
            .map(({ genre, combined }: UseGenresReturnType) => ({
                genre,
                combined: combined.filter(item => (selectedOption === "Movies" ? item.title : item.name) !== undefined),
            }));
    };

    if (loading) {
        return <Loading />;
    } else if (error) {
        return <div className="text-red-600 font-semibold text-center">{error}</div>;
    }

    const filteredData = filterData();

    return (
        <div className="flex flex-col justify-center items-center py-4 px-6 bg-primary-foreground min-h-screen my-4">
            <p className="my-8 text-3xl font-semibold text-center text-gray-800">Explore Movies, TV Shows, and More</p>
            <Searchbar />
            <div className="flex flex-col w-full max-w-6xl">
                {filteredData.length > 0 ? (
                    filteredData.map(({ genre, combined }: UseGenresReturnType) => (
                        combined.length > 0 ? (
                            <div key={genre.id} className="mb-12">
                                <p className="text-2xl font-semibold text-gray-700 mb-4">{genre.name}</p>
                                <div className="flex flex-wrap gap-6 justify-center items-start">
                                    {combined.length > 0 ? (
                                        combined.map((item) => (
                                            <div
                                                key={item.id}
                                                className="w-full sm:w-1/3 md:w-1/4 lg:w-1/6"
                                            >
                                                <SampleCard
                                                    id={item.id}
                                                    title={item.title || item.name || 'Untitled'}
                                                    posterPath={item.poster_path || ''}
                                                    certification={item.certification || 'Not Rated'}
                                                    releaseDate={item.release_date || item.first_air_date || 'Date not available'}
                                                    runtime={item.runtime || 'Runtime not available'}
                                                    media_type={item.title ? 'movie' : 'tv-show'}
                                                />
                                            </div>
                                        ))
                                    ) : (
                                        <div className="w-full p-4 bg-gray-200 text-gray-700 text-center rounded-md">No results</div>
                                    )}
                                </div>
                                <div className="text-center mt-4">
                                    <Button>
                                        <Link href={`/genres/${formatGenreName(genre.name)}`}>See More</Link>
                                    </Button>
                                </div>
                            </div>
                        ) : null
                    ))
                ) : (
                    <div className="w-full p-4 bg-gray-200 text-gray-700 text-center rounded-md">No genres available</div>
                )}
            </div>
            <GenreMenu />
        </div>
    );
};

export default Body;
