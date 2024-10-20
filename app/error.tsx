'use client'
import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { GetServerSideProps } from 'next'; 

interface ErrorPageProps {
  statusCode: number;
}

const ErrorPage: FC<ErrorPageProps> = ({ statusCode }) => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/');
  };

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
      <Button className="mt-4" onClick={handleGoHome}>
        Go Home
      </Button>
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
