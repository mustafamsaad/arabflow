import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { Inter, Space_Grotesk as SpaceGrotesk } from "next/font/google";
import { ThemeProvider } from "../components/themeProvider";
import { Toaster } from "sonner";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

export const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

export const spaceGrotesk = SpaceGrotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "ArabOverflow",
  description:
    "An community-driven platform for arabs for asking and answering programming questions. Get help, share knowledge, and collaborate with developers from around the world. Explore topics in web development, mobile app development, algorithms, data structures, and more.",
  icons: {
    icon: "/images/site-logo.svg",
  },
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  return (
    <html lang="en" suppressHydrationWarning>
      <SessionProvider session={session}>
        <body
          className={`antialiased ${inter.className} ${spaceGrotesk.variable}`}
          suppressHydrationWarning
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster richColors position="top-center" />
          </ThemeProvider>
        </body>
      </SessionProvider>
    </html>
  );
};

export default RootLayout;
