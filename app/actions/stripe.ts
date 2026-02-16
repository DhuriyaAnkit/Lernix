'use server'

import { stripe } from '@/lib/stripe'
import { COURSES } from '@/lib/products'
import { createClient } from '@/lib/supabase/server'

export async function createCheckoutSession(courseId: string) {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return { error: 'Please sign in to purchase a course' }
  }

  const course = COURSES.find((c) => c.id === courseId)
  if (!course) {
    return { error: 'Course not found' }
  }

  try {
    const { url } = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: course.name,
              description: course.description,
              images: [course.image],
            },
            unit_amount: course.priceInCents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/course/${courseId}?session_id={CHECKOUT_SESSION_ID}`,
      customer_email: user.email,
      metadata: {
        courseId: course.id,
        userId: user.id,
      },
    })

    return { url }
  } catch (error) {
    console.error('Stripe error:', error)
    return { error: 'Failed to create checkout session' }
  }
}

export async function retrieveCheckoutSession(sessionId: string) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    return { session }
  } catch (error) {
    console.error('Error retrieving session:', error)
    return { error: 'Failed to retrieve session' }
  }
}
