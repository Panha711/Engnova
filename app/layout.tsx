import type { Metadata } from "next";
import { DM_Sans, Noto_Sans_Khmer } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import Providers from "./providers";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-app",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const notoSansKhmer = Noto_Sans_Khmer({
  subsets: ["khmer"],
  variable: "--font-khmer",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Engnova — Learn English smarter",
    template: "%s · Engnova",
  },
  description:
    "Engnova is a modern English learning platform: vocabulary flashcards, grammar lessons, reading, listening, and speaking practice.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${notoSansKhmer.variable}`}
      suppressHydrationWarning
    >
      <body>
        <AppRouterCacheProvider>
          <Providers>{children}</Providers>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
