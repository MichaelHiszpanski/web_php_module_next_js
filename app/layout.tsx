import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import NavigationBar from "@/src/components/navigation_bar/NavigationBar";
import Footer from "@/src/components/footer/Footer";
import { StoreProvider } from "@/src/utils/tools/mobX_store_provider";
import { ReactQueryProvider } from "./ReactQueryProdiver";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <ReactQueryProvider>
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased mt-[100px]`}
          >
            <NavigationBar />
            <StoreProvider>{children}</StoreProvider>
            <Footer
              backgroudnColor="bg-gradient-to-r from-colorSrcOne via-colorSrcTwo to-colorSrcThree "
              fontColor="text-white"
            />
          </body>
        </html>
      </ReactQueryProvider>
    </ClerkProvider>
  );
}
