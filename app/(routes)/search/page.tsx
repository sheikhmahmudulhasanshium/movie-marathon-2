"use client";
import RootLayout from "@/app/layout";
import CustomBreadCrumb from "@/components/custom-bread-crumb";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Modal from "@/components/modals/basic-page-modal";
import { useSearchParams } from "next/navigation";
import SearchResults from "./components/body";

const Search = () => {
    const searchParams = useSearchParams();
    const variant = searchParams.get("v") || "All";  // Default value
    const searchKey = searchParams.get("q") || "";   // Default value

    return ( 
        <RootLayout params={{ title: "Search here", description: "This is the better version of previous App" }}>
            <main className="">
                <Modal
                    header={<Header />}
                    footer={<Footer />}
                >
                    <CustomBreadCrumb params={{ link: "/search/", name: "/Search/" }} />
                    <div className="flex-col flex">
                        <SearchResults variant={variant} searchKey={searchKey} />
                    </div>
                </Modal>
            </main>
        </RootLayout>
    );
}

export default Search;
