"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  const headerRef = useRef(null)
  const productRef = useRef(null)

  useEffect(() => {
    gsap.from(headerRef.current, {
      opacity: 0,
      y: -50,
      duration: 1,
      ease: "power3.out"
    })

    gsap.from(productRef.current?.children, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out"
    })
  }, [])

  return (
    <div className="container mx-auto px-4 py-12">
      <section ref={headerRef} className="text-center mb-16 gradient-bg p-8 rounded-lg">
        <h1 className="text-4xl font-bold mb-4 text-white">Pure farm goodness</h1>
        <p className="text-xl mb-8 text-white">Fresh milk &amp; dragon fruit</p>
        <Button asChild className="bg-white text-black hover:bg-gray-200">
          <Link href="/products">VIEW PRODUCTS</Link>
        </Button>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">PURE MILK &amp; DRAGON FRUIT</h2>
        <h3 className="text-2xl mb-4 text-center">Quality farming at its best</h3>
        <p className="text-lg mb-8">
          At Sunward Farms, we take pride in producing the finest milk from our happy cows and cultivating delicious dragon fruit. Located in Patna, IN, our commitment to sustainable farming practices ensures that every drop of milk and every fruit is of the highest quality. We believe in nurturing our land and livestock to bring you fresh, nutritious produce that you can trust. Join us on our journey towards a healthier and tastier tomorrow!
        </p>
        <div className="text-center">
          <Button asChild>
            <Link href="/contact">Get in touch</Link>
          </Button>
        </div>
      </section>

      <section ref={productRef}>
        <h2 className="text-3xl font-bold mb-8 text-center">PURE DAIRY DELIGHT</h2>
        <h3 className="text-2xl mb-8 text-center">Fresh milk and exotic fruits await</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-opacity-80 backdrop-blur-lg">
            <CardHeader>
              <CardTitle>Fresh cow milk</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Pure and nutritious milk straight from our cows.</CardDescription>
            </CardContent>
          </Card>
          <Card className="bg-opacity-80 backdrop-blur-lg">
            <CardHeader>
              <CardTitle>Organic dragon fruit</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Taste the exotic sweetness of our dragon fruit.</CardDescription>
            </CardContent>
          </Card>
          <Card className="bg-opacity-80 backdrop-blur-lg">
            <CardHeader>
              <CardTitle>Creamy yogurt</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Delicious and healthy yogurt made from fresh milk.</CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}

