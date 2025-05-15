import type { Metadata } from "next";
import "./globals.css";

import { Poppins } from "next/font/google"
import { ThemeProvider } from "next-themes";
import StoreProvider from "../providers/redux";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200","300","400", "500", "600", "700","800"],
});

export const metadata: Metadata = {
  title: "VoiceCommerce",
  description: "An AI-powered voice commerce platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.className} antialiased`}
      >
        <StoreProvider>
          <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
            {children}
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
