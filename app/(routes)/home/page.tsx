import RootLayout from "@/app/layout";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Modal from "@/components/modals/basic-page-modal";

const HomePage = () => {
    return ( 
    <RootLayout params={{ title: "Homepage", description: "This is the better version of previous App" }}>
      
      <main className="">
        <Modal
          header={<Header />}
          footer={<Footer/>}
        >
          <div className='bg-red-500 p-14'>Body</div>
        </Modal>
      </main>
    </RootLayout>
     );
}
 
export default HomePage;