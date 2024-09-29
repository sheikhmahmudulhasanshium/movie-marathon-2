"use client"
import Loading from "@/components/loading";
import useGenreList from "@/hooks/use-genre-list";
import Link from "next/link";

const Genres = () => {
    const {combinedGenres,loading,error}=useGenreList()
    if(loading){
        return <Loading/>
    }
    if(!loading&&!error){
    return (  
        <div id="explore-genre" className=" text-accent-foreground flex flex-col shadow-xl shadow-muted-foreground   justify-between items-center my-4 px-4 pb-6">
            <div className="pl-12 text-start text-3xl font-light  py-4">
                <p>Explore Genre</p>
            </div>
            <div className="justify-center  items-center flex w-10/12">
                <div className="flex-wrap flex justify-between gap-4 items-center ">
                    {combinedGenres.map((genre)=>(
                        <Link className="hover:underline bg-accent p-2 rounded-xl hover:text-blue-400 " key={genre.id} href={`/genres/${genre.name.toLowerCase().replace(/[^a-z0-9&]+/g, '-').replace(/(^-|-$)+/g, '')}`}>
                            {genre.name}
                        </Link>
                    ))}
                </div>
            </div>
            
        </div>
    );}
}
 
export default Genres;