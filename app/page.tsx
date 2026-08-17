import { Portfolio } from "@/components/portfolio";
import { sections, type SectionKey } from "@/lib/content";

export default async function Home({ searchParams }: PageProps<"/">) {
  const { section } = await searchParams;
  const requested = Array.isArray(section) ? section[0] : section;
  const initialSection =
    requested && requested in sections ? (requested as SectionKey) : null;

  return <Portfolio initialSection={initialSection} />;
}
