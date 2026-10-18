"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { nansen } from "@/lib/content";

type Phase = "photo" | "live" | "still";

export function NansenMorph() {
  const frame = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState<Phase>("photo");

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setPhase("still");
      return;
    }

    const node = frame.current;
    if (!node) return;

    let cancelled = false;
    let liveTimer = 0;
    let stillTimer = 0;
    let inView = false;
    let decoded = false;
    let started = false;

    const drawing = new window.Image();
    drawing.src = nansen.sketch;

    const start = () => {
      if (cancelled || started || !inView || !decoded) return;
      started = true;
      observer.disconnect();
      liveTimer = window.setTimeout(() => {
        if (!cancelled) setPhase("live");
      }, 400);
    };

    const onFadeEnd = (event: AnimationEvent) => {
      if (event.animationName !== "nansen-fade-in") return;
      stillTimer = window.setTimeout(() => {
        if (!cancelled) setPhase("still");
      }, 40);
    };

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (!entry?.isIntersecting) return;
      const arrived = entry.intersectionRatio >= 0.3 || entry.intersectionRect.height >= 180;
      if (!arrived) return;
      inView = true;
      start();
    }, { threshold: [0, 0.3, 0.5] });

    const markDecoded = () => {
      decoded = true;
      start();
    };

    node.addEventListener("animationend", onFadeEnd);
    observer.observe(node);
    if (drawing.complete && drawing.naturalWidth > 0) markDecoded();
    else drawing.addEventListener("load", markDecoded, { once: true });

    return () => {
      cancelled = true;
      drawing.removeEventListener("load", markDecoded);
      observer.disconnect();
      node.removeEventListener("animationend", onFadeEnd);
      window.clearTimeout(liveTimer);
      window.clearTimeout(stillTimer);
    };
  }, []);

  const live = phase === "live";
  const still = phase === "still";

  return (
    <figure
      ref={frame}
      className={`nansen-morph relative min-h-72 lg2:min-h-full${live ? " is-live" : ""}${still ? " is-still" : ""}`}
      aria-label={nansen.alt}
    >
      <Image src={nansen.image} alt="" fill sizes="(min-width: 1025px) 40vw, 100vw" className="nansen-photo object-cover" />
      <Image src={nansen.sketch} alt="" fill sizes="(min-width: 1025px) 40vw, 100vw" className="nansen-final object-cover" />
    </figure>
  );
}
