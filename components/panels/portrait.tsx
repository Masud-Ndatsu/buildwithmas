"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Portrait frame. Drop a 3:4 image at `public/portrait.jpg` and it fills the
 * frame; until then the frame stays as a labelled placeholder.
 */
export function Portrait() {
  const [unavailable, setUnavailable] = useState(false);

  return (
    <div className="relative min-h-[180px] flex-1 border border-border-dark">
      {unavailable ? (
        <div className="eyebrow absolute inset-0 flex items-center justify-center text-center leading-[2] text-text-tertiary">
          Portrait
          <br />
          3:4
        </div>
      ) : (
        <Image
          src="/portrait.jpg"
          alt="Mas'ud Ndatsu"
          fill
          sizes="(max-width: 640px) 70vw, 340px"
          className="object-cover"
          onError={() => setUnavailable(true)}
        />
      )}
    </div>
  );
}
