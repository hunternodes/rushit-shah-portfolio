'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ContactFormData } from '@/lib/types';
import Footer from '@/components/Footer';
import AmbientBackdrop from '@/components/AmbientBackdrop';

const contactTheme = {
  '--night': '#0B1A2E',
  '--shadow': '#060F1E',
  '--dim': '#8EA0B5',
  background: '#0B1A2E', // paint the wrapper too so no body near-black can bleed through
} as React.CSSProperties;

export default function ContactPage() {
  const [form, setForm] = useState<ContactFormData>({
    name: '',
    email: '',
    inquiryType: 'inquiry',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const topicLabel: Record<string, string> = {
        inquiry: 'General enquiry',
        commission: 'Collector / commission',
        exhibition: 'Gallery / exhibition',
        other: 'Other',
      };

      const payload = new FormData();
      // Web3Forms access key — externalised so rotating it doesn't need a
      // code change. Falls back to the current dev key for local testing.
      const accessKey =
        process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
        '1e756e4d-a754-49d7-a5e4-dcfd18fe6855';
      payload.append('access_key', accessKey);
      payload.append('name', form.name);
      payload.append('email', form.email);
      payload.append('inquiryType', topicLabel[form.inquiryType] ?? form.inquiryType);
      payload.append('message', form.message);
      payload.append('subject', `rushitshah.com — ${topicLabel[form.inquiryType] ?? 'Enquiry'} from ${form.name}`);
      payload.append('from_name', `${form.name} · rushitshah.com`);
      // Web3Forms honeypot (optional but recommended)
      payload.append('botcheck', '');

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: payload,
      });
      const data = await res.json().catch(() => ({ success: false }));

      if (!res.ok || !data.success) {
        throw new Error(data?.message || 'Failed to send message');
      }

      setSubmitted(true);
      setForm({ name: '', email: '', inquiryType: 'inquiry', message: '' });
      setTimeout(() => setSubmitted(false), 6000);
    } catch (err) {
      console.error(err);
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '1rem 1.1rem',
    background: 'var(--night)',
    border: '1px solid var(--rule)',
    color: 'var(--bone)',
    fontFamily: '"Space Grotesk", system-ui, sans-serif',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border 0.3s',
  };

  return (
    <div style={contactTheme}>
      {/* Hero — matched to the homepage hero's vertical rhythm
          (pt-28 md:pt-40 pb-16) and its 1400px max-width so /contact and /
          feel like the same document opening. Subtext removed per the
          latest brief; the H1 carries the page on its own. */}
      <section
        className="relative pt-28 md:pt-40 pb-16 overflow-hidden"
        style={{ background: 'var(--night)' }}
      >
        {/* Atmospheric layer — warm cream + a whisper of lime on navy.
            Deliberately no cyan / blue-purple tones so the navy identity
            stays rich rather than tipping into "generic neon hero". */}
        <AmbientBackdrop
          accent="#F0D8A8"
          accentAlt="#C7FF3A"
          blend="screen"
          intensity={0.26}
          grain
        />
        <div className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-12 relative">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="display-xl"
            style={{
              color: 'var(--bone)',
              // Tighter clamp than display-xl's default so "Start a
              // conversation." fits on one line from 360 px to ~1920 px.
              // whiteSpace prevents browser wrap; display-xl's letter-
              // spacing and line-height inherit from the class.
              fontSize: 'clamp(1.75rem, 6.5vw, 6rem)',
              whiteSpace: 'nowrap',
            }}
          >
            Start a{' '}
            <span className="in-serif" style={{ color: 'var(--lime)' }}>
              conversation.
            </span>
          </motion.h1>
        </div>
      </section>

      <section className="pb-24" style={{ background: 'var(--night)' }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-12 gap-10">
            <aside className="col-span-12 md:col-span-4 space-y-10">
              <div>
                <span className="meta-sm mb-2 block" style={{ color: 'var(--dim)' }}>
                  [01] EMAIL
                </span>
                <a
                  href="mailto:rs@rushitshah.com"
                  className="text-xl link-mono"
                  style={{ color: 'var(--lime)' }}
                >
                  rs@rushitshah.com
                </a>
              </div>
              <div>
                <span className="meta-sm mb-2 block" style={{ color: 'var(--dim)' }}>
                  [02] STUDIO
                </span>
                <p className="display-md" style={{ color: 'var(--bone)' }}>
                  Vadodara
                </p>
                <p className="mt-1 text-sm" style={{ color: 'var(--dim)' }}>
                  Gujarat, India · shipping worldwide
                </p>
              </div>
              <div>
                <span className="meta-sm mb-2 block" style={{ color: 'var(--dim)' }}>
                  [03] ELSEWHERE
                </span>
                <div className="flex flex-col gap-2">
                  <a
                    href="https://instagram.com/rushitshah08"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram (opens in new tab)"
                    className="link-mono text-lg"
                    style={{ color: 'var(--bone)' }}
                  >
                    Instagram <span aria-hidden="true">↗</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/rushitshah"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn (opens in new tab)"
                    className="link-mono text-lg"
                    style={{ color: 'var(--bone)' }}
                  >
                    LinkedIn <span aria-hidden="true">↗</span>
                  </a>
                  <a
                    href="https://www.artworkarchive.com/profile/rushitshah"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Artwork Archive (opens in new tab)"
                    className="link-mono text-lg"
                    style={{ color: 'var(--bone)' }}
                  >
                    Artwork Archive <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            </aside>

            <div className="col-span-12 md:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-6 md:p-10 relative"
                style={{
                  background: 'var(--shadow)',
                  border: '1px solid var(--rule)',
                }}
              >
                <span
                  className="absolute -top-3 left-6 px-2 py-0.5 meta-sm"
                  style={{ background: 'var(--lime)', color: 'var(--night)' }}
                >
                  TRANSMIT
                </span>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div
                      className="w-14 h-14 flex items-center justify-center mx-auto mb-5"
                      style={{ background: 'var(--lime)' }}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="var(--night)" strokeWidth="3" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="display-md" style={{ color: 'var(--bone)' }}>
                      Received —{' '}
                      <span className="in-serif" style={{ color: 'var(--lime)' }}>
                        thank you.
                      </span>
                    </h3>
                    <p className="meta-sm mt-3" style={{ color: 'var(--dim)' }}>
                      I'll get back to you shortly.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={onSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <Field
                        label="Name"
                        id="name"
                        type="text"
                        value={form.name}
                        onChange={onChange}
                        placeholder="your name"
                        style={inputStyle}
                      />
                      <Field
                        label="Email"
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={onChange}
                        placeholder="you@example.com"
                        style={inputStyle}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="inquiryType"
                        className="meta-sm mb-2 block"
                        style={{ color: 'var(--dim)' }}
                      >
                        TOPIC
                      </label>
                      <select
                        id="inquiryType"
                        name="inquiryType"
                        value={form.inquiryType}
                        onChange={onChange}
                        style={{ ...inputStyle, cursor: 'pointer' }}
                      >
                        <option value="inquiry">General enquiry</option>
                        <option value="commission">Collector / commission</option>
                        <option value="exhibition">Gallery / exhibition</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="meta-sm mb-2 block"
                        style={{ color: 'var(--dim)' }}
                      >
                        MESSAGE
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={form.message}
                        onChange={onChange}
                        required
                        rows={6}
                        style={{ ...inputStyle, resize: 'none' }}
                        placeholder="tell me about the space, the idea, or just say hi…"
                      />
                    </div>

                    {error && (
                      <div
                        className="p-4 text-sm"
                        style={{
                          background: 'rgba(255,78,56,0.08)',
                          border: '1px solid var(--coral)',
                          color: 'var(--coral)',
                        }}
                      >
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-lime w-full justify-center disabled:opacity-50"
                    >
                      {loading ? 'sending…' : 'send message'}
                      <span aria-hidden>→</span>
                    </button>
                    <p
                      className="meta-sm text-center"
                      style={{ color: 'var(--dim)' }}
                    >
                      typical reply within 48 hours
                    </p>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Field({
  label,
  id,
  ...rest
}: {
  label: string;
  id: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label
        htmlFor={id}
        className="meta-sm mb-2 block"
        style={{ color: 'var(--dim)' }}
      >
        {label.toUpperCase()}
      </label>
      <input id={id} name={id} required {...rest} />
    </div>
  );
}
