"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowBigLeft, HomeIcon } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';

const NotFound: React.FC = () => {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center w-full bg-gradient-to-tl from-red-200 to-white ">
            <Header/>

            <div className="text-center flex flex-col py-4 ">
                <h1 className="flex items-center bg-cover bg-404 w-10/12 h-80"/>
                <h2 className="mt-4 text-2xl text-gray-600">Oops! Page not found</h2>
                <p className="mt-2 text-gray-500">
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
    );
};

export default NotFound;
