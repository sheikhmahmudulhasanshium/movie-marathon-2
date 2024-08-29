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
              {cast.map((member, index) => (
                <li key={index}>
                  <p><strong>Character:</strong> {member.character}</p>
                  <p>{member.media_type}</p>
                  <p>{member.air_date}</p>
                  <p>{member.poster_path}</p>
                  <p>{member.name}</p>
                  <p>{member.title}</p>
                  <p>{member.release_date}</p>
                  <p>{member.first_air_date}</p>
                </li>
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
              {crew.map((member, index) => (
                <li key={index}>
                  <p><strong>Job:</strong> {member.job}</p>
                  <p>{member.media_type}</p>
                  <p>{member.air_date}</p>
                  <p>{member.poster_path}</p>
                </li>
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
  