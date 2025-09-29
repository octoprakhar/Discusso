import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import { MainSideBarProvider } from "./context/MainSideBarContext";
import HeaderWrapper from "./_components/HeaderWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Discusso",
  description: "Discusso: This is a community website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased space-y-2 text-slate-800`}
      >
        <MainSideBarProvider>
          <header>
            <HeaderWrapper />
          </header>
          <main>{children}</main>
        </MainSideBarProvider>
      </body>
    </html>
  );
}
