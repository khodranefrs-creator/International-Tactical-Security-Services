'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Logo } from '@/components/logo';
import { ActionLink, ArrowGlyph } from '@/components/action';
import { mainNav, primaryCta } from '@/content/site';
import { services, serviceHref } from '@/content/services';
import { primaryPhone, tollFreePhone, mailtoHref } from '@/lib/contact';
import { cn } from '@/lib/contact';

const serviceLinks = services.map((s) => ({ label: s.navLabel, href: serviceHref(s.slug) }));

/* ------------------------------------------------------------------ *
 * Services dropdown — mouse, keyboard and screen-reader accessible.
 * ------------------------------------------------------------------ */
function ServicesMenu() {
  /**
   * The menu records which route it was opened on and compares against the
   * current route, so navigating closes it without an effect that sets state.
   */
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const pathname = usePathname();
  const open = openedOn === pathname;
  const setOpen = useCallback(
    (value: boolean) => setOpenedOn(value ? pathname : null),
    [pathname],
  );
  const isActive =
    pathname.startsWith('/services') || serviceLinks.some((s) => pathname === s.href);

  useEffect(() => {
    if (!open) return;
    const wrap = wrapRef.current;

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    function onPointerDown(e: MouseEvent) {
      if (!wrap?.contains(e.target as Node)) setOpen(false);
    }
    function onFocusOut(e: FocusEvent) {
      if (!wrap?.contains(e.relatedTarget as Node | null)) setOpen(false);
    }
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onPointerDown);
    wrap?.addEventListener('focusout', onFocusOut);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onPointerDown);
      wrap?.removeEventListener('focusout', onFocusOut);
    };
  }, [open, setOpen]);

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={() => setOpen(!open)}
        className={cn(
          't-meta relative flex items-center gap-1.5 py-2 uppercase tracking-[0.13em] transition-colors duration-200',
          isActive ? 'text-navy' : 'text-ink-soft hover:text-navy',
        )}
      >
        Services
        <svg
          aria-hidden="true"
          viewBox="0 0 10 6"
          className={cn(
            'h-1.5 w-2.5 transition-transform duration-200',
            open && 'rotate-180',
          )}
          fill="none"
        >
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.3" />
        </svg>
        {isActive ? (
          <span aria-hidden="true" className="absolute inset-x-0 -bottom-0.5 h-px bg-brass" />
        ) : null}
      </button>

      <div
        id={menuId}
        hidden={!open}
        className="absolute left-1/2 top-full z-50 w-[19rem] -translate-x-1/2 pt-4"
      >
        <div className="border border-rule bg-white py-2 shadow-[0_18px_40px_-24px_rgba(16,31,43,0.4)]">
          <p className="t-eyebrow px-5 pb-2 pt-3 text-navy/40">Private Security Services</p>
          <ul>
            {serviceLinks.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  className="group flex items-center justify-between gap-4 px-5 py-2.5 text-[0.9375rem] text-ink transition-colors hover:bg-ivory hover:text-navy"
                >
                  {s.label}
                  <ArrowGlyph className="text-brass opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-2 border-t border-rule px-5 pt-3 pb-3">
            <Link
              href="/services/"
              /* min-h matches the service links above (45px) so the whole
                 dropdown shares one hit area. */
              className="t-meta inline-flex min-h-[2.8125rem] items-center gap-2 uppercase tracking-[0.13em] text-brass-deep hover:text-navy"
            >
              All services <ArrowGlyph />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Mobile navigation
 * ------------------------------------------------------------------ */
function MobileNav({ onClose }: { onClose: () => void }) {
  const pathname = usePathname();

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] lg:hidden">
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-navy-deep/70"
        tabIndex={-1}
      />
      <div className="anim-fade absolute inset-y-0 right-0 flex w-[min(23rem,90vw)] flex-col overflow-y-auto overscroll-contain bg-ivory">
        <div className="flex shrink-0 items-center justify-between border-b border-rule px-6 py-5">
          <Logo tone="light" priority />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="-mr-2 flex h-11 w-11 shrink-0 items-center justify-center text-navy transition-colors hover:text-brass-deep"
          >
            <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4" fill="none">
              <path d="M1 1l14 14M15 1L1 15" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </button>
        </div>

        {/* min-h-0 lets this flex child actually scroll inside the panel
            instead of pushing the contact block out of view. */}
        <nav aria-label="Mobile" className="min-h-0 flex-1 px-6 py-6">
          <ul className="flex flex-col">
            {mainNav
              .filter((n) => n.href !== '/contact/')
              .map((item) => (
                <li key={item.href} className="border-b border-rule/70">
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      'block py-3.5 font-display text-[1.4rem] leading-tight transition-colors',
                      pathname === item.href ? 'text-brass-deep' : 'text-navy hover:text-brass-deep',
                    )}
                  >
                    {item.label}
                  </Link>
                  {item.href === '/services/' ? (
<ul className="mb-3.5 flex flex-col gap-2 pl-3">
                      {serviceLinks.map((s) => (
                        <li key={s.href}>
                          <Link
                            href={s.href}
                            onClick={onClose}
                            className="t-meta flex items-center gap-2.5 py-0.5 uppercase tracking-[0.1em] text-ink-muted hover:text-navy"
                          >
                            <span aria-hidden="true" className="h-px w-3 bg-brass" />
                            {s.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
          </ul>
        </nav>

        <div className="shrink-0 border-t border-rule bg-white px-6 py-6">
          <ActionLink href={primaryCta.href} tone="brass" size="md" full>
            {primaryCta.label}
          </ActionLink>
          <div className="mt-5 flex flex-col gap-2">
            <a
              href={primaryPhone.href}
              className="t-meta flex items-center justify-between text-navy hover:text-brass-deep"
            >
              <span className="uppercase tracking-[0.13em] text-ink-muted">Call</span>
              <span className="text-[0.9375rem] tracking-normal">{primaryPhone.label}</span>
            </a>
            <a
              href={tollFreePhone.href}
              className="t-meta flex items-center justify-between text-navy hover:text-brass-deep"
            >
              <span className="uppercase tracking-[0.13em] text-ink-muted">Toll free</span>
              <span className="text-[0.9375rem] tracking-normal">{tollFreePhone.label}</span>
            </a>
            <a
              href={mailtoHref}
              className="t-meta flex items-center justify-between border-t border-rule pt-3 text-navy hover:text-brass-deep"
            >
              <span className="uppercase tracking-[0.13em] text-ink-muted">Email</span>
              <span className="text-[0.75rem] tracking-normal">
                info@internationaltacticalsecurity.com
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Header
 * ------------------------------------------------------------------ */
export function SiteHeader() {
  /** Same route-keyed trick as the services menu, for the mobile drawer. */
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const pathname = usePathname();
  const menuOpen = openedOn === pathname;
  const setMenuOpen = (value: boolean) => setOpenedOn(value ? pathname : null);

  return (
    <header className="sticky top-0 z-[90]">
      {/* Utility strip — scrolls away, keeps the sticky bar short */}
      <div className="hidden bg-navy-deep text-ivory/70 lg:block">
        {/* The links carry their own vertical padding so they reach a 24px
            minimum hit area without making the strip any taller. */}
        <div className="mx-auto flex max-w-[82.5rem] items-center justify-between px-gutter">
          <p className="t-meta tracking-[0.12em] uppercase">
            Portland, Oregon&nbsp;&nbsp;·&nbsp;&nbsp;Vancouver, Washington
          </p>
          <div className="flex items-center gap-6">
            <a
              href={mailtoHref}
              className="t-meta inline-flex items-center py-1 transition-colors hover:text-ivory"
            >
              info@internationaltacticalsecurity.com
            </a>
            <span aria-hidden="true" className="h-3 w-px bg-ivory/20" />
            <a
              href={tollFreePhone.href}
              className="t-meta inline-flex items-center py-1 transition-colors hover:text-ivory"
            >
              {tollFreePhone.label}
            </a>
          </div>
        </div>
      </div>

      {/* Primary bar */}
      <div className="border-b border-rule bg-ivory/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[82.5rem] items-center justify-between gap-6 px-gutter py-3.5 lg:py-4">
          <Link href="/" aria-label="International Tactical Security Services — home" className="flex shrink-0 items-center gap-3 py-1 lg:py-0">
            <Logo tone="light" priority />
            <span className="hidden sm:block">
              <span className="block font-display text-[0.9375rem] leading-[1.15] font-medium tracking-[-0.005em] text-navy">
                International Tactical
              </span>
              <span className="t-eyebrow block text-[0.5625rem] tracking-[0.22em] text-ink-muted">
                Security Services
              </span>
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {mainNav
              .filter((n) => !n.hasMenu && n.href !== '/contact/')
              .map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      't-meta relative flex items-center py-2 uppercase tracking-[0.13em] transition-colors duration-200',
                      active ? 'text-navy' : 'text-ink-soft hover:text-navy',
                    )}
                  >
                    {item.label}
                    {active ? (
                      <span aria-hidden="true" className="absolute inset-x-0 -bottom-0.5 h-px bg-brass" />
                    ) : null}
                  </Link>
                );
              })}
            <ServicesMenu />
          </nav>

          <div className="flex items-center gap-4">
            <a
              href={primaryPhone.href}
              className="hidden shrink-0 items-center gap-2.5 py-1 text-navy transition-colors hover:text-brass-deep md:flex"
            >
              <svg aria-hidden="true" viewBox="0 0 14 14" className="h-3.5 w-3.5 text-brass" fill="none">
                <path
                  d="M2 1h2.2l1.3 3.4-1.4 1a8 8 0 003.5 3.5l1-1.4L12 9v2a1 1 0 01-1.1 1A11 11 0 011 2.1 1 1 0 012 1z"
                  stroke="currentColor"
                  strokeWidth="1.1"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="t-meta text-[0.8125rem] tracking-[0.06em]">{primaryPhone.label}</span>
            </a>

            <ActionLink
              href={primaryCta.href}
              tone="navy"
              size="sm"
              className="hidden lg:inline-flex"
            >
              Request Security
            </ActionLink>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="-mr-2 flex h-11 w-11 shrink-0 items-center justify-center text-navy transition-colors hover:text-brass-deep lg:hidden"
            >
              <svg aria-hidden="true" viewBox="0 0 20 14" className="h-3.5 w-5" fill="none">
                <path d="M0 1h20M0 7h20M0 13h20" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {menuOpen ? <MobileNav onClose={() => setMenuOpen(false)} /> : null}
    </header>
  );
}