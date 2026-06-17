import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = 'https://getclientforge.xyz'

  const pages = [
    { url: '', priority: '1.0', changefreq: 'weekly' },
    { url: '/pricing', priority: '0.9', changefreq: 'monthly' },
    { url: '/login', priority: '0.8', changefreq: 'monthly' },
    { url: '/signup', priority: '0.8', changefreq: 'monthly' },
    { url: '/terms', priority: '0.5', changefreq: 'yearly' },
    { url: '/privacy', priority: '0.5', changefreq: 'yearly' },
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map(
      (page) => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <priority>${page.priority}</priority>
    <changefreq>${page.changefreq}</changefreq>
  </url>
  `
    )
    .join('')}
</urlset>`

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
