import { readdir } from "node:fs/promises";
import { join } from "node:path";

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  draft?: boolean;
};

type Frontmatter = Omit<PostMeta, "slug">;

const dir = join(process.cwd(), "content", "posts");

export async function loadPost(slug: string) {
  try {
    const mod = (await import(`@/content/posts/${slug}.mdx`)) as {
      default: React.ComponentType;
      frontmatter: Frontmatter;
    };
    // Drafts are visible in development only.
    if (mod.frontmatter.draft && process.env.NODE_ENV === "production") return null;
    return { Content: mod.default, meta: { slug, ...mod.frontmatter } as PostMeta };
  } catch {
    return null;
  }
}

export async function getPosts(): Promise<PostMeta[]> {
  const files = (await readdir(dir)).filter((f) => f.endsWith(".mdx"));
  const posts = await Promise.all(files.map((f) => loadPost(f.replace(/\.mdx$/, ""))));
  return posts
    .filter((p) => p !== null)
    .map((p) => p.meta)
    .sort((a, b) => b.date.localeCompare(a.date));
}
