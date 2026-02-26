'use client'

import { useState, useEffect } from 'react'
import HeroSlider from '@/components/hero-slider'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import AuthModal from '@/components/auth-modal'
import CourseSearch from '@/components/course-search'
import CourseCard from '@/components/course-card'
import Navbar from '@/components/navbar'
import { COURSES } from '@/lib/products'
import Footer from '@/components/footer'
import TrustedCompanies from '@/components/trusted-companies'
import { Sparkles, BookOpen, Users, TrendingUp } from 'lucide-react'
import Link from 'next/link'


export default function Home() {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [filteredCourses, setFilteredCourses] = useState(COURSES)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAuthModal(true)
    }, 10000)

    return () => clearTimeout(timer)
  }, [])

  const stats = [
    { icon: BookOpen, label: 'Courses', value: '50+' },
    { icon: Users, label: 'Students', value: '150K+' },
    { icon: TrendingUp, label: 'Success Rate', value: '95%' },
    { icon: Sparkles, label: 'Expert Instructors', value: '25+' },
  ]

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-b from-white via-purple-50 to-blue-50 text-gray-900">

        {/* ✅ HERO SLIDER HERE */}
        <HeroSlider />


        {/* Stats Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <Card
                  key={stat.label}
                  className="bg-white/60 border-purple-200 p-6 text-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <Icon className="h-8 w-8 mx-auto mb-3 text-purple-600" />
                  <p className="text-2xl font-bold mb-1 text-gray-900">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-900 font-semibold">
                    {stat.label}
                  </p>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/40">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
              Why Choose Lernix?
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Industry Experts',
                  description:
                    'Learn from leading AI researchers and practitioners with 15+ years of experience',
                },
                {
                  title: 'Practical Projects',
                  description:
                    'Build real-world AI applications and add them to your portfolio',
                },
                {
                  title: 'Lifetime Access',
                  description:
                    'Unlimited access to course materials, updates, and community support',
                },
                {
                  title: 'Certificates',
                  description:
                    'Earn recognized certificates upon course completion to boost your career',
                },
                {
                  title: 'Career Support',
                  description:
                    'Access to job board and career guidance from AI industry professionals',
                },
                {
                  title: 'Community',
                  description:
                    'Join 150K+ learners and network with professionals in AI field',
                },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="p-6 rounded-lg border border-purple-200 bg-white/70 hover:shadow-md transition-shadow"
                >
                  <h3 className="text-xl font-bold mb-3 text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-900 font-medium">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <TrustedCompanies />

        {/* Courses Section */}
        <section
          id="courses"
          className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
        >
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-8">
              Featured AI Courses
            </h2>

            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Explore our comprehensive curriculum designed to take you from
              beginner to advanced AI practitioner
            </p>

            <div className="mb-8">
              <CourseSearch
                courses={COURSES}
                onFilter={setFilteredCourses}
              />
            </div>

            {filteredCourses.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-300 text-lg">
                  No courses found matching your filters.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-blue-600">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 text-white">
              Start Your AI Journey Today
            </h2>
            <p className="text-lg mb-8 text-white/90">
              Join thousands of students mastering AI and launching
              successful careers
            </p>
            <Button
              size="lg"
              onClick={() => setShowAuthModal(true)}
              className="bg-white text-purple-600 hover:bg-gray-100 font-semibold"
            >
              Enroll Now
            </Button>
          </div>
        </section>
        
        <Footer />

        <AuthModal
          open={showAuthModal}
          onOpenChange={setShowAuthModal}
        />
      </main>
    </>
  )
}