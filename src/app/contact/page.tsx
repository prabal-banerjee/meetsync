import type { Metadata } from 'next';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Contact MeetSync for questions about our Terms of Service, Privacy Policy, or data deletion requests.',
  keywords: ['contact', 'support', 'help', 'MeetSync', 'privacy questions', 'data deletion'],
  alternates: {
    canonical: 'https://meetsync.vercel.app/contact',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactPage() {
  return <ContactForm />;
}
