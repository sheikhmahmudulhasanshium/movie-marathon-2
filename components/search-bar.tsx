"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useSearch from '@/hooks/use-search';
import { BanIcon, SearchIcon, TextSearchIcon, UserSearchIcon } from 'lucide-react';
import { CombinedSearchResult, Movies, TVShows, Persons } from './type';
import Image from 'next/image';
import Link from 'next/link';
import { Cross2Icon, ResetIcon } from '@radix-ui/react-icons';

const Searchbar = () => {
    const [searchKey, setSearchKey] = useState<string>("");
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);
    const [isClient, setIsClient] = useState<boolean>(false);

    const router = useRouter();

    useEffect(() => {
        setIsClient(true);
    }, []);

    const { data: searchResults, loading, error } = useSearch(searchKey);

    const formattedSearchKey = searchKey.toLowerCase();

    const updateSearchKey = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchKey(e.target.value);
        setSelectedIndex(-1);
    };

    const isMovieResult = (item: CombinedSearchResult): item is Movies => 'title' in item;
    const isTVShowResult = (item: CombinedSearchResult): item is TVShows => 'name' in item && 'first_air_date' in item;
    const isPersonResult = (item: CombinedSearchResult): item is Persons => 'name' in item && 'known_for' in item;

    const filteredResults = searchResults.filter((item: CombinedSearchResult) => {
        if (isMovieResult(item)) {
            return item.title.toLowerCase().includes(formattedSearchKey);
        }
        if (isTVShowResult(item) || isPersonResult(item)) {
            return item.name.toLowerCase().includes(formattedSearchKey);
        }
        return false;
    });

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (filteredResults.length === 0) return;

            if (e.key === 'ArrowDown') {
                setSelectedIndex((prevIndex) => (prevIndex + 1) % filteredResults.length);
            } else if (e.key === 'ArrowUp') {
                setSelectedIndex((prevIndex) => (prevIndex - 1 + filteredResults.length) % filteredResults.length);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [filteredResults]);

    if (searchKey.length > 0 && loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

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
                    {searchKey.length > 1 ? (
                        <Cross2Icon className="text-3xl scale-150" onClick={() => setSearchKey("")} />
                    ) : (
                        <SearchIcon className="text-3xl scale-150" />
                    )}
                </button>
            </div>
            {searchKey.length > 3 && (
                <>
                    <p>Showing Results</p>
                    <div className="flex flex-col bg-cyan-900 w-full overflow-y-scroll max-h-64 rounded-lg shadow-lg z-50 absolute top-full mt-2">
                        {filteredResults.length > 5 ? (
                            filteredResults.map((item, index) => {
                                const imgSrc = 'profile_path' in item && item.profile_path
                                    ? `https://media.themoviedb.org/t/p/w185${item.profile_path}`
                                    : 'backdrop_path' in item && item.backdrop_path
                                    ? `https://media.themoviedb.org/t/p/w185${item.backdrop_path}`
                                    : 'poster_path' in item && item.poster_path
                                    ? `https://media.themoviedb.org/t/p/w185${item.poster_path}`
                                    : '/sample-poster.jpg';

                                const linkHref = isMovieResult(item)
                                    ? `/movies/${item.id}`
                                    : isTVShowResult(item)
                                    ? `/tv-shows/${item.id}`
                                    : isPersonResult(item)
                                    ? `/persons/${item.id}`
                                    : '/';
                                    //console.log(linkHref);

                                return (
                                    <div key={index}>
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
                            <div className="flex justify-between items-center text-lg p-2 gap-4 font-bold border-b-2 border-slate-400 hover:bg-cyan-800 transition-all duration-200" onClick={() => setSearchKey("")}>
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
                </>
            )}
        </div>
    );
};

export default Searchbar;
