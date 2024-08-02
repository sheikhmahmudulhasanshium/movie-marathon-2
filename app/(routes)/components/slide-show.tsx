import { useState, useEffect } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Slide1 from '../components/slide-1';
import Slide2 from '../components/slide-2';
import Slide3 from '../components/slide-3';
import Slide4 from '../components/slide-4';
import Slide5 from '../components/slide-5';
import Slide6 from '../components/slide-6';

const SlideShow: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const totalPages = 6;

    const renderSlide = () => {
        switch (currentPage) {
            case 1:
                return <Slide1 />;
            case 2:
                return <Slide2 />;
            case 3:
                return <Slide3 />;
            case 4:
                return <Slide4 />;
            case 5:
                return <Slide5 />;
            case 6:
                return <Slide6 />;
            default:
                return <Slide1 />;
        }
    };

    const goToPreviousPage = () => {
        setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
    };

    const goToNextPage = () => {
        setCurrentPage((prevPage) => (prevPage < totalPages ? prevPage + 1 : prevPage));
    };

    const goToPage = (page: number) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentPage((prevPage) => (prevPage < totalPages ? prevPage + 1 : 1));
        }, 4000);

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, [totalPages]);

    return (
        <div className="pt-4">
            <Pagination className='flex flex-1 flex-col justify-center items-center'>
                <div className='flex flex-col justify-center items-center'>
                    {renderSlide()}
                </div>
                <PaginationContent className='my-6'>
                    <PaginationItem>
                        <PaginationPrevious onClick={goToPreviousPage} href="#" />
                    </PaginationItem>
                    {[...Array(totalPages)].map((_, index) => (
                        <PaginationItem key={index}>
                            <PaginationLink href="#" onClick={() => goToPage(index + 1)}>
                                {index + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext onClick={goToNextPage} href="#" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
};

export default SlideShow;
