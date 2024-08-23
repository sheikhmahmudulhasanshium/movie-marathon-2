import Searchbar from "@/components/search-bar"
import CompanyList from "./company-list";

const Body = () => {
    return ( 
        <div className="flex flex-col justify-center items-center py-4 px-6 bg-primary-foreground min-h-screen my-4">
            <p className="my-8 text-2xl font-semibold text-center text-gray-800">Explore Movies, TV Shows, and More</p>
            <Searchbar />
            <div className="flex flex-col w-full max-w-6xl">
                <CompanyList/>
            </div>

        </div>
     );
}
 
export default Body;