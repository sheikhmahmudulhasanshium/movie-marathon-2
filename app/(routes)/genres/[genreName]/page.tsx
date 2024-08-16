"use client"

import RootLayout from "@/app/layout";
import CustomBreadCrumb from "@/components/custom-bread-crumb";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Modal from "@/components/modals/basic-page-modal";
import Loading from "@/components/loading";
import { useParams } from "next/navigation";
import useGenreList from "@/hooks/use-genre-list";
import Body from "./components/body";
import GenreList from "../components/genre-list";
import Navbar from "./components/nav-bar";

const Genre = () => {
    const params = useParams();
    const genreName = params.genreName.toString().replace('%26','&')
    const {combinedGenres,loading,error}=useGenreList()
    
    if(loading){
        <Loading/>
    }
    if(error){
        <div>{error}</div>
    }
    const formattedGenre=combinedGenres.find((genre)=>(
        genreName==genre.name.toLowerCase().replace(/[^a-z0-9&]+/g, '-').replace(/(^-|-$)+/g, '')
    ))
    if(!loading&&!error)

    return ( 
        <RootLayout params={{ title: formattedGenre?`${formattedGenre.name}`:`${genreName.toLocaleUpperCase()} | Genre`, description: "This is the better version of previous App" }}>
            <main className="">
                <Modal
                    header={<Header />}
                    footer={<Footer/>}
                    >
                    <Navbar/>
                    <CustomBreadCrumb params={{link:`/genres/${genreName.replace('%26','&')}`,name:`/Genre/${formattedGenre?.name}`}}/>
                    
                    <Body genre_data={formattedGenre}/>
                    <GenreList/>
                </Modal>
            </main>
        </RootLayout>
     );
}
 
export default Genre;