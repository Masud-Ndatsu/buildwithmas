import { channels } from "@/lib/content";

export function ContactLinks() {
  return (
    <ul className="flex flex-wrap gap-x-10 gap-y-4">
      {channels.map((c) => {
        const external = !c.href.startsWith("mailto:");
        return (
          <li key={c.label}>
            <a
              href={c.href}
              {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
              className="link-line"
            >
              {c.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
