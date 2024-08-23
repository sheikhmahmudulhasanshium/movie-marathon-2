import { useState } from 'react';
import useCompanyList from "@/hooks/use-company-list";
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const CompanyList = () => {
    const { companyList, companyData, famousCompanyData } = useCompanyList();
    const [showAll, setShowAll] = useState(false);

    // Log company data for debugging
    //console.log('Company List:', companyList);
    //console.log('Company Data:', companyData);
    //console.log('Famous Company Data:', famousCompanyData);

    // Determine which companies to display
    const companiesToDisplay = showAll ? companyData : famousCompanyData;

    return (
        <div id="explore-company" className="flex flex-col items-center py-12 bg-gray-50 min-h-screen">
            <div className="flex flex-col w-full max-w-6xl px-4">
                <h1 className="text-3xl font-bold mb-8  text-gray-800 text-start pl-8">Explore Companies</h1>
                <div className="mt-4">
                    {companiesToDisplay.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {companiesToDisplay.map((company) => (
                                <Link 
                                    href={`/companies/${company.id}`} 
                                    key={company.id} 
                                    className="flex items-center space-x-4 p-4 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
                                >
                                    {company.logo_path && (
                                        <div className="w-24 h-24 flex-shrink-0">
                                            <Image
                                                src={`https://image.tmdb.org/t/p/w300${company.logo_path}`}
                                                alt={`${company.name} Logo`}
                                                className="w-full h-full object-contain"
                                                height={100}
                                                width={100}
                                            />
                                        </div>
                                    )}
                                    <div className="flex flex-col">
                                        <p className="text-lg font-semibold text-gray-800">{company.name}</p>
                                        <p className="text-sm text-gray-600">{company.origin_country}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center">No company data available.</p>
                    )}
                    {companyData.length > famousCompanyData.length && (
                        <Button
                            variant='outline'
                            onClick={() => setShowAll(prev => !prev)}
                            className="mt-8 px-4 py-2 bg-blue-500 text-white"
                        >
                            {showAll ? 'Show Less' : 'Show More'}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CompanyList;
