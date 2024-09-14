import React from 'react';
import SampleCard from "@/components/sample-card";
import { formatDate } from '@/lib/format-date';
import { formatTime } from '@/lib/format-time';

interface WorkData {
  cast: any[];
  crew: any[];
}

interface CareerTimeLineProps {
  work: WorkData;
  selectedRole: string | null;
}

const GridView: React.FC<CareerTimeLineProps> = ({ work, selectedRole }) => {
  let workData: any[] = [];

  if (selectedRole === null) {
    workData = [...work.cast, ...work.crew];
  } else if (selectedRole === 'Cast') {
    workData = work.cast;
  } else {
    workData = work.crew.filter((crewMember) => crewMember.job === selectedRole);
  }

  return (
    <div className='flex flex-col w-full py-8 px-4 lg:px-12 bg-gray-100 min-h-screen'>
      <p className='text-2xl font-bold text-center mb-6 text-gray-700'>
        Showing Results for &quot;{selectedRole ? `${selectedRole} Role` : 'All Roles'}&quot;
      </p>
      <div className='relative max-w-8xl mx-auto my-8'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
          {workData.length > 0 ? (
            workData.map((job) => (
              <div key={job.id} className='flex flex-col bg-white shadow-lg rounded-lg overflow-hidden'>
                <SampleCard
                  id={job.id}
                  title={job.title || job.name}
                  posterPath={job.posterPath || job.backdrop_path}
                  certification={job.certification||''}
                  releaseDate={formatDate(job.release_date) }
                  runtime={formatTime(job.runtime)}
                  media_type={job.media_type || 'Unknown'}
                />
              </div>
            ))
          ) : (
            <p className='col-span-full text-center text-gray-500'>No results found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default GridView;
