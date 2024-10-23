import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import src from '../../../public/movie-marathon-6.jpeg'
const Slide6 = () => {
  return (
    <Card className='w-full  p-4 rounded-lg shadow-lg mx-8 flex flex-col animate-out'>
      <CardHeader>
        <CardTitle className='text-4xl font-bold text-cyan-950 text-center'>
        <h1>🔒 No Sign-In 🔒</h1>

        </CardTitle>
      </CardHeader>
      
      <CardContent className='mt-6 text-base text-gray-800 text-justify'>
        <div className='justify-center items-center flex my-5'>
          <Image src={src} alt='' width='400' height='400'/>
        </div>
        <CardDescription className='my-4 text-gray-700 text-sm text-end'>
        <h6>- Your Ultimate Binge-Watching Companion!</h6>
        </CardDescription>
        <h5>Enjoy top-rated Movies and TV shows without Sign-in.</h5>
      </CardContent>
    </Card>
  );
}

export default Slide6;
