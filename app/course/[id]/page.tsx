'use client'

import { useParams } from 'next/navigation'
import { COURSES } from '@/lib/products'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useEffect, useState } from 'react'
import { Star, Users, Clock, BookOpen, CheckCircle, MessageCircle, Award, Heart } from 'lucide-react'
import Link from 'next/link'
import CourseCheckout from '@/components/course-checkout'
import AuthModal from '@/components/auth-modal'
import Navbar from '@/components/navbar'
import WishlistButton from '@/components/wishlist-button'

export default function CoursePage() {
  const params = useParams()
  const courseId = params.id as string
  const course = COURSES.find((c) => c.id === courseId)
  const [showCheckout, setShowCheckout] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Check if user is logged in
    const checkUser = async () => {
      try {
        const { createClient } = await import('@/lib/supabase/client')
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)
      } catch (error) {
        console.error('Error checking user:', error)
      }
    }
    checkUser()
  }, [])

  if (!course) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-white to-purple-50 text-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Course Not Found</h1>
          <p className="text-gray-600 mb-8">The course you're looking for doesn't exist.</p>
          <Link href="/">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">Back to Courses</Button>
          </Link>
        </div>
      </main>
    )
  }

  const handleEnroll = () => {
    if (!user) {
      setShowAuthModal(true)
    } else {
      setShowCheckout(true)
    }
  }

  const curriculum = [
    {
      week: 1,
      title: 'Introduction & Fundamentals',
      lessons: ['Course Overview', 'AI/ML Basics', 'Prerequisites Review'],
    },
    {
      week: 2,
      title: 'Core Concepts',
      lessons: ['Key Algorithms', 'Mathematical Foundations', 'Practical Examples'],
    },
    {
      week: 3,
      title: 'Hands-On Projects',
      lessons: ['Project Setup', 'Implementation Guide', 'Code Walkthroughs'],
    },
    {
      week: 4,
      title: 'Advanced Topics',
      lessons: ['Optimization', 'Best Practices', 'Industry Insights'],
    },
  ]

  const reviews = [
    {
      name: 'John Davis',
      rating: 5,
      text: 'Excellent course! The instructor explained complex concepts in a simple way. Highly recommended!',
    },
    {
      name: 'Sarah Chen',
      rating: 5,
      text: 'Great practical projects. I was able to apply what I learned immediately in my job.',
    },
    {
      name: 'Mike Johnson',
      rating: 4,
      text: 'Very comprehensive material. Would have liked more advanced examples.',
    },
  ]

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-white to-purple-50 text-gray-900">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600/10 to-blue-600/10 border-b border-purple-200">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <Link href="/" className="text-purple-600 hover:text-purple-700 mb-6 inline-block font-semibold">
              ← Back to Courses
            </Link>
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-5xl font-bold text-purple-900 flex-1">{course.name}</h1>
              <WishlistButton courseId={course.id} isAuthenticated={!!user} />
            </div>
            <div className="flex flex-wrap gap-4 items-center">
              <Badge variant="outline" className="capitalize bg-purple-100 text-purple-700 border-purple-300">{course.level}</Badge>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-gray-900">{course.rating}</span>
                <span className="text-gray-600">({course.students.toLocaleString()} students)</span>
              </div>
            </div>
          </div>
        </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-12">
          {/* Course Info */}
          <section>
            <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mb-8 flex items-center justify-center">
              <span className="text-6xl font-bold opacity-20">{course.name[0]}</span>
            </div>

            <h2 className="text-3xl font-bold mb-4 text-purple-900">About This Course</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-8">{course.description}</p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-white border-purple-200 p-6 hover:shadow-md transition-shadow">
                <Clock className="h-6 w-6 text-purple-600 mb-3" />
                <p className="text-sm text-gray-600">Duration</p>
                <p className="text-2xl font-bold text-gray-900">{course.duration}</p>
              </Card>
              <Card className="bg-white border-purple-200 p-6 hover:shadow-md transition-shadow">
                <BookOpen className="h-6 w-6 text-blue-600 mb-3" />
                <p className="text-sm text-gray-600">Lessons</p>
                <p className="text-2xl font-bold text-gray-900">{course.lessons}</p>
              </Card>
              <Card className="bg-white border-purple-200 p-6 hover:shadow-md transition-shadow">
                <Users className="h-6 w-6 text-purple-600 mb-3" />
                <p className="text-sm text-gray-600">Students</p>
                <p className="text-2xl font-bold text-gray-900">{(course.students / 1000).toFixed(1)}K+</p>
              </Card>
            </div>
          </section>

          {/* Instructor */}
          <section>
            <h2 className="text-3xl font-bold mb-6 text-purple-900">Meet Your Instructor</h2>
            <Card className="bg-white border-purple-200 p-8">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-4xl font-bold text-white">
                  {course.instructor[0]}
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">{course.instructor}</h3>
                  <p className="text-gray-700">
                    15+ years of experience in AI and machine learning. Published researcher with multiple patents.
                  </p>
                </div>
              </div>
            </Card>
          </section>

          {/* Curriculum */}
          <section>
            <h2 className="text-3xl font-bold mb-6 text-purple-900">What You'll Learn</h2>
            <div className="space-y-6">
              {curriculum.map((section) => (
                <Card key={section.week} className="bg-white border-purple-200 p-6 hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-bold mb-4">Week {section.week}: {section.title}</h3>
                  <ul className="space-y-3">
                    {section.lessons.map((lesson) => (
                      <li key={lesson} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                        <span className="text-slate-300">{lesson}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </section>

          {/* Reviews */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Student Reviews</h2>
            <div className="space-y-6">
              {reviews.map((review) => (
                <Card key={review.name} className="bg-white/5 border-white/10 p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      {review.name[0]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold">{review.name}</h4>
                        <div className="flex gap-1">
                          {Array(review.rating).fill(0).map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-slate-300">{review.text}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column - Sidebar */}
        <div>
          <div className="sticky top-8 space-y-6">
            {/* Price Card */}
            <Card className="bg-white/10 border-white/20 p-8">
              <p className="text-5xl font-bold mb-6">${(course.priceInCents / 100).toFixed(2)}</p>

              {showCheckout ? (
                <div className="mb-6">
                  <CourseCheckout courseId={course.id} onClose={() => setShowCheckout(false)} />
                </div>
              ) : (
                <Button
                  size="lg"
                  onClick={handleEnroll}
                  className="w-full mb-4 bg-blue-600 hover:bg-blue-700"
                >
                  {user ? 'Enroll Now' : 'Sign In to Enroll'}
                </Button>
              )}

              <ul className="space-y-3 text-sm text-slate-300 pt-6 border-t border-white/10">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                  Lifetime access
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                  Mobile friendly
                </li>
                <li className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-green-400 flex-shrink-0" />
                  Certificate included
                </li>
                <li className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                  Community support
                </li>
              </ul>
            </Card>

            {/* Share */}
            <Card className="bg-white/5 border-white/10 p-6">
              <p className="font-bold mb-4">Share This Course</p>
              <div className="flex gap-3">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  Share
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />
      </main>
    </>
  )
}
