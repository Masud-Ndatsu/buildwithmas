import Link from "next/link";
import { profile } from "@/lib/content";

export function Cta() {
  return (
    <section className="border-t border-line">
      <div className="wrap py-24 sm:py-32">
        <h2 className="display max-w-[16ch] text-[clamp(40px,7vw,88px)]">
          Have something you want to build?
        </h2>
        <p className="mt-6 max-w-[48ch] text-xl text-muted">
          Tell me what you&apos;re working on. We can figure out the product,
          the technical approach, and what it takes to get it built.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Link href="/about#contact" className="btn btn-solid">
            Let&apos;s talk →
          </Link>
          <a href={`mailto:${profile.email}`} className="link-line">
            {profile.email}
          </a>
        </div>
      </div>
    </section>
  );
}
