'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to send message. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Failed to send message. Please try again.');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Mail className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Us</h1>
          <p className="text-gray-600 max-w-md mx-auto">
            Have questions about our Terms of Service or Privacy Policy? We&apos;re here to help.
          </p>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          {status === 'success' ? (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Message Sent!</h2>
              <p className="text-gray-600 mb-6">
                Thank you for reaching out. We&apos;ll get back to you as soon as possible.
              </p>
              <Button onClick={() => setStatus('idle')} variant="outline">
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
                    Your Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                    Your Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="h-11"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject" className="text-sm font-semibold text-gray-700">
                  Subject
                </Label>
                <Input
                  id="subject"
                  type="text"
                  placeholder="Question about Privacy Policy"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-semibold text-gray-700">
                  Message
                </Label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="How can we help you?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-12 text-base font-semibold"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          )}
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            For data deletion requests or privacy-related inquiries,{' '}
            <a href="/privacy" className="text-blue-600 hover:text-blue-800">
              view our Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
