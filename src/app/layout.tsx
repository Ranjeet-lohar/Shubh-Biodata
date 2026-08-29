import type { Metadata } from "next";
import { Cormorant_Garamond, Work_Sans } from "next/font/google";
import ThemeRegistry from "./ThemeRegistry";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shubh Biodata — Create Free Marriage Biodata Online | PDF & Word",
  description:
    "Design your marriage biodata online for free. Choose from elegant templates, fill your details, and download instantly as PDF or Word. Bilingual Hindi & English support.",
  keywords: [
    "marriage biodata maker",
    "free biodata format",
    "biodata for marriage pdf",
    "shaadi biodata online",
    "hindi biodata format",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
