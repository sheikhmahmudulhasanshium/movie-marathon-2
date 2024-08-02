"use client";
import { useParams } from 'next/navigation';
import useMovie from '@/hooks/use-movie';
import RootLayout from "@/app/layout";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Modal from "@/components/modals/basic-page-modal";
import CustomBreadCrumb from "@/components/custom-bread-crumb";
import MovieDetails from './components/details';
import Searchbar from '@/components/search-bar';
import Suggestions from './components/recommendations';
import Loading from '@/components/loading';

const Movie: React.FC = () => {
    const params = useParams();
    const id = Array.isArray(params.id) ? params.id[0] : params.id; // Ensure id is a string

    // Debugging: Log the tmdbID
    //console.log('TMDB ID:', id);

    const { movie, loading, error } = useMovie(id || '');

    if (!id) {
        return <p>No movie ID provided.</p>; // Handle missing ID case
    }

    if (loading) {
        return (
            <Loading/>
        );
    }

    if (error) return <p>Error: {error}</p>;

    return (
        <RootLayout params={{ title: movie ? `${movie.title} | Movie` : "Title | Movie", description: "There will be individual movie" }}>
            <main className="flex justify-center items-start">
                <Modal
                    header={<Header />}
                    footer={<Footer />}
                >
                    <CustomBreadCrumb params={{ link: `/movies/${id}/` }} />
                    {movie && (
                        <div className=' justify-center items-center flex flex-col'>
                            <Searchbar/>
                            <MovieDetails movie={movie} />
                            {/*<Suggestions recommendations={movie.recommendations}/>*/}
                        </div>
                    )}
                </Modal>
            </main>
        </RootLayout>
    );
}

export default Movie;
