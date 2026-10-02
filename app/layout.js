import { Inter, Caveat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import CustomCursor from "@/components/CustomCursor";
import ScrollAnimations from "@/components/ScrollAnimations";
import AuditModal from "@/components/AuditModal";
import Analytics from "@/components/Analytics";
import { SITE_URL, baseOpenGraph } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Digital Growth Labs — Premium Digital Growth Studio · Vancouver",
  description:
    "A Vancouver-based digital growth studio. Google Business Profile, SEO, paid media, web, social and delivery platforms — whatever it takes to grow your online presence.",
  alternates: { canonical: "/" },
  openGraph: { ...baseOpenGraph, url: "/" },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${caveat.variable}`}>
      <body className="cursor-none-desktop">
        <ScrollAnimations />
        <CustomCursor />
        <ScrollProgress />
        <Navbar />
        {children}
        <AuditModal />
        <Analytics />
      </body>
    </html>
  );
}
