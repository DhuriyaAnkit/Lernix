'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

const slides = [
  {
    title: "Learn AI with Google's experts",
    description:
      'Get the skills employers need now and earn certification.',
    image: '/slider/LAGE.png',
    button: 'Explore plan',
  },
  {
    title: 'Courses from ₹409',
    description:
      'Level up your skills for today and tomorrow. Limited time offer.',
    image: '/slider/Sel.jpg',
    button: 'Browse Courses',
  },
  {
    title: 'Become Job Ready',
    description:
      'Hands-on projects and real world training to boost your career.',
    image: '/slider/MAI.jpg',
    button: 'Start Learning',
  },
]

export default function HeroSlider() {
  const [index, setIndex] = useState(0)

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length)
  }

  // Auto slide
  useEffect(() => {
    const timer = setInterval(nextSlide, 6000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative w-full h-[420px] md:h-[480px] overflow-hidden">

      {/* SLIDER TRACK */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div key={i} className="relative w-full flex-shrink-0 h-full">

            {/* BACKGROUND IMAGE */}
            <Image
              src={slide.image}
              alt="slide"
              fill
              priority={i === 0}
              className="object-cover"
            />

            {/* CONTENT */}
            <div className="absolute inset-0 flex items-center max-w-7xl mx-auto px-6">
              <div className="bg-white rounded-lg shadow-xl p-8 max-w-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {slide.title}
                </h2>

                <p className="text-gray-600 mb-6">
                  {slide.description}
                </p>

                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  {slide.button}
                </Button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* LEFT BUTTON */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-3 hover:scale-110 transition"
      >
        <ChevronLeft />
      </button>

      {/* RIGHT BUTTON */}
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-3 hover:scale-110 transition"
      >
        <ChevronRight />
      </button>

      {/* DOTS */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              i === index ? 'bg-purple-600' : 'bg-white/60'
            }`}
          />
        ))}
      </div>
    </section>
  )
}