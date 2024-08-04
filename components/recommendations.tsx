import React from 'react';
import useRecommendations from '@/hooks/use-recommendations';
import SampleCard from '@/components/sample-card';

interface RecommendationsProps {
    tmdbID: number;
    media_type: 'movie'|'tv';
}

const Recommendations: React.FC<RecommendationsProps> = ({ tmdbID, media_type }) => {
    const { recommendations, loading, error } = useRecommendations(tmdbID.toString(), media_type);

    if (loading) return <p>Loading recommendations...</p>;
    if (error) return <p>Error loading recommendations: {error}</p>;

    return (
        <div className='flex flex-col justify-between my-6 w-10/12'>
                <p className='text-start font-bold text-3xl py-4 pl-4'>You May Like</p>
                <div className="grid p-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 shadow-lg shadow-accent-foreground">
                    {recommendations && recommendations.length > 0 ? (
                        recommendations.map((reccommendation) => (
                            <SampleCard
                                key={reccommendation.id}
                                id={reccommendation.id}
                                title={reccommendation.title}
                                posterPath={reccommendation.poster_path}
                                certification={reccommendation.certification || 'Not Rated'}
                                releaseDate={reccommendation.formatted_release_date}
                                runtime={reccommendation.formatted_runtime || 'N/A'}
                                media_type={reccommendation.media_type || 'N/A'}

                            />
                        )

                    )
                    ) : (
                        <p>No recommendations available.</p>
                    )}
                </div>
        </div>
    );
};

export default Recommendations;
