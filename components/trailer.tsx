import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import useVideo from "@/hooks/use-trailer";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React, { useState } from "react";

interface TrailerProps {
  tmdbID: number;
  media_type: string;
}

const Trailers: React.FC<TrailerProps> = ({ tmdbID, media_type }) => {
  const { videos, loading, error } = useVideo(tmdbID.toString(), media_type);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = videos?.length || 1;
  const pageLimit = 3; // Number of page numbers to display in pagination

  if (loading) return <p>Loading videos...</p>;
  if (error) return <p>Error loading trailers: {error}</p>;

  if (!videos || videos.length === 0) {
    return <p>No trailers available.</p>;
  }

  const renderSlide = (videoIndex: number) => {
    const video = videos[videoIndex];
    const videoUrl = video.site === "YouTube" ? `https://www.youtube.com/embed/${video.key}` : "";

    return (
      <div className="flex justify-center items-center shadow-xl shadow-accent-foreground p-4  rounded-lg w-10/12 ">
        <div className="relative w-full h-0" style={{ paddingBottom: '56.25%' }}> {/* 16:9 Aspect Ratio */}
          <iframe
            src={videoUrl}
            title={video.name}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full rounded-lg"
          ></iframe>
        </div>
      </div>
    );
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

  const getPaginationGroup = () => {
    const start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill(null).map((page, idx) => start + idx + 1).filter(page => page <= totalPages);
  };

  return (
    <div className="flex flex-col py-6  justify-between  w-full">
      <p className="text-3xl font-bold pl-12 py-4 text-start">
        Video ({videos.length})
      </p>

      <div className="flex flex-col justify-center items-center relative m-4">
        {currentPage > 1 && (
          <button onClick={goToPreviousPage} className="absolute left-0 p-2">
            <ChevronLeftIcon className="w-10 h-10 text-gray-600 hover:text-gray-900" />
          </button>
        )}

        {renderSlide(currentPage - 1)}

        {currentPage < totalPages && (
          <button onClick={goToNextPage} className="absolute right-0 p-2">
            <ChevronRightIcon className="w-10 h-10 text-gray-600 hover:text-gray-900" />
          </button>
        )}
      </div>

      <Pagination className="flex flex-1 flex-col justify-center items-center">
        <PaginationContent className="my-6 flex items-center">
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious onClick={goToPreviousPage} href="#" />
            </PaginationItem>
          )}
          {getPaginationGroup().map((page) => (
            <PaginationItem key={page}>
              <PaginationLink href="#" onClick={() => goToPage(page)} className={page === currentPage ? 'font-bold' : ''}>
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          {currentPage < totalPages && (
            <PaginationItem>
              <PaginationNext onClick={goToNextPage} href="#" />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default Trailers;
