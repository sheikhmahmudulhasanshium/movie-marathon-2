// components/RootLayout.tsx
import { Inter as FontSans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

interface RootLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

export default function RootLayout({ children, title, description }: RootLayoutProps) {
  return (
    <html lang="en" className={fontSans.variable}>
      <head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </head>
      <body >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
