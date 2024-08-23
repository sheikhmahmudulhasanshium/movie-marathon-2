import React from 'react';
import { Building, Building2, Globe2, List, MapPin, NotepadTextDashed } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { CompanyData } from '@/components/type';

const Description: React.FC<{ company: CompanyData }> = ({ company }) => {
    return (
        <div className="w-full bg-primary-foreground p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                    <div>
                        <div className="text-2xl font-semibold mb-2 flex gap-2 items-center">
                            <List className="text-blue-600" />
                            <p>Alternative Titles</p>
                        </div>
                        <ul className="list-disc pl-5 space-y-2">
                            {company.alternative_names.results.length > 0 ? (
                                company.alternative_names.results.map((name, index) => (
                                    <li key={index} className="text-lg">{name.name}</li>
                                ))
                            ) : (
                                <li className="text-lg">No alternative titles available</li>
                            )}
                        </ul>
                    </div>
                    {company.description && (
                        <div className="flex flex-col text-justify">
                            <div className='flex items-center mb-3 gap-2'>
                                <NotepadTextDashed  className="text-blue-600" />
                                <p className="text-2xl  font-semibold ">Description:</p></div>
                            <p>{company.description}</p>
                        </div>
                    )}
                </div>
                {/* Right Column */}
                <div className="space-y-6">
                    <div className="flex items-center">
                        <Building className="mr-3 text-blue-600" />
                        <div>
                            <h3 className="text-xl font-semibold">Company:</h3>
                            <p>{company.name}</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <MapPin className="mr-3 text-blue-600" />
                        <div>
                            <h3 className="text-xl font-semibold">Headquarter:</h3>
                            <p>{company.headquarters}</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <Globe2 className="mr-3 text-blue-600" />
                        <div>
                            <h3 className="text-xl font-semibold">Website:</h3>
                            <Link 
                                href={company.homepage}
                                className="text-blue-500 hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {company.homepage}
                            </Link>
                        </div>
                    </div>
                    {company.parent_company && (
                        <div className="flex items-center">
                            <Building2 className="mr-3 text-blue-600" />
                            <div>
                                <h3 className="text-xl font-semibold">Parent Company:</h3>
                                <p>{company.parent_company}</p>
                            </div>
                        </div>
                    )}
                    <div className="flex items-center gap-2">
                        <p className="text-xl font-semibold ml-8">Origin Country:</p>
                        <Link href={`/countries/${company.origin_country}`}>
                            <Image
                                src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${company.origin_country}.svg`}
                                alt={company.origin_country}
                                height={20}
                                width={30}
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Description;
