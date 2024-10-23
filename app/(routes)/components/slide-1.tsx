import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import src from '../../../public/movie-marathon-2.jpeg'
const Slide1 = () => {
  return (
    <Card className='w-full  p-4 rounded-lg shadow-lg mx-8 flex flex-col h-full animate-in'>
      <CardHeader>
        <CardTitle className='text-4xl font-bold text-cyan-950 text-center'>
        <h1>✨ Introducing ✨</h1>
        </CardTitle>
      </CardHeader>
      
      <CardContent className='mt-6 text-base text-gray-800 text-justify'>
        <h2 className='justify-center items-center flex my-5'>
          <Image src={src} alt='Movie Marathon 2' width='400' height='400'/>
        </h2>
        <CardDescription className='my-4 text-gray-700 text-sm text-end'>
        <h6>- Your Ultimate Binge-Watching Companion!</h6>
        </CardDescription>
        <h5>Discover new favorites with personalized recommendations.</h5>
      </CardContent>
    </Card>
  );
}

export default Slide1;
