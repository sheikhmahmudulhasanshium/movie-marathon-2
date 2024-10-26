"use client"
import { Inter as FontSans } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";
import { GoogleAnalytics } from '@next/third-parties/google';
import useNetworkStatus from "@/hooks/use-network";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    title: string;
    description: string;
    image?: string; 
  };
}

export default function RootLayout({ children, params }: RootLayoutProps) {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://movie-marathon-2.vercel.app';
  const { isOnline } = useNetworkStatus();
  const router = useRouter();
  useEffect(()=>{
    if (!isOnline) {
      router.push('/offline')
    }
  },[isOnline, router])
  

  return (
    <html lang="en" className={fontSans.variable} suppressContentEditableWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <title>{params.title}</title>
        <meta name="description" content={params.description} />
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={params.title} />
        <meta property="og:description" content={params.description} />
        {params.image && <meta property="og:image" content={params.image} />}
        <meta property="og:url" content={currentUrl} />
        <meta property="og:type" content="website" />
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={params.title} />
        <meta name="twitter:description" content={params.description} />
        {params.image && <meta name="twitter:image" content={params.image} />}
         {/**Facebok Card Meta Tags*/}
         <meta property="og:url" content={currentUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={params.title} />
        <meta name="og:description" content={params.description} />
        {params.image && <meta name="og:image" content={params.image} />}
        
        {isOnline && <GoogleAnalytics gaId="G-JX5SX4K85H" />} 
      </head>
      <body className="flex bg-primary-foreground dark:bg-primary-foreground">
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    {children}
                </ThemeProvider>
      </body>
    </html>
  );
}
