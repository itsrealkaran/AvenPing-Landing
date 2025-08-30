import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AvenPing - WhatsApp Business Platform",
  description:
    "AvenPing is a comprehensive WhatsApp Business platform that helps businesses automate customer communications, manage campaigns, and grow their customer base through powerful WhatsApp integration.",
  keywords:
    "WhatsApp Business, customer communication, automation, business messaging, WhatsApp API, customer service, marketing campaigns",
  authors: [{ name: "Karan Singh" }],
  creator: "AvenPing",
  publisher: "Aven Technologies Inc.",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://avenping.com",
    title: "AvenPing - WhatsApp Business Platform",
    description:
      "Transform your business communications with AvenPing's powerful WhatsApp Business platform. Automate customer service, manage campaigns, and grow your business.",
    siteName: "AvenPing",
  },
  twitter: {
    card: "summary_large_image",
    title: "AvenPing - WhatsApp Business Platform",
    description:
      "Transform your business communications with AvenPing's powerful WhatsApp Business platform.",
    creator: "@aventechinc",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "AvenPing",
              alternateName: "Aven Technologies Inc.",
              url: "https://avenping.com",
              logo: "https://avenping.com/AvenPing-Logo.svg",
              description:
                "AvenPing is a comprehensive WhatsApp Business platform that helps businesses automate customer communications, manage campaigns, and grow their customer base through powerful WhatsApp integration.",
              foundingDate: "2023",
              founder: {
                "@type": "Person",
                name: "Karan Singh",
              },
              address: {
                "@type": "PostalAddress",
                streetAddress: "840 6 Ave SW #300",
                addressLocality: "Calgary",
                addressRegion: "AB",
                postalCode: "T2P 3E5",
                addressCountry: "CA",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+1-403-550-9635",
                contactType: "customer service",
                email: "info@avenping.com",
                availableLanguage: ["English"],
              },
              sameAs: [
                "https://www.linkedin.com/company/aventechinc",
                "https://twitter.com/aventechinc",
                "https://www.facebook.com/aventechinc",
                "https://www.instagram.com/aventechinc",
                "https://www.youtube.com/@aventechinc",
              ],
              service: {
                "@type": "Service",
                name: "WhatsApp Business Platform",
                description:
                  "Comprehensive WhatsApp Business platform for customer communication, automation, and campaign management",
                provider: {
                  "@type": "Organization",
                  name: "Aven Technologies Inc.",
                },
                areaServed: "Worldwide",
                serviceType: "Business Communication Platform",
              },
              offers: {
                "@type": "Offer",
                name: "AvenPing Subscription Plans",
                description:
                  "Flexible pricing plans for businesses of all sizes",
                priceCurrency: "USD",
                availability: "https://schema.org/InStock",
              },
            }),
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Script
          strategy="lazyOnload"
          id="facebook-jssdk"
          src="https://connect.facebook.net/en_US/sdk.js"
        />
        <Script id="facebook-init">
          {`
              window.fbAsyncInit = function() {
                FB.init({
                  appId: '641045902102378',
                  xfbml: true,
                  version: 'v22.0',
                  config_id: '${process.env.NEXT_PUBLIC_META_CONFIG_ID}'
                });
              };
            `}
        </Script>
        {children}
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  );
}
