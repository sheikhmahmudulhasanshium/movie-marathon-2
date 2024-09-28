/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'media.themoviedb.org',
            },
            {
                protocol: 'https',
                hostname: 'image.tmdb.org',
            }, 
             
            {
                protocol: 'https',
                hostname: 'img.youtube.com',
            },

            {
                protocol: 'https',
                hostname: 'mainfacts.com',
            },
            {
                protocol: 'https',
                hostname: 'flagcdn.com',
            },
        ],
    },
};

export default nextConfig;
