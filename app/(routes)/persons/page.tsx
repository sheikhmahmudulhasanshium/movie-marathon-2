"use client"
import RootLayout from "@/app/layout";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Modal from "@/components/modals/basic-page-modal";
import { useOrigin } from "@/hooks/use-origin";
import { LoaderPinwheelIcon } from "lucide-react";
import Body from "./components/body";
import CustomBreadCrumb from "@/components/custom-bread-crumb";

const Persons = () => {
    const origin = useOrigin();
  if (!origin) {
    return (
      <div className='bg-white flex justify-center items-center min-h-screen w-full'>
        <LoaderPinwheelIcon className='animate-spin size-56 text-slate-800' size={48} />
      </div>
    );
  }

    return ( 
    <RootLayout params={{ title: "Explore Popular Celebrities", description: "Explore Celebreties from here" }}>
      
      <main className="">
        <Modal
          header={<Header />}
          footer={<Footer/>}
        >
          <CustomBreadCrumb params={{link:"/persons/",name:"/Person"}}/>
          <Body/>
        </Modal>
      </main>
    </RootLayout>
     );
}
 
export default Persons;