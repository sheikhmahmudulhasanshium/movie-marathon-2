"use client";
import { useParams } from 'next/navigation';
import useMovie from '@/hooks/use-movie';
import RootLayout from "@/app/layout";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Modal from "@/components/modals/basic-page-modal";
import CustomBreadCrumb from "@/components/custom-bread-crumb";
import MovieDetails from '../../../../components/movie-details';
import Recommendations from '../../../../components/recommendations';
import Loading from '@/components/loading';
import Trailers from '../../../../components/trailer';
import VideoPlayer from '../components/video-player';
import Searchbar from '@/components/modals/search-bar-advanced';

const Movie: React.FC = () => {
    const params = useParams();
    const id = Array.isArray(params.id) ? params.id[0] : params.id; // Ensure id is a string

    // Fetch movie data
    const { movie, loading, error } = useMovie(id || '');

    if (!id) {
        return <p>No movie ID provided.</p>; // Handle missing ID case
    }

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <RootLayout params={{ title: movie ? `${movie.title} | Movie` : "Title | Movie", description: "There will be individual movie" }}>
            <main className="flex justify-center items-start">
                <Modal
                    header={<Header />}
                    footer={<Footer />}
                >
                    <CustomBreadCrumb params={{ link: `/movies/${id}/`,name:`/Movie/${movie?.title}` }} />
                    {movie && (
                        <div className='justify-center items-center flex flex-col'>
                            <Searchbar Variant={'Movie'} />
                            <VideoPlayer movie={movie}/>

                            
                            <MovieDetails movie={movie} />
                            <Trailers tmdbID={movie.id} media_type="movie"/>
                            <Recommendations tmdbID={movie.id} media_type="movie" />
                        </div>
                    )}
                </Modal>
            </main>
        </RootLayout>
    );
}

export default Movie;
