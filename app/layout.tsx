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
  title: "AvenPing",
  description: "AvenPing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
