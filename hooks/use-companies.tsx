import { useState, useEffect } from "react";
import axios from "axios";

const useCompanies = (searchKey: string) => {
    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCompanies = async () => {
            setLoading(true);
            setError(null);

            try {
                if (!searchKey) return; // Early return if searchKey is empty

                const response = await axios.get(`https://api.themoviedb.org/3/search/company`, {
                    params: {
                        api_key: API_KEY,
                        query: searchKey,
                    },
                });
                setData(response.data.results);
            } catch (error) {
                setError(`Error fetching data: ${error}`);
                console.error(`Error fetching data for company: ${searchKey}`, error);
            } finally {
                setLoading(false);
            }
        };

        fetchCompanies();
    }, [searchKey, API_KEY]);

    return { data, loading, error };
};

export default useCompanies;
