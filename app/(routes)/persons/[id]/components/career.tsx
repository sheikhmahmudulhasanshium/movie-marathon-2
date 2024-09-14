import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import RawData from '../components/raw-view';
import TreeView from '../components/tree-view';
import GridView from '../components/grid-view';
import { useState } from 'react';
import { PersonDetailsResponse } from '@/components/type';
import { Braces, FolderTree, LayoutGrid, Check } from 'lucide-react';

interface DetailsProps {
  personData: PersonDetailsResponse;
}

const CareerViewSelector: React.FC<DetailsProps> = ({ personData }) => {
  const [selectedOption, setSelectedOption] = useState<'tree' | 'grid' | 'raw'>('tree');
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleRoleChange = (role: string | null) => {
    setSelectedRole(role);
  };

  const roles = ['Cast', ...Array.from(new Set(personData.combined_credits.crew.map(item => item.job)))];

  return (
    <div className='flex flex-col justify-between w-10/12 mx-auto'>
      <div className='pl-12 text-2xl font-semibold py-4 '>
        <p>Career Timeline</p>
      </div>
      <div className='py-8 justify-between items-center w-full flex'>
        <NavigationMenu>
          <NavigationMenuList className='flex gap-4 ' >
            <NavigationMenuItem >
              <NavigationMenuTrigger className='gap-8 text-lg font-medium cursor-pointer shadow-accent-foreground shadow' >
                View Options
              </NavigationMenuTrigger>
              <NavigationMenuContent className='flex flex-col bg-white border border-gray-300 rounded shadow-lg p-2 text-base' >
                <NavigationMenuLink
                  className={`py-2 flex items-center gap-2 px-4 rounded cursor-pointer hover:bg-gray-100 ${selectedOption === 'grid' ? 'text-blue-500 bg-gray-200' : ''}`}
                  onClick={() => setSelectedOption('grid')}
                >
                  <LayoutGrid className='w-5 h-5' />
                  <span className='flex-1'>Grid View</span>
                  {selectedOption === 'grid' && <Check className='w-5 h-5 text-blue-500' />}
                </NavigationMenuLink>
                <NavigationMenuLink
                  className={`py-2 flex items-center gap-2 px-4 rounded cursor-pointer hover:bg-gray-100 ${selectedOption === 'tree' ? 'text-blue-500 bg-gray-200' : ''}`}
                  onClick={() => setSelectedOption('tree')}
                >
                  <FolderTree className='w-5 h-5' />
                  <span className='flex-1'>Tree View</span>
                  {selectedOption === 'tree' && <Check className='w-5 h-5 text-blue-500' />}
                </NavigationMenuLink>
                <NavigationMenuLink
                  className={`py-2 flex items-center gap-2 px-4 rounded cursor-pointer hover:bg-gray-100 ${selectedOption === 'raw' ? 'text-blue-500 bg-gray-200' : ''}`}
                  onClick={() => setSelectedOption('raw')}
                >
                  <Braces className='w-5 h-5' />
                  <span className='flex-1'>Data View</span>
                  {selectedOption === 'raw' && <Check className='w-5 h-5 text-blue-500' />}
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
        <NavigationMenu>
            <NavigationMenuList><NavigationMenuItem>
              <NavigationMenuTrigger className='gap-8 text-lg font-medium cursor-pointer shadow-accent-foreground shadow'>
                Select Role
              </NavigationMenuTrigger>
              <NavigationMenuContent className='flex flex-col bg-white border border-gray-300 rounded shadow-lg p-2 text-base'>
                <NavigationMenuLink
                  className={`py-2 flex items-center gap-2 px-4 rounded cursor-pointer hover:bg-gray-100 ${selectedRole === null ? 'text-blue-500 bg-gray-200' : ''}`}
                  onClick={() => handleRoleChange(null)}
                >
                  All
                  {selectedRole === null && <Check className='w-5 h-5 text-blue-500' />}
                </NavigationMenuLink>
                {roles.map(role => (
                  <NavigationMenuLink
                    key={role}
                    className={`py-2 flex items-center gap-2 px-4 rounded cursor-pointer hover:bg-gray-100 ${selectedRole === role ? 'text-blue-500 bg-gray-200' : ''}`}
                    onClick={() => handleRoleChange(role)}
                  >
                    {role}
                    {selectedRole === role && <Check className='w-5 h-5 text-blue-500' />}
                  </NavigationMenuLink>
                ))}
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div>
        {selectedOption === 'tree' && (
          <TreeView 
            work={personData.combined_credits} 
            selectedRole={selectedRole} 
          />
        )}
        {selectedOption === 'grid' && (
            <GridView work={personData.combined_credits} 
            selectedRole={selectedRole}/>)
        }
        {selectedOption === 'raw' && (
            <RawData work={personData.combined_credits} 
            selectedRole={selectedRole}/>)}
      </div>
    </div>
  );
};

export default CareerViewSelector;
