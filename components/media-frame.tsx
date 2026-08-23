"use client";

import Image from "next/image";
import { useState } from "react";

type MediaFrameProps = {
  src: string;
  alt: string;
  /** Shown in the frame when the file is not present yet. */
  placeholder: string;
  sizes: string;
  /** CSS aspect-ratio, e.g. "3 / 4". Reserves space so images cannot cause CLS. */
  ratio?: string;
  /** Mono caption rendered beneath the frame. */
  caption?: string;
  className?: string;
};

/**
 * Bordered media frame with a designed fallback.
 *
 * Every image on the site goes through here: if the file is missing the frame
 * stays as a labelled placeholder rather than collapsing, so the layout is
 * identical whether or not the asset has been added yet.
 *
 * Photography is desaturated so it cannot compete with the single-accent
 * palette, and `draggable={false}` keeps native image dragging from hijacking
 * the canvas pan (see `use-horizontal-canvas.ts`).
 */
export function MediaFrame({
  src,
  alt,
  placeholder,
  sizes,
  ratio,
  caption,
  className = "",
}: MediaFrameProps) {
  const [unavailable, setUnavailable] = useState(false);

  return (
    <figure className={`flex min-h-0 flex-col gap-3 ${className}`}>
      <div
        className={`relative min-h-0 border border-border-dark ${
          ratio ? "w-full" : "flex-1"
        }`}
        style={ratio ? { aspectRatio: ratio } : undefined}
      >
        {unavailable ? (
          <div className="eyebrow absolute inset-0 flex items-center justify-center px-4 text-center leading-[2] text-text-tertiary">
            {placeholder}
          </div>
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            draggable={false}
            className="object-cover grayscale-[0.85] contrast-[1.05] brightness-[0.95]"
            onError={() => setUnavailable(true)}
          />
        )}
      </div>

      {caption ? (
        <figcaption className="font-mono text-[10px] tracking-[0.16em] text-text-dark uppercase">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
