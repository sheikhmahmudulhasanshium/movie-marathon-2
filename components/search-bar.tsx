import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import useSearch from '@/hooks/use-search';
import useOMDB from '@/hooks/use-omdb';
import { SearchIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { CombinedSearchResult, Movies, TVShows, Persons } from './type';
import { Cross2Icon } from '@radix-ui/react-icons';

// Utility function to format string
const formatText = (text: string) =>
    text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')  // Replace non-alphanumeric characters with dashes
        .replace(/(^-|-$)+/g, '');     // Remove leading and trailing dashes

const Searchbar = () => {
    const [searchKey, setSearchKey] = useState<string>("");
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);
    const [searchResultFetched, setSearchResultFetched] = useState<boolean>(false); // Track if search results are fetched
    const resultRefs = useRef<(HTMLAnchorElement | null)[]>([]);
    const router = useRouter();

    // Fetch search results using the custom hook
    const { data: searchResults, loading: searchLoading, error: searchError } = useSearch(searchKey);
    const { data: omdbResult, loading: omdbLoading, error: omdbError } = useOMDB(searchKey);

    // Memoize OMDB data
    const omdbMovieData = useMemo(() => omdbResult?.movies || [], [omdbResult]);
    const omdbTVData = useMemo(() => omdbResult?.tvShows || [], [omdbResult]);

    // Determine if we should use OMDB data
    const useOmdbFallback = useMemo(() => {
        // Only use OMDB fallback if search results are empty or not fetched and OMDB has data
        return searchKey.length > 2 && searchError === "Request failed with status code 404" && !searchLoading && searchResults.length === 0;
    }, [searchKey, searchError, searchLoading, searchResults.length]);

    // Log conditions and data for debugging
    useEffect(() => {
        console.log("Search Key:", searchKey);
        console.log("Search Results:", searchResults);
        console.log("OMDB Movie Data:", omdbMovieData);
        console.log("OMDB TV Data:", omdbTVData);
        console.log("Search Error:", searchError);
        console.log("Use OMDB Fallback:", useOmdbFallback);
    }, [searchKey, searchResults, omdbMovieData, omdbTVData, searchError, useOmdbFallback]);

    // Determine which results to use
    const resultsToUse = useMemo(() => {
        if (searchResults.length > 0) {
            return searchResults; // Prioritize search results
        }
        if (useOmdbFallback) {
            return [...omdbMovieData, ...omdbTVData];
        }
        return [];
    }, [searchResults, omdbMovieData, omdbTVData, useOmdbFallback]);

    // Update search key and reset selection index
    const updateSearchKey = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchKey(e.target.value);
        setSelectedIndex(-1);
        setSearchResultFetched(false); // Reset when search key changes
    }, []);

    // Type guards
    const isMovieResult = (item: CombinedSearchResult): item is Movies => 'title' in item;
    const isTVShowResult = (item: CombinedSearchResult): item is TVShows => 'name' in item && 'first_air_date' in item;
    const isPersonResult = (item: CombinedSearchResult): item is Persons => 'name' in item && 'known_for' in item;

    // Filter results based on searchKey
    const filteredResults = useMemo(() => {
        const searchString = searchKey.toLowerCase();
        return resultsToUse.filter((item: CombinedSearchResult) => {
            if (isMovieResult(item)) {
                return item.title.toLowerCase().includes(searchString);
            }
            if (isTVShowResult(item)) {
                return item.name.toLowerCase().includes(searchString);
            }
            if (isPersonResult(item)) {
                return item.name.toLowerCase().includes(searchString);
            }
            return false;
        });
    }, [resultsToUse, searchKey]);

    // Handle keyboard navigation
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (filteredResults.length === 0) return;

        if (e.key === 'ArrowDown') {
            setSelectedIndex(prevIndex => {
                const newIndex = (prevIndex + 1) % filteredResults.length;
                resultRefs.current[newIndex]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                return newIndex;
            });
        } else if (e.key === 'ArrowUp') {
            setSelectedIndex(prevIndex => {
                const newIndex = (prevIndex - 1 + filteredResults.length) % filteredResults.length;
                resultRefs.current[newIndex]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                return newIndex;
            });
        }
    }, [filteredResults]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    // Determine image source based on item type
    const getImageSrc = useCallback((item: CombinedSearchResult) => {
        if ('poster_path' in item && item.poster_path) {
            return `https://media.themoviedb.org/t/p/w185${item.poster_path}`;
        } else if ('profile_path' in item && item.profile_path) {
            return `https://media.themoviedb.org/t/p/w185${item.profile_path}`;
        } else if ('backdrop_path' in item && item.backdrop_path) {
            return `https://media.themoviedb.org/t/p/w185${item.backdrop_path}`;
        } else {
            return '/sample-poster.jpg';
        }
    }, []);

    // Handle search results fetched state
    useEffect(() => {
        if (!searchLoading && searchResults) {
            setSearchResultFetched(true);
        }
    }, [searchLoading, searchResults]);

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

            {searchKey.length > 0 && searchLoading && <p>Loading...</p>}
            {useOmdbFallback && <p>Searching results from OMDB...</p>}

            {searchKey.length > 2 && (
                <div className="flex flex-col bg-cyan-900 w-full overflow-y-scroll max-h-64 rounded-lg shadow-lg z-50 mt-2">
                    {filteredResults.length > 0 ? (
                        filteredResults.map((result, index) => (
                            <Link
                                href={`/details/${formatText(result.title || result.name || result.id.toString())}`}
                                key={index}
                                className={`flex items-center p-2 hover:bg-cyan-700 ${
                                    index === selectedIndex ? 'bg-cyan-600' : ''
                                }`}
                                ref={el => { resultRefs.current[index] = el; }}
                            >
                                <Image
                                    src={getImageSrc(result)}
                                    alt={result.title || result.name || ''}
                                    width={50}
                                    height={75}
                                    className="w-12 h-16 mr-4"
                                />
                                <div className="flex flex-col">
                                    <span className="font-semibold">{result.title || result.name}</span>
                                    {result.release_date && (
                                        <span className="text-sm">{result.release_date}</span>
                                    )}
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p className="text-center p-4">No results found</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Searchbar;
