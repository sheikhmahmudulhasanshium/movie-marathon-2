"use client"
import RootLayout from "@/app/layout";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Modal from "@/components/modals/basic-page-modal";
import { useOrigin } from "@/hooks/use-origin";
import { LoaderPinwheelIcon } from "lucide-react";
import CustomBreadCrumb from "@/components/custom-bread-crumb";
import FullSite from "@/components/full-site";
import SlideShow from "./components/slide-show";
const HomePage = () => {
  const origin = useOrigin();

  if (!origin) {
    return (
      <div className='bg-white flex justify-center items-center min-h-screen w-full'>
        <LoaderPinwheelIcon className='animate-spin size-56 text-slate-800' size={48} />
      </div>
    );
  }

    return ( 
    <RootLayout params={{ title: "Welcome To Movie Marathon", 
      description: "Discover Movie Marathon, the ultimate app for movie enthusiasts! Organize your binge-watching with personalized recommendations and enjoy seamless streaming of your favorite movies and shows.",
      image: '../public/logo.png'
      }}>
      
      <main className="">
        <Modal
          header={<Header />}
          footer={<Footer/>}

        >
          <CustomBreadCrumb params={{link:"/",name:"/Welcome"}}/>
          <div className="flex-col flex ">
              <SlideShow/>
              <FullSite/>
          </div>
        </Modal>
      </main>
    </RootLayout>
     );
}
 
export default HomePage;