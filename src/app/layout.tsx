import Header from "@/components/Header";
import "./globals.css";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "outstagram",
  description: "아싸들을 위한 SNS",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={montserrat.className}>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
