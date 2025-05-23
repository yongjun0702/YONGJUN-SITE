import type { Metadata } from "next";
import localFont from 'next/font/local';
import Script from 'next/script';
import "./globals.css";
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { AnimationProvider } from "@/components/providers/AnimationProvider";
import { BlogProvider } from "@/components/providers/BlogProvider";
import { BlogLoadingOverlay } from "@/components/blog/BlogLoadingOverlay";
import { ClientHeader, ClientFooter } from "@/components/shared/ClientComponents";

const pretendard = localFont({
  src: [
    {
      path: '../../fonts/Pretendard-Thin.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../../fonts/Pretendard-ExtraLight.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../../fonts/Pretendard-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../fonts/Pretendard-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../fonts/Pretendard-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../fonts/Pretendard-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../fonts/Pretendard-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../fonts/Pretendard-ExtraBold.woff2',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../../fonts/Pretendard-Black.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-pretendard',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://yongjun.site'),
  title: "Yongjun Jo | Frontend Developer",
  description: "프론트엔드 개발자 조용준입니다.",
  icons: {
		icon: "/favicon.ico",
	},
  openGraph: {
    title: "Yongjun Jo | Frontend Developer",
    description: "프론트엔드 개발자 조용준입니다.",
    url: "https://yongjun.site",
    siteName: "Yongjun Jo | Frontend Developer",
    images: [
      {
        url: "/images/og_image.png",
        width: 1200,
        height: 600,
        alt: "Yongjun Jo | Frontend Developer",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yongjun Jo | Frontend Developer",
    description: "프론트엔드 개발자 조용준입니다.",
    images: ["/images/og_image.png"],
  },
};

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_MEASUREMENT_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body
        className={`min-h-screen bg-background font-sans antialiased ${pretendard.variable}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <BlogProvider>
            <ClientHeader />
            <AnimationProvider>
              {children}
            </AnimationProvider>
            <ClientFooter />
            <BlogLoadingOverlay />
            <Analytics />
            <SpeedInsights />
          </BlogProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
