"use client";

import useSearch from "@/hooks/use-search";
import { BanIcon, SearchIcon, TextSearchIcon, UserSearchIcon } from "lucide-react";
import { useState, ChangeEvent, useEffect } from "react";

const Searchbar = () => {
    const sampleRandomData = ["Iron-Man Movie", "Robert Downey Jr. Person", "Better Call Saul Movie"];
    const [searchKey, setSearchKey] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const formattedSearchKey = searchKey.toLowerCase();

    function updateSearchKey(e: ChangeEvent<HTMLInputElement>) {
        setSearchKey(e.target.value);
        setSelectedIndex(-1); // Reset the selected index when the search key changes
    }

    const filteredData = sampleRandomData.filter(item =>
        item.toLowerCase().includes(formattedSearchKey)
    );

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (filteredData.length === 0) return;

            if (e.key === 'ArrowDown') {
                setSelectedIndex((prevIndex) => (prevIndex + 1) % filteredData.length);
            } else if (e.key === 'ArrowUp') {
                setSelectedIndex((prevIndex) => (prevIndex - 1 + filteredData.length) % filteredData.length);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [filteredData]);
    const searchResult=useSearch(searchKey)
    return (
        <div className="w-10/12 sm:w-10/12 md:w-10 lg:w-10/12 text-2xl flex flex-col items-center justify-center relative">
            {/** Searchbar */}
            <div className="grid items-center grid-cols-12 bg-cyan-950 my-12 rounded-xl border-2 justify-between mx-8 sm:mx-8 md:mx-12 lg:mx-24">
                <input 
                    type="text" 
                    value={searchKey} 
                    onChange={updateSearchKey}
                    placeholder="Search..." 
                    className="border-0 hover:border-0 py-4 pl-4 col-span-10 rounded-l-xl" 
                />
                <button type="submit" className="col-span-2 justify-center items-center text-primary-foreground dark:text-secondary-foreground flex">
                    <SearchIcon className="text-3xl scale-150"/>
                </button>
            </div>
            {/** SearchResult */}
            {searchKey !== "" && (
                <>
                    <p>Showing Results</p>
                    <div className="flex flex-col bg-cyan-900 w-full overflow-y-scroll max-h-64 rounded-lg shadow-lg z-50 absolute top-full mt-2">
                        {filteredData.length > 0 ? (
                            filteredData.map((item, index) => (
                                <div 
                                    key={index}
                                    className={`flex justify-between items-center text-lg p-2 gap-4 font-bold border-b-2 border-slate-400 hover:bg-cyan-800 transition-all duration-200 ${selectedIndex === index ? 'bg-cyan-800' : ''}`}
                                >
                                    <div className="bg-cover bg-sample-poster w-12 h-12 rounded-lg" />
                                    <p className="flex-grow text-white">{item}</p>
                                    {item.toLowerCase().includes("movie") ? (
                                        <button className="text-primary-foreground text-white">
                                            <TextSearchIcon />
                                        </button>
                                    ) : (
                                        <button className="text-primary-foreground text-white">
                                            <UserSearchIcon />
                                        </button>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="flex justify-between items-center text-lg p-2 gap-4 font-bold border-b-2 border-slate-400 hover:bg-cyan-800 transition-all duration-200">
                                <div className="text-red-500 w-12 h-12 items-center flex justify-center">
                                    <BanIcon />
                                </div>
                                <p className="flex-grow text-white">No Results Found !!!</p>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default Searchbar;
