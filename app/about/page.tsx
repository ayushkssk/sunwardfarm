"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const storyRef = useRef(null)
  const processRef = useRef(null)

  useEffect(() => {
    gsap.from(storyRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: storyRef.current,
        start: "top 80%",
      }
    })

    gsap.from(processRef.current?.children, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: processRef.current,
        start: "top 80%",
      }
    })
  }, [])

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">About Sunward Farms</h1>
      <div ref={storyRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          <p className="mb-4">
            Sunward Farms was founded with a vision to provide the freshest and highest quality dairy products and dragon fruit to our community. Located in the heart of Patna, IN, we've been nurturing our land and livestock for generations.
          </p>
          <p>
            Our commitment to sustainable farming practices and animal welfare ensures that every product from Sunward Farms is not only delicious but also ethically produced.
          </p>
        </div>
        <div>
          <Image
            src="/placeholder.svg?height=400&width=600"
            alt="Sunward Farms"
            width={600}
            height={400}
            className="rounded-lg"
          />
        </div>
      </div>
      <div ref={processRef} className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Our Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white bg-opacity-80 backdrop-blur-lg p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Dairy Production</h3>
            <p className="mb-4">
              Our dairy production process starts with the care of our happy cows. We ensure they have a balanced diet, clean living conditions, and plenty of outdoor time. Our milking process is gentle and efficient, and we use state-of-the-art equipment to ensure the highest quality and safety standards.
            </p>
            <Image
              src="/placeholder.svg?height=300&width=500"
              alt="Dairy Production"
              width={500}
              height={300}
              className="rounded-lg"
            />
          </div>
          <div className="bg-white bg-opacity-80 backdrop-blur-lg p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Dragon Fruit Cultivation</h3>
            <p className="mb-4">
              Our dragon fruit is grown with care in our specialized orchards. We use organic farming methods to ensure the fruit is free from harmful chemicals. The fruits are hand-picked at the peak of ripeness to ensure the best flavor and nutritional value.
            </p>
            <Image
              src="/placeholder.svg?height=300&width=500"
              alt="Dragon Fruit Cultivation"
              width={500}
              height={300}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

