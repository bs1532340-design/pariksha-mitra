import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Razorpay API would be called here to create an order
    // For now, this is a placeholder that returns a mock order ID
    const razorpayOrderId = `order_${Date.now()}`

    // Store order in database for verification later
    await prisma.subscription.upsert({
      where: { userId: session.user.id },
      update: {
        // Update fields if needed
      },
      create: {
        userId: session.user.id,
        plan: 'pro',
        status: 'pending',
        razorpaySubscriptionId: razorpayOrderId,
      },
    })

    return NextResponse.json({
      razorpayOrderId,
      amount: 1500, // $15 * 100 for cents
      currency: 'INR',
    })
  } catch (error) {
    console.error('Order creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}
