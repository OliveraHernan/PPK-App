"use client";
import logo from "../../../../public/Logo.png";
import Img from "next/image";

export default function BasicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle,#7800DE_0%,#510096_100%)]">
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

      {/* Área de contenido solo con gradiente */}
      <div className="mx-auto p-8 min-h-[calc(100vh-120px)]">
        <div className="w-full h-full rounded-3xl bg-[radial-gradient(circle,#EF834C_0%,#510096_100%)] p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
