"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowBigLeft, HomeIcon } from 'lucide-react';
import Header from '@/components/header';
import RootLayout from './layout';
import Modal from '@/components/modals/basic-page-modal';
import CustomBreadCrumb from '@/components/custom-bread-crumb';
import Footer from '@/components/footer';

const NotFound: React.FC = () => {
    const router = useRouter();

    return (
        <RootLayout params={{ title: "Page not found", 
            description: "Discover Movie Marathon, the ultimate app for movie enthusiasts and binge-watchers! Whether you&apos;re planning a cozy night in or an epic weekend of non-stop entertainment, Movie Marathon helps you organize and elevate your viewing experience. Enjoy a vast library of movies and TV shows across all genres, personalized recommendations tailored to your taste, and seamless streaming options. With Movie Marathon, you can easily find new favorites and revisit classic films, making every movie night unforgettable!"    }}>
            
            <main className="">
              <Modal
                header={<Header />}
                footer={<Footer/>}
              >
                <CustomBreadCrumb params={{link:"/not-found",name:"/404 (Page Not Found) !!!"}}/>
          
                    <div className="flex flex-col items-center justify-center w-full bg-gradient-to-tl from-red-200 to-white dark:from-cyan-900 dark:to-accent-foreground mt-8">
                        <div className="text-center flex flex-col py-4 justify-center">
                            <div className="flex items-center bg-cover bg-404  bg-opacity-50 dark:bg-opacity-100 justify-center h-80 w-full mt-8 px-4" />
                            <h2 className="mt-4 text-2xl text-gray-600">Oops! Page not found</h2>
                            <p className="mt-2 text-gray-500 dark:text-slate-300">
                                The page you are looking for does not exist.
                            </p>
                            <div className='flex justify-center w-full gap-6 mt-8'>
                                <Button
                                    variant='outline'
                                    size='lg'
                                    onClick={() => router.back()}
                                    className="flex flex-col justify-center items-center p-4 rounded-lg transition duration-300 hover:bg-red-200"
                                >
                                    <ArrowBigLeft className='w-8 h-8 mb-1' />
                                    <span className="text-lg">Go Back</span>
                                </Button>
                                <Button
                                    variant='outline'
                                    size='lg'
                                    onClick={() => router.push('/home')}
                                    className="flex flex-col justify-center items-center p-4 rounded-lg transition duration-300 hover:bg-red-200"
                                >
                                    <HomeIcon className='w-8 h-8 mb-1' />
                                    <span className="text-lg">Go Home</span>
                                </Button>
                            </div>
                        </div>
                    </div>
        </Modal>
        </main>

        </RootLayout>
    );
};

export default NotFound;
