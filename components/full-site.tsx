import { ArrowRightCircle } from "lucide-react";
import Link from "next/link";

const FullSite = () => {
    return (
    <div className="w-full sm:w-screen md:w-full lg:w-full px-16">
        <Link href="/home">     
        <div className="flex text-xl sm:text-lg md:xl lg:text-3xl justify-center items-center gap-4 bg-cyan-950  p-4 rounded-lg my-5 hover:bg-opacity-70 text-white">
                <p>View Full Site</p>
                <ArrowRightCircle />
        </div>
        </Link>
    </div>
     );
}
 
export default FullSite;