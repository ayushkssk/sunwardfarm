"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Facebook, Instagram, Twitter } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const socialRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const footer = footerRef.current
    const socialIcons = socialRef.current?.children

    ScrollTrigger.create({
      trigger: footer,
      start: "top bottom",
      onEnter: () => {
        gsap.from(footer, {
          y: 100,
          opacity: 0,
          duration: 1,
          ease: "power3.out"
        })
      }
    })

    gsap.from(socialIcons, {
      scale: 0,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: socialRef.current,
        start: "top bottom"
      }
    })

    // Hover effect for social icons
    socialIcons && Array.from(socialIcons).forEach((icon) => {
      icon.addEventListener('mouseenter', () => {
        gsap.to(icon, { scale: 1.2, duration: 0.2, ease: "power2.out" })
      })
      icon.addEventListener('mouseleave', () => {
        gsap.to(icon, { scale: 1, duration: 0.2, ease: "power2.out" })
      })
    })
  }, [])

  return (
    <footer ref={footerRef} className="bg-primary text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold mb-2 text-yellow-300">Get in touch</h3>
            <p>contact@sunwardfarms.com</p>
            <p>+91 123-456-7890</p>
          </div>
          <div>
            <h3 className="font-bold mb-2 text-yellow-300">Location</h3>
            <p>Bhojpur, BR IN</p>
            <p>Pin: 802301</p>
          </div>
          <div>
            <h3 className="font-bold mb-2 text-yellow-300">Hours</h3>
            <ul>
              <li>Monday - Friday: 9:00 AM - 10:00 PM</li>
              <li>Saturday: 9:00 AM - 6:00 PM</li>
              <li>Sunday: 9:00 AM - 12:00 PM</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 flex flex-col items-center">
          <div ref={socialRef} className="flex space-x-4 mb-4">
            <Link href="#" className="text-white hover:text-yellow-300 transition-colors">
              <Facebook size={24} />
            </Link>
            <Link href="#" className="text-white hover:text-yellow-300 transition-colors">
              <Instagram size={24} />
            </Link>
            <Link href="#" className="text-white hover:text-yellow-300 transition-colors">
              <Twitter size={24} />
            </Link>
          </div>
          <p>&copy; 2023 Sunward Farms. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

