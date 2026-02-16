'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import ProgressiveSignUpForm from '@/components/progressive-sign-up-form'

export default function SignUpPage() {
  const router = useRouter()

  const handleSuccess = () => {
    router.push('/auth/sign-up-success')
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-gradient-to-br from-white to-purple-50">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
              <CardTitle className="text-2xl">Create Account</CardTitle>
              <CardDescription className="text-purple-100">Join Lernix today</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ProgressiveSignUpForm onSuccess={handleSuccess} />
            </CardContent>
          </Card>

          <div className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-purple-600 font-semibold hover:text-purple-700">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
