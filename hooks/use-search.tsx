const useSearch = (searchKey: string) => {
    const sampleRandomData = ["Iron-Man Movie", "Robert Downey Jr. Person", "Better Call Saul Movie"];
//https://api.themoviedb.org/3/search/person?api_key=ae3eb3a99ccb14980e0c79853ecea515&query=Tom%2520Cruise
    const formattedSearchKey = searchKey.toLowerCase();
    const filteredData = sampleRandomData.filter(item =>
        item.toLowerCase().includes(formattedSearchKey)
    );

    return;
}
 
export default useSearch;