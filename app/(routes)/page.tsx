"use client";
import { useOrigin } from '@/hooks/use-origin';
import { LoaderPinwheelIcon } from 'lucide-react';
import Header from '@/components/header';
import Modal from '@/components/modals/basic-page-modal';
import Footer from '@/components/footer';
import RootLayout from '../layout';
import Slide from './components/slide-1';
import Slide2 from './components/slide-2';
import Slide3 from './components/slide-3';
import Slide4 from './components/slide-4';
import FullSite from '@/components/full-site';

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
    <RootLayout params={{ title: "Movie Marathon 2", description: "This is the better version of previous App" }}>
      <main className="flex">
        <Modal header={<Header />} footer={<Footer />}>
          <div className='mx-8 my-14 flex flex-col justify-center items-center'>
            <Slide />
            <Slide2 />
            <Slide3 />
            <Slide4 />
            <FullSite />
          </div>
        </Modal>
      </main>
    </RootLayout>
  );
};

export default HomePage;
