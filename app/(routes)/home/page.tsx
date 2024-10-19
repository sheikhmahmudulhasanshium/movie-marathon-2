"use client"
import RootLayout from "@/app/layout";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Modal from "@/components/modals/basic-page-modal";
import { useOrigin } from "@/hooks/use-origin";
import { LoaderPinwheelIcon } from "lucide-react";
import Body from "./components/body";
import CustomBreadCrumb from "@/components/custom-bread-crumb";

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
    <RootLayout params={{ title: "Homepage", 
      description: "Discover Movie Marathon, the ultimate app for movie enthusiasts and binge-watchers! Whether you&apos;re planning a cozy night in or an epic weekend of non-stop entertainment, Movie Marathon helps you organize and elevate your viewing experience. Enjoy a vast library of movies and TV shows across all genres, personalized recommendations tailored to your taste, and seamless streaming options. With Movie Marathon, you can easily find new favorites and revisit classic films, making every movie night unforgettable!"    }}>
      
      <main className="">
        <Modal
          header={<Header />}
          footer={<Footer/>}
        >
          <CustomBreadCrumb params={{link:"/home/",name:"/Home/"}}/>
          <Body/>
        </Modal>
      </main>
    </RootLayout>
     );
}
 
export default HomePage;