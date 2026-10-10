import type { Metadata } from "next";
import { siteName } from "@/lib/site";

/**
 * Per-page metadata. A page's `openGraph` replaces the layout's wholesale,
 * so each page needs its own url, title and description.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      siteName,
      title: `${title} · ${siteName}`,
      description,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${siteName}`,
      description,
    },
  };
}
