import SampleCard from "@/components/sample-card";
import Searchbar from "@/components/search-bar";
import { ChevronLeftIcon, ChevronRightIcon,  } from "lucide-react";

const Body = () => {
    return ( 
        <div className='flex  flex-col mx-4  justify-between items-center '>
            <Searchbar/>
            <div className="flex   center items-center p-2">
                <div className="flex flex-col justify-center  relative flex-wrap">
                    <p className="text-2xl font-bold font-serif mb-8 ml-8">Latest</p>
                    <div className="flex  overflow-x-scroll py-4  gap-x-4   bg-black  justify-center max-w-lg sm:max-w-xl md:max-w-xl lg:max-w-4xl items-start">
                        
                        {/**Move Right Button*/}
                        <div  className='flex justify-center items-center h-[30rem] opacity-50 hover:opacity-90 absolute  z-10' >
                                <ChevronRightIcon className="h-24 w-24 text-yellow-400" />
                        </div>
                        {/**Move Right Button*/}
                        <div   className='flex justify-center items-center h-[30rem] opacity-50 hover:opacity-90 absolute  z-10'>
                                <ChevronLeftIcon className="h-24 w-24 text-yellow-400"/>
                        </div>
                    
                    </div>
                    
                </div>
            </div>
        </div>

     );
}
 
export default Body;