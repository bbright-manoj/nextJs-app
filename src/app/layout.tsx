import ErrorBoundary from "@/utils/ErrorBoundry";
import type { Metadata } from "next";
import "../../src/index.scss";
import { I18nProvider } from "./i18n/i18n-context";
import { detectLanguage } from "./i18n/server";
import "@/app/globalProvider";
 import DynamicFavicon from "../../src/app/(MainBody)/DynamicFavicon";
 
import { appConfig } from "@/app/globalProvider";

export const metadata: Metadata = {
  title: appConfig.appName,
  description: "One Step Delivery - Your Ultimate Delivery Solution",
  openGraph: {
    title: appConfig.appName,
    description: "One Step Delivery - Your Ultimate Delivery Solution",
    url: "https://1rpapp.in",
    siteName: appConfig.appName,
    images: [],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const lng = await detectLanguage();
 
  return (
    <I18nProvider language={lng}>
      <html lang="en">
        <head>
          {/* Static fallback favicon */}
          {/* <link rel="shortcut icon" href="/images/favicon/favicon.ico" /> */}
          <link
            href="https://fonts.googleapis.com/css?family=PT+Sans:400,700&amp;display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Raleway&amp;display=swap"
            rel="stylesheet"
          />
        </head>
        <body>
          { <DynamicFavicon />  }
          <ErrorBoundary>{children}</ErrorBoundary>
        </body>
      </html>
    </I18nProvider>
  );
}
 