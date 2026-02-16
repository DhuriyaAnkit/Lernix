'use client'

import React from "react"

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface SignUpFormProps {
  onSuccess?: () => void
}

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
  'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi',
]

export default function SignUpForm({ onSuccess }: SignUpFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    address: '',
    pinCode: '',
    city: '',
    state: '',
    country: 'India',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const validateForm = (): boolean => {
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

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!validateForm()) {
      return
    }

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

      {/* Full Name */}
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

      {/* Mobile Number */}
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

      {/* Address */}
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

      {/* Pin Code */}
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

      {/* City */}
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

      {/* State */}
      <div className="space-y-2">
        <Label htmlFor="state">State *</Label>
        <select
          id="state"
          name="state"
          value={formData.state}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-slate-300 rounded-md text-slate-900"
          required
        >
          <option value="">Select a state</option>
          {INDIAN_STATES.map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      </div>

      {/* Country */}
      <div className="space-y-2">
        <Label htmlFor="country">Country *</Label>
        <Input
          id="country"
          type="text"
          name="country"
          value={formData.country}
          disabled
          className="bg-slate-100"
        />
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="signup-email">Email *</Label>
        <Input
          id="signup-email"
          type="email"
          name="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      {/* Password */}
      <div className="space-y-2">
        <Label htmlFor="signup-password">Password *</Label>
        <Input
          id="signup-password"
          type="password"
          name="password"
          placeholder="At least 8 characters"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      {/* Confirm Password */}
      <div className="space-y-2">
        <Label htmlFor="confirm-password">Confirm Password *</Label>
        <Input
          id="confirm-password"
          type="password"
          name="confirmPassword"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Creating account...' : 'Create Account'}
      </Button>
    </form>
  )
}
