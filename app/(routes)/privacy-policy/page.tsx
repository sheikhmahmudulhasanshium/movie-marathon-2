import RootLayout from "@/app/layout";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Modal from "@/components/modals/basic-page-modal";
import Body from "./body";

const PP = () => {
    return ( 
        <RootLayout params={{ title: "Terms & Conditions", description: "Read carefully" }}>
            <main>
                <Modal
                    header={<Header />}
                    footer={<Footer />}
                >
                    <Body/>
                </Modal>
            </main>
        </RootLayout>
     );
}
 
export default PP;