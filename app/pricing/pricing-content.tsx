'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Check, Zap } from 'lucide-react'
import { useState } from 'react'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

export default function PricingContent() {
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const isPro = session?.user?.plan === 'pro'

  const handleUpgrade = async () => {
    setIsLoading(true)
    try {
      // Razorpay integration would go here
      const response = await fetch('/api/billing/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })

      const data = await response.json()
      
      if (data.razorpayOrderId) {
        // Load Razorpay script and initiate payment
        const script = document.createElement('script')
        script.src = 'https://checkout.razorpay.com/v1/checkout.js'
        script.onload = () => {
          const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            order_id: data.razorpayOrderId,
            handler: async (response: any) => {
              // Verify payment
              const verifyResponse = await fetch('/api/billing/verify-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  razorpayOrderId: response.razorpay_order_id,
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpaySignature: response.razorpay_signature,
                }),
              })

              if (verifyResponse.ok) {
                window.location.href = '/dashboard?upgraded=true'
              }
            },
          }
          // @ts-ignore
          new window.Razorpay(options).open()
        }
        document.body.appendChild(script)
      }
    } catch (error) {
      console.error('Upgrade error:', error)
      alert('Failed to process upgrade')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 flex flex-col">
      <Navigation />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-20">
        {/* Header */}
        <div className="text-center space-y-4 mb-16 max-w-2xl animate-in duration-500">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">
            <span className="bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">
              Simple, Transparent Pricing
            </span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Choose the plan that fits your needs. Upgrade or downgrade anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
          {/* Free Plan */}
          <div className="relative rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm p-8 flex flex-col hover:shadow-lg hover:shadow-accent/10 transition-all duration-500">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-2">Free</h3>
              <p className="text-muted-foreground text-sm mb-4">Perfect for getting started</p>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-bold text-accent">$0</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </div>

            <button
              disabled={!session || !isPro ? false : true}
              className="w-full py-2.5 px-4 bg-card/50 text-foreground border border-border/50 hover:bg-card/80 hover:border-accent/50 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-semibold transition-all duration-300 mb-8"
            >
              {session && !isPro ? 'Current Plan' : 'Get Started'}
            </button>

            {/* Features */}
            <div className="space-y-4 flex-1">
              {[
                '3 proposals per day',
                'Basic templates',
                'Copy & download proposals',
                'Hindi + English support',
                'Community support',
              ].map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-foreground text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pro Plan */}
          <div className="relative rounded-2xl border border-accent/50 bg-card/80 backdrop-blur-sm p-8 flex flex-col shadow-lg shadow-accent/10 md:scale-105 group hover:shadow-xl hover:shadow-accent/20 transition-all duration-500">
            {/* Badge */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-semibold shadow-lg shadow-accent/30">
                Most Popular
              </span>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">Pro</h3>
              <p className="text-muted-foreground text-sm mb-4">For professionals and teams</p>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-bold text-accent">$15</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </div>

            <button
              onClick={handleUpgrade}
              disabled={isLoading || (session && isPro)}
              className="w-full py-2.5 px-4 bg-accent hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed text-accent-foreground rounded-lg font-semibold transition-all duration-300 mb-8 flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4" />
              {session && isPro ? 'Current Plan' : 'Upgrade Now'}
            </button>

            {/* Features */}
            <div className="space-y-4 flex-1">
              {[
                'Unlimited proposals',
                'Premium templates',
                'PDF export with branding',
                'Hindi + English + Hinglish',
                'Priority support',
                'Advanced analytics',
                'Team collaboration',
              ].map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-foreground text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-20 max-w-2xl w-full space-y-6">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Frequently Asked Questions</h2>

          <div className="space-y-4">
            {[
              {
                q: 'Can I upgrade or downgrade anytime?',
                a: 'Yes! You can change your plan at any time from your dashboard. Changes take effect immediately.',
              },
              {
                q: 'Do you offer refunds?',
                a: 'We offer a 7-day money-back guarantee on all Pro plan purchases.',
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards via Razorpay, and PayPal for international payments.',
              },
              {
                q: 'Is there a contract or commitment?',
                a: 'No! All plans are month-to-month with no long-term commitment. Cancel anytime.',
              },
            ].map((item, idx) => (
              <div key={idx} className="p-6 bg-card/50 border border-border/50 rounded-lg hover:border-accent/30 transition-all duration-300">
                <h3 className="font-semibold text-foreground mb-2">{item.q}</h3>
                <p className="text-muted-foreground text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
