"use client";

import RootLayout from "@/app/layout";
import CustomBreadCrumb from "@/components/custom-bread-crumb";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Loading from "@/components/loading";
import Modal from "@/components/modals/basic-page-modal";
import useKeyword from "@/hooks/use-keyword";
import { useParams } from "next/navigation";
import Body from "./components/body";

const Keyword = () => {
    const params = useParams();
    // Ensure params.id is a valid number or string
    const paramsId = Array.isArray(params.id) ? params.id[0] : params.id;

    // Convert paramsId to a number if it is a string that represents a number
    const id = isNaN(Number(paramsId)) ? paramsId : Number(paramsId);

    const { data, loading, error } = useKeyword(id);
    const { keyword } = data;

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (keyword) {
        return (
            <RootLayout params={{ title: `Keyword: ${keyword.name}`, description: "Explore movies and TV shows based on the selected keyword." }}>
                <main>
                    <Modal header={<Header />} footer={<Footer />}>
                        <CustomBreadCrumb params={{ link: `/keyword/${paramsId}`, name: `/Keyword/${keyword.name}` }} />
                        <Body id={keyword.id} />
                    </Modal>
                </main>
            </RootLayout>
        );
    }

    return null;
}

export default Keyword;
