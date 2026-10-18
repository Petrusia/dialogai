"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const sketch = "/assets/hero-sketch.webp";

type Phase = "photo" | "live" | "still";

export function HeroMorph() {
  const [phase, setPhase] = useState<Phase>("photo");

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setPhase("still");
      return;
    }

    let cancelled = false;
    let liveTimer = 0;
    let stillTimer = 0;
    const drawing = new window.Image();
    drawing.src = sketch;

    const onGestureEnd = (event: AnimationEvent) => {
      if (event.animationName !== "hero-sway") return;
      stillTimer = window.setTimeout(() => {
        if (!cancelled) setPhase("still");
      }, 220);
    };

    const begin = () => {
      liveTimer = window.setTimeout(() => {
        if (!cancelled) setPhase("live");
      }, 700);
    };

    document.addEventListener("animationend", onGestureEnd);
    if (drawing.complete && drawing.naturalWidth > 0) begin();
    else drawing.addEventListener("load", begin, { once: true });

    return () => {
      cancelled = true;
      document.removeEventListener("animationend", onGestureEnd);
      window.clearTimeout(liveTimer);
      window.clearTimeout(stillTimer);
    };
  }, []);

  const live = phase === "live";
  const still = phase === "still";

  return (
    <figure
      className={`hero-morph relative order-2 aspect-[4/3] overflow-hidden shadow-soft${live ? " is-live" : ""}${still ? " is-still" : ""}`}
      aria-label="Žmonės sėdi ratu pievoje prie upės ir kalbasi."
    >
      <Image
        src="/assets/hero.webp"
        alt=""
        fill
        preload
        sizes="(min-width: 1025px) 46vw, 100vw"
        className="hero-photo object-cover object-[center_42%]"
      />
      <div className="hero-rig absolute inset-0" aria-hidden>
        <Image src="/assets/hero-sketch-base.webp" alt="" fill sizes="(min-width: 1025px) 46vw, 100vw" className="object-cover" />
        <div className="hero-branches absolute inset-0">
          <Image src={sketch} alt="" fill sizes="(min-width: 1025px) 46vw, 100vw" className="hero-branches-img object-cover" />
        </div>
        <Image src="/assets/hero-hand-right.webp" alt="" fill unoptimized className="hero-hand hero-hand-right object-cover" />
        <Image src="/assets/hero-hand-left.webp" alt="" fill unoptimized className="hero-hand hero-hand-left object-cover" />
      </div>
      <Image src={sketch} alt="" fill sizes="(min-width: 1025px) 46vw, 100vw" className="hero-final object-cover" />
    </figure>
  );
}
