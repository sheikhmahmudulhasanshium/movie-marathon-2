"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import useSearch from '@/hooks/use-search';
import { BanIcon, SearchIcon, TextSearchIcon, UserSearchIcon } from 'lucide-react';
import { CombinedSearchResult, Movies, TVShows, Persons } from './type';
import Image from 'next/image';
import Link from 'next/link';
import { Cross2Icon, ResetIcon } from '@radix-ui/react-icons';

// Utility function to format string
const formatText = (text: string) => 
    text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')  // Replace non-alphanumeric characters with dashes
        .replace(/(^-|-$)+/g, '');     // Remove leading and trailing dashes

const Searchbar = () => {
    const [searchKey, setSearchKey] = useState<string>("");
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);
    const resultRefs = useRef<(HTMLDivElement | null)[]>([]);
    const router = useRouter();

    // Fetch search results using the custom hook
    const { data: searchResults, loading, error } = useSearch(searchKey);

    // Update search key and reset selection index
    const updateSearchKey = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchKey(e.target.value);
        setSelectedIndex(-1);
    };

    // Type guards
    const isMovieResult = (item: CombinedSearchResult): item is Movies => 'title' in item;
    const isTVShowResult = (item: CombinedSearchResult): item is TVShows => 'name' in item && 'first_air_date' in item;
    const isPersonResult = (item: CombinedSearchResult): item is Persons => 'name' in item && 'known_for' in item;

    // Filter results based on searchKey
    const filteredResults = searchResults.filter((item: CombinedSearchResult) => {
        const searchString = searchKey.toLowerCase();
        if (isMovieResult(item)) return item.title.toLowerCase().includes(searchString);
        if (isTVShowResult(item)) return item.name.toLowerCase().includes(searchString);
        if (isPersonResult(item)) return item.name.toLowerCase().includes(searchString);
        return false;
    });

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (filteredResults.length === 0) return;

            if (e.key === 'ArrowDown') {
                setSelectedIndex((prevIndex) => {
                    const newIndex = (prevIndex + 1) % filteredResults.length;
                    resultRefs.current[newIndex]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    return newIndex;
                });
            } else if (e.key === 'ArrowUp') {
                setSelectedIndex((prevIndex) => {
                    const newIndex = (prevIndex - 1 + filteredResults.length) % filteredResults.length;
                    resultRefs.current[newIndex]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    return newIndex;
                });
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [filteredResults]);

    // Determine image source based on item type
    const getImageSrc = (item: CombinedSearchResult) => {
        if ('profile_path' in item && item.profile_path) {
            return `https://media.themoviedb.org/t/p/w185${item.profile_path}`;
        } else if ('backdrop_path' in item && item.backdrop_path) {
            return `https://media.themoviedb.org/t/p/w185${item.backdrop_path}`;
        } else if ('poster_path' in item && item.poster_path) {
            return `https://media.themoviedb.org/t/p/w185${item.poster_path}`;
        } else {
            return '/sample-poster.jpg';
        }
    };

    return (
        <div className="text-2xl flex flex-col items-center justify-center relative">
            <div className="grid items-center grid-cols-12 bg-cyan-950 my-12 rounded-xl border-2 justify-between mx-8 sm:mx-8 md:mx-12 lg:mx-24 w-full">
                <input
                    type="text"
                    value={searchKey}
                    onChange={updateSearchKey}
                    placeholder="Search..."
                    className="border-0 hover:border-0 py-4 pl-4 col-span-10 rounded-l-xl"
                />
                <button type="button" className="col-span-2 flex justify-center items-center text-primary-foreground dark:text-secondary-foreground gap-4">
                    {searchKey.length > 0 ? (
                        <Cross2Icon className="text-3xl scale-150" onClick={() => setSearchKey("")} />
                    ) : (
                        <SearchIcon className="text-3xl scale-150" />
                    )}
                </button>
            </div>

            {searchKey.length > 0 && loading && <p>Loading...</p>}

            {searchKey.length > 2 && (
                <div className="flex flex-col bg-cyan-900 w-full overflow-y-scroll max-h-64 rounded-lg shadow-lg z-50 mt-2">
                    {filteredResults.length > 0 ? (
                        filteredResults.map((item, index) => {
                            const imgSrc = getImageSrc(item);
                            const linkHref = isMovieResult(item) ? 
                                `/movies/${item.id}-${formatText(item.title)}` :
                                isTVShowResult(item) ? 
                                `/tv-shows/${item.id}-${formatText(item.name)}` :
                                isPersonResult(item) ? 
                                `/persons/${item.id}-${formatText(item.name)}` :
                                '/';

                            return (
                                <div
                                    key={index}
                                    ref={el => {
                                        if (el) resultRefs.current[index] = el;
                                    }}
                                >
                                    <Link href={linkHref}>
                                        <div className={`flex justify-between items-center text-lg p-2 gap-4 font-bold border-b-2 border-slate-400 hover:bg-cyan-800 transition-all duration-200 ${selectedIndex === index ? 'bg-cyan-800' : ''}`}>
                                            <Image
                                                src={imgSrc}
                                                alt={isMovieResult(item) ? item.title : isTVShowResult(item) ? item.name : isPersonResult(item) ? item.name : 'Unknown'}
                                                width={48}
                                                height={48}
                                                quality={50}
                                                className="w-12 h-12 rounded-lg"
                                            />
                                            <p className="flex-grow text-white">
                                                {isMovieResult(item) ? item.title : isTVShowResult(item) || isPersonResult(item) ? item.name : 'Unknown'}
                                            </p>
                                            {isMovieResult(item) ? (
                                                <button className="text-primary-foreground text-white">
                                                    <TextSearchIcon />
                                                </button>
                                            ) : isTVShowResult(item) || isPersonResult(item) ? (
                                                <button className="text-primary-foreground text-white">
                                                    <UserSearchIcon />
                                                </button>
                                            ) : null}
                                        </div>
                                    </Link>
                                </div>
                            );
                        })
                    ) : (
                        <div className="flex justify-between items-center text-lg p-2 gap-4 font-bold border-b-2 border-slate-400 hover:bg-cyan-800 transition-all duration-200">
                            <div className="text-red-500 w-12 h-12 items-center flex justify-center">
                                <BanIcon />
                            </div>
                            <p className="flex-grow text-white">No Results Found !!!</p>
                            <button className="text-primary-foreground text-white">
                                <ResetIcon />
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Searchbar;
