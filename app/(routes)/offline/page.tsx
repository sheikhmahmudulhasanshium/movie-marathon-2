"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Header from '@/components/header';
import Modal from '@/components/modals/basic-page-modal';
import CustomBreadCrumb from '@/components/custom-bread-crumb';
import Footer from '@/components/footer';
import { LucideWifiOff } from 'lucide-react';
import RootLayout from '@/app/layout';
import { ThemeProvider } from '@/components/providers/theme-provider';
import useNetworkStatus from '@/hooks/use-network';

const Offline: React.FC = () => {
    const router = useRouter();
    const { isOnline } = useNetworkStatus();

    React.useEffect(() => {
        if (isOnline) {
            router.back();
        }
    }, [isOnline, router]);

    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <RootLayout params={{ title: "Offline", description: "The network is disconnected" }}>
                <main>
                    <Modal header={<Header />} footer={<Footer />}>
                        <CustomBreadCrumb params={{ link: "/offline", name: "/Offline!!!" }} />
                        <div className="flex flex-col items-center justify-center w-full bg-gradient-to-tl from-red-200 to-white dark:from-cyan-900 dark:to-accent-foreground mt-8">
                            <div className="text-center flex flex-col py-4 justify-center">
                                <div className="flex items-center bg-opacity-50 dark:bg-opacity-100 justify-center h-80 w-full mt-8 px-4 text-cyan-950">
                                    <LucideWifiOff className='w-32 h-32' />
                                </div>
                                <h2 className="mt-4 text-2xl text-gray-600">Oops! Network is disconnected</h2>
                                <p className="mt-2 text-gray-500 dark:text-slate-300">There is a problem in your connection.</p>
                                <Button variant='outline' size='lg' onClick={() => router.refresh()} className="flex flex-col justify-center items-center p-4 rounded-lg transition duration-300 hover:bg-red-200 my-6">
                                    <span className="text-lg">Refresh</span>
                                </Button>
                                <div className='flex justify-center w-full gap-6 mt-8'>
                                    <Button variant='outline' size='lg' onClick={() => router.back()} className="flex flex-col justify-center items-center p-4 rounded-lg transition duration-300 hover:bg-red-200">
                                        <span className="text-lg">Go Back</span>
                                    </Button>
                                    <Button variant='outline' size='lg' onClick={() => router.push('/home')} className="flex flex-col justify-center items-center p-4 rounded-lg transition duration-300 hover:bg-red-200">
                                        <span className="text-lg">Go Home</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Modal>
                </main>
            </RootLayout>
        </ThemeProvider>
    );
};
export default Offline;
