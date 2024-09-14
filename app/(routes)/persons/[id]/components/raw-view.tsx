import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CopyIcon, CopyCheckIcon } from 'lucide-react';



interface Work {
  cast: any[]; 
  crew: any[];
}

interface CareerTimeLineProps {
  work: Work;
  selectedRole: string | null;
}

const RawData: React.FC<CareerTimeLineProps> = ({ work, selectedRole }) => {
  let workData: any;

  if (selectedRole === null) {
    workData = work;
  } else if (selectedRole === 'Cast') {
    workData = work.cast;
  } else {
    workData = work.crew.filter((crew) => crew.job === selectedRole);
  }

  const [copied, setCopied] = useState(false);

  const syntaxHighlight = (json: string) => {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    return json.replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*")(\s*:)?|\b(true|false|null)\b|-?\d+(\.\d+)?([eE][+\-]?\d+)?/g,
      function (match, p1, p2, p3, p4) {
        if (p1) {
          const key = `<span class="text-green-400">${p1}</span>`;
          const colon = p3 ? `<span class="text-green-200">${p3}</span>` : "";
          return key + colon;
        }
        if (p4) {
          return `<span class="text-purple-300">${p4}</span>`;
        }
        return `<span class="text-orange-300">${match}</span>`;
      }
    );
  };

  const formattedWork = syntaxHighlight(JSON.stringify(workData, null, 2));

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(workData, null, 2))
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 5000);
      })
      .catch(err => {
        console.error('Failed to copy JSON:', err);
        setCopied(false);
      });
  };

  // Calculate total response count
  const getTotalResponse = () => {
    if (selectedRole === null) {
      return work.cast.length + work.crew.length;
    }
    return Array.isArray(workData) ? workData.length : 0;
  };

  return (
    <div className="flex flex-col justify-between bg-gray-800 py-8 px-6 w-full rounded-xl shadow-lg overflow-hidden">
      <div className='flex items-center justify-between mb-4'>
        <p className="text-2xl font-bold text-white">Raw JSON Data</p>
        <Button size='icon' onClick={copyToClipboard} className="text-accent-foreground p-2" variant='ghost'>
          {copied ? <CopyCheckIcon className='scale-150' /> : <CopyIcon className='scale-150' />}
        </Button>
      </div>
      <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 overflow-y-scroll h-96">
        <p className='text-slate-500'>{`//`} Showing {selectedRole || 'All'} Role:</p>
        <p className='text-slate-500'>{`//`} Total Response: {getTotalResponse()}</p>
        
        <pre className="text-sm leading-relaxed break-words whitespace-pre-wrap text-white">
          <div dangerouslySetInnerHTML={{ __html: formattedWork }} />
        </pre>
      </div>
    </div>
  );
};

export default RawData;
