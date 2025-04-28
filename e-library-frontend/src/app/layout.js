import { Roboto } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata = {
  title: "AL-NAHRAIN LIBRARY",
  description:
    "AL-NAHRAIN LIBRARY Application, The Graduation Project Of Dhulfiqar Ali For Al-Nahrain University Computer Engineering Department",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: [
    "nextjs",
    "next14",
    "pwa",
    "next-pwa",
    "al-nahrain library",
    "librery",
    "al-nahrain",
    "lms",
    "al-nahrain lms",
  ],
  appleWebApp: { title: "AL-NAHRAIN LIBRARY", statusBarStyle: "default" },
  icons: [
    { rel: "apple-touch-icon", url: "/icons/icon-144.png" },
    { rel: "icon", url: "/icons/icon-144.png" },
  ],
};

export const viewport = {
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
  minimumScale: 1,
  initialScale: 1,
  width: "device-width",
  shrinkToFit: "no",
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} antialiased`}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
