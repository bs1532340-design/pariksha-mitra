'use client'

import { Suspense } from 'react'
import { AuthProvider } from '@/components/auth-provider'
import PricingContent from './pricing-content'

export const dynamic = 'force-dynamic'

export default function PricingPage() {
  return (
    <AuthProvider>
      <Suspense fallback={<div className="min-h-screen bg-background" />}>
        <PricingContent />
      </Suspense>
    </AuthProvider>
  )
}
