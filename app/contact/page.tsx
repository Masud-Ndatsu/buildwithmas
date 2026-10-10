import type { Metadata } from "next";
import { profile } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { siteName, siteUrl } from "@/lib/site";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Tell Mas'ud Ndatsu about your product, backend or AI project. Replies within 48 hours.",
  path: "/contact",
});

const schema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: `Contact ${siteName}`,
  url: `${siteUrl}/contact`,
  mainEntity: { "@type": "Person", name: siteName, url: siteUrl, email: profile.email },
};

export default function ContactPage() {
  return (
    <section className="wrap pt-16 pb-24 sm:pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
      />
      <h1 className="display text-[clamp(52px,9vw,120px)]">Let&apos;s talk</h1>
      <p className="mt-6 mb-12 max-w-[40ch] text-xl text-muted">
        Tell me what you&apos;re building. I reply within 48 hours.
      </p>
      <ContactForm email={profile.email} />
    </section>
  );
}
