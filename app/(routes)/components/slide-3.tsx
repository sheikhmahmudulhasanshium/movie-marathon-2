import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StarIcon } from 'lucide-react';

const Slide3 = () => {
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
        <div className='justify-center items-center flex my-5'>
          <StarIcon className='scale-150' />
        </div>
        <p>Enjoy top-rated movies and TV shows curated just for you.</p>
      </CardContent>
    </Card>
  );
}

export default Slide3;
