"use client";
import { useEffect, useState } from 'react';
import SearchResults from "./components/body";
import Searchbar from "@/components/modals/search-bar-advanced";
import RootLayout from '@/app/layout';
import Modal from '@/components/modals/basic-page-modal';
import Header from '@/components/header';
import Footer from '@/components/footer';
import TTS from './chat-bot/body';

const variantOptions = ["All", "Keyword", "Movie", "Series", "Person", "Country", "Genre", "Company"] as const;
type VariantType = typeof variantOptions[number];

const Search = () => {
    const [variant, setVariant] = useState<VariantType>("All");
    const [searchKey, setSearchKey] = useState<string>("");

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const variantParam = searchParams.get("v") as VariantType;
        const searchKeyParam = searchParams.get("q") || "";

        if (variantOptions.includes(variantParam)) {
            setVariant(variantParam);
        }
        setSearchKey(searchKeyParam);
    }, []);

    return ( 
        <RootLayout params={{ title: "Search Here", description: "This is the better version of previous App" }}>
            <main className="">
                <Modal
                    header={<Header />}
                    footer={<Footer />}
                >
                    <div className="flex w-full justify-center">
                        <div className='flex flex-col justify-center items-center w-10/12 gap-2'>
                            <Searchbar Variant={variant} />
                            <TTS/>
                            <SearchResults Variant={variant} SearchKey={searchKey} setVariant={setVariant} />
                        </div>
                    </div>
                </Modal>
            </main>
        </RootLayout>
    );
}

export default Search;
