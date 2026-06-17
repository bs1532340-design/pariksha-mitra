'use client'

import { useState, FormEvent } from 'react'
import { Sparkles, Loader2 } from 'lucide-react'

export default function ProposalForm({
  onSubmit,
}: {
  onSubmit: (formData: {
    serviceType: string
    clientType: string
    priceRange: string
    language: string
    extraDetails: string
  }) => Promise<void>
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    serviceType: 'web-development',
    clientType: 'startup',
    priceRange: '10000-25000',
    language: 'English',
    extraDetails: '',
  })

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await onSubmit(formData)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md px-4 sm:px-0 space-y-4 md:space-y-5 animate-in fade-in duration-500 slide-up-delay-100"
    >
      {/* Service Type */}
      <div className="space-y-2 transition-smooth">
        <label className="block text-xs md:text-sm font-medium text-foreground">
          Service Type
        </label>
        <select
          name="serviceType"
          value={formData.serviceType}
          onChange={handleChange}
          className="w-full px-3 md:px-4 py-2 md:py-2.5 rounded-lg bg-input border border-border text-sm md:text-base text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-300 focus:shadow-lg focus:shadow-accent/20 hover:border-accent/50"
        >
          <option value="web-development">Web Development</option>
          <option value="mobile-app">Mobile App Development</option>
          <option value="ui-ux-design">UI/UX Design</option>
          <option value="consulting">Business Consulting</option>
          <option value="digital-marketing">Digital Marketing</option>
          <option value="ai-development">AI Development</option>
        </select>
      </div>

      {/* Client Type */}
      <div className="space-y-2 transition-smooth">
        <label className="block text-xs md:text-sm font-medium text-foreground">
          Client Type
        </label>
        <select
          name="clientType"
          value={formData.clientType}
          onChange={handleChange}
          className="w-full px-3 md:px-4 py-2 md:py-2.5 rounded-lg bg-input border border-border text-sm md:text-base text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-300 focus:shadow-lg focus:shadow-accent/20 hover:border-accent/50"
        >
          <option value="startup">Startup</option>
          <option value="smb">Small-Medium Business</option>
          <option value="enterprise">Enterprise</option>
          <option value="non-profit">Non-Profit</option>
          <option value="individual">Individual/Freelancer</option>
        </select>
      </div>

      {/* Price Range */}
      <div className="space-y-2 transition-smooth">
        <label className="block text-xs md:text-sm font-medium text-foreground">
          Budget Range
        </label>
        <input
          type="text"
          name="priceRange"
          value={formData.priceRange}
          onChange={handleChange}
          placeholder="e.g., 10000-25000"
          className="w-full px-3 md:px-4 py-2 md:py-2.5 rounded-lg bg-input border border-border text-sm md:text-base text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-300 focus:shadow-lg focus:shadow-accent/20 hover:border-accent/50"
        />
      </div>

      {/* Language */}
      <div className="space-y-2 transition-smooth">
        <label className="block text-xs md:text-sm font-medium text-foreground">
          Language
        </label>
        <select
          name="language"
          value={formData.language}
          onChange={handleChange}
          className="w-full px-3 md:px-4 py-2 md:py-2.5 rounded-lg bg-input border border-border text-sm md:text-base text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-300 focus:shadow-lg focus:shadow-accent/20 hover:border-accent/50"
        >
          <option value="English">English</option>
          <option value="Hindi">Hindi</option>
          <option value="Hinglish">Hinglish</option>
        </select>
      </div>

      {/* Extra Details */}
      <div className="space-y-2 transition-smooth">
        <label className="block text-xs md:text-sm font-medium text-foreground">
          Additional Details
        </label>
        <textarea
          name="extraDetails"
          value={formData.extraDetails}
          onChange={handleChange}
          placeholder="Describe your project, specific requirements, timeline, or any other details..."
          rows={4}
          className="w-full px-3 md:px-4 py-2 md:py-2.5 rounded-lg bg-input border border-border text-sm md:text-base text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-300 focus:shadow-lg focus:shadow-accent/20 resize-none hover:border-accent/50"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-4 md:px-6 py-2.5 md:py-3 bg-accent hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed text-accent-foreground text-sm md:text-base font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group scale-up-hover shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
            Generate Proposal
          </>
        )}
      </button>
    </form>
  )
}
