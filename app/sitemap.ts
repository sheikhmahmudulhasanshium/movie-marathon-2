import { MetadataRoute } from 'next';


export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: `https://movie-marathon-2.vercel.app/home`,
            lastModified: new Date(),
            changeFrequency: 'hourly',
            priority: 1,
        },
        {
            url: `https://movie-marathon-2.vercel.app/`,
            lastModified: new Date(),
            changeFrequency: 'hourly',
            priority: 0.8,
        },
        {
            url: `https://movie-marathon-2.vercel.app/movies`,
            lastModified: new Date(),
            changeFrequency: 'hourly',
            priority: 1,
        },
        {
            url: `https://movie-marathon-2.vercel.app/tv-shows`,
            lastModified: new Date(),
            changeFrequency: 'hourly',
            priority: 1,
        },
        {
            url: `https://movie-marathon-2.vercel.app/genres`,
            lastModified: new Date(),
            changeFrequency: 'hourly',
            priority: 0.5,
        },
        {
            url: `https://movie-marathon-2.vercel.app/persons`,
            lastModified: new Date(),
            changeFrequency: 'hourly',
            priority: 0.5,
        },
        {
            url: `https://movie-marathon-2.vercel.app/top-contents`,
            lastModified: new Date(),
            changeFrequency: 'hourly',
            priority: 0.5,
        },
        {
            url: `https://movie-marathon-2.vercel.app/companies`,
            lastModified: new Date(),
            changeFrequency: 'hourly',
            priority: 0.5,
        },
        {
            url: `https://movie-marathon-2.vercel.app/country`,
            lastModified: new Date(),
            changeFrequency: 'hourly',
            priority: 0.5,
        },
        {
            url: `https://movie-marathon-2.vercel.app/search`,
            lastModified: new Date(),
            changeFrequency: 'hourly',
            priority: 0.8,
        },
    ];
}
