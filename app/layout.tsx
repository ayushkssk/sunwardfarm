import type { Metadata } from "next"
import { Inter, Playfair_Display, Merriweather } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Script from "next/script"
import { AuthProvider } from "@/contexts/AuthContext"
import { FirebaseInitializer } from "@/components/FirebaseInitializer"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })
const merriweather = Merriweather({ weight: ["300", "400", "700", "900"], subsets: ["latin"], variable: "--font-merriweather" })

export const metadata: Metadata = {
  title: "Sunward Farms",
  description: "Fresh milk and dragon fruit from Patna, IN",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} ${merriweather.variable} font-sans bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white`}>
        <FirebaseInitializer>
          <AuthProvider>
            <Header />
            <main className="min-h-screen pt-16">{children}</main>
            <Footer />
          </AuthProvider>
        </FirebaseInitializer>
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/ScrollTrigger.min.js" />
      </body>
    </html>
  )
}

