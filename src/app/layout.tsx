import Header from "@/components/Header";
import "./globals.css";
import { Montserrat } from "next/font/google";
import AuthContext from "@/context/AuthContext";
import SWRContext from "@/context/SWRContext";
import { Metadata } from "next";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "outstagram",
    template: "outstagram | %s",
  },
  description: "아싸들을 위한 SNS",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={montserrat.className}>
      <body className="w-full overflow-y-scroll bg-neutral-50">
        <AuthContext>
          <header className="sticky top-0 bg-white z-10 border-b">
            <div className="max-w-screen-xl mx-auto">
              <Header />
            </div>
          </header>
          <main className="w-full min-h-full flex overflow-auto justify-center max-w-screen ">
            <SWRContext>{children}</SWRContext>
          </main>
        </AuthContext>
        <div id="modal" />
      </body>
    </html>
  );
}
