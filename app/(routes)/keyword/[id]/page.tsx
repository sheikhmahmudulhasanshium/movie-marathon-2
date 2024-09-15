"use client"
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
    const { keyword, movies, series } = data;

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!loading && !error && keyword.length > 0) {
        return (
            <RootLayout params={{ title: `${keyword[0]?.name}`, description: "This is the better version of the previous App" }}>
                <main className="">
                    <Modal header={<Header />} footer={<Footer />}>
                        <CustomBreadCrumb params={{ link: `/keyword/${paramsId}`, name: `/Keyword/${keyword[0].name}` }} />
                        <Body data={data}/>
                    </Modal>
                </main>
            </RootLayout>
        );
    }

    return null;  // Return null if no data and no error
}

export default Keyword;
