"use client";

import RootLayout from "@/app/layout";
import CustomBreadCrumb from "@/components/custom-bread-crumb";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Modal from "@/components/modals/basic-page-modal";
import Body from "./components/body";
import { useOrigin } from "@/hooks/use-origin";
import Loading from "@/components/loading";
import { useState } from "react";
import Navbar from "./components/nav-bar";
import CountryList from "./components/country-list";

const Page = () => {
    const origin = useOrigin();
    const [selectedOption, setSelectedOption] = useState<string>("All");

    if (!origin) {
        return <Loading />;
    }

    return (
        <RootLayout params={{ title: "Explore Country", description: "Explore Coutries from here" }}>
            <main className="">
                <Modal
                    header={<Header />}
                    footer={<Footer />}
                >
                    <Navbar onOptionSelect={setSelectedOption} />
                    <CustomBreadCrumb params={{ link: "/country/", name: '/Country' }} />
                    <Body selectedOption={selectedOption} />
                    <CountryList/>
                </Modal>
            </main>
        </RootLayout>
    );
}

export default Page;
