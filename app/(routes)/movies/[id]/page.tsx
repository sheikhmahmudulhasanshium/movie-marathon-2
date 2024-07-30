"use client";
import { useParams } from 'next/navigation';
import useMovie from '@/hooks/use-movie';
import RootLayout from "@/app/layout";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Modal from "@/components/modals/basic-page-modal";
import CustomBreadCrumb from "@/components/custom-bread-crumb";
import Image from 'next/image';
import { LoaderPinwheelIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const Movie = () => {
    const params = useParams();
    const id = Array.isArray(params.id) ? params.id[0] : params.id; // Ensure id is a string

    // Debugging: Log the tmdbID
    console.log('TMDB ID:', id);

    const { movie, loading, error } = useMovie(id || '');

    if (!id) {
        return <p>No movie ID provided.</p>; // Handle missing ID case
    }

    if (loading) {
        return (
            <div className='bg-white flex justify-center items-center min-h-screen w-full'>
                <LoaderPinwheelIcon className='animate-spin size-56 text-slate-800' size={48} />
            </div>
        );
    }

    if (error) return <p>Error: {error}</p>;

    return (
        <RootLayout params={{ title: movie ? `${movie.title} | Movie` : "Title | Movie", description: "There will be individual movie" }}>
            <main className="">
                <Modal
                    header={<Header />}
                    footer={<Footer />}
                >
                    <CustomBreadCrumb params={{ link: `/movies/${id}/` }} />
                    {movie && (
                        <div className="movie-detail-container">
                            <h1>{movie.title}</h1>
                            <p>{movie.overview}</p>
                            <p>Release Date: {movie.release_date}</p>
                            <Image
                                src={`https://media.themoviedb.org/t/p/w500/${movie.poster_path}`}
                                alt={movie.title}
                                width={500}
                                height={750}
                            />
                            {/* Add other movie details and UI elements here */}
                            <Card className='flex flex-col '>
                                <CardHeader>
                                <CardTitle>Card Title</CardTitle>
                                <CardDescription>Card Description</CardDescription>
                                </CardHeader>
                                <CardContent>
                                <p>Card Content</p>
                                </CardContent>
                                <CardFooter>
                                <p>Card Footer</p>
                            </CardFooter>
                            </Card>
                        </div>
                        
                    )}
                </Modal>
            </main>
        </RootLayout>
    );
}

export default Movie;
