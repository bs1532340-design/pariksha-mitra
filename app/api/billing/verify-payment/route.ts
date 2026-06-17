import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } =
      await request.json()

    // Verify payment signature with Razorpay API
    // This is a placeholder - actual verification would use Razorpay's API
    // In production: use crypto to verify the signature

    // Update user plan to Pro
    await prisma.user.update({
      where: { id: session.user.id },
      data: { plan: 'pro' },
    })

    // Update subscription record
    const nextMonthDate = new Date()
    nextMonthDate.setMonth(nextMonthDate.getMonth() + 1)

    await prisma.subscription.upsert({
      where: { userId: session.user.id },
      update: {
        plan: 'pro',
        status: 'active',
        razorpaySubscriptionId: razorpayPaymentId,
        currentPeriodStart: new Date(),
        currentPeriodEnd: nextMonthDate,
      },
      create: {
        userId: session.user.id,
        plan: 'pro',
        status: 'active',
        razorpaySubscriptionId: razorpayPaymentId,
        currentPeriodStart: new Date(),
        currentPeriodEnd: nextMonthDate,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Payment verification error:', error)
    return NextResponse.json(
      { error: 'Payment verification failed' },
      { status: 500 }
    )
  }
}
