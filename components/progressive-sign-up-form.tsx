'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
  'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi',
]

interface SignUpFormProps {
  onSuccess?: () => void
}

export default function ProgressiveSignUpForm({ onSuccess }: SignUpFormProps) {
  const [step, setStep] = useState<'basic' | 'full'>('basic')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    mobileNumber: '',
    address: '',
    pinCode: '',
    city: '',
    state: '',
    country: 'India',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Show full form after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setStep('full')
    }, 10000)

    return () => clearTimeout(timer)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const validateBasic = (): boolean => {
    if (!formData.email.trim()) {
      setError('Email is required')
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Invalid email format')
      return false
    }
    if (!formData.password) {
      setError('Password is required')
      return false
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters')
      return false
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return false
    }
    return true
  }

  const validateFull = (): boolean => {
    if (!validateBasic()) return false
    if (!formData.fullName.trim()) {
      setError('Full name is required')
      return false
    }
    if (!formData.mobileNumber.trim()) {
      setError('Mobile number is required')
      return false
    }
    if (!/^\d{10}$/.test(formData.mobileNumber)) {
      setError('Mobile number must be 10 digits')
      return false
    }
    if (!formData.address.trim()) {
      setError('Address is required')
      return false
    }
    if (!formData.pinCode.trim()) {
      setError('Pin code is required')
      return false
    }
    if (!/^\d{6}$/.test(formData.pinCode)) {
      setError('Pin code must be 6 digits')
      return false
    }
    if (!formData.city.trim()) {
      setError('City is required')
      return false
    }
    if (!formData.state) {
      setError('State is required')
      return false
    }
    return true
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const isValid = step === 'basic' ? validateBasic() : validateFull()
    if (!isValid) return

    // If basic step, just move to full form
    if (step === 'basic') {
      setStep('full')
      return
    }

    // Submit registration
    setLoading(true)
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/protected`,
          data: {
            full_name: formData.fullName,
            first_name: formData.fullName.split(' ')[0],
            last_name: formData.fullName.split(' ').slice(1).join(' ') || '',
            mobile_number: formData.mobileNumber,
            address: formData.address,
            pin_code: formData.pinCode,
            city: formData.city,
            state: formData.state,
            country: formData.country,
          },
        },
      })

      if (error) {
        setError(error.message)
      } else {
        setError('Check your email to confirm your account!')
        onSuccess?.()
      }
    } catch (err) {
      setError('Failed to sign up')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSignUp} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
      {error && (
        <Alert variant={error.includes('Check') ? 'default' : 'destructive'}>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Basic Fields - Always Visible */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password *</Label>
          <Input
            id="password"
            type="password"
            name="password"
            placeholder="At least 8 characters"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password *</Label>
          <Input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Full Details - Appears After 10 Seconds */}
      {step === 'full' && (
        <div className="space-y-4 animate-fade-in">
          <div className="text-sm text-purple-600 font-semibold mb-4">
            Complete your profile
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              type="text"
              name="fullName"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mobileNumber">Mobile Number *</Label>
            <Input
              id="mobileNumber"
              type="tel"
              name="mobileNumber"
              placeholder="9876543210"
              value={formData.mobileNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address *</Label>
            <Input
              id="address"
              type="text"
              name="address"
              placeholder="123 Main Street"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pinCode">Pin Code *</Label>
            <Input
              id="pinCode"
              type="text"
              name="pinCode"
              placeholder="123456"
              value={formData.pinCode}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">City *</Label>
            <Input
              id="city"
              type="text"
              name="city"
              placeholder="Mumbai"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="state">State *</Label>
            <select
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
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
              type="text"
              name="country"
              value={formData.country}
              disabled
              className="bg-gray-100"
            />
          </div>
        </div>
      )}

      {/* Button */}
      <Button 
        type="submit" 
        disabled={loading} 
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold"
      >
        {loading ? 'Creating account...' : (step === 'basic' ? 'Continue' : 'Create Account')}
      </Button>

      {step === 'basic' && (
        <p className="text-xs text-gray-500 text-center">
          More registration details will appear automatically
        </p>
      )}
    </form>
  )
}
