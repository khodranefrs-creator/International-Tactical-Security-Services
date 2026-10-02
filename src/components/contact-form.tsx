'use client';

import { useId, useState } from 'react';
import { ActionButton } from '@/components/action';
import { inquiryTypes } from '@/content/site';
import { primaryPhone, tollFreePhone, mailtoHref } from '@/lib/contact';

type Status = 'idle' | 'submitting' | 'sent' | 'error';

interface ApiError {
  ok: boolean;
  code?: string;
  message?: string;
  errors?: Record<string, string>;
}

const fieldBase =
  'w-full border bg-white px-4 py-3 text-[0.9375rem] text-ink transition-colors duration-200 placeholder:text-ink-muted/60 focus:border-brass focus:outline-none';

function Field({
  label,
  htmlFor,
  error,
  required = true,
  hint,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={htmlFor}
        className="t-meta mb-2 block uppercase tracking-[0.13em] text-navy/60"
      >
        {label}
        {required ? (
          <span aria-hidden="true" className="ml-1 text-brass-deep">
            *
          </span>
        ) : null}
      </label>
      {children}
      {hint && !error ? (
        <p id={`${htmlFor}-hint`} className="mt-2 text-[0.8125rem] text-ink-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p
          id={`${htmlFor}-error`}
          role="alert"
          className="mt-2 flex items-start gap-1.5 text-[0.8125rem] font-medium text-[#a3311f]"
        >
          <svg aria-hidden="true" viewBox="0 0 14 14" className="mt-0.5 h-3 w-3 shrink-0" fill="none">
            <circle cx="7" cy="7" r="6.2" stroke="currentColor" strokeWidth="1.2" />
            <path d="M7 3.6v4.2M7 10.2v.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function ContactForm({
  tone = 'light',
  source,
  defaultInquiry,
}: {
  tone?: 'light' | 'dark';
  source: string;
  defaultInquiry?: string;
}) {
  const uid = useId();
  const f = (n: string) => `${uid}-${n}`;

  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState<string | null>(null);
  const [code, setCode] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const headingTone = tone === 'dark' ? 'text-ivory' : 'text-navy';

  function describe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'submitting') return;

    const data = new FormData(e.currentTarget);
    const payload = {
      firstName: String(data.get('firstName') ?? ''),
      lastName: String(data.get('lastName') ?? ''),
      email: String(data.get('email') ?? ''),
      phone: String(data.get('phone') ?? ''),
      inquiry: String(data.get('inquiry') ?? ''),
      message: String(data.get('message') ?? ''),
      mathAnswer: String(data.get('mathAnswer') ?? ''),
      source,
    };

    // Mirror the server rules so the visitor gets feedback without a round trip.
    const local: Record<string, string> = {};
    if (!payload.firstName.trim()) local.firstName = 'Please enter your first name.';
    if (!payload.lastName.trim()) local.lastName = 'Please enter your last name.';
    if (!payload.email.trim()) local.email = 'Please enter your email address.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(payload.email.trim()))
      local.email = 'Please enter a valid email address.';
    if (!payload.phone.trim()) local.phone = 'Please enter a phone number.';
    if (!payload.inquiry) local.inquiry = 'Please choose the type of inquiry.';
    if (!payload.message.trim()) local.message = 'Please tell us a little about what you need.';
    if (Number(payload.mathAnswer) !== 14)
      local.mathAnswer = 'Please answer the sum to show you are not a robot.';

    if (Object.keys(local).length > 0) {
      setErrors(local);
      setStatus('idle');
      setMessage('Some details need attention.');
      setCode('VALIDATION');
      const first = document.getElementById(f(Object.keys(local)[0]));
      first?.focus();
      return;
    }

    setErrors({});
    setStatus('submitting');
    setMessage(null);
    setCode(null);

    /* Trailing slash to match `trailingSlash: true`, so the POST is not sent
       to a URL that only answers with a redirect. */
    fetch('/api/contact/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(async (r) => {
        const data = (await r.json()) as ApiError;
        if (r.ok && data.ok) {
          setStatus('sent');
          setMessage('Thank you — your message has been sent to our office.');
          return;
        }
        setStatus('error');
        setCode(data.code ?? 'ERROR');
        setMessage(data.message ?? 'Something went wrong. Please try again.');
        if (data.errors) setErrors(data.errors);
      })
      .catch(() => {
        setStatus('error');
        setCode('NETWORK');
        setMessage(
          'We could not reach the server. Please check your connection, or call or email us directly.',
        );
      });
  }

  if (status === 'sent') {
    return (
      <div
        role="status"
        className="border border-rule bg-white p-8 md:p-10"
      >
        <span aria-hidden="true" className="tick" />
        <h3 className={`t-h3 mt-5 ${headingTone}`}>Message sent</h3>
        <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink">{message}</p>
        <p className="mt-6 text-[0.9375rem] text-ink-muted">
          Need it sooner? Call{' '}
          <a href={primaryPhone.href} className="font-medium text-navy underline decoration-brass underline-offset-4">
            {primaryPhone.label}
          </a>{' '}
          or email{' '}
          <a href={mailtoHref} className="font-medium text-navy underline decoration-brass underline-offset-4">
            info@internationaltacticalsecurity.com
          </a>
          .
        </p>
      </div>
    );
  }

  const notConfigured = code === 'NOT_CONFIGURED' || code === 'DELIVERY_FAILED' || code === 'NETWORK';

  return (
    <form noValidate onSubmit={describe} className="w-full">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="First name" htmlFor={f('firstName')} error={errors.firstName}>
          <input
            id={f('firstName')}
            name="firstName"
            type="text"
            autoComplete="given-name"
            aria-invalid={!!errors.firstName}
            aria-describedby={errors.firstName ? `${f('firstName')}-error` : undefined}
            className={`${fieldBase} ${errors.firstName ? 'border-[#a3311f]' : 'border-rule'}`}
          />
        </Field>

        <Field label="Last name" htmlFor={f('lastName')} error={errors.lastName}>
          <input
            id={f('lastName')}
            name="lastName"
            type="text"
            autoComplete="family-name"
            aria-invalid={!!errors.lastName}
            aria-describedby={errors.lastName ? `${f('lastName')}-error` : undefined}
            className={`${fieldBase} ${errors.lastName ? 'border-[#a3311f]' : 'border-rule'}`}
          />
        </Field>

        <Field label="Email" htmlFor={f('email')} error={errors.email}>
          <input
            id={f('email')}
            name="email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? `${f('email')}-error` : undefined}
            className={`${fieldBase} ${errors.email ? 'border-[#a3311f]' : 'border-rule'}`}
          />
        </Field>

        <Field label="Phone number" htmlFor={f('phone')} error={errors.phone}>
          <input
            id={f('phone')}
            name="phone"
            type="tel"
            autoComplete="tel"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? `${f('phone')}-error` : undefined}
            className={`${fieldBase} ${errors.phone ? 'border-[#a3311f]' : 'border-rule'}`}
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Primary inquiry" htmlFor={f('inquiry')} error={errors.inquiry}>
          <select
            id={f('inquiry')}
            name="inquiry"
            defaultValue={defaultInquiry ?? ''}
            aria-invalid={!!errors.inquiry}
            aria-describedby={errors.inquiry ? `${f('inquiry')}-error` : undefined}
            className={`${fieldBase} appearance-none bg-[length:11px] bg-[right_1rem_center] bg-no-repeat pr-10 ${
              errors.inquiry ? 'border-[#a3311f]' : 'border-rule'
            }`}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%2335414A' stroke-width='1.3' fill='none'/%3E%3C/svg%3E\")",
            }}
          >
            <option value="">Choose one…</option>
            {inquiryTypes.map((t) => (
              <option key={t.value} value={t.label}>
                {t.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-5">
        <Field
          label="Additional information"
          htmlFor={f('message')}
          error={errors.message}
          hint="Site, hours, number of officers, current concerns — whatever is useful."
        >
          <textarea
            id={f('message')}
            name="message"
            rows={5}
            aria-invalid={!!errors.message}
            aria-describedby={
              errors.message ? `${f('message')}-error` : `${f('message')}-hint`
            }
            className={`${fieldBase} resize-y ${errors.message ? 'border-[#a3311f]' : 'border-rule'}`}
          />
        </Field>
      </div>

      <div className="mt-5 max-w-[16rem]">
        <Field
          label="Math quiz: 7 + 7 = ?"
          htmlFor={f('mathAnswer')}
          error={errors.mathAnswer}
          hint="Spam protection."
        >
          <input
            id={f('mathAnswer')}
            name="mathAnswer"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            aria-invalid={!!errors.mathAnswer}
            aria-describedby={
              errors.mathAnswer ? `${f('mathAnswer')}-error` : `${f('mathAnswer')}-hint`
            }
            className={`${fieldBase} ${errors.mathAnswer ? 'border-[#a3311f]' : 'border-rule'}`}
          />
        </Field>
      </div>

      {message && status === 'error' ? (
        <div
          role="alert"
          className="mt-6 border-l-2 border-[#a3311f] bg-[#faf1ef] px-5 py-4"
        >
          <p className="text-[0.875rem] font-medium text-[#8a2818]">{message}</p>
          {notConfigured ? (
            <p className="mt-2 text-[0.875rem] leading-relaxed text-ink">
              Email{' '}
              <a
                href={mailtoHref}
                className="font-medium text-navy underline decoration-brass underline-offset-4"
              >
                info@internationaltacticalsecurity.com
              </a>{' '}
              or call{' '}
              <a
                href={primaryPhone.href}
                className="font-medium text-navy underline decoration-brass underline-offset-4"
              >
                {primaryPhone.label}
              </a>{' '}
              /{' '}
              <a
                href={tollFreePhone.href}
                className="font-medium text-navy underline decoration-brass underline-offset-4"
              >
                {tollFreePhone.label}
              </a>
              .
            </p>
          ) : null}
        </div>
      ) : null}

      <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <ActionButton type="submit" tone="navy" size="lg" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Sending…' : 'Send message'}
        </ActionButton>
        <p className="t-meta text-ink-muted">
          Or call{' '}
          <a href={primaryPhone.href} className="text-navy underline decoration-brass underline-offset-4">
            {primaryPhone.label}
          </a>
        </p>
      </div>

      <p className="mt-6 max-w-lg text-[0.8125rem] leading-relaxed text-ink-muted">
        Fields marked{' '}
        <span aria-hidden="true" className="text-brass-deep">
          *
        </span>{' '}
        are required. We use your details only to respond to this enquiry.
      </p>
    </form>
  );
}