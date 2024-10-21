"use client"
import { useRouter } from "next/navigation";
import RootLayout from "./layout";
import Modal from "@/components/modals/basic-page-modal";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft, BugIcon, HomeIcon } from "lucide-react";

const ErrorPage = () => {
  const router = useRouter();

  return (
    <RootLayout params={{ title: "!!!Warning!!!", 
        description: 'Please contact the developer. Explain the problem for debugging'    }}>
        
        <main className="">
          <Modal
            header={<Header />}
            footer={<Footer/>}
          >
      
                <div className="flex flex-col items-center justify-center w-full bg-gradient-to-tl from-red-200 to-white dark:from-cyan-900 dark:to-accent-foreground mt-8">
                    <div className="text-center flex flex-col py-4 justify-center">
                        <div className="flex items-center   bg-opacity-50 dark:bg-opacity-100 justify-center h-80 w-full mt-8 px-4">
                          <BugIcon className="animate-bounce w-20 h-20"/>
                        </div> 
                        <h2 className="mt-4 text-2xl text-gray-600">Oops! Something Went Wrong</h2>
                        <p className="mt-2 text-gray-500 dark:text-slate-300">
                            The page you are looking for has some unresolved issue.
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
 
export default ErrorPage;