"use client"
import RootLayout from "@/app/layout";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Modal from "@/components/modals/basic-page-modal";
import { useOrigin } from "@/hooks/use-origin";
import Body from "./components/body";
import CustomBreadCrumb from "@/components/custom-bread-crumb";
import Loading from "@/components/loading";
import Navbar from "./components/nav-bar";

const TVShows = () => {
  const origin = useOrigin();

  if (!origin) {
    return (
      <Loading/>
    );
  }

    return ( 
    <RootLayout params={{ title: "TV Shows", description: "This is the better version of previous App" }}>
      
      <main className="">
        <Modal
          header={<Header />}
          footer={<Footer/>}
        >
          <Navbar/>

          <CustomBreadCrumb params={{link:"/tv-shows/",name:"TV"}}/>
          <Body/>
        </Modal>
      </main>
    </RootLayout>
     );
}
 
export default TVShows;
