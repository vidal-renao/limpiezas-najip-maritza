import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AngebotLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className="bg-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
