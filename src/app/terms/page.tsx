import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for MeetSync - the calendar scheduling tool that helps you compare Calendly availability with Google Calendar.',
  keywords: ['terms of service', 'terms and conditions', 'legal', 'MeetSync', 'calendar scheduling'],
  alternates: {
    canonical: 'https://meetsync.prabalbanerjee.xyz/terms',
  },
  openGraph: {
    title: 'Terms of Service | MeetSync',
    description: 'Terms of Service for MeetSync - the calendar scheduling tool.',
    url: 'https://meetsync.prabalbanerjee.xyz/terms',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Terms of Service - MeetSync',
    description: 'Terms of Service for MeetSync application',
    url: 'https://meetsync.prabalbanerjee.xyz/terms',
    dateModified: '2026-02-22',
    publisher: {
      '@type': 'Organization',
      name: 'MeetSync',
      email: 'mail.prabal@gmail.com',
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
          <p className="text-gray-500">Last Updated: February 22, 2026</p>
        </header>

        <div className="prose prose-gray max-w-none">
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              By accessing or using the MeetSync application (&quot;Service&quot;), you agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              MeetSync is a web application that helps users find overlapping availability between 
              Google Calendar events and Calendly scheduling links. The Service integrates with Google Calendar API 
              and Calendly API to retrieve and display scheduling information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Google Account Integration</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              To use certain features of the Service, you must authorize access to your Google Calendar data. 
              By connecting your Google account, you grant us permission to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Read your calendar events to identify availability</li>
              <li>Access basic profile information associated with your Google account</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              We only access the minimum data necessary to provide the Service functionality. 
              You can revoke this access at any time through your Google Account settings.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">4. User Responsibilities</h2>
            <p className="text-gray-700 leading-relaxed mb-4">You agree to:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Provide accurate information when using the Service</li>
              <li>Use the Service only for lawful purposes</li>
              <li>Not attempt to access data that does not belong to you</li>
              <li>Not interfere with or disrupt the Service or its servers</li>
              <li>Not use the Service to violate any applicable laws or regulations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Data Usage and Privacy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Your use of the Service is also governed by our <a href="/privacy" className="text-blue-600 hover:text-blue-800">Privacy Policy</a>. By using the Service, 
              you consent to the collection, use, and sharing of your information as described in the Privacy Policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Third-Party Services</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              The Service integrates with third-party services including Google Calendar and Calendly. 
              Your use of these services is subject to their respective terms of service and privacy policies. 
              We are not responsible for the content, policies, or practices of these third-party services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Disclaimer of Warranties</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              The Service is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, 
              either express or implied. We do not guarantee that the Service will be uninterrupted, 
              timely, secure, or error-free.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              To the fullest extent permitted by law, we shall not be liable for any indirect, incidental, 
              special, consequential, or punitive damages, or any loss of profits or revenues, whether 
              incurred directly or indirectly, arising from your use of the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We reserve the right to modify these Terms of Service at any time. Changes will be effective 
              immediately upon posting. Your continued use of the Service after changes constitutes 
              acceptance of the revised terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Termination</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may suspend or terminate your access to the Service at any time, with or without cause, 
              and with or without notice. You may also discontinue use of the Service at any time.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">11. Contact Information</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about these Terms of Service, please contact us at:
              <br />
              <span className="text-blue-600">mail[dot]prabal[at]gmail[dot]com</span>
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
