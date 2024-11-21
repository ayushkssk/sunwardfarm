"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const products = [
  {
    name: "Fresh Cow Milk",
    description: "Pure and nutritious milk straight from our cows.",
    price: "₹50 per liter",
    image: "/placeholder.svg?height=200&width=300"
  },
  {
    name: "Organic Dragon Fruit",
    description: "Taste the exotic sweetness of our dragon fruit.",
    price: "₹100 per kg",
    image: "/placeholder.svg?height=200&width=300"
  },
  {
    name: "Creamy Yogurt",
    description: "Delicious and healthy yogurt made from fresh milk.",
    price: "₹40 per 500g",
    image: "/placeholder.svg?height=200&width=300"
  },
  {
    name: "Dragon Fruit Jam",
    description: "Homemade jam from our organic dragon fruits.",
    price: "₹80 per 250g jar",
    image: "/placeholder.svg?height=200&width=300"
  },
  {
    name: "Paneer",
    description: "Fresh, homemade paneer from our cow's milk.",
    price: "₹200 per kg",
    image: "/placeholder.svg?height=200&width=300"
  },
  {
    name: "Dragon Fruit Smoothie Mix",
    description: "Ready-to-blend smoothie mix with our dragon fruit.",
    price: "₹120 per pack",
    image: "/placeholder.svg?height=200&width=300"
  }
]

export default function Products() {
  const productsRef = useRef(null)

  useEffect(() => {
    gsap.from(productsRef.current?.children, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out"
    })
  }, [])

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Products</h1>
      <div ref={productsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <Card key={index} className="bg-white bg-opacity-80 backdrop-blur-lg">
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={200}
                className="rounded-lg mb-4"
              />
              <CardDescription>{product.description}</CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between">
              <span className="font-bold">{product.price}</span>
              <Button>Add to Cart</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

