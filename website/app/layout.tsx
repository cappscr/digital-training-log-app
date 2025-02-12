import "@mantine/core/styles.css";
import React from "react";
import Script from "next/script";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { theme } from "../theme";

export const metadata = {
  title: "Digital Training Log App",
  description: "Web application for planning training for endurance sports",
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-YLNZE07TWZ"></Script>
      <Script id="ga-config">
        {`window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-YLNZE07TWZ', { 'debug_mode':true });`}
      </Script>
      <body>
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </body>
    </html>
  );
}
