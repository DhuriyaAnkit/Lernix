'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { BookOpen, LogOut, Heart } from 'lucide-react'

export default function Navbar() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)
      } catch (error) {
        console.error('Error checking user:', error)
      } finally {
        setLoading(false)
      }
    }

    checkUser()
  }, [])

  const handleLogout = async () => {
    try {
      const supabase = createClient()
      await supabase.auth.signOut()
      setUser(null)
      window.location.href = '/'
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <nav className="bg-white border-b border-purple-200 text-gray-900 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl hover:text-purple-600 transition-colors">
            <BookOpen className="h-6 w-6 text-purple-600" />
            Lernix
          </Link>

          <div className="flex items-center gap-6">
            <Link href="/#courses" className="text-gray-900 hover:text-purple-600 transition-colors font-semibold">
              Courses
            </Link>
            <Link href="/pricing" className="text-gray-900 hover:text-purple-600 transition-colors font-semibold">
              Pricing
            </Link>

            {!loading && (
              <>
                {user ? (
                  <div className="flex items-center gap-3">
                    <Link href="/wishlist">
                      <Button variant="ghost" size="sm" className="text-gray-900 hover:text-red-500 font-semibold">
                        <Heart className="h-4 w-4 mr-2" />
                        Wishlist
                      </Button>
                    </Link>
                    <Link href="/dashboard">
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                        Dashboard
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      onClick={handleLogout}
                      className="border-purple-600 text-purple-600 hover:bg-purple-50"
                      variant="outline"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <Link href="/auth/login">
                    <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                      Sign In
                    </Button>
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
