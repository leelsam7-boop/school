import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "School Database - Sign In",
  description: "Secure authentication portal for school database management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
