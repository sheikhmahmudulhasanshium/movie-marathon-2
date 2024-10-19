"use client";

import RootLayout from "@/app/layout";
import CustomBreadCrumb from "@/components/custom-bread-crumb";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Modal from "@/components/modals/basic-page-modal";
import { useOrigin } from "@/hooks/use-origin";
import Loading from "@/components/loading";
import Body from "./components/body";

const Companies = () => {
    const origin = useOrigin();

    if (!origin) {
        return <Loading />;
    }

    return (
        <RootLayout params={{ title: "Explore Companies", description: "Explore companies from here" }}>
            <main className="">
                <Modal
                    header={<Header />}
                    footer={<Footer />}
                >
                    <CustomBreadCrumb params={{ link: "/companies/", name: '/Company' }} />
                    <Body/>
                </Modal>
            </main>
        </RootLayout>
    );
}

export default Companies;
