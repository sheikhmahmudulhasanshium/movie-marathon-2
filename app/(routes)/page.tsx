// app/page.tsx
import Header from '@/components/header';
import RootLayout from '../layout';
import Modal from '@/components/modals/basic-page-modal';
import Footer from '@/components/footer';
import Slide from './components/slide-1';
import Slide2 from './components/slide-2';
import Slide3 from './components/slide-3';
import Slide4 from './components/slide-4';

const RootPage = () => {
  return (
    <RootLayout title="Welcome" description="This is the better version of previous App">
      
      <main className="">
        <Modal
          header={<Header />}
          footer={<Footer/>}
        >
          <div className='mx-6 my-14'>
            <Slide/><Slide2/><Slide3/><Slide4/>
          </div>
        </Modal>
      </main>
    </RootLayout>
  );
};

export default RootPage;
