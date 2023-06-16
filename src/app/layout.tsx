import Header from "@/components/Header";
import "./globals.css";
import { Montserrat } from "next/font/google";
import AuthContext from "@/context/AuthContext";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "outstagram",
  description: "아싸들을 위한 SNS",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={montserrat.className}>
      <body className="w-full max-w-screen-xl overflow-scroll mx-auto">
        <AuthContext>
          <header className="sticky top-0 bg-white z-10 border-b">
            <Header />
          </header>
          <main> {children}</main>
        </AuthContext>
      </body>
    </html>
  );
}
