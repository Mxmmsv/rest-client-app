import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "REST client",
  description: "REST client app for final task in RSSchool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
