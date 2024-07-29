"use client"
import RootLayout from "@/app/layout";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Modal from "@/components/modals/basic-page-modal";
import { useOrigin } from "@/hooks/use-origin";
import { LoaderPinwheelIcon } from "lucide-react";
import Body from "./components/body";

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
    <RootLayout params={{ title: "Homepage", description: "This is the better version of previous App" }}>
      
      <main className="">
        <Modal
          header={<Header />}
          footer={<Footer/>}
        >
          <Body/>
        </Modal>
      </main>
    </RootLayout>
     );
}
 
export default HomePage;