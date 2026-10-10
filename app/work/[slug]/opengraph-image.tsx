import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { projects } from "@/lib/content";
import { siteName } from "@/lib/site";

export const alt = "Case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

const font = (name: string) => readFile(join(process.cwd(), "assets", name));

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  const [light, mono] = await Promise.all([
    font("Geist-Light.ttf"),
    font("GeistMono-Regular.ttf"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#faf8f4",
          padding: "64px 72px",
          fontFamily: "Geist",
          color: "#1a1816",
        }}
      >
        <div style={{ display: "flex", fontFamily: "Geist Mono", fontSize: 18, letterSpacing: "0.14em", color: "#6b665e" }}>
          {`CASE STUDY · ${(p?.category ?? "").toUpperCase()}`}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ width: 64, height: 2, background: "#b4532f" }} />
          <div style={{ display: "flex", marginTop: 32, fontSize: 112, fontWeight: 300, letterSpacing: "-0.035em", lineHeight: 1 }}>
            {p?.name ?? siteName}
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 32, fontWeight: 300, color: "#6b665e", maxWidth: 940 }}>
            {p?.tagline}
          </div>
        </div>
        <div style={{ display: "flex", fontFamily: "Geist Mono", fontSize: 16, letterSpacing: "0.14em", color: "#6b665e" }}>
          {siteName.toUpperCase()}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: light, weight: 300, style: "normal" },
        { name: "Geist Mono", data: mono, weight: 400, style: "normal" },
      ],
    },
  );
}
