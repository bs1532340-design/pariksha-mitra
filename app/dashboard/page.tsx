'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Zap, FileText, TrendingUp, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'

export const dynamic = 'force-dynamic'

interface DashboardStats {
  totalProposals: number
  proposalsThisMonth: number
  planLimit: number
  planUsed: number
}

export default function DashboardPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/dashboard/stats')
        const data = await response.json()
        setStats(data)
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const isPro = session?.user?.plan === 'pro'
  const dailyLimit = isPro ? Infinity : 3

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="animate-in duration-500">
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Welcome back, {session?.user?.name}!
        </h1>
        <p className="text-lg text-muted-foreground">
          Create compelling proposals with AI assistance
        </p>
      </div>

      {/* Upgrade CTA - Only for Free plan users */}
      {!isPro && (
        <div className="bg-gradient-to-r from-accent/10 via-accent/5 to-transparent border border-accent/30 rounded-2xl p-6 animate-in duration-500">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-2">Upgrade to Pro</h2>
              <p className="text-muted-foreground mb-4">
                Get unlimited proposals, PDF export, premium templates, and priority support.
              </p>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-lg transition-all duration-300"
              >
                <Zap className="w-4 h-4" />
                Upgrade Now
              </Link>
            </div>
            <Zap className="w-12 h-12 text-accent/40 flex-shrink-0" />
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Proposals Card */}
        <div className="bg-card/50 backdrop-blur border border-border/50 rounded-2xl p-6 hover:shadow-lg hover:shadow-accent/10 transition-all duration-500 animate-in duration-500">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-accent/10 rounded-lg">
              <FileText className="w-6 h-6 text-accent" />
            </div>
          </div>
          <h3 className="text-muted-foreground text-sm mb-1">Total Proposals</h3>
          <p className="text-3xl font-bold text-foreground mb-2">
            {loading ? '-' : stats?.totalProposals || 0}
          </p>
          <p className="text-xs text-muted-foreground">
            {loading ? '-' : stats?.proposalsThisMonth || 0} this month
          </p>
        </div>

        {/* Usage Card */}
        <div className="bg-card/50 backdrop-blur border border-border/50 rounded-2xl p-6 hover:shadow-lg hover:shadow-accent/10 transition-all duration-500 animate-in duration-500 delay-200">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-accent/10 rounded-lg">
              <TrendingUp className="w-6 h-6 text-accent" />
            </div>
          </div>
          <h3 className="text-muted-foreground text-sm mb-1">Daily Usage</h3>
          <p className="text-3xl font-bold text-foreground mb-2">
            {loading ? '-' : `${stats?.planUsed || 0}/${isPro ? '∞' : '3'}`}
          </p>
          <p className="text-xs text-muted-foreground">
            {isPro ? 'Unlimited daily proposals' : 'Resets daily'}
          </p>
        </div>

        {/* Plan Card */}
        <div className="bg-card/50 backdrop-blur border border-border/50 rounded-2xl p-6 hover:shadow-lg hover:shadow-accent/10 transition-all duration-500 animate-in duration-500 delay-300">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-accent/10 rounded-lg">
              <Sparkles className="w-6 h-6 text-accent" />
            </div>
          </div>
          <h3 className="text-muted-foreground text-sm mb-1">Current Plan</h3>
          <p className="text-3xl font-bold text-foreground mb-2 capitalize">
            {session?.user?.plan || 'Free'}
          </p>
          {!isPro && (
            <button
              onClick={() => router.push('/pricing')}
              className="text-xs text-accent hover:text-accent/80 font-semibold transition-colors"
            >
              View Pro features →
            </button>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => router.push('/')}
            className="p-6 bg-card/50 backdrop-blur border border-border/50 hover:border-accent/50 rounded-2xl transition-all duration-300 text-left group"
          >
            <div className="flex items-center gap-4 justify-between">
              <div>
                <h3 className="font-semibold text-foreground mb-1 group-hover:text-accent transition-colors">
                  Create New Proposal
                </h3>
                <p className="text-sm text-muted-foreground">
                  Start generating a professional proposal
                </p>
              </div>
              <Sparkles className="w-6 h-6 text-accent/40 group-hover:text-accent transition-colors" />
            </div>
          </button>

          <button
            onClick={() => router.push('/dashboard/proposals')}
            className="p-6 bg-card/50 backdrop-blur border border-border/50 hover:border-accent/50 rounded-2xl transition-all duration-300 text-left group"
          >
            <div className="flex items-center gap-4 justify-between">
              <div>
                <h3 className="font-semibold text-foreground mb-1 group-hover:text-accent transition-colors">
                  View Recent Proposals
                </h3>
                <p className="text-sm text-muted-foreground">
                  Check your proposal history
                </p>
              </div>
              <FileText className="w-6 h-6 text-accent/40 group-hover:text-accent transition-colors" />
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
