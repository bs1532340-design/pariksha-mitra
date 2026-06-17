'use client'

import { Suspense } from 'react'
import { AuthProvider } from '@/components/auth-provider'
import HomePage from './home'

export const dynamic = 'force-dynamic'

export default function Page() {
  return (
    <AuthProvider>
      <Suspense fallback={<div className="min-h-screen bg-background" />}>
        <HomePage />
      </Suspense>
    </AuthProvider>
  )
}

