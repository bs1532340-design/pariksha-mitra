'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, LogOut } from 'lucide-react'
import { useState } from 'react'

export default function Navigation() {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const isActive = (path: string) => pathname === path

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-md hidden md:block">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center">
              <span className="text-white font-bold">CF</span>
            </div>
            <span className="text-xl font-bold text-foreground">ClientForge</span>
          </Link>

          {/* Center Links */}
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className={`transition-colors duration-300 ${
                isActive('/') ? 'text-accent font-semibold' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Home
            </Link>
            <Link
              href="/pricing"
              className={`transition-colors duration-300 ${
                isActive('/pricing') ? 'text-accent font-semibold' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Pricing
            </Link>
            <a
              href="#features"
              className="text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              Features
            </a>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            {session ? (
              <>
                <Link
                  href="/dashboard"
                  className="px-4 py-2 text-foreground hover:text-accent transition-colors duration-300"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="px-4 py-2 rounded-lg border border-border/50 text-muted-foreground hover:border-accent/50 hover:text-accent transition-all duration-300 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg font-semibold transition-all duration-300"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center">
              <span className="text-white font-bold text-sm">CF</span>
            </div>
            <span className="text-lg font-bold text-foreground">ClientForge</span>
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 hover:bg-card rounded-lg transition-colors"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="border-t border-border/40 p-4 space-y-4">
            <Link href="/" className="block text-foreground hover:text-accent transition-colors">
              Home
            </Link>
            <Link href="/pricing" className="block text-foreground hover:text-accent transition-colors">
              Pricing
            </Link>
            <a href="#features" className="block text-foreground hover:text-accent transition-colors">
              Features
            </a>

            <div className="border-t border-border/40 pt-4 space-y-2">
              {session ? (
                <>
                  <Link
                    href="/dashboard"
                    className="block w-full px-4 py-2 text-center text-foreground hover:text-accent transition-colors"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      signOut({ callbackUrl: '/' })
                      setIsOpen(false)
                    }}
                    className="w-full px-4 py-2 border border-border/50 text-muted-foreground hover:border-accent/50 hover:text-accent rounded-lg transition-all"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block w-full px-4 py-2 text-center text-foreground hover:text-accent transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    className="block w-full px-4 py-2 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg font-semibold text-center transition-all"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
