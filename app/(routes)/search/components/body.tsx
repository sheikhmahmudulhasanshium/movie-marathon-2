import { Separator } from "@/components/ui/separator";
import useSearch from "@/hooks/use-search-2";
import { useState, useEffect } from "react";
import Navbar from "./navbar";
import SampleCard from "@/components/sample-card";
import { CompanyData, Country, Genre, Keyword, Movies, PersonDetailsResponse, TVShows } from "@/components/type";
import { formatDate } from "@/lib/format-date";
import ProfileCard from "../../persons/components/profile-card";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import NoImage from '../../../../public/Designer.png'

const variantOptions = ["All", "Keyword", "Movie", "Series", "Person", "Country", "Genre", "Company"] as const;
type VariantType = typeof variantOptions[number];
interface SearchResultsProps {
    SearchKey: string; 
    Variant: VariantType;   
    setVariant: (variant: VariantType) => void; 
}

const Results: React.FC<{ variant: VariantType; data: any }> = ({ variant, data }) => {
    switch (variant) {
        case "Keyword":
            return (
                <div className="w-full justify-between  gap-4 flex flex-1 flex-wrap">
                    {data.length>0?data.map((keyword:Keyword)=>(
                        <Link key={keyword.id} href={`/keyword/${keyword.id}-${keyword.name.toLowerCase().replace(/[^a-z0-9&]+/g, '-').replace(/(^-|-$)+/g, '')}`}>
                            <div className="flex gap-2 text-start bg-accent p-2 rounded-lg hover:opacity-30">
                                <p className="text-base">{keyword.name}</p>
                                <Search className="text-sm"/>
                            </div>
                        </Link>
                    )):
                    <p>No keyword found</p>
                    }
                </div>
                );
        case "Genre":
            return (
                <div className="w-full justify-between  gap-4 flex flex-1 flex-wrap">
                    {data.length>0?data.map((genre:Genre)=>(
                        <Link key={genre.id} href={`/genres/${genre.name.toLowerCase().replace(/[^a-z0-9&]+/g, '-').replace(/(^-|-$)+/g, '')}`}>
                            <div className="flex gap-2 text-start bg-accent p-2 rounded-lg hover:opacity-30">
                                <p className="text-base">{genre.name}</p>
                                <Search className="text-sm"/>
                            </div>
                        </Link>
                    )):<p>No genre Found</p>}
                </div>
                );

        case "Movie":
            return (
            <div className="w-full justify-between grid grid-cols-2 gap-4">
                {data.length>0?data.map((movie: Movies)=>(
                    <SampleCard key={movie.id} id={movie.id} title={movie.title} posterPath={movie.backdrop_path||movie.poster_path||""} certification={"Not Rated"} releaseDate={formatDate(movie.release_date)} runtime={'Runtime not available'} media_type={variant}/>
                )):
                <p>No movie Found</p>
                }
            </div>
            );
        case "Series":
            return (
                <div className="w-full justify-between grid grid-cols-2 gap-4">
                    {data.length>0?data.map((series: TVShows)=>(
                        <SampleCard key={series.id} id={series.id} title={series.name} posterPath={series.backdrop_path||series.poster_path||""} certification={"Not Rated"} releaseDate={formatDate(series.first_air_date)} runtime={"Time not available"} media_type={variant}/>
                    )):
                    <p>No series found</p>
                    }
                </div>
                );
        case "Person":
            return (
                <div className="w-full justify-between grid grid-cols-2 gap-4">
                    {data.length>0?
                        data.map((person: PersonDetailsResponse)=>(
                            <ProfileCard key={person.id} person={person}/>
                        )):
                        <p>No person found</p>
                    }
                </div>
            );
        case "Country":
            return (
                <div className="w-full justify-between grid grid-cols-2 gap-4">
                    {data.length>0?
                        data.map((country:Country)=>(
                            <Link key={country.iso_3166_1} href={`/country/${country.iso_3166_1}`}>
                                <div className="flex flex-col items-center gap-1 hover:opacity-25">
                                    <Image alt={country.english_name} src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${country.iso_3166_1}.svg`}  height={40} width={60}/>
                                    <p>{country.english_name}</p>
                                    {country.english_name!==country.native_name&&<p>({country.native_name})</p>}
                                </div>
                            </Link>
                        ))
                        :
                        <p>No country found</p>
                    }
                </div>

            );
        case "Company":
            return (
                <div className="w-full justify-between grid grid-cols-2 gap-4">
                    {data.length>0?
                        data.map((company: CompanyData)=>(
                            <Link key={company.id} href={`/companies/${company.id}`} >
                                <div className="flex flex-col items-center gap-4  hover:opacity-25 justify-center  pb-2">
                                <div className="flex justify-center items-center w-40 h-40">
                                {company.logo_path?
                                <Image
                                    src={`https://image.tmdb.org/t/p/w500${company.logo_path}`}
                                    alt={company.name}
                                    height={300}
                                    width={500}
                                    loading="lazy"
                                />:
                                <Image 
                                    src={NoImage}
                                    alt={company.name}
                                    height={500}
                                    width={500}
                                    loading="lazy"

                                />
                                }</div>
                                <p className="">{company.name}</p>

                                </div>
                            </Link>
                        )):
                        <p>No Company Found</p>
                    }
                </div>
            );
            case "All":
                return (
                    <div className="w-full justify-between grid grid-cols-2 gap-4">
                        {data.map((item: any) => {
                            switch (item.source) {
                                case "Movie":
                                    return (
                                        
                                        <SampleCard 
                                            key={item.id} 
                                            id={item.id} 
                                            title={item.displayName} 
                                            posterPath={item.poster_path || item.backdrop_path || ""} 
                                            certification={"Not Rated"} 
                                            releaseDate={formatDate(item.release_date)} 
                                            runtime={"Runtime not available"} 
                                            media_type="Movie" 
                                        />
                                    );
                                case "Series":
                                    return (
                                        <SampleCard 
                                            key={item.id} 
                                            id={item.id} 
                                            title={item.displayName} 
                                            posterPath={item.poster_path || item.backdrop_path || ""} 
                                            certification={"Not Rated"} 
                                            releaseDate={formatDate(item.first_air_date)} 
                                            runtime={"Time not available"} 
                                            media_type="Series" 
                                        />
                                    );
                                case "Person":
                                    return (
                                        <ProfileCard key={item.id} person={item} />
                                    );
                                case "Country":
                                    return (
                                        <Link key={item.iso_3166_1} href={`/country/${item.iso_3166_1}`}>
                                            <div className="flex flex-col items-center gap-1 hover:opacity-25">
                                                <Image 
                                                    alt={item.english_name} 
                                                    src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${item.iso_3166_1}.svg`}  
                                                    height={40} 
                                                    width={60}
                                                />
                                                <p>{item.english_name}</p>
                                                {item.english_name !== item.native_name && <p>({item.native_name})</p>}
                                            </div>
                                        </Link>
                                    );
                                case "Company":
                                    return (
                                        <Link key={item.id} href={`/companies/${item.id}`}>
                                            <div className="flex flex-col items-center gap-4 hover:opacity-25 justify-center pb-2">
                                                <div className="flex justify-center items-center w-40 h-40">
                                                    {item.logo_path ? (
                                                        <Image
                                                            src={`https://image.tmdb.org/t/p/w500${item.logo_path}`}
                                                            alt={item.name}
                                                            height={300}
                                                            width={500}
                                                            loading="lazy"
                                                        />
                                                    ) : (
                                                        <Image 
                                                            src={NoImage}
                                                            alt={item.name}
                                                            height={500}
                                                            width={500}
                                                            loading="lazy"
                                                        />
                                                    )}
                                                </div>
                                                <p>{item.name}</p>
                                            </div>
                                        </Link>
                                    );
                                case "Keyword":
                                    return (
                                        <Link key={item.id} href={`/keyword/${item.id}-${item.displayName.toLowerCase().replace(/[^a-z0-9&]+/g, '-').replace(/(^-|-$)+/g, '')}`}>
                                            <div className="flex gap-2 text-start bg-accent p-2 rounded-lg hover:opacity-30">
                                                <p className="text-base">{item.displayName}</p>
                                                <Search className="text-sm"/>
                                            </div>
                                        </Link>
                                    );
                                case "Genre":
                                    return (
                                        <Link key={item.id} href={`/genres/${item.displayName.toLowerCase().replace(/[^a-z0-9&]+/g, '-').replace(/(^-|-$)+/g, '')}`}>
                                            <div className="flex gap-2 text-start bg-accent p-2 rounded-lg hover:opacity-30">
                                                <p className="text-base">{item.displayName}</p>
                                                <Search className="text-sm"/>
                                            </div>
                                        </Link>
                                    );
                                default:
                                    return null;
                            }
                        })}
                    </div>
                );
            
        default:
            return <div>No results available.</div>;
    }
};

const SearchResults: React.FC<SearchResultsProps> = ({ SearchKey, Variant, setVariant }) => {
    const [activeOption, setActiveOption] = useState<VariantType>(Variant); 
    const { loading, error, data, source } = useSearch(SearchKey, activeOption);

    useEffect(() => {
        setActiveOption(Variant);
    }, [Variant]);

    return ( 
        <div className="flex flex-col justify-between w-full p-6">
            <Navbar 
                activeOption={activeOption} 
                onSelect={(newVariant) => {
                    setActiveOption(newVariant as VariantType); 
                    setVariant(newVariant as VariantType); 
                }} 
            />
            <Separator className="my-4 border-gray-300" />
            <div className="flex flex-col justify-between w-full">
                {loading&&<p>Extracting Data...</p>}
                {error&&<p>{error}</p>}
                {!loading && !error && data && (
                    <>
                        <div className="flex gap-2 text-xl font-sans font-light"><p className="mb-4">Showing results from {source?source:"All"}</p><p>:</p></div>
                        <Results variant={activeOption} data={data} />
                    </>
                )}
            </div>
        </div>
    );
};

export default SearchResults;
