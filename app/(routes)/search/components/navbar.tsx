import { Button } from "@/components/ui/button";

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

interface NavbarProps {
    activeOption: string;
    onSelect: (option: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeOption, onSelect }) => {
    return ( 
        <div className="pt-6 pb-4 max-w-2xl flex items-start lg:max-w-6xl lg:justify-center lg:items-center">
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

export default Navbar;
