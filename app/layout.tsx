import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "@YonatanPerlin",
  description: "Done in less than 120 minutes, using CHatGPT 4o",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
