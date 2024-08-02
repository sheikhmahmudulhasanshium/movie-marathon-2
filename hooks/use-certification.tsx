import { useState, useEffect } from 'react';
import axios from 'axios';
import { Certification, CertificationsResponse } from '@/components/type';

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY; // Ensure this is set
const CERTIFICATION_URL = `https://api.themoviedb.org/3/certification/movie/list?api_key=${API_KEY}`;

const useMovieCertifications = () => {
    const [certifications, setCertifications] = useState<Record<string, Certification[]> | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchCertifications = async () => {
            try {
                const response = await axios.get<CertificationsResponse>(CERTIFICATION_URL);
                setCertifications(response.data.certifications);
            } catch (err) {
                setError('Failed to fetch certifications.');
            } finally {
                setLoading(false);
            }
        };

        fetchCertifications();
    }, []);

    return { certifications, error, loading };
};

export default useMovieCertifications;
