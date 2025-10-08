import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import { MainSideBarProvider } from "./context/MainSideBarContext";
import HeaderWrapper from "./_components/HeaderWrapper";
import MainSideBar from "./_components/MainSideBar";
import { ProfileDropDownMenu } from "./context/ProfileDropDownMenu";
import { Toaster } from "react-hot-toast";
import ToasterProvider from "./_components/ToasterProvider";

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
        <ToasterProvider />
        <MainSideBarProvider>
          <ProfileDropDownMenu>
            <header>
              <HeaderWrapper />
            </header>
            <MainSideBar />
            <main>{children}</main>
          </ProfileDropDownMenu>
        </MainSideBarProvider>
      </body>
    </html>
  );
}
