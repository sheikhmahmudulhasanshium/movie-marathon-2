import Searchbar from "@/components/search-bar";

const Body = () => {
    return ( 
        <div className='flex  flex-col m-4  justify-between items-center '>
            <Searchbar/>
            <div>Movies</div>
            <div>TV Shows</div>
            <div>Popular</div>
        </div>

     );
}
 
export default Body;