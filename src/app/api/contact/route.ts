import { NextResponse } from 'next/server';

/**
 * Contact endpoint.
 *
 * The live WordPress site posts its contact form to a mail handler that is not
 * available here, and the brief explicitly forbids faking a successful
 * submission. So this route does exactly one thing: if — and only if — a
 * delivery target has been configured, it forwards the enquiry there and
 * reports what actually happened.
 *
 * Configure with either environment variable:
 *
 *   CONTACT_WEBHOOK_URL   POST target receiving JSON (Formspree, Resend, a
 *                         Zapier/Make hook, or an internal mail service)
 *   CONTACT_WEBHOOK_TOKEN optional bearer token sent as Authorization
 *
 * With nothing configured the route returns 503 and a machine-readable code.
 * The client renders that state honestly and shows the direct phone and email
 * options instead of a fake confirmation.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MATH_ANSWER = 14;

type Payload = {
  firstName?: unknown;
  lastName?: unknown;
  email?: unknown;
  phone?: unknown;
  inquiry?: unknown;
  message?: unknown;
  mathAnswer?: unknown;
  /** Identifies the page the form was submitted from. */
  source?: unknown;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function asString(v: unknown, max: number) {
  if (typeof v !== 'string') return '';
  return v.trim().slice(0, max);
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json(
      { ok: false, code: 'BAD_REQUEST', message: 'Could not read the submitted form.' },
      { status: 400 },
    );
  }

  const firstName = asString(body.firstName, 80);
  const lastName = asString(body.lastName, 80);
  const email = asString(body.email, 160);
  const phone = asString(body.phone, 40);
  const inquiry = asString(body.inquiry, 60);
  const message = asString(body.message, 4000);
  const source = asString(body.source, 200);

  const errors: Record<string, string> = {};
  if (!firstName) errors.firstName = 'Please enter your first name.';
  if (!lastName) errors.lastName = 'Please enter your last name.';
  if (!email) errors.email = 'Please enter your email address.';
  else if (!EMAIL_RE.test(email)) errors.email = 'Please enter a valid email address.';
  if (!phone) errors.phone = 'Please enter a phone number.';
  if (!inquiry) errors.inquiry = 'Please choose the type of inquiry.';
  if (!message) errors.message = 'Please tell us a little about what you need.';

  // The published form asks the visitor to answer a sum. Verified here too.
  const mathRaw = asString(body.mathAnswer, 8);
  if (Number(mathRaw) !== MATH_ANSWER) {
    errors.mathAnswer = 'Please answer the sum to show you are not a robot.';
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { ok: false, code: 'VALIDATION', message: 'Some details need attention.', errors },
      { status: 422 },
    );
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;

  if (!webhook) {
    return NextResponse.json(
      {
        ok: false,
        code: 'NOT_CONFIGURED',
        message:
          'The contact form is not connected to an email service yet. Please call or email us directly and we will pick it up straight away.',
      },
      { status: 503 },
    );
  }

  try {
    const upstream = await fetch(webhook, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(process.env.CONTACT_WEBHOOK_TOKEN
          ? { Authorization: `Bearer ${process.env.CONTACT_WEBHOOK_TOKEN}` }
          : {}),
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        phone,
        inquiry,
        message,
        source: source || 'website',
        receivedAt: new Date().toISOString(),
      }),
    });

    if (!upstream.ok) {
      return NextResponse.json(
        {
          ok: false,
          code: 'DELIVERY_FAILED',
          message:
            'We could not deliver your message just now. Please call or email us directly.',
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        code: 'DELIVERY_FAILED',
        message:
          'We could not deliver your message just now. Please call or email us directly.',
      },
      { status: 502 },
    );
  }
}