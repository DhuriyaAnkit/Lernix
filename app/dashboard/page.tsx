'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { COURSES } from '@/lib/products'
import { BookOpen, LogOut, Settings, Award, Clock } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface Enrollment {
  id: string
  course_id: string
  enrolled_at: string
  progress: number
}

interface UserProfile {
  id: string
  full_name: string
  email: string
  mobile_number?: string
  address?: string
  city?: string
  state?: string
  pin_code?: string
  country?: string
}

export default function Dashboard() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const supabase = createClient()
        
        // Get current user
        const { data: { user: authUser }, error: authError } = await supabase.auth.getUser()
        
        if (authError || !authUser) {
          router.push('/auth/login')
          return
        }

        // Fetch user profile
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authUser.id)
          .single()

        if (!profileError && profile) {
          setUser({
            id: profile.id,
            full_name: profile.full_name || authUser.email?.split('@')[0] || 'User',
            email: authUser.email || '',
            mobile_number: profile.mobile_number,
            address: profile.address,
            city: profile.city,
            state: profile.state,
            pin_code: profile.pin_code,
            country: profile.country,
          })
        }

        // Fetch enrollments
        const { data: enrollmentData, error: enrollmentError } = await supabase
          .from('enrollments')
          .select('*')
          .eq('user_id', authUser.id)

        if (!enrollmentError && enrollmentData) {
          setEnrollments(enrollmentData)
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [router])

  const handleLogout = async () => {
    try {
      const supabase = createClient()
      await supabase.auth.signOut()
      router.push('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const getEnrolledCourses = () => {
    return enrollments
      .map((enrollment) => {
        const course = COURSES.find((c) => c.id === enrollment.course_id)
        return course ? { ...course, progress: enrollment.progress, enrolledAt: enrollment.enrolled_at } : null
      })
      .filter((c) => c !== null)
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-white to-purple-50 text-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <p className="text-xl text-slate-300">Loading...</p>
        </div>
      </main>
    )
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-white to-purple-50 text-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <p className="text-xl text-slate-300">Please log in to view your dashboard.</p>
          <Link href="/auth/login">
            <Button className="mt-4">Sign In</Button>
          </Link>
        </div>
      </main>
    )
  }

  const enrolledCourses = getEnrolledCourses()

  return (
  <main className="min-h-screen bg-gradient-to-b from-white to-purple-50 text-gray-900">

      {/* Header */}
      <div className="border-b border-purple-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Welcome back, {user.full_name}!</h1>
              <p className="text-slate-400 mt-1">{user.email}</p>
            </div>
            <div className="flex gap-3">
              <Link href="/settings">
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Profile Information */}
        <div className="mb-8 p-6 bg-white border border-purple-200 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-purple-900">Profile Information</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-900 font-semibold">Full Name</p>
              <p className="font-bold text-gray-900 text-lg">{user.full_name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-900 font-semibold">Email</p>
              <p className="font-bold text-gray-900 text-lg">{user.email}</p>
            </div>
            {user.mobile_number && (
              <div>
                <p className="text-sm text-gray-900 font-semibold">Mobile Number</p>
                <p className="font-bold text-gray-900 text-lg">{user.mobile_number}</p>
              </div>
            )}
            {user.city && (
              <div>
                <p className="text-sm text-gray-900 font-semibold">City</p>
                <p className="font-bold text-gray-900 text-lg">{user.city}</p>
              </div>
            )}
            {user.state && (
              <div>
                <p className="text-sm text-gray-900 font-semibold">State</p>
                <p className="font-bold text-gray-900 text-lg">{user.state}</p>
              </div>
            )}
            {user.pin_code && (
              <div>
                <p className="text-sm text-gray-900 font-semibold">Pin Code</p>
                <p className="font-bold text-gray-900 text-lg">{user.pin_code}</p>
              </div>
            )}
            {user.address && (
              <div className="md:col-span-2">
                <p className="text-sm text-gray-900 font-semibold">Address</p>
                <p className="font-bold text-gray-900 text-lg">{user.address}</p>
              </div>
            )}
          </div>
          <Link href="/settings">
            <Button size="sm" className="mt-4 bg-purple-600 hover:bg-purple-700 text-gray-100">
              Edit Profile
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-white border-purple-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <BookOpen className="h-6 w-6 text-purple-600 mb-3" />
            <p className="text-sm text-gray-600">Enrolled Courses</p>
            <p className="text-3xl font-bold mt-1 text-gray-900">{enrolledCourses.length}</p>
          </Card>
          <Card className="bg-white border-blue-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <Award className="h-6 w-6 text-blue-600 mb-3" />
            <p className="text-sm text-gray-600">Certificates</p>
            <p className="text-3xl font-bold mt-1 text-gray-900">{enrolledCourses.filter((c) => (c?.progress || 0) === 100).length}</p>
          </Card>
          <Card className="bg-white border-purple-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <Clock className="h-6 w-6 text-purple-600 mb-3" />
            <p className="text-sm text-gray-600">Hours Learned</p>
            <p className="text-3xl font-bold mt-1">
              {enrolledCourses.reduce((sum, course) => sum + parseInt(course?.duration?.split(' ')[0] || '0') * 10, 0)}+
            </p>
          </Card>
          <Card className="bg-white border-purple-200 shadow-sm p-6">
            <span className="text-2xl mb-3">📊</span>
            <p className="text-sm text-slate-400">Average Progress</p>
            <p className="text-3xl font-bold mt-1">
              {enrolledCourses.length > 0
                ? Math.round(enrolledCourses.reduce((sum, c) => sum + (c?.progress || 0), 0) / enrolledCourses.length)
                : 0}%
            </p>
          </Card>
        </div>

        {/* Enrolled Courses */}
        <div>
          <h2 className="text-3xl font-bold mb-6">My Courses</h2>

          {enrolledCourses.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map((course) => (
                <Card key={course?.id} className="bg-white border-purple-200 shadow-sm overflow-hidden flex flex-col">
                  <div className="h-32 bg-gradient-to-br from-blue-500 to-purple-600 relative">
                    <div className="absolute inset-0 flex items-center justify-center opacity-20 text-5xl font-bold">
                      {course?.name[0]}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold mb-2">{course?.name}</h3>
                    <p className="text-sm text-slate-400 mb-4">By {course?.instructor}</p>

                    <div className="mb-4 flex-grow">
                      <p className="text-sm text-slate-300 mb-2">Progress</p>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all"
                          style={{ width: `${course?.progress || 0}%` }}
                        />
                      </div>
                      <p className="text-xs text-slate-400 mt-1">{course?.progress || 0}% complete</p>
                    </div>

                    <Link href={`/course/${course?.id}`}>
                      <Button className="w-full bg-transparent" variant="outline">
                        Continue Learning
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-white border-purple-200 shadow-sm p-12 text-center">

              <BookOpen className="h-12 w-12 mx-auto text-slate-400 mb-4" />
              <p className="text-xl text-slate-300 mb-4">You haven't enrolled in any courses yet.</p>
              <Link href="/">
                <Button>Browse Courses</Button>
              </Link>
            </Card>
          )}
        </div>
      </div>
    </main>
  )
}
