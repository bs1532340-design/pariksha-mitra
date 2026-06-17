'use client'

import { Copy, Download, Check, FileText } from 'lucide-react'
import { useState } from 'react'

export default function ProposalOutput({ proposal }: { proposal: string }) {
  const [copied, setCopied] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [pdfLoading, setPdfLoading] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(proposal)
    setCopied(true)
    setShowToast(true)
    setTimeout(() => setCopied(false), 2000)
    setTimeout(() => setShowToast(false), 3000)
  }

  const handleDownloadTxt = () => {
    const element = document.createElement('a')
    const file = new Blob([proposal], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = `proposal-${Date.now()}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const handleDownloadPdf = async () => {
    try {
      setPdfLoading(true)
      const html2pdf = (await import('html2pdf.js')).default

      const element = document.createElement('div')
      element.innerHTML = `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #1a1a2e; max-width: 800px; margin: 0 auto;">
          <!-- Header -->
          <div style="text-align: center; margin-bottom: 40px; padding-bottom: 20px; border-bottom: 2px solid #4F46E5;">
            <div style="font-size: 32px; font-weight: bold; color: #4F46E5; margin-bottom: 8px;">ClientForge</div>
            <div style="font-size: 14px; color: #666; margin-bottom: 20px;">Forge Winning Proposals with AI</div>
          </div>

          <!-- Content -->
          <div style="line-height: 1.8; color: #333;">
            ${proposal
              .split('\n\n')
              .map((paragraph) => {
                // Check if it's a section header (all caps or ends with colon)
                const isHeader =
                  paragraph === paragraph.toUpperCase() ||
                  paragraph.trim().endsWith(':')
                return `
                <div style="margin-bottom: ${isHeader ? '16px' : '12px'}; ${isHeader ? 'font-weight: bold; font-size: 14px; color: #4F46E5; text-transform: uppercase; letter-spacing: 0.5px;' : 'font-size: 12px;'}">
                  ${paragraph}
                </div>
              `
              })
              .join('')}
          </div>

          <!-- Footer -->
          <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #f0f0f0; text-align: center; color: #999; font-size: 11px;">
            <div>Generated with ClientForge</div>
            <div>Forge Winning Proposals with AI</div>
            <div style="margin-top: 8px;">${new Date().toLocaleDateString()}</div>
          </div>
        </div>
      `

      const options = {
        margin: [10, 10, 10, 10],
        filename: `clientforge-proposal-${Date.now()}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' },
      }

      html2pdf().set(options).from(element).save()
    } catch (error) {
      console.error('[v0] Error generating PDF:', error)
    } finally {
      setPdfLoading(false)
    }
  }

  return (
    <div className="w-full max-w-2xl px-4 sm:px-0 animate-in fade-in zoom-in-95 duration-500">
      <div className="rounded-lg border border-border bg-card overflow-hidden shadow-lg transition-smooth hover:shadow-xl hover:shadow-accent/10">
        {/* Header */}
        <div className="bg-gradient-to-r from-accent/20 to-accent/10 border-b border-border px-4 md:px-6 py-3 md:py-4 flex items-center justify-between gap-3">
          <h2 className="text-base md:text-xl font-bold text-foreground flex items-center gap-2 min-w-0">
            <span className="w-3 h-3 rounded-full bg-accent flex-shrink-0 animate-pulse"></span>
            <span className="truncate">Your Generated Proposal</span>
          </h2>
          <div className="flex gap-1 md:gap-2 flex-shrink-0">
            <button
              onClick={handleCopy}
              className="p-2 md:p-2.5 hover:bg-accent/10 rounded-lg transition-smooth text-muted-foreground hover:text-accent scale-up-hover"
              title="Copy to clipboard"
            >
              {copied ? (
                <Check className="w-5 h-5" />
              ) : (
                <Copy className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={handleDownloadPdf}
              disabled={pdfLoading}
              className="p-2 md:p-2.5 hover:bg-accent/10 rounded-lg transition-smooth text-muted-foreground hover:text-accent disabled:opacity-50 disabled:cursor-not-allowed scale-up-hover"
              title="Download as PDF"
            >
              <FileText className="w-5 h-5" />
            </button>
            <button
              onClick={handleDownloadTxt}
              className="p-2 md:p-2.5 hover:bg-accent/10 rounded-lg transition-smooth text-muted-foreground hover:text-accent scale-up-hover"
              title="Download as text file"
            >
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Proposal Content */}
        <div className="p-4 md:p-6 max-h-96 overflow-y-auto">
          <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
            <div className="text-xs md:text-sm leading-relaxed text-foreground/90 whitespace-pre-wrap break-words">
              {proposal}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-card border-t border-border px-4 md:px-6 py-3 md:py-4 flex items-center justify-between text-xs md:text-sm text-muted-foreground gap-2 transition-smooth">
          <span>Generated with ClientForge</span>
          <span className="text-right">Click copy or download to save</span>
        </div>
      </div>

      {/* Success Toast */}
      {showToast && (
        <div className="fixed bottom-6 right-6 animate-in fade-in slide-in-from-bottom-4 duration-300 z-50">
          <div className="rounded-lg bg-accent text-accent-foreground px-3 md:px-4 py-2 md:py-3 shadow-lg flex items-center gap-2 font-medium text-xs md:text-sm transition-smooth">
            <Check className="w-4 h-4 md:w-5 md:h-5" />
            Proposal copied to clipboard!
          </div>
        </div>
      )}

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: oklch(0.52 0.18 250 / 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: oklch(0.52 0.18 250 / 0.5);
        }
      `}</style>
    </div>
  )
}
