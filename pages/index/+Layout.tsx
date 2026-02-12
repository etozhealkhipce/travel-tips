import type React from "react";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";

import "~/globals.css";
import "@fontsource/nunito/400.css";
import "@fontsource/nunito/500.css";
import "@fontsource/nunito/700.css";

export default function LayoutMapPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white overflow-hidden h-screen">
      <Suspense fallback={<div className="flex h-full w-full items-center justify-center text-gray-500">Loading map...</div>}>
        {children}
      </Suspense>
      <Toaster />
    </div>
  );
}
