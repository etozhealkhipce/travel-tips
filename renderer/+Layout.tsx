import type React from "react";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";

import "~/globals.css";
import "@fontsource/nunito/400.css";
import "@fontsource/nunito/500.css";
import "@fontsource/nunito/700.css";
import { LayoutHeader } from "~/widgets/layout/header";

export default function LayoutDefault({ children }: { children: React.ReactNode }) {
  return (
      <div className="bg-gray-200 overflow-hidden flex flex-col h-screen">
        <LayoutHeader />
        <main className="flex-grow overflow-y-auto p-4 app-scroll">

          <Suspense fallback={<div className="flex h-full w-full items-center justify-center text-gray-500">Loading...</div>}>
            {children}
          </Suspense>
        </main>
        <Toaster />
      </div>
  );
}
