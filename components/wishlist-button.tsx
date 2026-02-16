'use client'

import { useState, useTransition } from 'react'
import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { addToWishlist, removeFromWishlist } from '@/app/actions/wishlist'
import { useRouter } from 'next/navigation'

export default function WishlistButton({
  courseId,
  initialState = false,
  isAuthenticated,
}) {
  const [isInWishlist, setIsInWishlist] = useState(initialState)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleWishlist = () => {
    if (!isAuthenticated) {
      router.push('/auth/login')
      return
    }

    startTransition(async () => {
      const result = isInWishlist
        ? await removeFromWishlist(courseId)
        : await addToWishlist(courseId)

      if (result?.success) {
        setIsInWishlist(!isInWishlist)
      } else {
        console.error(result?.error)
      }
    })
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleWishlist}
      disabled={isPending}
    >
      <Heart
        className={`h-6 w-6 ${
          isInWishlist
            ? 'fill-red-500 text-red-500'
            : 'text-gray-400 hover:text-red-500'
        }`}
      />
    </Button>
  )
}
