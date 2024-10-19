"use client";
import RootLayout from '@/app/layout';
import CustomBreadCrumb from '@/components/custom-bread-crumb';
import Details from '@/components/episode-details';
import EpisodeSelector from '@/components/episode-selector';
import Footer from '@/components/footer';
import Header from '@/components/header';
import Loading from '@/components/loading';
import Modal from '@/components/modals/basic-page-modal';
import Recommendations from '@/components/recommendations';
import Trailers from '@/components/trailer';
import useEpisode from '@/hooks/use-episode';
import useTvShow from '@/hooks/use-tv-show';
import { useParams } from 'next/navigation';
import VideoPlayer from '../../components/video-player';
import Searchbar from '@/components/modals/search-bar-advanced';

const Episode: React.FC = () => {
    const params = useParams();
    const combinedId = params.episodeId;
    const formatText = (text: string) => {
        return text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with dashes
            .replace(/(^-|-$)+/g, '');  // Remove leading and trailing dashes
    };
    let seriesId = '';
    let season_number = '';
    let episode_number = '';

    // Ensure combinedId is a string before splitting
    if (typeof combinedId === 'string') {
        [seriesId, season_number, episode_number] = combinedId.split('-');
    }

    // Call the hooks with different variable names to avoid redeclaration
    const { episode, loading: episodeLoading, error: episodeError } = useEpisode(seriesId, season_number, episode_number);
    const { series, loading: seriesLoading, error: seriesError } = useTvShow(seriesId);

    if (typeof combinedId !== 'string') {
        return <div>Invalid episode ID</div>;
    }

    if (episodeLoading || seriesLoading) {
        return <Loading />;
    }

    if (episodeError || seriesError) {
        return <p>Error: {episodeError || seriesError}</p>;
    }

    if (!series) {
        return <p>Series not found</p>;
    }

    return (
        <RootLayout params={{ title: episode ? `${episode.name} | ${series.name} S-${season_number}-E-${episode_number} | Tv Show` : "Title | Movie", description: "There will be individual episode" }}>
            <main className="flex justify-center items-start">
                <Modal
                    header={<Header />}
                    footer={<Footer />}
                >
                    <CustomBreadCrumb params={{ link: `/tv-shows/${formatText(`${series.id} ${series.name}`)}/${formatText(`${seriesId} ${season_number} ${episode_number}`)}`, name: `/TV/${series.name}/${episode?.name} (Season-${episode?.season_number} Episode-${episode?.episode_number})` }} />
                    {episode && (
                        <div className='justify-center items-center flex flex-col'>
                            <Searchbar Variant='Series'/>
                            <VideoPlayer series={series} season_number={parseInt(season_number)} episode_number={parseInt(episode_number)}/>

                            <EpisodeSelector series={series} default_season={parseInt(season_number)} default_episode={parseInt(episode_number)}/>
                            {/* Ensure the Details component is imported and defined */}
                            <Details episode={episode} series={series}/>
                            <Trailers tmdbID={combinedId}  media_type="tv" />
                            <Recommendations tmdbID={series.id} media_type="tv" />
                        </div>
                    )}
                </Modal>
            </main>
        </RootLayout>
    );
}

export default Episode;
