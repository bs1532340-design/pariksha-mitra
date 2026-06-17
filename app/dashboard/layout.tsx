'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { LogOut, Home, BarChart3, Settings, FileText } from 'lucide-react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 flex items-center justify-center">
        <div className="animate-spin">
          <div className="w-12 h-12 border-4 border-border border-t-accent rounded-full"></div>
        </div>
      </div>
    )
  }

  if (status === 'unauthenticated') {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 w-64 h-screen bg-card/50 backdrop-blur-md border-r border-border/40 overflow-y-auto">
        {/* Logo */}
        <div className="p-6 border-b border-border/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center">
              <span className="text-white font-bold">CF</span>
            </div>
            <h1 className="text-xl font-bold text-foreground">ClientForge</h1>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-6 space-y-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-accent/10 rounded-lg transition-all duration-300"
          >
            <Home className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>

          <Link
            href="/dashboard/proposals"
            className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-accent/10 rounded-lg transition-all duration-300"
          >
            <FileText className="w-5 h-5" />
            <span>Proposals</span>
          </Link>

          <Link
            href="/dashboard/usage"
            className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-accent/10 rounded-lg transition-all duration-300"
          >
            <BarChart3 className="w-5 h-5" />
            <span>Usage</span>
          </Link>

          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-accent/10 rounded-lg transition-all duration-300"
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </Link>
        </nav>

        {/* User Info */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="p-4 bg-card border border-border/50 rounded-lg mb-4">
            <p className="text-sm text-muted-foreground mb-1">Signed in as</p>
            <p className="text-sm font-semibold text-foreground truncate">{session?.user?.email}</p>
            <p className="text-xs text-accent mt-2 capitalize">
              {session?.user?.plan || 'free'} Plan
            </p>
          </div>

          <button
            onClick={() => {
              fetch('/api/auth/signout', { method: 'POST' }).then(() => redirect('/login'))
            }}
            className="w-full flex items-center gap-2 px-4 py-2 bg-destructive/10 hover:bg-destructive/20 text-destructive rounded-lg transition-all duration-300 text-sm font-medium"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {children}
      </main>
    </div>
  )
}
