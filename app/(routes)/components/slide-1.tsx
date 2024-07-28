import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PopcornIcon } from 'lucide-react';

const Slide = () => {
  return (
    <Card className='w-full bg-gradient-to-r from-blue-50 to-cyan-100 p-4 rounded-lg shadow-lg'>
      <CardHeader>
        <CardTitle className='text-xl font-bold text-cyan-950 flex items-center'>
          Welcome To Movie Marathon
        </CardTitle>
      </CardHeader>
      <CardDescription className='mt-4 text-gray-700 text-sm'>
        - Your Ultimate Binge-Watching Companion!
      </CardDescription>
      <CardContent className='mt-6 text-base text-gray-800 text-justify'>
        <div className='justify-center items-center flex my-5'>
          <PopcornIcon className='scale-150' />
        </div>
        <p>Discover new favorites with personalized recommendations.</p>
      </CardContent>
    </Card>
  );
}

export default Slide;
