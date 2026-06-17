'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Loader2, ArrowRight, Check } from 'lucide-react'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import ProposalForm from '@/components/proposal-form'
import ProposalOutput from '@/components/proposal-output'
import PricingSection from '@/components/pricing-section'

export default function HomePage() {
  const { data: session } = useSession()
  const router = useRouter()
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
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <Navigation />

      {/* Hero Section */}
      <div className="relative z-10 flex min-h-[calc(100vh-70px)] flex-col items-center justify-center px-4 py-8 md:py-12">
        <div className="w-full max-w-6xl space-y-8 md:space-y-12">
          {/* Header */}
          <div className="text-center space-y-4 md:space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-center">
              <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-lg bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center shadow-lg shadow-accent/20">
                <span className="text-white font-bold text-2xl md:text-3xl">CF</span>
              </div>
            </div>

            <div className="space-y-3 md:space-y-4">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
                <span className="bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">
                  Forge Winning Proposals
                </span>{' '}
                with AI
              </h1>

              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto text-balance px-2">
                Create compelling, customized proposals in seconds. Support for multiple
                languages including Hindi, English, and Hinglish.
              </p>

              {!session && (
                <div className="flex gap-4 justify-center pt-4 flex-wrap">
                  <button
                    onClick={() => router.push('/signup')}
                    className="px-6 md:px-8 py-2.5 md:py-3 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-lg transition-all duration-300 flex items-center gap-2"
                  >
                    Get Started Free
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => router.push('/pricing')}
                    className="px-6 md:px-8 py-2.5 md:py-3 border border-border/50 hover:border-accent/50 text-foreground hover:text-accent font-semibold rounded-lg transition-all duration-300"
                  >
                    View Pricing
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Form Side */}
            <div className="flex justify-center md:justify-end w-full">
              <ProposalForm onSubmit={handleGenerateProposal} />
            </div>

            {/* Output Side */}
            <div className="flex justify-center md:justify-start w-full">
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

      {/* Features Section */}
      <section id="features" className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Why Choose ClientForge?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to create professional proposals in minutes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'AI-Powered',
                description: 'Advanced AI generates professional proposals tailored to your needs',
                icon: '✨',
              },
              {
                title: 'Multi-Language',
                description: 'Support for Hindi, English, and Hinglish to reach all your clients',
                icon: '🌐',
              },
              {
                title: 'Export Options',
                description: 'Download as PDF with branding, copy to clipboard, or share directly',
                icon: '📤',
              },
              {
                title: 'Real-time Generation',
                description: 'Get your proposals in seconds, not hours',
                icon: '⚡',
              },
              {
                title: 'Professional Templates',
                description: 'Pre-designed templates for all types of projects and services',
                icon: '📋',
              },
              {
                title: 'Usage Tracking',
                description: 'Monitor your proposal generation history and usage statistics',
                icon: '📊',
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-border/50 bg-card/30 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10 transition-all duration-500 group"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection />

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Ready to transform your proposal process?
            </h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of freelancers and agencies already using ClientForge
            </p>
          </div>

          <div className="flex gap-4 justify-center flex-wrap">
            {!session && (
              <>
                <button
                  onClick={() => router.push('/signup')}
                  className="px-8 py-3 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-lg transition-all duration-300 flex items-center gap-2"
                >
                  Start Creating Proposals
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => router.push('/pricing')}
                  className="px-8 py-3 border border-border/50 hover:border-accent/50 text-foreground hover:text-accent font-semibold rounded-lg transition-all duration-300"
                >
                  View Plans
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
