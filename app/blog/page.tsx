"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

gsap.registerPlugin(ScrollTrigger)

const blogPosts = [
  {
    title: "The Benefits of Organic Farming",
    excerpt: "Discover why organic farming is not just a trend, but a sustainable way of life...",
    date: "2023-06-15",
    author: "John Doe",
    image: "/placeholder.svg?height=200&width=300"
  },
  {
    title: "Dragon Fruit: The Superfood You Need",
    excerpt: "Learn about the incredible health benefits of dragon fruit and why you should include it in your diet...",
    date: "2023-06-10",
    author: "Jane Smith",
    image: "/placeholder.svg?height=200&width=300"
  },
  {
    title: "From Farm to Table: Our Journey",
    excerpt: "Follow the journey of our products from our farm to your table, and see the care we put into every step...",
    date: "2023-06-05",
    author: "Mike Johnson",
    image: "/placeholder.svg?height=200&width=300"
  }
]

export default function Blog() {
  const blogRef = useRef(null)

  useEffect(() => {
    gsap.from(blogRef.current?.children, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: blogRef.current,
        start: "top 80%",
      }
    })
  }, [])

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center font-playfair">Sunward Farms Blog</h1>
      <div ref={blogRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post, index) => (
          <Card key={index} className="bg-white bg-opacity-80 backdrop-blur-lg">
            <CardHeader>
              <Image
                src={post.image}
                alt={post.title}
                width={300}
                height={200}
                className="rounded-lg mb-4"
              />
              <CardTitle className="font-merriweather">{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{post.excerpt}</CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                <p>{post.date}</p>
                <p>By {post.author}</p>
              </div>
              <Button asChild>
                <Link href={`/blog/${index}`}>Read More</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

