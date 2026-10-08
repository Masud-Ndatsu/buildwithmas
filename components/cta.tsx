import { ContactLinks } from "./contact-links";
import { profile } from "@/lib/content";

export function Cta({ id }: { id?: string }) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-line">
      <div className="wrap py-24 sm:py-32">
        <h2 className="display max-w-[16ch] text-[clamp(40px,7vw,88px)]">
          Have something you want to build?
        </h2>
        <p className="mt-6 text-xl text-muted">Let&apos;s talk about it.</p>
        <a href={`mailto:${profile.email}`} className="btn btn-solid mt-10">
          Start a conversation →
        </a>
        <div className="mt-14">
          <ContactLinks />
        </div>
      </div>
    </section>
  );
}
