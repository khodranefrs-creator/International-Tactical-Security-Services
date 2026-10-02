import Link from 'next/link';
import { services } from '@/content/services';

export default function NotFound() {
  return (
    <section className="on-navy bg-navy-deep text-ivory">
      <div className="mx-auto flex min-h-[70vh] max-w-[82.5rem] flex-col justify-center px-gutter py-24">
        <p className="t-eyebrow text-brass">Error 404</p>
        <h1 className="t-h1 mt-7 max-w-3xl text-ivory">This page is not on our list.</h1>
        <p className="t-lead mt-7 max-w-xl text-ivory/60">
          The address may have changed, or the link that brought you here may be out of date. Here
          is the way back.
        </p>

        <ul className="mt-12 flex flex-col border-t border-navy-line sm:grid sm:grid-cols-2 sm:gap-x-12">
          {services.map((s) => (
            <li key={s.slug} className="border-b border-navy-line">
              <Link
                href={`/${s.slug}/`}
                className="group flex items-center justify-between gap-4 py-4 text-[0.9375rem] text-ivory/70 transition-colors hover:text-brass"
              >
                {s.name}
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
          <Link href="/" className="t-meta uppercase tracking-[0.13em] text-brass hover:underline">
            Go to the homepage
          </Link>
          <Link
            href="/contact/"
            className="t-meta uppercase tracking-[0.13em] text-ivory/50 hover:text-ivory"
          >
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}