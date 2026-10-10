import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  async redirects() {
    return [
      {
        source: "/work/user-management",
        destination: "/work/user-management-system",
        permanent: true,
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

// Plugins are named as strings so they work with Turbopack.
const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-frontmatter", ["remark-mdx-frontmatter", { name: "frontmatter" }]],
  },
});

export default withMDX(nextConfig);
