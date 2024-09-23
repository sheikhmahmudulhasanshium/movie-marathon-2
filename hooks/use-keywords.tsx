import axios from "axios";
import { useEffect, useState } from "react";

const useKeywords = (searchKey: string) => {
    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchKeywords = async () => {
            setLoading(true);
            setError(null);

            try {
                const baseUrl=`https://api.themoviedb.org/3/search/keyword?api_key=${API_KEY}&query=${searchKey}`
                const response = await axios.get(baseUrl);
                setData(response.data.results);
            } catch (error) {
                console.error(`Error fetching data for company: ${searchKey}`, error);
                
            } finally {
                setLoading(false);
            }
        };

        if (searchKey) {
            fetchKeywords();
        } else {
            setData([]); // Reset data if searchKey is empty
        }
    }, [searchKey, API_KEY]);

    return { data, loading, error };
}
 
export default useKeywords;