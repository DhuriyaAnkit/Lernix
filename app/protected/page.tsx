import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function ProtectedPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/auth/login')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-white to-purple-50 text-gray-900">
      <div className="max-w-md text-center">
        <h1 className="mb-4 text-4xl font-bold text-purple-900">Welcome!</h1>
        <p className="mb-6 text-xl text-gray-700">You've successfully logged in to Lernix.</p>
        <a
          href="/dashboard"
          className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
        >
          Go to Dashboard
        </a>
      </div>
    </div>
  )
}
