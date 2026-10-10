import { channels, profile } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="wrap grid gap-8 py-12 sm:grid-cols-2">
        <div>
          <p className="display text-2xl">{profile.name}</p>
          <p className="mt-2 text-sm text-muted">Backend &amp; AI Engineer · Abuja, Nigeria</p>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm sm:justify-end">
          {channels.map((c) => (
            <li key={c.label}>
              <a
                href={c.href}
                {...(c.href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noreferrer" })}
                className="link-line"
              >
                {c.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="text-sm text-muted sm:col-span-2">
          © {new Date().getFullYear()} {profile.name}
        </p>
      </div>
    </footer>
  );
}
