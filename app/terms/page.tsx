'use client'

import { Suspense } from 'react'
import { AuthProvider } from '@/components/auth-provider'
import TermsContent from './terms-content'

export const dynamic = 'force-dynamic'

export default function TermsPage() {
  return (
    <AuthProvider>
      <Suspense fallback={<div className="min-h-screen bg-background" />}>
        <TermsContent />
      </Suspense>
    </AuthProvider>
  )
}
