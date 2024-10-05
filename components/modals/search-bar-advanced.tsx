import { useState } from 'react';
import { TextSearch, TriangleAlert, ArrowBigRight, Ellipsis, Search } from 'lucide-react';
import { Cross2Icon } from '@radix-ui/react-icons';
import useSearch from '@/hooks/use-search-2';
import { CompanyData, Country, Genre, Keyword, Movie, PersonDetailsResponse, TVShow } from '../type';
import Link from 'next/link';
import FormatLink from '@/lib/format-link';
import Image from 'next/image';
import NoImage from '../../public/Designer.png';
import { Button } from '../ui/button';

interface SearchbarProps {
    Variant: "Keyword" | "Movie" | "Series" | "Person" | "Country" | "Genre" | "Company" | "All";
}

const SeeMoreButton = ({ Variant, searchKey }: { Variant: "Keyword" | "Movie" | "Series" | "Person" | "Country" | "Genre" | "Company" | "All", searchKey: string }) => {
    return (
        <Button variant="link">
            <Link href={`/search?v=${Variant}&q=${searchKey}`}>
                See More
            </Link>
        </Button>
    );
};


const SearchResults = ({ data, loading, error = '', Variant, searchKey = '' }: { data: any, loading: boolean, error?: string, Variant: string, searchKey: string }) => {
    if (data.length > 0 && searchKey.length > 0 && loading) {
        return (
            <div className='w-full py-2 bg-white flex gap-2 items-center px-4 text-lg'>
                <p>Please Wait</p>
                <Ellipsis className='animate-ping' />
            </div>
        );
    }

    if (error) {
        return (
            <div className='w-full py-2 bg-white flex gap-2 items-center px-4 text-lg'>
                <TriangleAlert className='text-red-500' />
                <p>{error}</p>
            </div>
        );
    }

    if (searchKey.length > 0 && data.length === 0) {
        return (
            <div className='w-full py-2 bg-white flex gap-2 items-center px-4 text-lg'>
                <TriangleAlert className='text-red-500' />
                <p>No Result Found.</p>
            </div>
        );
    }

    switch (Variant) {
        case "All":
            return (
                (searchKey.length > 0) ? (
                    <div className='w-full py-2 bg-white flex flex-col px-4 text-lg z-50 max-h-[40vh] overflow-y-auto rounded-lg gap-1'>
                        {data.map((item: any) => {
                            const name = item.name || item.title || item.english_name;
                            if (!name) {
                                console.error(`Item with ID ${item.id} has no name or title.`);
                                return null; 
                            }
                            return (
                                <Link href={FormatLink(item.id, name, item.source)} key={item.id} className='flex w-full px-1 gap-2 items-center hover:border justify-between'>
                                    <div className='flex gap-2 items-center w-8/12 justify-start'>
                                        {item.logo_path || item.profile_path || item.backdrop_path || item.poster_path
                                            ? <Image src={`https://media.themoviedb.org/t/p/w185${item.logo_path || item.profile_path || item.backdrop_path || item.poster_path}`} alt={name} height={20} width={30} />
                                            : item.iso_3166_1 ? <Image src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${item.iso_3166_1}.svg`} alt={item.english_name} height={20} width={30} />
                                            : <Image src={NoImage} alt={''} height={30} width={30} quality={100} />}
                                        <p>{name}</p>
                                    </div>
                                    <div className='flex gap-2 items-center w-4/12 justify-end'>
                                        <p className='pl-4 text-sm'> from {item.source}</p>
                                        <ArrowBigRight className='text-end' />
                                    </div>
                                </Link>
                            );
                        })} 
                        <SeeMoreButton Variant={Variant} searchKey={searchKey}/>

                    </div>
                ) : ''
            );

        case "Company":
            return (
                (searchKey.length > 0) ? (
                    <div className='w-full py-2 bg-white flex flex-col px-4 text-lg z-50 max-h-[40vh] overflow-y-auto rounded-lg gap-1'>
                        {data.map((company: CompanyData) => {
                            const name = company.name;
                            if (!name) {
                                console.error(`Company with ID ${company.id} has no name.`);
                                return null;  
                            }
                            return (
                                <Link href={FormatLink(company.id, name, Variant)} key={company.id} className='flex w-full px-1 gap-2 items-center hover:border justify-between'>
                                    <div className='flex gap-2 items-center w-8/12 justify-start'>
                                        {company.logo_path
                                            ? <Image src={`https://media.themoviedb.org/t/p/w185${company.logo_path}`} alt={name} height={20} width={30} />
                                            : <Image src={NoImage} alt={''} height={30} width={30} quality={100} />}
                                        <p>{name}</p>
                                    </div>
                                    <div className='flex gap-2 items-center w-4/12 justify-end'>
                                        <p className='pl-4 text-sm'> from {Variant}</p>
                                        <ArrowBigRight className='text-end' />
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                ) : ''
            );

        case "Movie":
            return (
                (searchKey.length > 0) ? (
                    <div className='w-full py-2 bg-white flex flex-col px-4 text-lg z-50 max-h-[40vh] overflow-y-auto rounded-lg gap-1'>
                        {data.map((movie: Movie) => {
                            const name = movie.title;
                            if (!name) {
                                console.error(`Movie with ID ${movie.id} has no title.`);
                                return null; 
                            }
                            return (
                                <Link href={FormatLink(movie.id, name, Variant)} key={movie.id} className='flex w-full px-1 gap-2 items-center hover:border justify-between'>
                                    <div className='flex gap-2 items-center w-8/12 justify-start'>
                                        {movie.poster_path || movie.backdrop_path
                                            ? <Image src={`https://media.themoviedb.org/t/p/w185${movie.poster_path || movie.backdrop_path}`} alt={name} height={20} width={30} />
                                            : <Image src={NoImage} alt={''} height={30} width={30} quality={100} />}
                                        <p>{name}</p>
                                    </div>
                                    <div className='flex gap-2 items-center w-4/12 justify-end'>
                                        <p className='pl-4 text-sm'> from {Variant}</p>
                                        <ArrowBigRight className='text-end' />
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                ) : ''
            );

        case "Series":
            return (
                (searchKey.length > 0) ? (
                    <div className='w-full py-2 bg-white flex flex-col px-4 text-lg z-50 max-h-[40vh] overflow-y-auto rounded-lg gap-1'>
                        {data.map((series: TVShow) => {
                            const name = series.name;
                            if (!name) {
                                console.error(`Series with ID ${series.id} has no name.`);
                                return null; 
                            }
                            return (
                                <Link href={FormatLink(series.id, name, Variant)} key={series.id} className='flex w-full px-1 gap-2 items-center hover:border justify-between'>
                                    <div className='flex gap-2 items-center w-8/12 justify-start'>
                                        {series.poster_path || series.backdrop_path
                                            ? <Image src={`https://media.themoviedb.org/t/p/w185${series.poster_path || series.backdrop_path}`} alt={name} height={20} width={30} />
                                            : <Image src={NoImage} alt={''} height={30} width={30} quality={100} />}
                                        <p>{name}</p>
                                    </div>
                                    <div className='flex gap-2 items-center w-4/12 justify-end'>
                                        <p className='pl-4 text-sm'> from {Variant}</p>
                                        <ArrowBigRight className='text-end' />
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                ) : ''
            );

        case "Person":
            return (
                (searchKey.length > 0) ? (
                    <div className='w-full py-2 bg-white flex flex-col px-4 text-lg z-50 max-h-[40vh] overflow-y-auto rounded-lg gap-1'>
                        {data.map((person: PersonDetailsResponse) => {
                            const name = person.name;
                            if (!name) {
                                console.error(`Person with ID ${person.id} has no name.`);
                                return null;  
                            }
                            return (
                                <Link href={FormatLink(person.id, name, Variant)} key={person.id} className='flex w-full px-1 gap-2 items-center hover:border justify-between'>
                                    <div className='flex gap-2 items-center w-8/12 justify-start'>
                                        {person.profile_path
                                            ? <Image src={`https://media.themoviedb.org/t/p/w185${person.profile_path}`} alt={name} height={20} width={30} />
                                            : <Image src={NoImage} alt={''} height={30} width={30} quality={100} />}
                                        <p>{name}</p>
                                    </div>
                                    <div className='flex gap-2 items-center w-4/12 justify-end'>
                                        <p className='pl-4 text-sm'> from {Variant}</p>
                                        <ArrowBigRight className='text-end' />
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                ) : ''
            );

        case "Genre":
            return (
                (searchKey.length > 0) ? (
                    <div className='w-full py-2 bg-white flex flex-col px-4 text-lg z-50 max-h-[40vh] overflow-y-auto rounded-lg gap-1'>
                        {data.map((genre: Genre) => {
                            const name = genre.name;
                            if (!name) {
                                console.error(`Genre with ID ${genre.id} has no name.`);
                                return null; 
                            }
                            return (
                                <Link href={FormatLink(genre.id, name, Variant)} key={genre.id} className='flex w-full px-1 gap-2 items-center hover:border justify-between'>
                                    <div className='flex gap-2 items-center w-8/12 justify-start'>
                                        <p>{name}</p>
                                    </div>
                                    <div className='flex gap-2 items-center w-4/12 justify-end'>
                                        <p className='pl-4 text-sm'> from {Variant}</p>
                                        <ArrowBigRight className='text-end' />
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                ) : ''
            );

        case "Keyword":
            return (
                (searchKey.length > 0) ? (
                    <div className='w-full py-2 bg-white flex flex-col px-4 text-lg z-50 max-h-[40vh] overflow-y-auto rounded-lg gap-1'>
                        {data.map((keyword: Keyword) => {
                            const name = keyword.name;
                            if (!name) {
                                console.error(`Keyword with ID ${keyword.id} has no name.`);
                                return null; 
                            }
                            return (
                                <Link href={FormatLink(keyword.id, name, Variant)} key={keyword.id} className='flex w-full px-1 gap-2 items-center hover:border justify-between'>
                                    <div className='flex gap-2 items-center w-8/12 justify-start'>
                                        <TextSearch />
                                        <p>{name}</p>
                                    </div>
                                    <div className='flex gap-2 items-center w-4/12 justify-end'>
                                        <p className='pl-4 text-sm'> from {Variant}</p>
                                        <ArrowBigRight className='text-end' />
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                ) : ''
            );

        case "Country":
            return (
                (searchKey.length > 0) ? (
                    <div className='w-full py-2 bg-white flex flex-col px-4 text-lg z-50 max-h-[40vh] overflow-y-auto rounded-lg gap-1'>
                        {data.map((country: Country) => {
                            const name = country.english_name;
                            if (!name) {
                                console.error(`Country with ID ${country.iso_3166_1} has no name.`);
                                return null; 
                            }
                            return (
                                <Link href={FormatLink(country.iso_3166_1, name, Variant)} key={country.iso_3166_1} className='flex w-full px-1 gap-2 items-center hover:border justify-between'>
                                    <div className='flex gap-2 items-center w-8/12 justify-start'>
                                        <Image src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${country.iso_3166_1}.svg`} alt={country.english_name} height={20} width={30} />
                                        <p>{name}</p>
                                    </div>
                                    <div className='flex gap-2 items-center w-4/12 justify-end'>
                                        <p className='pl-4 text-sm'> from {Variant}</p>
                                        <ArrowBigRight className='text-end' />
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                ) : ''
            );

        default:
            return null; 
    }
};

const Searchbar = ({ Variant }: SearchbarProps) => {
    const [searchKey, setSearchKey] = useState<string>("");
    const { data, loading, error } = useSearch(searchKey, Variant);

    return (
        <div className="text-2xl flex flex-col items-center justify-center relative">
            <div className="grid items-center grid-cols-12 bg-cyan-950 my-12 rounded-xl border-2 justify-between mx-8 sm:mx-8 md:mx-12 lg:mx-24 w-full">
                <input
                    type="text"
                    value={searchKey}
                    onChange={(e) => setSearchKey(e.target.value)}
                    placeholder={`Search ${Variant}...`}
                    className="border-0 hover:border-0 py-4 pl-4 col-span-10 rounded-l-xl"
                    aria-label={`Search ${Variant}`}
                />
                <button
                    type="button"
                    className="col-span-2 flex justify-center items-center text-primary-foreground dark:text-secondary-foreground gap-4"
                    aria-label={searchKey.length > 0 ? "Clear search" : "Search"}
                >
                    {searchKey.length > 0 ? (
                        <Cross2Icon className="text-3xl scale-150" onClick={() => setSearchKey("")} />
                    ) : (
                        <Search className="text-3xl scale-150" />
                    )}
                </button>
            </div>
            <SearchResults data={data} loading={loading} error={error} Variant={Variant} searchKey={searchKey} />
        </div>
    );
};

export default Searchbar;
