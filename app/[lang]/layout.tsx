import "@/app/globals.css";
import Nav from "@/components/Nav";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: 'Multi Language Next App',
  description: 'Multi Language Next App',
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  params: Promise<{ lang: string }>
  children: React.ReactNode;
}>) {
  const { lang } = await params
  return (
    <html lang={lang} dir={lang === "ar" ? "rtl" : "ltr"} >
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Nav />
        {children}
      </body>
    </html>
  )
}
