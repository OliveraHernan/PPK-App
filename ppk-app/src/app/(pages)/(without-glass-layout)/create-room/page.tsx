"use client";

import CreateRoomForm from "@/src/components/createRoomPage/createRoomForm";
import React from "react";
import Image from "next/image";
import pieChart from "./../../../../../public/full-pie-chart.svg";

export default function CreateRoomPage() {
  return (
    <div className="flex min-h-[calc(100vh-200px)] p-8">
      <div className="flex-1 flex items-center justify-center">
        <Image
          src={pieChart}
          alt="Pie Chart"
          width={500}
          height={500}
          priority
          className="opacity-90"
        />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full max-w-md space-y-8">
          <CreateRoomForm />
        </div>
      </div>
    </div>
  );
}
