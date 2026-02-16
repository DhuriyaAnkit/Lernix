'use client'

import { Course } from '@/lib/products'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Star, Users, Clock, BookOpen } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import WishlistButton from './wishlist-button'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface CourseCardProps {
  course: Course
  onEnroll?: () => void
  isAuthenticated?: boolean
}

// Mock hook to check auth status
function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/check')
        const data = await response.json()
        setIsAuthenticated(data.authenticated)
      } catch (err) {
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }
    checkAuth()
  }, [])

  return { isAuthenticated, isLoading }
}

export default function CourseCard({ course, onEnroll, isAuthenticated = false }: CourseCardProps) {
  const { isAuthenticated: authStatus } = useAuth()
  const authenticated = isAuthenticated || authStatus

  return (
    <Card className="overflow-hidden flex flex-col h-full border-purple-200 hover:shadow-lg transition-shadow bg-white">
      <div className="relative h-40 w-full bg-gradient-to-br from-purple-500 to-blue-600">
        {course.image && (
          <Image
            src={course.image || "/placeholder.svg"}
            alt={course.name}
            fill
            className="object-cover"
          />
        )}
        <div className="absolute top-2 right-2">
          <WishlistButton courseId={course.id} isAuthenticated={authenticated} />
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-lg line-clamp-2 text-gray-900">{course.name}</h3>
          <Badge
            variant="outline"
            className={
              course.level === 'beginner'
                ? 'bg-green-100 text-green-800'
                : course.level === 'intermediate'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-red-100 text-red-800'
            }
          >
            {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {course.description}
        </p>

        <div className="space-y-3 mb-4 text-sm">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">{course.rating}</span>
            <span className="text-muted-foreground">({course.students.toLocaleString()} students)</span>
          </div>

          <div className="flex gap-4 text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span>{course.lessons} lessons</span>
            </div>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between gap-2">
          <div className="text-2xl font-bold text-purple-600">
            ${(course.priceInCents / 100).toFixed(2)}
          </div>
          <Link href={`/course/${course.id}`}>
            <Button size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
              View Course
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  )
}
