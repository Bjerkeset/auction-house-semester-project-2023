import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import Topbar from "@/components/shared/navigation/Topbar";
import {ThemeProvider} from "@/components/providers/theme-provider";
import {Toaster} from "@/components/ui/toaster";
import {Noto_Serif_Display} from "next/font/google";
import FramerMotionProvider from "@/components/providers/FramerMotionProvider";
// import url('https://fonts.googleapis.com/css2?family=Quattrocento&display=swap');
import {Quattrocento} from "next/font/google";

const inter = Inter({subsets: ["latin"]});
const NotoSerif = Noto_Serif_Display({subsets: ["latin"]});
const quattrocento = Quattrocento({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Auction House",
  description: "Buy and sell exclusive art",
};
interface RootLayoutProps {
  children: React.ReactNode;
}
export default function RootLayout({children}: RootLayoutProps) {
  return (
    <>
      <html lang="en" className="scroll-smooth" suppressHydrationWarning>
        <head />
        <body
          className={`flex flex-col items-center scroll-smooth ${quattrocento}`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Topbar />
            <FramerMotionProvider>{children}</FramerMotionProvider>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
