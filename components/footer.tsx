import Link from "next/link";

const Footer = () => {
    return ( 
        <div className="flex flex-col justify-between items-center  pt-24 pb-4 bg-primary-foreground dark:bg-primary-foreground bg-opacity-25 dark:bg-opacity-5">
            
            <div className="text-sm sm:text-sm md:text-base lg:text-lg flex mx-8 justify-between gap-6">
                <div className="bg-cover bg-logo-2 w-5/12 h-24 scale-150 p-12 justify-center items-center flex"/>
                
                <p className="text-justify">  
                    Movie Marathon is the ultimate app for movie enthusiasts who love to binge-watch their favorite films and TV shows. Whether you&apos;re planning a cozy night in or an epic weekend of non-stop entertainment, Movie Marathon helps you organize and enhance your viewing experience. With a vast library of movies and TV series across various genres, personalized recommendations, and seamless streaming options, you can easily discover new favorites and revisit classics.
                </p>
                
                
            </div>
            <div className="flex justify-center items-center gap-4 pt-8 text-xl space-x-2 px-6">
                    <div className="hover:underline hover:opacity-85"><Link href="/terms-and-conditions">Terms & Conditions</Link></div>
                    <div className="hover:underline hover:opacity-85"><Link href="/privacy-policy">Privacy Policy</Link></div>
                
                    <div className="hover:underline hover:opacity-85"><Link href="/contact">Contact</Link></div>
                
                </div>
                <p className="text-base pt-8">&copy; 2024 Movie Marathon. All rights reserved.</p>

        </div>
     );
}
 
export default Footer;