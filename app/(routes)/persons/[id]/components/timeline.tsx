import React from 'react';
import SampleCard from "@/components/sample-card";
import { formatDate } from "@/lib/format-date";
import { formatTime } from "@/lib/format-time";

interface CareerTimeLineProps {
    work: {
        cast: any[];
        crew: any[];
    };
}

const CareerTimeLine: React.FC<CareerTimeLineProps> = ({ work }) => {
    const { cast, crew } = work;

    return (
        <div>
            {/* Render Cast List */}
            <div>
                <h2>Cast</h2>
                {cast.length > 0 ? (
                    <ul>
                        {cast.map((item) => (
                            <div key={item.id}>
                                <SampleCard
                                    id={item.id}
                                    title={item.title || item.name}
                                    posterPath={item.poster_path || item.backdrop_path||""}
                                    certification={"Not Rated"}
                                    releaseDate={formatDate(item.release_date || item.first_air_date ||"")}
                                    runtime={formatTime(item.runtime || item.duration || 0)}
                                    media_type={item.media_type}
                                    character={item.character}
                                />
                            </div>
                        ))}
                    </ul>
                ) : (
                    <p>No cast information available.</p>
                )}
            </div>

            {/* Render Crew List */}
            <div>
                <h2>Crew</h2>
                {crew.length > 0 ? (
                    <ul>
                        {crew.map((item) => (
                            <div key={item.id}>
                                <SampleCard
                                    id={item.id}
                                    title={item.title || item.name}
                                    posterPath={item.poster_path || item.backdrop_path||""}
                                    certification={"Not Rated"}
                                    releaseDate={formatDate(item.release_date || item.first_air_date ||"")}
                                    runtime={formatTime(item.runtime || item.duration || 0)}
                                    media_type={item.media_type}
                                    character={item.character}
                                />
                            </div>
                        ))}
                    </ul>
                ) : (
                    <p>No crew information available.</p>
                )}
            </div>

        </div>
    );
}

export default CareerTimeLine;
