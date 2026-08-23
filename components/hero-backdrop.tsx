import Image from "next/image";

/**
 * Portrait bled into the hero as a backdrop.
 *
 * Decorative here — the About panel carries the properly labelled portrait,
 * and the name is already in the masthead, so this is aria-hidden.
 *
 * On a phone it fills the screen, whose proportions roughly match the source.
 * From md up it is inset from the left so it reads as a portrait occupying the
 * negative space rather than one enormous centred face behind the type.
 */
export function HeroBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 md:left-[64%]">
        <Image
          src="/images/passport.png"
          alt=""
          fill
          priority
          sizes="(max-width: 768px) 100vw, 36vw"
          draggable={false}
          className="object-cover object-[22%_10%] md:object-[50%_10%] grayscale contrast-[1.1] brightness-[0.8]"
        />
      </div>

      {/* Holds the type legible and fades the photo back into the page. */}
      <div className="hero-scrim absolute inset-0" />
    </div>
  );
}
