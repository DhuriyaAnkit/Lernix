'use client'

import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-[#1c1d1f] text-gray-300 mt-20">

      {/* TOP SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">

        {/* Column 1 */}
        <div>
          <h3 className="text-white font-semibold mb-4">In-demand Careers</h3>
          <ul className="space-y-2 text-sm">
            <li>Data Scientist</li>
            <li>Full Stack Web Developer</li>
            <li>Cloud Engineer</li>
            <li>Project Manager</li>
            <li>Game Developer</li>
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="text-white font-semibold mb-4">Web Development</h3>
          <ul className="space-y-2 text-sm">
            <li>Web Development</li>
            <li>JavaScript</li>
            <li>React JS</li>
            <li>Angular</li>
            <li>Java</li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="text-white font-semibold mb-4">IT Certifications</h3>
          <ul className="space-y-2 text-sm">
            <li>Amazon AWS</li>
            <li>AWS Cloud Practitioner</li>
            <li>Azure Fundamentals</li>
            <li>AWS Architect</li>
            <li>Kubernetes</li>
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <h3 className="text-white font-semibold mb-4">Leadership</h3>
          <ul className="space-y-2 text-sm">
            <li>Leadership</li>
            <li>Management Skills</li>
            <li>Project Management</li>
            <li>Productivity</li>
            <li>Emotional Intelligence</li>
          </ul>
        </div>

        {/* Column 5 */}
        <div>
          <h3 className="text-white font-semibold mb-4">Data Science</h3>
          <ul className="space-y-2 text-sm">
            <li>Python</li>
            <li>Machine Learning</li>
            <li>ChatGPT</li>
            <li>Deep Learning</li>
          </ul>
        </div>

        {/* Column 6 */}
        <div>
          <h3 className="text-white font-semibold mb-4">Business</h3>
          <ul className="space-y-2 text-sm">
            <li>Excel</li>
            <li>SQL</li>
            <li>Power BI</li>
            <li>Data Analysis</li>
            <li>Business Analysis</li>
          </ul>
        </div>

      </div>

      {/* MIDDLE SECTION */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">

          <div>
            <h3 className="text-white font-semibold mb-4">About</h3>
            <ul className="space-y-2 text-sm">
              <li>About us</li>
              <li>Careers</li>
              <li>Contact us</li>
              <li>Blog</li>
              <li>Investors</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Discover Lernix</h3>
            <ul className="space-y-2 text-sm">
              <li>Get the app</li>
              <li>Teach on Lernix</li>
              <li>Plans & Pricing</li>
              <li>Affiliate</li>
              <li>Help and Support</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Lernix for Business</h3>
            <ul className="space-y-2 text-sm">
              <li>Lernix Business</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>Accessibility</li>
              <li>Privacy policy</li>
              <li>Sitemap</li>
              <li>Terms</li>
            </ul>
          </div>

        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">

          <div className="text-white font-bold text-lg">
            Lernix
          </div>

          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Lernix Inc. All rights reserved.
          </p>

        </div>
      </div>

    </footer>
  )
}