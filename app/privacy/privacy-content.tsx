'use client'

import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

export default function PrivacyContent() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold text-foreground mb-8">Privacy Policy</h1>

        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Introduction</h2>
            <p>
              ClientForge (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Information We Collect</h2>
            <p>We may collect information about you in a variety of ways. The information we may collect on the site includes:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Personal Data: Personally identifiable information, such as your name, shipping address, email address, and telephone number, and demographic information, such as your age, gender, hometown, and interests, that you voluntarily give to us when you register with the Site and when you choose to participate in various activities related to the Site.</li>
              <li>Device Information: Information about your device, including but not limited to your IP address, browser type, operating system, and referring URLs.</li>
              <li>Usage Data: Information about how you interact with our Services, including the proposals you generate, search queries, and content you access.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Use of Your Information</h2>
            <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the site to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Generate personalized proposals and content</li>
              <li>Email you regarding your account or order</li>
              <li>Fulfill and manage purchases, orders, payments, and other transactions related to the Site</li>
              <li>Improve the Site and enhance your user experience</li>
              <li>Monitor and analyze trends, usage, and activities for security purposes</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Disclosure of Your Information</h2>
            <p>
              We may share information we have collected about you in certain situations:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>By Law or to Protect Rights: If we believe the release of information is necessary to comply with the law, enforce our Site policies, or protect ours or others' rights, property, or safety.</li>
              <li>Third-Party Service Providers: We may share your information with third parties that perform services for us or on our behalf, including but not limited to payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Security of Your Information</h2>
            <p>
              We use administrative, technical, and physical security measures to protect your personal information. However, despite our safeguards, no security system is impenetrable. We cannot guarantee the security of our databases, nor can we guarantee that information you supply won't be intercepted while being transmitted to us over the Internet.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Contact Us</h2>
            <p>
              If you have questions or comments about this Privacy Policy, please contact us at support@getclientforge.xyz.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Changes to This Privacy Policy</h2>
            <p>
              ClientForge reserves the right to modify this privacy policy at any time. Changes and clarifications will take effect immediately upon their posting to the website. If we make material changes to this policy, we will notify you here that it has been updated, so that you are aware of what information we collect, how we use it, and under what circumstances, if any, we use and/or disclose it.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  )
}
