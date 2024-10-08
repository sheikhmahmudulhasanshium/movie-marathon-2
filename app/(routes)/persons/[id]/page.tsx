"use client";
import { useParams } from 'next/navigation';
import RootLayout from "@/app/layout";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Modal from "@/components/modals/basic-page-modal";
import CustomBreadCrumb from "@/components/custom-bread-crumb";
import Loading from '@/components/loading';
import usePerson from '@/hooks/use-person';
import PersonDetails from '@/components/person-details';
import Recommendations from './components/recommendations';
import { useState } from 'react';
import CareerViewSelector from './components/career';
import Searchbar from '@/components/modals/search-bar-advanced';

const Person: React.FC = () => {
    const params = useParams();
    const id = Array.isArray(params.id) ? params.id[0] : params.id; // Ensure id is a string

    // Fetch person data
    const { personData, loading, error } = usePerson(id || '');

    if (!id) {
        return <p>No movie ID provided.</p>; // Handle missing ID case
    }

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <RootLayout params={{ title: personData ? `${personData.name} | Person` : "Title | Person", description: "There will be individual person" }}>
            <main className="flex justify-center items-start">
                <Modal
                    header={<Header />}
                    footer={<Footer />}
                >
                    <CustomBreadCrumb params={{ link: `/persons/${id}/`, name: `/Person/${personData?.name}` }} />
                    {personData && (
                        <div className='justify-center items-center flex flex-col'>
                            <Searchbar Variant={'Person'} />
                            <PersonDetails personData={personData} />
                            <CareerViewSelector personData={personData}/>
                            <Recommendations />
                        </div>
                    )}
                </Modal>
            </main>
        </RootLayout>
    );
}

export default Person;
