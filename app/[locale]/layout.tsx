import type { Metadata } from "next";
import "./globals.css";
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import {unstable_setRequestLocale} from 'next-intl/server';
const APP_NAME = "PWA App";
const APP_DEFAULT_TITLE = "My Awesome PWA App";
const APP_TITLE_TEMPLATE = "%s - PWA App";
const APP_DESCRIPTION = "Best PWA app in the world!";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};
const locales = ['en', 'de'];
 
export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}
interface RootLayoutProps {
  children: React.ReactNode;
  params: {locale: string};
}
const RootLayout: React.FC<RootLayoutProps> = async ({ children,  params: {locale} }) => {
  unstable_setRequestLocale(locale);
  return (
    <html lang={locale}>
      <body className={cn("min-h-screen bg-background font-sans antialiased",fontSans.variable)}>  

           <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange>
          {children}
          <Toaster />
          </ThemeProvider>
       </body>
          
    </html>
  );
}
export default RootLayout