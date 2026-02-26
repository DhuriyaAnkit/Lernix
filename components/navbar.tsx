'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  BookOpen,
  LogOut,
  Heart,
  ShoppingCart,
  Search,
  Globe,
} from 'lucide-react'

export default function Navbar() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // 🌍 Language state
  const [language, setLanguage] = useState('EN')
  const [langOpen, setLangOpen] = useState(false)

  useEffect(() => {
    const checkUser = async () => {
      try {
        const supabase = createClient()
        const {
          data: { user },
        } = await supabase.auth.getUser()

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
      window.location.href = '/'
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <nav className="bg-white border-b border-purple-200 text-gray-900 sticky top-0 z-50 shadow-sm">

      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div className="flex items-center justify-between h-16 gap-6 lg:gap-8">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl hover:text-purple-600"
          >
            <BookOpen className="h-6 w-6 text-purple-600" />
            Lernix
          </Link>

          {/* Explore */}
          <Link
            href="/#courses"
            className="font-semibold hover:text-purple-600"
          >
            Explore
          </Link>

          {/* Subscribe */}
          <Link
            href="/pricing"
            className="font-semibold hover:text-purple-600"
          >
            Subscribe
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full pl-10 pr-4 py-2 border rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Business */}
          <Link
            href="/business"
            className="font-semibold hover:text-purple-600"
          >
            Business
          </Link>

          {/* Cart */}
          <Link
            href="/cart"
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ShoppingCart className="h-5 w-5" />
          </Link>

          {/* 🌍 Language Selector */}
          <div className="relative">

            <button
              onClick={() => setLangOpen(!langOpen)}
              className="p-2 rounded-full hover:bg-gray-100 flex items-center gap-1"
            >
              <Globe className="h-5 w-5" />
              <span className="text-sm font-medium">{language}</span>
            </button>

            {langOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg z-50">
                {['EN', 'HI', 'FR', 'ES'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setLanguage(lang)
                      setLangOpen(false)
                      localStorage.setItem('lang', lang)
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Auth Section */}
          {!loading && (
            <>
              {user ? (
                <div className="flex items-center gap-3">

                  <Link href="/wishlist">
                    <Button variant="ghost" size="sm">
                      <Heart className="h-4 w-4 mr-2" />
                      Wishlist
                    </Button>
                  </Link>

                  <Link href="/dashboard">
                    <Button
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      Dashboard
                    </Button>
                  </Link>

                  <Button
                    size="sm"
                    onClick={handleLogout}
                    variant="outline"
                    className="border-purple-600 text-purple-600 hover:bg-purple-50"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>

                </div>
              ) : (
                <div className="flex gap-2">

                  <Link href="/auth/login">
                    <Button variant="outline">
                      Login
                    </Button>
                  </Link>

                  <Link href="/auth/sign-up">
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                      Sign Up
                    </Button>
                  </Link>

                </div>
              )}
            </>
          )}

        </div>

      </div>

    </nav>
  )
}