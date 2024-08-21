"use client";

import RootLayout from "@/app/layout";
import CustomBreadCrumb from "@/components/custom-bread-crumb";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Modal from "@/components/modals/basic-page-modal";
import { useParams } from "next/navigation";
import Navbar from "./components/nav-bar";
import Body from "./components/body";
import useCompany from "@/hooks/use-company";
import Loading from "@/components/loading";

const Company = () => {
    const params = useParams();
    const companyIdParam = params.id;

    // Convert companyId to a number
    const companyId = typeof companyIdParam === 'string' ? parseInt(companyIdParam, 10) : NaN;
    const { companyData, loading, error } = useCompany(companyId);

    // Handle invalid companyId
    if (isNaN(companyId)) {
        return <div>Invalid company ID</div>;
    }
    
    if (loading) {
        return <Loading />;
    }

    if (error) {
        // Type guard to handle both string and Error type
        const errorMessage = typeof error === 'string' ? error : error.message;
        return <p className="text-center text-red-500">Error: {errorMessage}</p>;
    }

    if (!companyData) {
        return <p className="text-center">No data available for this company.</p>;
    }

    return (
        <RootLayout params={{ title: `${companyData.company.name} | Company`, description: "This is the better version of previous App" }}>
            <main className="">
                <Modal
                    header={<Header />}
                    footer={<Footer />}
                >
                    <Navbar />
                    <CustomBreadCrumb params={{ link: `/companies/${companyData.company.id}`, name: `/Company/${companyData.company.name}` }} />
                    <Body companyResponse={companyData} />
                </Modal>
            </main>
        </RootLayout>
    );
}

export default Company;
