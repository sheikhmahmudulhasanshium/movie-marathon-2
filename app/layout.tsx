import { Inter as FontSans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { GoogleAnalytics } from '@next/third-parties/google'

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    title: string;
    description: string;
  };
}

export default function RootLayout({ children, params }: RootLayoutProps) {
  return (
    <html lang="en" className={fontSans.variable} suppressContentEditableWarning>
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" sizes="any"/>

        <title>{params.title}</title>
        <meta name="description" content={params.description} />
        <GoogleAnalytics gaId="G-JX5SX4K85H" />
      </head>
        
      <body className="flex bg-primary-foreground dark:bg-primary-foreground">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
