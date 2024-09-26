import { useState, useEffect } from 'react';
import { ArrowBigRight, SearchIcon } from 'lucide-react';
import { Cross2Icon } from '@radix-ui/react-icons';
import Link from 'next/link';
import Image from 'next/image';
import SamplePoster from '@/public/Designer.png';
import useSearch from '@/hooks/use-search-2';
import { Button } from '../ui/button';

interface SearchbarProps {
    Variant: "Keyword" | "Movie" | "Series" | "Person" | "Country" | "Genre" | "Company" | "All";
}

const SearchResults = ({ Variant, data, loading, error = '', activeIndex, searchKey }: { Variant: string, data: any, loading: boolean, error?: string, activeIndex: number, searchKey: string }) => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const getImageUrl = (item: any) => {
        if (item.logo_path) return `https://image.tmdb.org/t/p/w500${item.logo_path}`;
        if (item.profile_path) return `https://image.tmdb.org/t/p/w500${item.profile_path}`;
        if (item.backdrop_path || item.poster_path) return `https://image.tmdb.org/t/p/w500${item.backdrop_path || item.poster_path}`;
        if (item.iso_3166_1) return `http://purecatamphetamine.github.io/country-flag-icons/3x2/${item.iso_3166_1}.svg`
        return SamplePoster;
    };

    const handleSeeMore = () => {
        const seeMorePath = `/search?q=${encodeURIComponent(searchKey)}&v=${Variant.toLowerCase()}`; // Adjust as needed
        window.location.href = seeMorePath;
    };

    return (
        <div className="flex flex-col space-y-2">
            {data.length > 0 ? (
                data.map((item: any, index: number) => {
                    const linkPath = item.source === 'Company' ? `/companies/${item.id}` :
                                     item.source === 'Movie' ? `/movies/${item.id}` :
                                     item.source === 'Series' ? `/tv-shows/${item.id}` :
                                     item.source === 'Person' ? `/persons/${item.id}` :
                                     item.source === 'Country' ? `/countries/${item.iso_3166_1}` :
                                     item.source === 'Genre' ? `/genres/${item.id}` :
                                     item.source === 'Keyword' ? `/keywords/${item.id}` :
                                     '';

                    const displayName = item.displayName;
                    const imageUrl = getImageUrl(item);
                    const isActive = index === activeIndex;

                    return (
                        <Link href={linkPath} key={item.id} className={`flex p-2 hover:bg-gray-100 rounded-lg transition hover:border justify-between items-center ${isActive ? 'bg-gray-200' : ''}`}>
                            <div className='items-center flex'>
                                <Image src={imageUrl} alt={displayName} height={50} width={50} className="rounded" />
                                <div className="ml-3">
                                    <p className='text-base'>{displayName}</p>
                                    {item.source && <p className='text-sm font-light text-gray-600'>from {item.source}</p>}
                                </div>
                            </div>
                            <ArrowBigRight className='flex items-center '/>
                        </Link>
                    );
                })
            ) : (
                <div>No results found</div>
            )}
            {data.length > 0 && (
                <Button variant="ghost" onClick={handleSeeMore} className="mt-8 p-2 bg-cyan-500 text-white rounded-lg">
                    See More
                </Button>
            )}
        </div>
    );
};

const Searchbar = ({ Variant }: SearchbarProps) => {
    const [searchKey, setSearchKey] = useState<string>("");
    const { data, loading, error } = useSearch(searchKey, Variant);
    const [activeIndex, setActiveIndex] = useState<number>(-1);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            setActiveIndex((prev) => (prev < data.length - 1 ? prev + 1 : prev));
        } else if (e.key === 'ArrowUp') {
            setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
        } else if (e.key === 'Enter' && activeIndex >= 0) {
            const selectedItem = data[activeIndex];
            const linkPath = selectedItem.source === 'Company' ? `/companies/${selectedItem.id}` :
                             selectedItem.source === 'Movie' ? `/movies/${selectedItem.id}` :
                             selectedItem.source === 'Series' ? `/tv-shows/${selectedItem.id}` :
                             selectedItem.source === 'Person' ? `/persons/${selectedItem.id}` :
                             selectedItem.source === 'Country' ? `/countries/${selectedItem.iso_3166_1}` :
                             selectedItem.source === 'Genre' ? `/genres/${selectedItem.id}` :
                             selectedItem.source === 'Keyword' ? `/keywords/${selectedItem.id}` :
                             '';
            if (linkPath) {
                window.location.href = linkPath; 
            }
        }
    };

    useEffect(() => {
        setActiveIndex(-1);
    }, [searchKey]);

    return (
        <div className="text-2xl flex flex-col items-center justify-center relative">
            <div className="grid items-center grid-cols-12 bg-cyan-950 my-12 rounded-xl border-2 justify-between mx-8 sm:mx-8 md:mx-12 lg:mx-24 w-full">
                <input
                    type="text"
                    value={searchKey}
                    onChange={(e) => setSearchKey(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={`Search ${Variant}...`}
                    className="border-0 hover:border-0 py-4 pl-4 col-span-10 rounded-l-xl"
                />
                <button
                    type="button"
                    className="col-span-2 flex justify-center items-center text-primary-foreground dark:text-secondary-foreground gap-4"
                    aria-label={searchKey.length > 0 ? "Clear search" : "Search"}
                >
                    {searchKey.length > 0 ? (
                        <Cross2Icon className="text-3xl scale-150" onClick={() => setSearchKey("")} />
                    ) : (
                        <SearchIcon className="text-3xl scale-150" />
                    )}
                </button>
            </div>

            {searchKey.length > 2 && (
                <div className='z-50 absolute top-full left-0 w-full max-h-60 overflow-y-auto bg-white shadow-lg rounded-md text-cyan-950 py-4'>
                    <SearchResults Variant={Variant} data={data} loading={loading} error={error} activeIndex={activeIndex} searchKey={searchKey} />
                </div>
            )}
        </div>
    );
};

export default Searchbar;
