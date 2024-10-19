"use client"

import RootLayout from "@/app/layout";
import CustomBreadCrumb from "@/components/custom-bread-crumb";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Modal from "@/components/modals/basic-page-modal";
import Loading from "@/components/loading";
import { useParams } from "next/navigation";
import useCountriesList from "@/hooks/use-countries-list";
import Navbar from "./components/nav-bar";
import Body from "./components/body";
import CountryList from "../components/country-list";

const Country = () => {
    const params = useParams();
    const countryCode = params.id as string;

    const { countries, famousCountries, loading, error } = useCountriesList();

    // Find the country data in famousCountries
    let countryData = famousCountries.find(country => country.iso_3166_1 === countryCode);

    // If not found in famousCountries, check in countries
    if (!countryData) {
        countryData = countries.find(country => country.iso_3166_1 === countryCode);
    }

    // Handle loading state
    if (loading) {
        return <Loading />;
    }

    // Handle error state
    if (error) {
        return <div>{error}</div>;
    }

    // Handle case where countryCode is not found in either list
    if (!countryData) {
        return <div>No data available for this country.</div>;
    }

    return (
        <RootLayout params={{ title: countryData.native_name === countryData.english_name ? `${countryData.english_name} (${countryData.native_name}) | Country` : `${countryData.english_name} | Country`, description: "Explore Coutries from here" }}>
            <main className="">
                <Modal
                    header={<Header />}
                    footer={<Footer />}
                >
                    <Navbar />
                    <CustomBreadCrumb params={{ link: `/country/${countryData.iso_3166_1}`, name: `/Country/${countryData.english_name}` }} />

                    <Body
                        country_data={{
                            id: countryData.iso_3166_1,
                            native_name: countryData.native_name,
                            english_name: countryData.english_name,
                        }}
                    />
                    <CountryList />
                </Modal>
            </main>
        </RootLayout>
    );
}

export default Country;
