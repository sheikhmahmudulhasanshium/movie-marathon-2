"use client";
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

// Hook to extract query parameters from the URL
const useQueryState = () => {
    const searchParams = useSearchParams();

    const queryState = useMemo(() => {
        const query: { [key: string]: string | null } = {};
        searchParams.forEach((value, key) => {
            query[key] = value;
        });
        return query;
    }, [searchParams]);

    console.log('Query State:', queryState);

    return queryState;
};

export default useQueryState;
