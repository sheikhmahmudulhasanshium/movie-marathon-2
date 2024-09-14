import React from 'react';
import { Calendar, Check } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import SampleCard from '@/components/sample-card';
import { formatDate } from '@/lib/format-date';

interface CareerTimeLineProps {
  work: {
    cast: any[];
    crew: any[];
  };
  selectedRole: string | null;
}

const TreeView: React.FC<CareerTimeLineProps> = ({ work, selectedRole }) => {
  const { cast, crew } = work;

  // Determine which role to use
  const filteredData = selectedRole === 'Cast' ? cast : selectedRole ? crew.filter(item => item.job === selectedRole) : [...cast, ...crew];

  // Extract, sort (descending order), and format the events by date
  const sortedEvents = filteredData
    .filter(item => item.release_date || item.air_date) // Filter items with valid dates
    .map(item => ({
      ...item,
      date: new Date(item.release_date || item.air_date || ''), // Convert to Date object
    }))
    .sort((a, b) => b.date.getTime() - a.date.getTime()); // Sort by date in descending order

  // Group the sorted events by year and month
  const eventsByYear: { [year: string]: { [month: string]: typeof sortedEvents } } = {};

  for (const event of sortedEvents) {
    const year = event.date.getFullYear().toString();
    const month = event.date.toLocaleString('default', { month: 'short' });

    if (!eventsByYear[year]) {
      eventsByYear[year] = {};
    }
    if (!eventsByYear[year][month]) {
      eventsByYear[year][month] = [];
    }

    eventsByYear[year][month].push(event);
  }

  const uniqueMonths = Array.from(new Set(sortedEvents.map(event => event.date.toLocaleString('default', { month: 'short' }))));
  
  // Initialize selectedMonths with all years set to null (default to "All")
  const initialSelectedMonths = Object.keys(eventsByYear).reduce(
    (acc, year) => ({ ...acc, [year]: null }),
    {}
  );

  const [selectedMonths, setSelectedMonths] = React.useState<{ [year: string]: string | null }>(initialSelectedMonths);

  const handleMonthChange = (year: string, month: string | null) => {
    setSelectedMonths(prevState => ({
      ...prevState,
      [year]: month,
    }));
  };

  return (
    <div className='flex flex-col w-10/12 py-4 mx-4'>
      <div className='relative max-w-10/12 mx-auto my-12'>
        <div className='absolute left-6 w-1 bg-gradient-to-b from-gray-300 via-gray-200 to-gray-100 h-full shadow-md z-0'></div>
        <div className='relative h-screen overflow-y-scroll py-16 pr-8'>
          {Object.keys(eventsByYear)
            .sort((a, b) => parseInt(b) - parseInt(a))
            .map(year => (
              <div key={year} className='mb-48'>
                <div className='flex items-center mb-12 relative'>
                  <div className='absolute w-6 h-6 bg-blue-400 rounded-full left-6 transform -translate-x-1/2 border-2 border-white shadow-lg' style={{ top: '50%' }}></div>
                  <div className='flex-shrink-0 w-44 text-center'>
                    <div className='flex items-center justify-center gap-3 h-full'>
                      <Calendar className='text-blue-500 text-3xl' />
                      <p className='text-gray-700 text-lg font-semibold'>{year}</p>
                    </div>
                  </div>

                  <NavigationMenu>
                    <NavigationMenuList className='flex flex-col'>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger className='flex justify-between items-center p-2 w-48 bg-white border border-gray-300 rounded-md hover:bg-gray-100 gap-2 z-10'>
                          {selectedMonths[year] || 'All'}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className='w-32 h-40 bg-white shadow-lg border border-gray-300 rounded-md overflow-y-scroll overflow-x-hidden z-20'>
                          <NavigationMenuList className='flex flex-col p-2'>
                            <NavigationMenuItem>
                              <NavigationMenuLink
                                onClick={() => handleMonthChange(year, null)}
                                className={`flex items-center p-2 w-20 hover:bg-blue-100 rounded-md ${selectedMonths[year] === null ? 'text-blue-700 font-bold' : 'text-gray-900'}`}
                              >
                                <p className='pl-1'>All</p>
                                {selectedMonths[year] === null && <Check className='ml-2 text-blue-700' />}
                              </NavigationMenuLink>
                            </NavigationMenuItem>
                            {uniqueMonths.map(month => (
                              <NavigationMenuItem key={month}>
                                <NavigationMenuLink
                                  onClick={() => handleMonthChange(year, month)}
                                  className={`flex items-center p-2 w-20 hover:bg-blue-100 rounded-md ${selectedMonths[year] === month ? 'text-blue-700 font-bold' : 'text-gray-900'}`}
                                >
                                  {month}
                                  {selectedMonths[year] === month && <Check className='ml-2 text-blue-700' />}
                                </NavigationMenuLink>
                              </NavigationMenuItem>
                            ))}
                          </NavigationMenuList>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                </div>

                <div className='relative'>
                  {Object.keys(eventsByYear[year])
                    .sort((a, b) => new Date(`${a} 1, ${year}`).getTime() - new Date(`${b} 1, ${year}`).getTime())
                    .map(
                      month =>
                        (selectedMonths[year] === null || selectedMonths[year] === month) && (
                          <div key={month} className='relative mb-24'>
                            <div className='flex items-center mb-8 relative'>
                              <div className='absolute w-1/12 h-1 bg-green-300 transform -translate-x-1/2 left-12' style={{ top: '50%', right: '6rem', left: 'calc(1rem + 3rem)' }}></div>
                              <div className='flex-shrink-0 w-44 text-right'>
                                <p className='text-gray-700 text-lg font-semibold'>{month}</p>
                              </div>
                            </div>

                            <div className='flex flex-wrap gap-8 ml-20'>
                              {eventsByYear[year][month].map(event => (
                                <SampleCard
                                  key={event.id}
                                  id={event.id}
                                  title={event.title || event.name}
                                  posterPath={event.poster_path || event.backdrop_path || ''}
                                  certification='Not Rated'
                                  releaseDate={formatDate(event.release_date)}
                                  runtime='Runtime not available'
                                  media_type={event.media_type}
                                  character={selectedRole === 'Cast' ? event.character : event.job} // Show character for cast, job for crew roles
                                />
                              ))}
                            </div>
                          </div>
                        )
                    )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TreeView;
