import Link from "next/link";

const Footer = () => {
    return (
        <footer className="flex flex-col justify-between items-center pt-24 pb-6 dark:bg-primary-foreground bg-primary-foreground bg-opacity-25 dark:bg-opacity-5">
            
            <div className="text-sm sm:text-sm md:text-base lg:text-lg grid grid-cols-12 justify-between items-center gap-12 px-4 sm:px-8 md:px-16">
                <div className="col-span-5 bg-cover bg-logo-2 w-56 h-36 scale-150 flex justify-center items-center" />

                <p className="col-span-6 text-justify">
                    Movie Marathon is the ultimate app for movie enthusiasts who love to binge-watch their favorite films and TV shows. Whether you&apos;re planning a cozy night in or an epic weekend of non-stop entertainment, Movie Marathon helps you organize and enhance your viewing experience. With a vast library of movies and TV series across various genres, personalized recommendations, and seamless streaming options, you can easily discover new favorites and revisit classics.
                </p>
            </div>
            
            <nav className="flex justify-center items-center gap-4 pt-8 text-xl space-x-2 px-6">
                <div className="hover:underline hover:opacity-85">
                    <Link href="/terms-and-conditions">Terms & Conditions</Link>
                </div>
                <div className="hover:underline hover:opacity-85">
                    <Link href="/privacy-policy">Privacy Policy</Link>
                </div>
                <div className="hover:underline hover:opacity-85">
                    <Link href="/sitemap.xml">Sitemap</Link>
                </div>
                <div className="hover:underline hover:opacity-85">
                    <Link href="/contact">Contact</Link>
                </div>
            </nav>

            <div className="mt-8 mb-1 text-center">
                <p className="text-base">
                    &copy; 2024 Movie Marathon. All rights reserved.
                </p>
            </div>

        </footer>
    );
};

export default Footer;
