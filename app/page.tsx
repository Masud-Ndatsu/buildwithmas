import { Portfolio } from "@/components/portfolio";
import { engineering, profile, sections, type SectionKey } from "@/lib/content";
import { jobTitle, siteDescription, siteName, siteUrl } from "@/lib/site";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteName,
  url: siteUrl,
  jobTitle,
  description: siteDescription,
  email: `mailto:${profile.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Abuja",
    addressCountry: "NG",
  },
  knowsAbout: engineering,
  sameAs: [profile.github.href, profile.linkedin?.href].filter(Boolean),
};

export default async function Home({ searchParams }: PageProps<"/">) {
  const { section } = await searchParams;
  const requested = Array.isArray(section) ? section[0] : section;
  const initialSection =
    requested && requested in sections ? (requested as SectionKey) : null;

  return (
    <>
      <script
        type="application/ld+json"
        // Static content; `<` is escaped so the JSON cannot close the tag.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema).replace(/</g, "\\u003c"),
        }}
      />
      <Portfolio initialSection={initialSection} />
    </>
  );
}
