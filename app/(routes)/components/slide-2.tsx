import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TvIcon } from 'lucide-react';

const Slide2 = () => {
  return (
    <Card className='w-8/12 bg-gradient-to-r from-purple-50 to-pink-100 p-4 rounded-lg shadow-lg mx-8 flex flex-col'>
      <CardHeader>
        <CardTitle className='text-xl font-bold text-pink-950 flex items-center'>
          Welcome To Movie Marathon
        </CardTitle>
      </CardHeader>
      <CardDescription className='mt-4 text-gray-700 text-sm'>
        - Your Ultimate Binge-Watching Companion!
      </CardDescription>
      <CardContent className='mt-6 text-base text-gray-800 text-justify'>
        <div className='justify-center items-center flex my-5'>
          <TvIcon className='scale-150' />
        </div>
        <p>Stream seamlessly with our high-quality streaming options.</p>
      </CardContent>
    </Card>
  );
}

export default Slide2;
