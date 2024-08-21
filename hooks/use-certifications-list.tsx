import { useState, useEffect } from 'react';
import axios from 'axios';
import { Certification, CertificationsResponse } from '@/components/type';

const useCertificationsList = () => {
    const [certifications, setCertifications] = useState<Record<string, Certification[]> | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY; // Ensure this is set

    const MOVIE_CERTIFICATION_URL = `https://api.themoviedb.org/3/certification/movie/list?api_key=${API_KEY}`;
    const TV_CERTIFICATION_URL = `https://api.themoviedb.org/3/certification/tv/list?api_key=${API_KEY}`;

    useEffect(() => {
        const fetchCertifications = async () => {
            setLoading(true); // Start loading before fetching

            try {
                const [movieResponse, tvResponse] = await Promise.all([
                    axios.get<CertificationsResponse>(MOVIE_CERTIFICATION_URL),
                    axios.get<CertificationsResponse>(TV_CERTIFICATION_URL)
                ]);

                // Combine both certification lists
                const combinedCertifications = {
                    ...movieResponse.data.certifications,
                    ...tvResponse.data.certifications
                };

                setCertifications(combinedCertifications);
            } catch (err) {
                setError('Failed to fetch certifications.');
            } finally {
                setLoading(false);
            }
        };

        fetchCertifications();
    }, [MOVIE_CERTIFICATION_URL, TV_CERTIFICATION_URL]);

    return { certifications, error, loading };
};

export default useCertificationsList;
