'use client'

import { COURSES } from '@/lib/products'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Navbar from '@/components/navbar'
import { Star, Users, Clock, BookOpen, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function PricingPage() {
  const sortedCourses = [...COURSES].sort((a, b) => a.priceInCents - b.priceInCents)

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-white to-purple-50 text-gray-900">
        {/* Header */}
        <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-blue-400/10 pointer-events-none" />

          <div className="relative max-w-7xl mx-auto text-center">
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 text-balance text-purple-900">
              Our <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Pricing</span>
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto text-balance">
              Quality education at affordable prices. All courses include lifetime access, certificates, and community support.
            </p>
          </div>
        </section>

        {/* Pricing Table */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {sortedCourses.map((course) => (
                <Card
                  key={course.id}
                  className="bg-white border-purple-200 overflow-hidden flex flex-col hover:shadow-lg transition-shadow"
                >
                  {/* Course Header */}
                  <div className="p-6 bg-gradient-to-br from-purple-600/5 to-blue-600/5 border-b border-purple-200">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-bold text-lg line-clamp-2 text-gray-900">{course.name}</h3>
                      <Badge
                        variant="outline"
                        className={
                          course.level === 'beginner'
                            ? 'bg-green-100 text-green-800'
                            : course.level === 'intermediate'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-purple-100 text-purple-800'
                        }
                      >
                        {course.level.slice(0, 3).toUpperCase()}
                      </Badge>
                    </div>

                    <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-1">
                      ${(course.priceInCents / 100).toFixed(2)}
                    </div>
                    <p className="text-sm text-gray-600">One-time payment</p>
                  </div>

                  {/* Course Stats */}
                  <div className="p-6 space-y-4 flex-grow">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{course.rating} rating</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4" />
                        <span>{course.students.toLocaleString()} students</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <BookOpen className="h-4 w-4" />
                        <span>{course.lessons} lessons</span>
                      </div>
                    </div>

                    <div className="border-t border-white/10 pt-4">
                      <p className="text-sm text-slate-400 mb-3">By {course.instructor}</p>
                      <p className="text-sm text-slate-300 line-clamp-3">{course.description}</p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="p-6 border-t border-white/10 space-y-2">
                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                        <span>Lifetime access</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                        <span>Certificate</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                        <span>Community access</span>
                      </div>
                    </div>

                    <Link href={`/course/${course.id}`} className="block">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        View Course
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">What's Included in Every Course</h2>

            <Card className="bg-white/5 border-white/10 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="px-6 py-4 text-left font-semibold">Feature</th>
                      <th className="px-6 py-4 text-center font-semibold">Included</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      'Lifetime access to course materials',
                      'All lesson videos and resources',
                      'Downloadable course materials',
                      'Hands-on projects and assignments',
                      'Certificate of completion',
                      'Community discussion forum',
                      'Email support from instructors',
                      'Mobile-friendly learning platform',
                      'Progress tracking and bookmarks',
                      'Free course updates',
                    ].map((feature) => (
                      <tr key={feature} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4">{feature}</td>
                        <td className="px-6 py-4 text-center">
                          <CheckCircle className="h-5 w-5 text-green-400 mx-auto" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-12 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Start Learning?</h2>
            <p className="text-lg mb-8 text-white/90">
              Choose a course and begin your AI journey today. All courses come with a satisfaction guarantee.
            </p>
            <Link href="/">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100">
                Browse All Courses
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
