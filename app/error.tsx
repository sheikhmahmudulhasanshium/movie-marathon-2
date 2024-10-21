'use client'
import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { GetServerSideProps } from 'next'; 
import { ArrowBigLeft, HomeIcon } from 'lucide-react';

interface ErrorPageProps {
  statusCode: number;
}

const ErrorPage: FC<ErrorPageProps> = ({ statusCode }) => {
  const router = useRouter();


  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-gray-50">
      <h1 className="text-4xl font-bold text-red-600">
        {statusCode ? `${statusCode} - Oops!` : 'An unexpected error occurred!'}
      </h1>
      <p className="mt-4 text-lg text-gray-700">
        {statusCode === 500
          ? 'Sorry, something went wrong on our end.'
          : 'An unexpected error has occurred.'}
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
  );
};

// Define server-side props to handle error status codes
export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const statusCode = res?.statusCode || 500; // Default to 500 if not provided
  return {
    props: { statusCode },
  };
};

export default ErrorPage;
