import Searchbar from "@/components/modals/search-bar-advanced";
import CelebList from "./celebrity-list";

const Body = () => {
    return ( 
        <div className="flex flex-col items-center w-full my-4 px-4" id='all'>
            <div className="my-8 text-center">
                <p className="text-2xl font-light">
                    Explore The Career of Popular Celebrities
                </p>
            </div>

            <Searchbar Variant={"Person"} />
            <CelebList/>
            
        </div>

     );
}
 
export default Body;