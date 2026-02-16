import type React from "react";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";

import "~/globals.css";
import "@fontsource/nunito/400.css";
import "@fontsource/nunito/500.css";
import "@fontsource/nunito/700.css";
import { LayoutHeader } from "~/widgets/layout/header";

export default function LayoutMapPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white overflow-hidden flex flex-col h-screen">
      <LayoutHeader />
      <div className="flex-1 overflow-hidden">
        <Suspense fallback={<div className="flex h-full w-full items-center justify-center text-gray-500">Loading map...</div>}>
          {children}
        </Suspense>
      </div>
      <Toaster />
    </div>
  );
}
