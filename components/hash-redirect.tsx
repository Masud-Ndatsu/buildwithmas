"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Old links used /work#slug; send them to the project's own page. */
export function HashRedirect({ slugs }: { slugs: string[] }) {
  const router = useRouter();
  useEffect(() => {
    const slug = window.location.hash.slice(1);
    if (slugs.includes(slug)) router.replace(`/work/${slug}`);
  }, [slugs, router]);
  return null;
}
