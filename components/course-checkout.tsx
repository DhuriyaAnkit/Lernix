'use client'

import { useEffect, useState } from 'react'
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { createCheckoutSession } from '@/app/actions/stripe'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '')

interface CourseCheckoutProps {
  courseId: string
  onClose: () => void
}

export default function CourseCheckout({ courseId, onClose }: CourseCheckoutProps) {
  const [clientSecret, setClientSecret] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const initCheckout = async () => {
      try {
        const result = await createCheckoutSession(courseId)
        if (result.error) {
          setError(result.error)
        } else if (result.url) {
          // For embedded checkout, we need to extract session ID from URL
          const url = new URL(result.url)
          const sessionId = url.searchParams.get('session_id')
          if (sessionId) {
            setClientSecret(sessionId)
          }
        }
      } catch (err) {
        setError('Failed to initialize checkout')
      } finally {
        setLoading(false)
      }
    }

    initCheckout()
  }, [courseId])

  if (loading) {
    return <div className="text-center py-8">Loading...</div>
  }

  if (error) {
    return (
      <>
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button onClick={onClose} variant="outline" className="w-full bg-transparent">
          Try Again
        </Button>
      </>
    )
  }

  if (!clientSecret) {
    return (
      <>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Failed to load checkout. Please try again.</AlertDescription>
        </Alert>
        <Button onClick={onClose} variant="outline" className="w-full mt-4 bg-transparent">
          Close
        </Button>
      </>
    )
  }

  return (
    <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
      <div className="space-y-4">
        <EmbeddedCheckout />
        <Button onClick={onClose} variant="outline" className="w-full bg-transparent">
          Cancel
        </Button>
      </div>
    </EmbeddedCheckoutProvider>
  )
}
