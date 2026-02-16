'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidateTag } from 'next/cache'

export async function addToWishlist(courseId: string) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { error: 'You must be logged in to add to wishlist' }
    }

    const { error } = await supabase.from('wishlist').insert({
      user_id: user.id,
      course_id: courseId,
    })

    if (error) {
      return { error: error.message }
    }

    revalidateTag(`wishlist-${user.id}`)
    return { success: true }
  } catch (err) {
    return { error: 'Failed to add to wishlist' }
  }
}

export async function removeFromWishlist(courseId: string) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { error: 'You must be logged in' }
    }

    const { error } = await supabase
      .from('wishlist')
      .delete()
      .eq('user_id', user.id)
      .eq('course_id', courseId)

    if (error) {
      return { error: error.message }
    }

    revalidateTag(`wishlist-${user.id}`)
    return { success: true }
  } catch (err) {
    return { error: 'Failed to remove from wishlist' }
  }
}

export async function getWishlist() {
  try {
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { data: [], error: null }
    }

    const { data, error } = await supabase
      .from('wishlist')
      .select('course_id')
      .eq('user_id', user.id)

    if (error) {
      return { data: [], error: error.message }
    }

    return { data: data.map(item => item.course_id), error: null }
  } catch (err) {
    return { data: [], error: 'Failed to fetch wishlist' }
  }
}

export async function getFullWishlist() {
  try {
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { data: [], error: null }
    }

    const { data, error } = await supabase
      .from('wishlist')
      .select('*, courses(*)')
      .eq('user_id', user.id)

    if (error) {
      return { data: [], error: error.message }
    }

    return { data: data || [], error: null }
  } catch (err) {
    return { data: [], error: 'Failed to fetch wishlist' }
  }
}
