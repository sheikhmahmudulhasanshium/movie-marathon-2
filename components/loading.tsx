import { LoaderPinwheelIcon } from "lucide-react";

const loading = () => {
    return ( 
        <div className='bg-white flex justify-center items-center min-h-screen w-full'>
                <LoaderPinwheelIcon className='animate-spin size-56 text-slate-800 ' size={48} />
            </div>
     );
}
 
export default loading;