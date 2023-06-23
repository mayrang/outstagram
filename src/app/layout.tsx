import Header from "@/components/Header";
import "./globals.css";
import { Montserrat } from "next/font/google";
import AuthContext from "@/context/AuthContext";
import SWRContext from "@/context/SWRContext";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "outstagram",
  description: "아싸들을 위한 SNS",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={montserrat.className}>
      <body className="w-full max-w-screen-xl overflow-y-scroll mx-auto">
        <AuthContext>
          <header className="sticky top-0 bg-white z-10 border-b">
            <Header />
          </header>
          <main className="w-full min-h-full flex justify-center bg-neutral-50">
            <SWRContext>{children}</SWRContext>
          </main>
        </AuthContext>
        <div id="modal" />
      </body>
    </html>
  );
}
