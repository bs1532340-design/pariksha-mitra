'use client'

import { Suspense } from 'react'
import { AuthProvider } from '@/components/auth-provider'
import PrivacyContent from './privacy-content'

export const dynamic = 'force-dynamic'

export default function PrivacyPage() {
  return (
    <AuthProvider>
      <Suspense fallback={<div className="min-h-screen bg-background" />}>
        <PrivacyContent />
      </Suspense>
    </AuthProvider>
  )
}
