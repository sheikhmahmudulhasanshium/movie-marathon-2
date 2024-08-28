import React from 'react';
import useCelebList from '@/hooks/use-person-list'; // Adjust the import path as needed
import PersonCard from './profile-card'; // Adjust the import path as needed
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationPrevious, 
  PaginationNext, 
  PaginationEllipsis 
} from '@/components/ui/pagination'; // Adjust import if needed

const CelebList: React.FC = () => {
    const [page, setPage] = React.useState<number>(1);
    const { data, loading, error } = useCelebList(page);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    // Safely destructure data
    const results = data?.results || [];
    const totalPages = 10; // Adjust as needed based on your API
    const currentPage = data?.page || 1;

    const handlePrevious = () => {
        if (currentPage > 1) setPage(prevPage => prevPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setPage(prevPage => prevPage + 1);
    };

    const handlePageClick = (page: number) => {
        setPage(page);
    };

    return (
        <div>
            {results.length > 0 ? (
                <div>
                    {/* Display celebrity cards */}
                    <div className="flex flex-wrap justify-center">
                        {results.map(person => (
                            <PersonCard key={person.id} person={person} />
                        ))}
                    </div>

                    {/* Pagination controls */}
                    <div className="flex justify-center items-center mt-4">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        onClick={handlePrevious}
                                         
                                        className={`px-4 py-2 ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-accent'} rounded mr-2`}
                                        aria-disabled={currentPage === 1}
                                    >
                                        Previous
                                    </PaginationPrevious>
                                </PaginationItem>

                                {currentPage > 2 && (
                                    <>
                                        <PaginationItem>
                                            <PaginationLink
                                                 
                                                onClick={() => handlePageClick(1)}
                                                className={`px-4 py-2 ${currentPage === 1 ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-700'} rounded mx-1`}
                                            >
                                                1
                                            </PaginationLink>
                                        </PaginationItem>
                                        {currentPage > 3 && <PaginationItem><PaginationEllipsis /></PaginationItem>}
                                    </>
                                )}

                                {Array.from({ length: Math.min(totalPages, 5) }, (_, index) => (
                                    <PaginationItem key={index}>
                                        <PaginationLink
                                             
                                            onClick={() => handlePageClick(index + Math.max(1, currentPage - 2))}
                                            className={`px-4 py-2 ${currentPage === index + Math.max(1, currentPage - 2) ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-700'} rounded mx-1`}
                                        >
                                            {index + Math.max(1, currentPage - 2)}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}

                                {currentPage < totalPages - 1 && (
                                    <>
                                        {currentPage < totalPages - 2 && <PaginationItem><PaginationEllipsis /></PaginationItem>}
                                        <PaginationItem>
                                            <PaginationLink
                                                 
                                                onClick={() => handlePageClick(totalPages)}
                                                className={`px-4 py-2 ${currentPage === totalPages ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-700'} rounded mx-1`}
                                            >
                                                {totalPages}
                                            </PaginationLink>
                                        </PaginationItem>
                                    </>
                                )}

                                <PaginationItem>
                                    <PaginationNext
                                        onClick={handleNext}
                                         
                                        className={`px-4 py-2 ${currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-accent'} rounded ml-2`}
                                        aria-disabled={currentPage === totalPages}
                                    >
                                        Next
                                    </PaginationNext>
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </div>
            ) : (
                <p>No celebrities found.</p>
            )}
        </div>
    );
};

export default CelebList;
