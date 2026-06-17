import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { startOfDay, endOfDay } from 'date-fns'

export async function GET() {
  try {
    const session = await getServerSession()

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
      select: { id: true, plan: true },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Get total proposals
    const totalProposals = await prisma.proposal.count({
      where: { userId: user.id },
    })

    // Get proposals this month
    const today = new Date()
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)

    const proposalsThisMonth = await prisma.proposal.count({
      where: {
        userId: user.id,
        createdAt: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
    })

    // Get today's usage
    const today_start = startOfDay(new Date())
    const today_end = endOfDay(new Date())

    const todayUsage = await prisma.proposal.count({
      where: {
        userId: user.id,
        createdAt: {
          gte: today_start,
          lte: today_end,
        },
      },
    })

    return NextResponse.json({
      totalProposals,
      proposalsThisMonth,
      planLimit: user.plan === 'pro' ? Infinity : 3,
      planUsed: todayUsage,
    })
  } catch (error) {
    console.error('Stats error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}
