import { useState } from 'react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
    const [activeOption, setActiveOption] = useState<string | null>(null);
    const optionList = ["Movies",  "TV Shows", "Explore Country",];
    
    const clickHandler = (option: string) => {
        const element = document.getElementById(option.toLowerCase().replace(' ', '-'));
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setActiveOption(option);
        }
    };

    return ( 
        <div className="shadow-xl shadow-accent-foreground">
            <div className="flex gap-4 justify-evenly items-center p-2 bg-white">
                {optionList.map((option, index) => (
                    <Button 
                        key={index} 
                        variant="link" 
                        className={`text-lg my-2 transition-colors duration-300 ${activeOption === option ? 'text-cyan-950 underline font-bold' : 'text-blue-400 hover:text-blue-600'}`}
                        onClick={() => clickHandler(option)}
                    >
                        {option}
                    </Button>
                ))}
            </div>
        </div>
    );
}

export default Navbar;
