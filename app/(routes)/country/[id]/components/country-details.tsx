import React from 'react';
import useCountryDetails from "@/hooks/use-country-details";
import { Flag, Users, Globe, DollarSign, Clock, Code, BarChart2, MapPinned, Car, WholeWord, LandPlot, Languages, TrafficCone, Earth, EarthLock, ShieldEllipsis, Landmark } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CountryDetailsProps {
    id: string;
}

function decodePostalCode(format: string | undefined, regex: string | undefined): string {
    if (!format || !regex) return 'N/A';

    const samplePostalCode = format.replace(/#/g, () => Math.floor(Math.random() * 10).toString());
    const postalCodeRegex = new RegExp(regex);
    return postalCodeRegex.test(samplePostalCode) ? samplePostalCode : 'N/A';
}

const DetailItem: React.FC<{ icon: React.ReactNode; label: string; children: React.ReactNode }> = ({ icon, label, children }) => (
    <p className="flex items-center mb-2 gap-2">
        {icon} <strong className="mr-2">{label}:</strong> {children}
    </p>
);

const CountryDetails: React.FC<CountryDetailsProps> = ({ id }) => {
    const { data, loading, error, borders } = useCountryDetails(id);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    if (!data) {
        return <div>No country found.</div>;
    }

    return (
        <div id="details" className="flex flex-col items-center w-full my-4 shadow-lg p-4 rounded-lg">
            <Image src={data.flags.png} alt={`Flag of ${data.name.common}`} className="mb-4 animate-pulse" width={360} height={240} quality={100} />
            <p className="text-2xl font-bold mb-4">{data.name.common}</p>

            <div className="text-left space-y-2">
                <DetailItem icon={<Flag />} label="Official Name">{data.name.official}</DetailItem>
                <DetailItem icon={<Landmark />} label="Capital">{data.capital.join(', ')}</DetailItem>
                <DetailItem icon={<Users />} label="Population">{data.population.toLocaleString()}</DetailItem>
                <DetailItem icon={<LandPlot />} label="Area">{data.area.toLocaleString()} km<sup>2</sup></DetailItem>
                <DetailItem icon={<Earth />} label="Region">{data.region}</DetailItem>
                <DetailItem icon={<EarthLock />} label="Subregion">{data.subregion}</DetailItem>
                
                <DetailItem icon={<Globe />} label="Top Level Domain">{data.tld?.join(', ') || 'N/A'}</DetailItem>
                <DetailItem icon={<Languages />} label="Languages">{Object.values(data.languages || {}).join(', ')}</DetailItem>
                <DetailItem icon={<DollarSign />} label="Currencies">{Object.values(data.currencies || {}).map(currency => `${currency.name} (${currency.symbol})`).join(', ')}</DetailItem>
                <DetailItem icon={<Clock />} label="Timezones">
                    <div className='flex flex-wrap'>{data.timezones && data.timezones.length > 0 
                        ? data.timezones.join(', ') 
                        : 'N/A'}</div>
                </DetailItem>
                <DetailItem icon={<Code />} label="Postal Code">
                    {decodePostalCode(data.postalCode?.format, data.postalCode?.regex)}
                </DetailItem>
                <DetailItem icon={<BarChart2 />} label="Gini Index">
                    {data.gini ? (
                        <>
                            {Object.entries(data.gini).map(([year, value]) => (
                                <div key={year}>
                                    {year}: {value}
                                </div>
                            ))}
                        </>
                    ) : (
                        'No Gini index data available'
                    )}
                </DetailItem>
                <DetailItem icon={<Globe />} label="FIFA Code">{data.fifa}</DetailItem>
                <DetailItem icon={<Car />} label="Driving Side">{data.car?.side}</DetailItem>
                <DetailItem icon={<WholeWord />} label="Demonyms">{data.demonyms?.eng.m}, {data.demonyms?.eng.f}</DetailItem>

                <DetailItem icon={<MapPinned />} label="Borders">
                    {borders.length > 0 ? (
                        <div className="flex flex-wrap gap-2 ">
                            {borders.map((borderCountry) => (
                                <Link href={`/country/${borderCountry.cca2}`} key={borderCountry.name.common} className="flex flex-wrap">
                                    <div className='flex-col  items-center flex-wrap w-full justify-center'>
                                        <Image src={borderCountry.flags.png} alt={`Flag of ${borderCountry.name.common}`} width={50} height={50} className="border" />
                                        {borderCountry.name.common}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        'No borders'
                    )}
                </DetailItem>

                <DetailItem icon={<MapPinned />} label="Google Maps">
                    {data.maps?.googleMaps ? (
                        <Link href={data.maps.googleMaps} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline hover:text-blue-700">
                            View on Google Maps
                        </Link>
                    ) : (
                        'N/A'
                    )}
                </DetailItem>
                <DetailItem icon={<TrafficCone />} label="OpenStreetMap">
                    {data.maps?.openStreetMaps ? (
                        <Link href={data.maps.openStreetMaps} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline hover:text-blue-700">
                            View on OpenStreetMap
                        </Link>
                    ) : (
                        'N/A'
                    )}
                </DetailItem>
                {data.coatOfArms && (
                    <DetailItem icon={<ShieldEllipsis />} label={`Coat of Arms`}>
                        <Image src={data.coatOfArms.png} alt={`Coat of Arms of ${data.name.common}`} height={60} width={90} />
                    </DetailItem>
                )}
            </div>
        </div>
    );
};

export default CountryDetails;
