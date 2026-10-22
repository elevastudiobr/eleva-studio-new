
"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import ContactLaptop from "@/components/sections/ContactLaptop";

export default function FAQClosing() {
  const runwayRef = useRef<HTMLDivElement>(null);
  const laptopProgressRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: runwayRef,
    offset: ["start start", "end end"],
  });

  const textX = useTransform(
    scrollYProgress,
    [0, 1],
    ["100vw", "-125vw"]
  );

  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.96, 1],
    [0, 1, 1, 0.8]
  );

  const textScale = useTransform(
    scrollYProgress,
    [0, 0.2, 1],
    [0.92, 1, 0.92]
  );

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    laptopProgressRef.current = Math.max(0, Math.min(1, progress));
  });

  return (
    <section
      ref={runwayRef}
      aria-label="Encerramento da Eleva Studio"
      className="relative h-[320vh] w-full bg-[#050505]"
    >
      <div className="sticky top-0 isolate h-[100svh] w-full overflow-hidden bg-[#050505]">
        {/* Fundo sem imagens ou painéis brancos */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 bg-[#050505]"
        />

        {/* Laptop atrás do texto */}
        <div className="pointer-events-none absolute inset-0 z-10">
          <ContactLaptop progressRef={laptopProgressRef} />
        </div>

        {/* Texto controlado pelo scroll */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 flex items-center overflow-visible"
          style={{
            x: textX,
            opacity: textOpacity,
            scale: textScale,
          }}
        >
          <h2 className="whitespace-nowrap font-black uppercase leading-[0.82] tracking-[-0.075em] text-white text-[clamp(4rem,11.5vw,12rem)]">
            SUA MARCA MERECE SER INESQUECÍVEL.
          </h2>
        </motion.div>

        {/* Identificação discreta */}
        <motion.div
          className="pointer-events-none absolute bottom-8 left-6 z-30 sm:bottom-10 sm:left-12"
          style={{ opacity: textOpacity }}
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/50 sm:text-xs">
            Eleva Studio — Experiências digitais
          </p>
        </motion.div>
      </div>
    </section>
  );
}
