"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
const brandName = "BuildWithMas";

const links = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
];

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-background/90 backdrop-blur">
      <div className="wrap flex h-16 items-center justify-between">
        <Link
          href="/"
          onClick={close}
          aria-label={`${brandName} — home`}
          className="logo"
        >
          <span aria-hidden>{brandName}</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 sm:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={pathname.startsWith(l.href) ? "page" : undefined}
              className="text-[13px] tracking-[0.12em] uppercase transition-colors hover:text-accent aria-[current=page]:text-accent"
            >
              {l.label}
            </Link>
          ))}
          <Link href="/contact" className="btn btn-solid !px-4 !py-2 !text-[13px] tracking-[0.1em] uppercase">
            Let&apos;s talk
          </Link>
        </nav>

        <button
          type="button"
          className="text-[13px] tracking-[0.12em] uppercase sm:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-menu"
          aria-label="Primary"
          className="wrap flex flex-col border-t border-line pb-4 sm:hidden"
        >
          {[...links, { href: "/contact", label: "Let's talk" }].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={close}
              className="display border-b border-line py-4 text-2xl last:border-0"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
