import type { Metadata, Viewport } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import {
  siteDescription,
  siteLocation,
  siteName,
  siteTitle,
  siteUrl,
} from "@/lib/site";
import { experience, profile } from "@/lib/content";
import { jobTitle } from "@/lib/site";
import { Analytics } from "@vercel/analytics/next";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  title: {
    default: siteTitle,
    template: `%s · ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  category: "technology",
  openGraph: {
    type: "profile",
    firstName: "Mas'ud",
    lastName: "Ndatsu",
    url: siteUrl,
    siteName,
    title: siteTitle,
    description: siteDescription,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  other: { "profile:username": "Masud-Ndatsu" },
};

export const viewport: Viewport = {
  themeColor: "#faf8f4",
  colorScheme: "light",
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteName,
  alternateName: ["Masud Ndatsu", "Mas'ud"],
  url: siteUrl,
  image: `${siteUrl}/images/passport.png`,
  jobTitle,
  address: {
    "@type": "PostalAddress",
    addressLocality: siteLocation.split(", ")[0],
    addressCountry: "NG",
  },
  worksFor: { "@type": "Organization", name: experience[0].org },
  alumniOf: "Ahmadu Bello University",
  description: siteDescription,
  email: `mailto:${profile.email}`,
  sameAs: [profile.github, profile.linkedin, profile.x]
    .filter((p) => !p.todo)
    .map((p) => p.href),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          // Static content; `<` is escaped so the JSON cannot close the tag.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personSchema).replace(/</g, "\\u003c"),
          }}
        />
        <SiteNav />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
