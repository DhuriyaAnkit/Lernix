'use client'

import Image from 'next/image'

const companies = [
  '/companies/volkswagen.svg',
  '/companies/samsung.svg',
  '/companies/cisco.svg',
  '/companies/vimeo.svg',
  '/companies/hp.svg',
  '/companies/citi.svg',
  '/companies/ericsson.svg',
  '/companies/lexus.svg',
]

export default function TrustedCompanies() {
  return (
    <section className="py-12 bg-gray-100 border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-6 text-center">

        {/* TEXT */}
        <p className="text-gray-600 mb-8 text-lg">
          Trusted by over <span className="font-semibold">17,000</span> companies
          and millions of learners around the world
        </p>

        {/* LOGOS */}
        <div className="flex flex-wrap items-center justify-center gap-10 opacity-60 grayscale">
          {companies.map((logo, index) => (
            <div key={index} className="relative h-10 w-28">
              <Image
                src={logo}
                alt="company"
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}