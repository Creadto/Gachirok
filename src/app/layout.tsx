import { MSWComponent } from "@/app/_component/MSWComponent";
import BodyColorHandler from "@/core/components/BodyColorHandler";
import Sidebar from "@/core/components/side-bar/Sidebar";
import Topbar from "@/core/components/top-bar/Topbar";
import ReactQueryProvider from "@/core/utils/reactQueryProvider";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { AuthProvider } from "./auth/provider";
import "./globals.css";
import { Footer } from "@/core/components/footer/Footer";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const pretendard = localFont({
  src: "../core/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {

  
  return (
    <html lang="en" className={`${pretendard.variable}`}>
      <MSWComponent/>
      <BodyColorHandler font={pretendard} />
      <body className={` ${pretendard.className}` }>
        <ReactQueryProvider>
          <AuthProvider>
            <Topbar />
            <Sidebar />
            <div className="pt-[80px]">
              {children}
              {modal}
            </div>
              <Footer />

          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}