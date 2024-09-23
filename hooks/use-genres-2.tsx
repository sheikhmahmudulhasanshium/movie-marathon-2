import useGenreList from "./use-genre-list";

const useGenres = (searchKey: string) => {
    const { combinedGenres, movieGenres, tvGenres, error, loading } = useGenreList();

    // Filter combined genres based on searchKey
    const matchingCombinedGenres = combinedGenres.filter(genre => 
        genre.name.toLowerCase().includes(searchKey.toLowerCase())
    );

    // Fallback to matching movie or TV genres if no combined matches
    let matchingGenres = [];

    if (matchingCombinedGenres.length > 0) {
        matchingGenres = matchingCombinedGenres;
    } else {
        const matchingMovies = movieGenres.filter(genre => 
            genre.name.toLowerCase().includes(searchKey.toLowerCase())
        );

        const matchingTV = tvGenres.filter(genre => 
            genre.name.toLowerCase().includes(searchKey.toLowerCase())
        );

        matchingGenres = [...matchingMovies, ...matchingTV];
    }

    // Prepare the output data
    const outputData = matchingGenres;

    return {
        data: outputData,
        loading,
        error,
    };
};

export default useGenres;
