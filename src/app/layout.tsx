import Sidebar from "@/core/components/Sidebar";
import type { Metadata } from "next";
import "./globals.css";
import Topbar from "@/core/components/Topbar";
import { AuthProvider } from "./auth/provider";
import ReactQueryProvider from "@/core/utils/reactQueryProvider";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body>git
        <ReactQueryProvider>
          <AuthProvider>
            <Topbar />
            <Sidebar />
            <div className="ml-64 pt-16 p-4">
              {children}
            </div>
              {modal}

          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
