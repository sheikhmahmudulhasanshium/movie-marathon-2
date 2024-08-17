"use client";

import { useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import useCountriesList from "@/hooks/use-countries-list";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

const CountryList = () => {
    const { countries, famousCountries, loading, error } = useCountriesList();
    const [showAll, setShowAll] = useState(false);

    // Toggle function for the button
    const toggleShowAll = () => {
        setShowAll(!showAll);
    };

    // Use famous countries or full list based on state
    const visibleCountries = showAll ? countries : famousCountries;

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!Array.isArray(countries) || countries.length === 0) {
        return <div>No countries found.</div>;
    }

    return (
        <div className="mx-12 ">
            <div id="explore-country" className="flex flex-col justify-between  p-4">
                <p className="text-2xl font-bold my-8 flex justify-start">Explore Country</p>
                <div className="flex flex-wrap justify-start items-center gap-4 ">
                    <TooltipProvider>
                        {visibleCountries.map((country) => (
                            <Tooltip key={country.iso_3166_1}>
                                <TooltipTrigger asChild>
                                    <Link
                                        href={`/country/${country.iso_3166_1}`}
                                        className="hover:opacity-80 transition-opacity duration-200"
                                    >
                                        <div className="relative w-[60px] h-[40px] flex items-center justify-center bg-gray-200">
                                            <Image
                                                src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${country.iso_3166_1}.svg`}
                                                alt={country.english_name}
                                                width={60}
                                                height={40} 
                                            />
                                        </div>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent className="bg-slate-500">
                                    <p className="text-xl ">{country.english_name}</p>
                                </TooltipContent>
                            </Tooltip>
                        ))}
                    </TooltipProvider>
                </div>
                <Button 
                    onClick={toggleShowAll} 
                    variant='ghost' 
                    className="mt-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors flex items-center"
                >
                    {showAll ? <><Minus className="mr-2" /> Show Less</> : <><Plus className="mr-2" /> Show All</>}
                </Button>
            </div>
        </div>
    );
};

export default CountryList;
