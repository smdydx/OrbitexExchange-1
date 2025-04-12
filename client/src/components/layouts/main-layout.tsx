import { ReactNode } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[#0F172A] text-[#F8FAFC] font-roboto">
      <Navbar />
      <main className="flex-grow pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">{children}</main>
      <Footer />
    </div>
  );
}
