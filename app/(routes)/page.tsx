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
    <RootLayout params={{ title: "Welcome To Movie Marathon", description: "This is the better version of previous App" }}>
      
      <main className="">
        <Modal
          header={<Header />}
          footer={<Footer/>}
        >
          <CustomBreadCrumb params={{link:"/"}}/>
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