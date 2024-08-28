import axios from "axios";
import { PersonDetailsResponse } from "@/components/type";
import { useEffect, useState } from "react";


export interface PeopleResponse {
    page: number;
    results: PersonDetailsResponse[];
    total_pages: number;
    total_results: number;
}

const useCelebList = (pageNumber: number) => {
    const [data, setData] = useState<PeopleResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCelebs = async () => {
            setLoading(true);
            try {
                const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
                const BASE_URL = `https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}&page=${pageNumber}`;
                const response = await axios.get<PeopleResponse>(BASE_URL);
                setData(response.data);
            } catch (err) {
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchCelebs();
    }, [pageNumber]);

    return { data, loading, error };
};

export default useCelebList;