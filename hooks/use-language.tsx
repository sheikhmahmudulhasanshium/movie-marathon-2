import { useState, useEffect } from 'react';
import axios from 'axios';
import { Language, LanguageMap } from '@/components/type';

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const LANGUAGE_URL = `https://api.themoviedb.org/3/configuration/languages?api_key=${API_KEY}`;

// Helper function to create a language mapping
const createLanguageMapping = (languages: Language[] | null): LanguageMap => {
    const languageMap: LanguageMap = {};
    if (Array.isArray(languages)) {
        languages.forEach(lang => {
            const displayName = lang.name ? `${lang.english_name} (${lang.name})` : lang.english_name;
            languageMap[lang.iso_639_1] = displayName;
        });
    } else {
        console.warn('Provided languages data is not an array');
    }
    return languageMap;
};

const useMovieLanguages = () => {
    const [languages, setLanguages] = useState<Language[] | null>(null);
    const [languageMap, setLanguageMap] = useState<LanguageMap>({});
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchLanguages = async () => {
            try {
                const response = await axios.get<Language[]>(LANGUAGE_URL);

                // Log the entire response for debugging
                //console.log('Full API Response:', response.data);

                // Directly use the response data if it's an array
                const fetchedLanguages = response.data;
                if (!Array.isArray(fetchedLanguages)) {
                    throw new Error('Fetched languages data is not an array');
                }

                setLanguages(fetchedLanguages);
                setLanguageMap(createLanguageMapping(fetchedLanguages));
            } catch (err) {
                console.error('Error fetching languages:', err);
                setError('Failed to fetch languages.');
            } finally {
                setLoading(false);
            }
        };

        fetchLanguages();
    }, []);

    return { languages, languageMap, error, loading };
};

export default useMovieLanguages;
