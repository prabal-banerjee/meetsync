import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for MeetSync - learn how we protect your data when comparing Calendly with Google Calendar.',
  keywords: ['privacy policy', 'data protection', 'GDPR', 'Google Calendar privacy', 'MeetSync privacy', 'calendar data'],
  alternates: {
    canonical: 'https://meetsync.vercel.app/privacy',
  },
  openGraph: {
    title: 'Privacy Policy | MeetSync',
    description: 'Privacy Policy for MeetSync - learn how we protect your data.',
    url: 'https://meetsync.vercel.app/privacy',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Privacy Policy - MeetSync',
    description: 'Privacy Policy for MeetSync application explaining data collection, usage, and protection.',
    url: 'https://meetsync.vercel.app/privacy',
    dateModified: '2026-02-22',
    publisher: {
      '@type': 'Organization',
      name: 'MeetSync',
      url: 'https://meetsync.vercel.app/contact',
    },
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 py-12 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-12">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-gray-500">Last Updated: February 22, 2026</p>
        </header>

        <div className="prose prose-gray max-w-none">
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              This Privacy Policy explains how MeetSync (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) 
              collects, uses, stores, and protects your information when you use our Service. 
              We are committed to protecting your privacy and handling your data responsibly.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
            
            <h3 className="text-lg font-medium text-gray-900 mb-3">2.1 Information You Provide</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Calendly scheduling links you submit for comparison</li>
              <li>Contact information if you reach out to us</li>
            </ul>

            <h3 className="text-lg font-medium text-gray-900 mb-3">2.2 Information from Google Account</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              When you connect your Google Calendar account, we access:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Your calendar events (titles, start/end times, availability status)</li>
              <li>Your email address and basic profile information</li>
            </ul>

            <h3 className="text-lg font-medium text-gray-900 mb-3">2.3 Automatically Collected Information</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Device information</li>
              <li>Usage data and interaction with the Service</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">We use the collected information to:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Provide and maintain the Service functionality</li>
              <li>Calculate overlapping availability between calendars</li>
              <li>Display your calendar events in the application</li>
              <li>Improve and optimize the Service</li>
              <li>Communicate with you about the Service</li>
              <li>Ensure security and prevent fraud</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Google API Services User Data Policy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our use and transfer of information received from Google APIs will adhere to the 
              <a href="https://developers.google.com/terms/api-services-user-data-policy" className="text-blue-600 hover:text-blue-800 ml-1" target="_blank" rel="noopener noreferrer">
                Google API Services User Data Policy
              </a>, 
              including the Limited Use requirements.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Specifically, we:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Only access Google user data for the specific purposes disclosed to users</li>
              <li>Do not sell or transfer Google user data to third parties</li>
              <li>Do not use Google user data for advertising purposes</li>
              <li>Do not use Google user data for machine learning or AI model training</li>
              <li>Limit human review of Google user data to necessary operational purposes</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Data Storage and Security</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We implement appropriate technical and organizational measures to protect your data:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>All data is transmitted over HTTPS encrypted connections</li>
              <li>Authentication tokens are stored securely</li>
              <li>We do not store your Google Calendar data permanently</li>
              <li>Session data is temporary and cleared after your session ends</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Data Sharing and Disclosure</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share 
              information only in the following circumstances:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>With your explicit consent</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights, privacy, safety, or property</li>
              <li>In connection with a business transfer or acquisition</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Third-Party Services</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our Service integrates with third-party services:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>
                <strong>Google Calendar:</strong> Subject to Google&apos;s 
                <a href="https://policies.google.com/privacy" className="text-blue-600 hover:text-blue-800 ml-1" target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </a>
              </li>
              <li>
                <strong>Calendly:</strong> Subject to Calendly&apos;s 
                <a href="https://calendly.com/privacy" className="text-blue-600 hover:text-blue-800 ml-1" target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Data Retention and Deletion</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We retain your data only for as long as necessary to provide the Service:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Google Calendar data is fetched in real-time and not stored permanently</li>
              <li>Authentication tokens are stored only for the duration of your session</li>
              <li>You can request deletion of your data at any time by contacting us</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Your Rights</h2>
            <p className="text-gray-700 leading-relaxed mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Revoke Google account access at any time</li>
              <li>Object to or restrict certain data processing</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              To exercise these rights, please contact us using the information below.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Children&apos;s Privacy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              The Service is not intended for use by children under the age of 13. We do not knowingly 
              collect personal information from children under 13. If we become aware that we have 
              collected data from a child under 13, we will take steps to delete such information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">11. Changes to This Privacy Policy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may update this Privacy Policy from time to time. Changes will be posted on this page 
              with an updated &quot;Last Updated&quot; date. We encourage you to review this policy periodically.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">12. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions or concerns about this Privacy Policy or our data practices, 
              please{' '}
              <a href="/contact" className="text-blue-600 hover:text-blue-800 font-medium">
                contact us through our form
              </a>.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
