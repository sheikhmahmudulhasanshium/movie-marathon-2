import { useState, useEffect } from 'react';
import axios from 'axios';
import { famousCompanyList, productionCompanies } from "@/lib/company-list";
import { CompanyData } from '@/components/type';

// API key for TMDb (replace with your own)
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY as string;

// Define the structure of the API response for companies
interface CompanySearchResponse {
  page: number;
  results: CompanyData[];
  total_pages: number;
  total_results: number;
}

// Define the function to fetch company data
const fetchCompanyData = async (companyName: string): Promise<CompanySearchResponse | null> => {
  try {
    const response = await axios.get<CompanySearchResponse>(`https://api.themoviedb.org/3/search/company`, {
      params: {
        query: companyName,
        page: 1,
        api_key: API_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data for company: ${companyName}`, error);
    return null;
  }
};


const useCompanyList = () => {
  const [companyList, setCompanyList] = useState<string[]>([]);
  const [companyData, setCompanyData] = useState<CompanyData[]>([]);
  const [famousCompanyData, setFamousCompanyData] = useState<CompanyData[]>([]);

  useEffect(() => {
    // Extract unique company names from productionCompanies list
    const uniqueCompanyNames = Array.from(new Set(productionCompanies));

    // Fetch data for each company
    const fetchAllCompanyData = async () => {
      const dataPromises = uniqueCompanyNames.map((name: string) => fetchCompanyData(name));
      const results = await Promise.all(dataPromises);

      const validResults = results.filter((data): data is CompanySearchResponse => data !== null);

      const combinedData: CompanyData[] = validResults.flatMap(data => data.results);

      // Remove duplicates by company ID and sort by company name
      const uniqueData = Array.from(
        new Map(combinedData.map(company => [company.id, company])).values()
      );

      const sortedData = uniqueData.sort((a, b) => a.name.localeCompare(b.name));

      setCompanyData(sortedData);
    };

    // Fetch famous company data
    const fetchFamousCompanyData = async () => {
      const famousCompanyMap = new Map<string, CompanyData>();

      const dataPromises = famousCompanyList.map(async (name: string) => {
        const response = await fetchCompanyData(name);
        if (response && response.results.length > 0) {
          famousCompanyMap.set(name, response.results[0]);
        }
      });

      await Promise.all(dataPromises);

      const uniqueData = Array.from(famousCompanyMap.values());
      const sortedData = uniqueData.sort((a, b) => a.name.localeCompare(b.name));

      setFamousCompanyData(sortedData);
    };

    fetchAllCompanyData();
    fetchFamousCompanyData();

    setCompanyList(uniqueCompanyNames);
  }, []);

  return { companyList, companyData, famousCompanyData };
};

export default useCompanyList;
