import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import src from '../../../public/movie-marathon-6.jpeg'
const Slide6 = () => {
  return (
    <Card className='w-full  p-4 rounded-lg shadow-lg mx-8 flex flex-col animate-out'>
      <CardHeader>
        <CardTitle className='text-4xl font-bold text-cyan-950 text-center'>
        <p>🔒 No Sign-In 🔒</p>

        </CardTitle>
      </CardHeader>
      
      <CardContent className='mt-6 text-base text-gray-800 text-justify'>
        <div className='justify-center items-center flex my-5'>
          <Image src={src} alt='sample-1' width='400' height='400'/>
        </div>
        <CardDescription className='my-4 text-gray-700 text-sm text-end'>
        - Your Ultimate Binge-Watching Companion!
        </CardDescription>
        <p>Enjoy top-rated Movies and TV shows without Sign-in.</p>
      </CardContent>
    </Card>
  );
}

export default Slide6;
