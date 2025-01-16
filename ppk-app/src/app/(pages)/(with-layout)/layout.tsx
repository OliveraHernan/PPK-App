"use client";
import logo from "../../../../public/Logo.png";
import Img from "next/image";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle,#EF834C_0%,#510096_100%)]">
      {/* Header */}
      <header className="flex justify-between items-center p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12">
            <Img src={logo} alt="Dice-1" width={80} height={80} />
          </div>
        </div>
        <div className="flex items-center gap-4 mr-10">
          <span className="text-white">Usuario Hardcodeado</span>
          <div className="w-10 h-10 rounded-full bg-white" />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex justify-center">
        <div className="w-[1366px] h-[768px] rounded-tl-[24px]">
          <div className="  mx-auto my-auto rounded-lg overflow-hidden bg-[#5882C147] backdrop-blur-md border border-white/10">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
