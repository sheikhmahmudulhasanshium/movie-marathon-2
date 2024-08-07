"use client"
import RootLayout from "@/app/layout";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Modal from "@/components/modals/basic-page-modal";
import { useOrigin } from "@/hooks/use-origin";
import Body from "./components/body";
import CustomBreadCrumb from "@/components/custom-bread-crumb";
import Loading from "@/components/loading";

const Movies = () => {
  const origin = useOrigin();

  if (!origin) {
    return (
      <Loading/>
    );
  }

    return ( 
    <RootLayout params={{ title: "Movies", description: "This is the better version of previous App" }}>
      
      <main className="">
        <Modal
          header={<Header />}
          footer={<Footer/>}
        >
          <CustomBreadCrumb params={{link:"/movies/",name:'/Movie'}}/>
          <Body/>
        </Modal>
      </main>
    </RootLayout>
     );
}
 
export default Movies;