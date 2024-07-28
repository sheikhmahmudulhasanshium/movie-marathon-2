import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StarIcon, ShieldCheckIcon, XCircleIcon, DollarSignIcon } from 'lucide-react';

const Slide4 = () => {
  return (
    <Card className='w-full bg-gradient-to-r from-green-50 to-yellow-100 p-4 rounded-lg shadow-lg'>
      <CardHeader>
        <CardTitle className='text-xl font-bold text-yellow-950 flex items-center'>
          Welcome To Movie Marathon
        </CardTitle>
      </CardHeader>
      <CardDescription className='mt-4 text-gray-700 text-sm'>
        - Your Ultimate Binge-Watching Companion!
      </CardDescription>
      <CardContent className='mt-6 text-base text-gray-800 text-justify'>
        <div className='mt-6 flex flex-col items-center space-y-4'>
          <div className='flex items-center'>
            <ShieldCheckIcon className='scale-125 text-green-600 mr-2' />
            <p>No Sign-In Required</p>
          </div>
          <div className='flex items-center'>
            <XCircleIcon className='scale-125 text-red-600 mr-2' />
            <p>No Ads</p>
          </div>
          <div className='flex items-center'>
            <DollarSignIcon className='scale-125 text-blue-600 mr-2' />
            <p>No Payment Required</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default Slide4;
