
"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import ContactLaptop from "@/components/sections/ContactLaptop";

const CTA_TEXT = "VAMOS ELEVAR O POTENCIAL DA SUA MARCA?";

export default function FAQClosing() {
  const runwayRef = useRef<HTMLDivElement>(null);
  const ctaTextRef = useRef<HTMLHeadingElement>(null);
  const laptopProgressRef = useRef(0);

  const [textTravel, setTextTravel] = useState({
    start: 1920,
    end: -4000,
  });

  useEffect(() => {
    const updateTextTravel = () => {
      const textWidth = ctaTextRef.current?.scrollWidth ?? 4000;

      setTextTravel({
        start: window.innerWidth,
        end: -textWidth,
      });
    };

    updateTextTravel();
    window.addEventListener("resize", updateTextTravel);

    return () => {
      window.removeEventListener("resize", updateTextTravel);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: runwayRef,
    offset: ["start start", "end end"],
  });

  // Começa à direita e atravessa toda a tela para a esquerda.
  const textX = useTransform(
    scrollYProgress,
    [0, 1],
    [textTravel.start, textTravel.end]
  );

  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.03, 0.94, 1],
    [0, 1, 1, 0]
  );

  const textScale = useTransform(
    scrollYProgress,
    [0, 0.2, 1],
    [0.96, 1, 0.98]
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
        {/* LAPTOP ATRÁS DO TEXTO */}
        <div className="pointer-events-none absolute inset-0 z-10">
          <ContactLaptop progressRef={laptopProgressRef} />
        </div>

        {/* CHAMADA PARA CONTATO */}
        <motion.div
          className="pointer-events-none absolute left-0 top-0 z-20 flex h-full w-max items-center overflow-visible"
          style={{
            x: textX,
            opacity: textOpacity,
            scale: textScale,
          }}
        >
          <h2
            ref={ctaTextRef}
            className="whitespace-nowrap text-[clamp(4.5rem,15vw,17rem)] font-black uppercase leading-[0.8] tracking-[-0.085em] text-white"
          >
            {CTA_TEXT}
          </h2>
        </motion.div>

        {/* IDENTIFICAÇÃO DISCRETA */}
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
