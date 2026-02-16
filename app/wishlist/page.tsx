'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Navbar from '@/components/navbar'
import CourseCard from '@/components/course-card'
import { getWishlist } from '@/app/actions/wishlist'
import { COURSES } from '@/lib/products'
import Link from 'next/link'
import { Heart } from 'lucide-react'

export default function WishlistPage() {
  const [wishlistCourseIds, setWishlistCourseIds] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWishlist = async () => {
      const result = await getWishlist()
      setWishlistCourseIds(result.data)
      setLoading(false)
    }
    fetchWishlist()
  }, [])

  const wishlistCourses = COURSES.filter(course => wishlistCourseIds.includes(course.id))

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-white to-purple-50 text-gray-900">
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2 flex items-center gap-3 text-purple-900">
                <Heart className="h-10 w-10 fill-red-500 text-red-500" />
                My Wishlist
              </h1>
              <p className="text-gray-700">
                Save courses for later and track your learning interests
              </p>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Loading your wishlist...</p>
              </div>
            ) : wishlistCourses.length > 0 ? (
              <>
                <div className="mb-6 p-4 bg-purple-100 border border-purple-300 rounded-lg">
                  <p className="text-purple-900 font-medium">
                    You have {wishlistCourses.length} course{wishlistCourses.length !== 1 ? 's' : ''} in your wishlist
                  </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {wishlistCourses.map(course => (
                    <CourseCard key={course.id} course={course} isAuthenticated={true} />
                  ))}
                </div>
              </>
            ) : (
              <Card className="bg-white border-purple-200 p-12 text-center shadow-sm">
                <Heart className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <h2 className="text-2xl font-bold mb-2 text-gray-900">Your wishlist is empty</h2>
                <p className="text-gray-600 mb-6">
                  Start adding courses to your wishlist to save them for later
                </p>
                <Link href="/#courses">
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                    Explore Courses
                  </Button>
                </Link>
              </Card>
            )}
          </div>
        </section>
      </main>
    </>
  )
}
