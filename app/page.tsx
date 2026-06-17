'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Loader2 } from 'lucide-react'
import ProposalForm from '@/components/proposal-form'
import ProposalOutput from '@/components/proposal-output'
import PricingSection from '@/components/pricing-section'

export default function Page() {
  const [proposal, setProposal] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGenerateProposal = async (formData: {
    serviceType: string
    clientType: string
    priceRange: string
    language: string
    extraDetails: string
  }) => {
    setIsLoading(true)
    setError(null)
    setProposal(null)

    try {
      const response = await fetch('/api/generate-proposal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        const errorMessage = data.error || 'Failed to generate proposal'
        throw new Error(errorMessage)
      }

      if (!data.proposal) {
        throw new Error('No proposal was generated')
      }

      setProposal(data.proposal)
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An error occurred'
      setError(errorMessage)
      console.error('[v0] Error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 md:gap-3 min-w-0">
            <Image
              src="/logo.png"
              alt="ClientForge"
              width={40}
              height={40}
              className="rounded-lg flex-shrink-0"
            />
            <span className="text-lg md:text-xl font-bold text-foreground truncate">ClientForge</span>
          </div>
          <span className="text-xs md:text-sm text-muted-foreground text-right whitespace-nowrap">Forge Winning Proposals with AI</span>
        </div>
      </nav>

      {/* Background gradient accent - animated */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 md:w-96 md:h-96 bg-accent/5 rounded-full blur-3xl float float-delay-1000"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 md:w-96 md:h-96 bg-accent/3 rounded-full blur-3xl float float-delay-500"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-[calc(100vh-70px)] flex-col items-center justify-center px-4 md:px-6 py-8 md:py-12">
        <div className="w-full max-w-6xl space-y-8 md:space-y-12">
          {/* Header */}
          <div className="text-center space-y-4 md:space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-center slide-up">
              <Image
                src="/logo.png"
                alt="ClientForge"
                width={80}
                height={80}
                className="rounded-lg shadow-lg shadow-accent/20 w-16 h-16 md:w-20 md:h-20 float"
              />
            </div>

            <div className="space-y-3 md:space-y-4 slide-up-delay-100">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
                <span className="bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">
                  Forge Winning Proposals
                </span>{' '}
                with AI
              </h1>

              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto text-balance px-2 slide-up-delay-200">
                Create compelling, customized proposals in seconds. Support for multiple
                languages including Hindi, English, and Hinglish.
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Form Side */}
            <div className="flex justify-center md:justify-end w-full slide-in-left">
              <ProposalForm onSubmit={handleGenerateProposal} />
            </div>

            {/* Output Side */}
            <div className="flex justify-center md:justify-start w-full slide-in-right">
              {error && (
                <div className="w-full max-w-2xl p-4 md:p-5 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive animate-in fade-in space-y-2">
                  <p className="font-medium text-sm md:text-base">Error: {error}</p>
                  {error.includes('not configured') && (
                    <p className="text-xs md:text-sm text-destructive/80">
                      Please add your Google Gemini API key in the project settings (Vars section).
                    </p>
                  )}
                </div>
              )}
              {isLoading ? (
                <div className="w-full max-w-2xl p-8 md:p-12 rounded-lg border border-border/50 bg-card/30 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="flex justify-center">
                      <div className="relative w-16 h-16">
                        <Loader2 className="w-16 h-16 animate-spin text-accent" />
                        <div className="absolute inset-0 bg-accent/10 rounded-full blur-lg"></div>
                      </div>
                    </div>
                    <h3 className="text-base md:text-lg font-semibold text-foreground">
                      Generating Proposal...
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      Crafting your winning proposal with AI
                    </p>
                  </div>
                </div>
              ) : proposal ? (
                <ProposalOutput proposal={proposal} />
              ) : (
                <div className="w-full max-w-2xl text-center py-8 md:py-12 px-4 md:px-6 rounded-lg border border-border/50 bg-card/30 backdrop-blur-sm">
                  <div className="space-y-3">
                    <div className="text-4xl md:text-5xl">📝</div>
                    <h3 className="text-base md:text-lg font-semibold text-foreground">
                      Your proposal will appear here
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground px-2">
                      Fill in the form and click &quot;Generate Proposal&quot; to
                      create a professional proposal powered by AI.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <PricingSection />

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/40 bg-background/50 backdrop-blur-sm py-8 md:py-12 px-4 md:px-6">
        <div className="max-w-6xl mx-auto text-center text-xs md:text-sm text-muted-foreground">
          <p>© 2024 ClientForge. Forge Winning Proposals with AI.</p>
        </div>
      </footer>
    </main>
  )
}
