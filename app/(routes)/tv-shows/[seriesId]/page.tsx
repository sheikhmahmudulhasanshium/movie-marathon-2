"use client";
import { useParams } from 'next/navigation';
import useTvShow from '@/hooks/use-tv-show';
import RootLayout from "@/app/layout";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Modal from "@/components/modals/basic-page-modal";
import CustomBreadCrumb from "@/components/custom-bread-crumb";
import Searchbar from '@/components/search-bar';
import Recommendations from '../../../../components/recommendations';
import Loading from '@/components/loading';
import Trailers from '../../../../components/trailer';
import Details from '@/components/series-details';
import EpisodeSelector from '../../../../components/episode-selector';

const TvShow: React.FC = () => {
    const params = useParams();
    const id = Array.isArray(params.seriesId) ? params.seriesId[0] : params.seriesId; // Ensure id is a string

    // Fetch movie data
    const { series, loading, error } = useTvShow(id || '');

    if (!id) {
        return <p>No series ID provided.</p>; // Handle missing ID case
    }

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <RootLayout params={{ title: series ? `${series.name} | Tv Show` : "Title | Movie", description: "There will be individual movie" }}>
            <main className="flex justify-center items-start">
                <Modal
                    header={<Header />}
                    footer={<Footer />}
                >
                    <CustomBreadCrumb params={{ link: `/tv-shows/${id}/`,name:`/tv-show/${series?.name}` }} />
                    {series && (
                        <div className='justify-center items-center flex flex-col'>
                            <Searchbar />
                            <EpisodeSelector series={series}/>
                            <Details series={series} />
                            <Trailers tmdbID={series.id} media_type="tv"/>
                            <Recommendations tmdbID={series.id} media_type="tv" />
                        </div>
                    )}
                </Modal>
            </main>
        </RootLayout>
    );
}

export default TvShow;
