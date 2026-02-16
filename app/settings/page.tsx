'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Card } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { AlertCircle } from 'lucide-react'
import Navbar from '@/components/navbar'

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
  'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi',
]

interface ProfileData {
  full_name: string
  mobile_number: string
  address: string
  pin_code: string
  city: string
  state: string
  country: string
}

export default function SettingsPage() {
  const [profile, setProfile] = useState<ProfileData>({
    full_name: '',
    mobile_number: '',
    address: '',
    pin_code: '',
    city: '',
    state: '',
    country: 'India',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
          router.push('/auth/login')
          return
        }

        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (!error && data) {
          setProfile({
            full_name: data.full_name || '',
            mobile_number: data.mobile_number || '',
            address: data.address || '',
            pin_code: data.pin_code || '',
            city: data.city || '',
            state: data.state || '',
            country: data.country || 'India',
          })
        }
      } catch (err) {
        setError('Failed to load profile')
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setProfile(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    setError('')
    setMessage('')

    if (!profile.full_name.trim()) {
      setError('Full name is required')
      return
    }
    if (!profile.mobile_number.trim()) {
      setError('Mobile number is required')
      return
    }
    if (!/^\d{10}$/.test(profile.mobile_number)) {
      setError('Mobile number must be 10 digits')
      return
    }
    if (!profile.address.trim()) {
      setError('Address is required')
      return
    }
    if (!profile.pin_code.trim()) {
      setError('Pin code is required')
      return
    }
    if (!/^\d{6}$/.test(profile.pin_code)) {
      setError('Pin code must be 6 digits')
      return
    }
    if (!profile.city.trim()) {
      setError('City is required')
      return
    }
    if (!profile.state) {
      setError('State is required')
      return
    }

    setSaving(true)
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        setError('You must be logged in')
        return
      }

      const { error } = await supabase
        .from('profiles')
        .update(profile)
        .eq('id', user.id)

      if (error) {
        setError(error.message)
      } else {
        setMessage('Profile updated successfully!')
      }
    } catch (err) {
      setError('Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gradient-to-b from-white to-purple-50 text-gray-900">
          <div className="max-w-2xl mx-auto px-4 py-20">
            <p className="text-gray-600">Loading...</p>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-white to-purple-50 text-gray-900">
        <div className="max-w-2xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-8 text-purple-900">Profile Settings</h1>

          <Card className="bg-white border-purple-200 p-8 shadow-sm">
            {message && (
              <Alert className="mb-6 bg-green-100 border-green-300">
                <AlertCircle className="h-4 w-4 text-green-700" />
                <AlertDescription className="text-green-800">{message}</AlertDescription>
              </Alert>
            )}

            {error && (
              <Alert variant="destructive" className="mb-6 bg-red-100 border-red-300">
                <AlertCircle className="h-4 w-4 text-red-700" />
                <AlertDescription className="text-red-800">{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="full_name" className="text-gray-900">Full Name *</Label>
                <Input
                  id="full_name"
                  name="full_name"
                  value={profile.full_name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="bg-white border-purple-300 text-gray-900"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mobile_number">Mobile Number *</Label>
                <Input
                  id="mobile_number"
                  name="mobile_number"
                  value={profile.mobile_number}
                  onChange={handleChange}
                  placeholder="9876543210"
                  className="bg-white/5 border-white/20 text-grey-900"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address *</Label>
                <Input
                  id="address"
                  name="address"
                  value={profile.address}
                  onChange={handleChange}
                  placeholder="123 Main Street"
                  className="bg-white/5 border-white/20 text-gray-900"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pin_code">Pin Code *</Label>
                <Input
                  id="pin_code"
                  name="pin_code"
                  value={profile.pin_code}
                  onChange={handleChange}
                  placeholder="123456"
                  className="bg-white/5 border-white/20 text-gray-900"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  name="city"
                  value={profile.city}
                  onChange={handleChange}
                  placeholder="Mumbai"
                  className="bg-white/5 border-white/20 text-grey-900"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">State *</Label>
                <select
                  id="state"
                  name="state"
                  value={profile.state}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-white/20 rounded-md bg-white/5 text-grey-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select a state</option>
                  {INDIAN_STATES.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country *</Label>
                <Input
                  id="country"
                  name="country"
                  value={profile.country}
                  disabled
                  className="bg-white/10 border-white/20 text-grey-900"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleSave}
                  disabled={saving}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.push('/dashboard')}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </>
  )
}
