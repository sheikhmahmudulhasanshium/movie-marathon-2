import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useSearch from "@/hooks/use-search-2";
import { useState } from "react";

const optionList = [
    "All", 
    "Movie", 
    "Series", 
    "Genre", 
    "Country", 
    "Person", 
    "Company", 
    "Keyword"
];

// Define props for Navbar
interface NavbarProps {
    activeOption: string;
    onSelect: (option: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeOption, onSelect }) => {
    return ( 
        <div className="pt-6 pb-4 max-w-2xl flex items-start">
            <div className="flex gap-4 justify-start items-center overflow-x-auto whitespace-nowrap">
                {optionList.map((option, index) => (
                    <Button 
                        key={index} 
                        onClick={() => onSelect(option)}
                        className={`transition duration-200 ease-in-out rounded-lg py-2 px-4 shadow-md ${
                            activeOption === option 
                                ? 'bg-blue-500 text-white' 
                                : 'bg-gray-200 hover:bg-gray-300 text-black'
                        }`}
                    >
                        {option}
                    </Button>
                ))}
            </div>
        </div>
    );
};

// Define props for SearchResults
interface SearchResultsProps {
    searchKey: string; 
    variant: string;   
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchKey, variant }) => {
    const [activeOption, setActiveOption] = useState(variant);
    const { loading, error, data } = useSearch(searchKey, activeOption);

    if (loading) return <Loading />;
    if (error) return <p>{error}</p>;
    
    return ( 
        <div className="flex flex-col justify-between w-full p-6">
            <Navbar activeOption={activeOption} onSelect={setActiveOption} />
            <Separator className="my-4 border-gray-300" />
            <div className="flex flex-col justify-between w-full">
                {data.map((item: { id: number; displayName: string }) => (
                    <div key={item.id}>{item.displayName}</div>
                ))}
            </div>
        </div>
    );
};

export default SearchResults;
