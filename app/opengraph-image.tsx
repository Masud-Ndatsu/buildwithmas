import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { profile } from "@/lib/content";
import { jobTitle, siteName, siteTitle } from "@/lib/site";

export const alt = siteTitle;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const font = (name: string) => readFile(join(process.cwd(), "assets", name));

export default async function Image() {
  const [light, medium, mono] = await Promise.all([
    font("Geist-Light.ttf"),
    font("Geist-Medium.ttf"),
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
          background: "#0c0c0b",
          padding: "64px 72px",
          fontFamily: "Geist",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 24,
              fontWeight: 500,
              letterSpacing: "0.14em",
              color: "#f2efe9",
            }}
          >
            {siteName.toUpperCase()}
          </div>
          <div
            style={{
              marginTop: 16,
              fontFamily: "Geist Mono",
              fontSize: 15,
              letterSpacing: "0.16em",
              color: "#8d887e",
            }}
          >
            {jobTitle.toUpperCase()}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ width: 64, height: 2, background: "#c98f3f" }} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 36,
              fontSize: 78,
              fontWeight: 300,
              letterSpacing: "-0.035em",
              lineHeight: 1.02,
              color: "#f2efe9",
            }}
          >
            <div style={{ display: "flex" }}>I build systems that</div>
            <div style={{ display: "flex" }}>are designed to scale.</div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            fontFamily: "Geist Mono",
            fontSize: 13,
            letterSpacing: "0.14em",
          }}
        >
          <div style={{ display: "flex", color: "#757067" }}>
            {profile.disciplines.join(" · ").toUpperCase()}
          </div>
          <div style={{ display: "flex", color: "#4f4b45" }}>ABUJA, NG</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: light, weight: 300, style: "normal" },
        { name: "Geist", data: medium, weight: 500, style: "normal" },
        { name: "Geist Mono", data: mono, weight: 400, style: "normal" },
      ],
    },
  );
}
