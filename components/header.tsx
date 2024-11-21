"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Sun } from 'lucide-react'
import { useAuth } from "@/contexts/AuthContext"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"

gsap.registerPlugin(ScrollTrigger)

export function Header() {
  const headerRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLAnchorElement>(null)
  const navRef = useRef<HTMLUListElement>(null)
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const header = headerRef.current
    const logo = logoRef.current
    const navItems = navRef.current?.children

    gsap.from(header, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    })

    gsap.from(logo, {
      rotation: 360,
      duration: 1.5,
      ease: "elastic.out(1, 0.3)"
    })

    gsap.from(navItems, {
      y: -20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "power2.out"
    })

    ScrollTrigger.create({
      start: "top top",
      end: 99999,
      toggleClass: { className: 'bg-primary/50 backdrop-blur-lg', targets: header }
    })

    // Hover effect for nav items
    navItems && Array.from(navItems).forEach((item) => {
      item.addEventListener('mouseenter', () => {
        gsap.to(item, { y: -5, duration: 0.2, ease: "power2.out" })
      })
      item.addEventListener('mouseleave', () => {
        gsap.to(item, { y: 0, duration: 0.2, ease: "power2.out" })
      })
    })
  }, [])

  const handleLogout = async () => {
    try {
      await signOut(auth)
      router.push("/")
    } catch (error) {
      console.error("Failed to log out", error)
    }
  }

  return (
    <header ref={headerRef} className="fixed w-full z-50 transition-all duration-300">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" ref={logoRef} className="text-2xl font-bold flex items-center">
          <Sun className="mr-2" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 font-playfair">
            SUNWARD FARMS
          </span>
        </Link>
        <nav>
          <ul ref={navRef} className="flex space-x-6">
            <li><Link href="/" className="text-white hover:text-yellow-300 transition-colors font-merriweather">Home</Link></li>
            <li><Link href="/about" className="text-white hover:text-yellow-300 transition-colors font-merriweather">About</Link></li>
            <li><Link href="/products" className="text-white hover:text-yellow-300 transition-colors font-merriweather">Products</Link></li>
            <li><Link href="/blog" className="text-white hover:text-yellow-300 transition-colors font-merriweather">Blog</Link></li>
            <li><Link href="/contact" className="text-white hover:text-yellow-300 transition-colors font-merriweather">Contact</Link></li>
          </ul>
        </nav>
        {user ? (
          <div className="flex items-center space-x-4">
            <Button asChild className="bg-white text-primary hover:bg-yellow-100 transition-colors">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button onClick={handleLogout} variant="outline">Logout</Button>
          </div>
        ) : (
          <Button asChild className="bg-white text-primary hover:bg-yellow-100 transition-colors">
            <Link href="/login">Login</Link>
          </Button>
        )}
      </div>
    </header>
  )
}

