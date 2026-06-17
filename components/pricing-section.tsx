'use client'

import { Check } from 'lucide-react'

export default function PricingSection() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      description: 'Perfect for getting started',
      features: [
        '3 proposals per day',
        'Hindi + English support',
        'Basic proposal templates',
        'Copy to clipboard',
        'Download as text',
      ],
      cta: 'Get Started',
      highlighted: false,
    },
    {
      name: 'Pro',
      price: '$29',
      period: '/month',
      description: 'For serious proposal creators',
      features: [
        'Unlimited proposals',
        'Hindi + English + Hinglish support',
        'Premium proposal templates',
        'PDF export with branding',
        'Copy to clipboard',
        'Download as text & PDF',
        'Priority support',
        'Advanced analytics',
      ],
      cta: 'Start Free Trial',
      highlighted: true,
    },
  ]

  return (
    <section className="relative z-10 py-12 md:py-20 px-4 md:px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-3 md:space-y-4 mb-12 md:mb-16 animate-in fade-in duration-500">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-balance px-2 slide-up">
            <span className="bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">
              Simple, Transparent Pricing
            </span>
          </h2>
          <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto text-balance px-2 slide-up-delay-100">
            Choose the plan that fits your needs. Upgrade or downgrade anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl border transition-all duration-500 hover:shadow-2xl ${
                plan.highlighted
                  ? 'border-accent/50 bg-card/80 shadow-lg shadow-accent/10 md:scale-105 slide-up-delay-100'
                  : 'border-border/50 bg-card/30 slide-up-delay-200'
              } backdrop-blur-sm p-6 md:p-8 flex flex-col group hover:border-accent/80 ${!plan.highlighted ? 'scale-up-hover' : ''}`}
            >
              {/* Highlight Badge */}
              {plan.highlighted && (
                <div className="absolute -top-3 md:-top-4 left-1/2 transform -translate-x-1/2 fade-in animate-bounce">
                  <span className="bg-accent text-accent-foreground px-3 md:px-4 py-1 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap shadow-lg shadow-accent/30 transition-smooth">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="mb-6 md:mb-8 transition-smooth">
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-1 md:mb-2 group-hover:text-accent transition-colors duration-300">{plan.name}</h3>
                <p className="text-muted-foreground text-xs md:text-sm mb-3 md:mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-1 md:gap-2">
                  <span className="text-3xl md:text-4xl font-bold text-accent group-hover:scale-105 transition-transform duration-300 origin-left">{plan.price}</span>
                  {plan.period && (
                    <span className="text-xs md:text-base text-muted-foreground">{plan.period}</span>
                  )}
                </div>
              </div>

              {/* CTA Button */}
              <button
                className={`w-full py-2.5 md:py-3 rounded-lg font-semibold transition-all duration-300 mb-6 md:mb-8 text-sm md:text-base scale-up-hover ${
                  plan.highlighted
                    ? 'bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30'
                    : 'bg-card/50 text-foreground border border-border/50 hover:bg-card/80 hover:border-accent/50 hover:text-accent'
                }`}
              >
                {plan.cta}
              </button>

              {/* Features List */}
              <div className="space-y-3 md:space-y-4 flex-1">
                {plan.features.map((feature, featureIndex) => (
                  <div 
                    key={featureIndex} 
                    className="flex items-start gap-2 md:gap-3 opacity-0 animate-in fade-in"
                    style={{ animationDelay: `${featureIndex * 50}ms` }}
                  >
                    <Check className="w-4 h-4 md:w-5 md:h-5 text-accent flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-foreground text-xs md:text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* FAQ or Additional Info */}
        <div className="mt-12 md:mt-20 text-center space-y-2 md:space-y-3 px-4 fade-in-slow">
          <p className="text-xs md:text-base text-muted-foreground">
            All plans include basic support and access to proposal templates.
          </p>
          <p className="text-xs md:text-sm text-muted-foreground">
            Billing is charged monthly. You can cancel anytime.
          </p>
        </div>
      </div>
    </section>
  )
}
