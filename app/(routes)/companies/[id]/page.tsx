"use client"
import RootLayout from "@/app/layout";
import CustomBreadCrumb from "@/components/custom-bread-crumb";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Modal from "@/components/modals/basic-page-modal";
import { useParams } from "next/navigation";
import Body from "./components/body";
import useCompany from "@/hooks/use-company";
import Loading from "@/components/loading";
import { useState, useCallback } from "react";
import Navbar from "./components/nav-bar";
import CompanyList from "../components/company-list";

const Company = () => {
    const params = useParams();
    const companyIdParam = params.id;

    const companyId = typeof companyIdParam === 'string' ? parseInt(companyIdParam, 10) : NaN;
    const [moviePage, setMoviePage] = useState(1);
    const [seriesPage, setSeriesPage] = useState(1);

    const { companyData, loading, error } = useCompany(companyId, moviePage, seriesPage);

    const handlePageChange = useCallback((page: number, type: 'movies' | 'series') => {
        if (type === 'movies') {
            setMoviePage(page);
        } else {
            setSeriesPage(page);
        }
    }, []);

    if (isNaN(companyId)) {
        return <div>Invalid company ID</div>;
    }

    if (loading) {
        return <Loading />;
    }

    if (error) {
        const errorMessage = typeof error === 'string' ? error : error.message;
        return <p className="text-center text-red-500">Error: {errorMessage}</p>;
    }

    if (!companyData) {
        return <p className="text-center">No data available for this company.</p>;
    }

    return (
        <RootLayout params={{ title: `${companyData.company.name} | Company`, description: "Explore Companies from here" }}>
            <main className="">
                <Modal
                    header={<Header />}
                    footer={<Footer />}
                >
                    <Navbar />
                    <CustomBreadCrumb params={{ link: `/companies/${companyData.company.id}`, name: `/Company/${companyData.company.name}` }} />
                    <Body
                        companyResponse={companyData}
                        onPageChange={handlePageChange}
                        moviePage={moviePage}
                        seriesPage={seriesPage}
                    />
                    <CompanyList/>
                </Modal>
            </main>
        </RootLayout>
    );
};

export default Company;
