"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function BeyondDesign() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const root = document.documentElement;

    const defaultColor = "#050505";
    const sectionColor = "#FFFFFF";

    let frame = 0;

    const updateBackground = () => {
      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        const isActive =
          rect.top < viewportHeight * 0.65 &&
          rect.bottom > viewportHeight * 0.35;

        const nextColor = isActive ? sectionColor : defaultColor;

        root.style.setProperty("--site-background", nextColor);
        root.dataset.lightSection = String(isActive);
      });
    };

    root.style.setProperty(
      "--site-background-transition",
      shouldReduceMotion
        ? "none"
        : "background-color 850ms cubic-bezier(0.22, 1, 0.36, 1)"
    );

    updateBackground();

    window.addEventListener("scroll", updateBackground, {
      passive: true,
    });

    window.addEventListener("resize", updateBackground);

    return () => {
      cancelAnimationFrame(frame);

      window.removeEventListener("scroll", updateBackground);
      window.removeEventListener("resize", updateBackground);

      root.style.setProperty("--site-background", defaultColor);
      delete root.dataset.lightSection;
    };
  }, [shouldReduceMotion]);

  return (
    <section
      ref={sectionRef}
      id="visao"
      className="relative z-10 overflow-hidden bg-transparent px-5 py-32 text-[#050505] sm:px-8 sm:py-40 lg:px-14 lg:py-48"
    >
      <div className="mx-auto max-w-[1440px]">
        <motion.div
          initial={
            shouldReduceMotion ? false : { opacity: 0, y: 28 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="max-w-6xl"
        >
          <p className="mb-8 text-[10px] font-medium uppercase tracking-[0.35em] text-black/45 sm:text-xs">
            ELEVA STUDIO — ALÉM DO DESIGN
          </p>

          <h2
            className="text-[clamp(3rem,8.5vw,8rem)] leading-[0.88] tracking-[-0.07em]"
            style={{
              fontFamily:
                '"Standard Black", "Arial Black", Impact, sans-serif',
              fontWeight: 900,
            }}
          >
            UM SITE NÃO É
            <br />
            O FIM DO PROCESSO.
            <br />
            É O COMEÇO DA
            <br />
            <span className="text-[#7770ff]">PERCEPÇÃO.</span>
          </h2>

          <div className="mt-12 flex flex-col gap-8 border-t border-black/15 pt-7 sm:mt-16 sm:flex-row sm:items-start sm:justify-between sm:gap-12">
            <p className="max-w-xl text-base leading-7 text-black/65 sm:text-lg sm:leading-8">
              Design com intenção. Tecnologia com propósito.
              Experiências digitais que fazem uma marca ser percebida
              de outra forma.
            </p>

            <span className="shrink-0 text-[10px] uppercase tracking-[0.25em] text-black/40">
              ESTRATÉGIA · DESIGN · TECNOLOGIA
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}