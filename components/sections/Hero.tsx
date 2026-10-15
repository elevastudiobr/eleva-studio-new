
"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

import InteractiveLaptop from "@/components/hero/InteractiveLaptop";

type HeroProps = {
  onProgressChange?: (progress: number) => void;
};

export default function Hero({ onProgressChange }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const laptopProgressRef = useRef(0);
  const [laptopInFront, setLaptopInFront] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    laptopProgressRef.current = latest;
    setLaptopInFront(latest > 0.38);
    onProgressChange?.(latest);
  });

  const titleY = useTransform(
    scrollYProgress,
    [0, 0.65, 1],
    [0, -25, -100]
  );

  const titleScale = useTransform(
    scrollYProgress,
    [0, 0.6, 1],
    [1, 0.96, 0.82]
  );

  const titleOpacity = useTransform(
    scrollYProgress,
    [0, 0.75, 1],
    [1, 1, 0]
  );

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative z-20 h-[220svh] bg-[#050505]"
    >
      <div className="sticky top-0 flex h-[100svh] w-full items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('/images/hero/purple-blue-abstract-waves.jpg')",
          }}
        />

        <div
          className="pointer-events-none absolute inset-0"
          style={{
            zIndex: laptopInFront ? 20 : 5,
          }}
        >
          <InteractiveLaptop
            progressRef={laptopProgressRef}
            className="h-full w-full"
          />
        </div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={
            shouldReduceMotion
              ? undefined
              : {
                  y: titleY,
                  scale: titleScale,
                  opacity: titleOpacity,
                }
          }
          className="pointer-events-none relative z-10 w-full px-5"
        >
          <h1
            className="mx-auto flex w-fit max-w-full flex-col items-start"
            style={{
              fontFamily:
                '"Standard Black", "Arial Black", Impact, sans-serif',
              fontWeight: 900,
              fontSize: "clamp(4rem, 11.5vw, 10.5rem)",
              lineHeight: 0.78,
              letterSpacing: "-0.055em",
            }}
          >
            <span className="whitespace-nowrap text-white">
              ELEVE
            </span>

            <span
              className="whitespace-nowrap text-white"
              style={{
                marginLeft: "clamp(9rem, 28vw, 25rem)",
                marginTop: "0.1em",
              }}
            >
              O
            </span>

            <span
              className="whitespace-nowrap text-white"
              style={{
                marginLeft: "clamp(10rem, 34vw, 30rem)",
                marginTop: "0.1em",
              }}
            >
              NÍVEL
            </span>
          </h1>
        </motion.div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-32 bg-gradient-to-t from-[#050505] to-transparent" />
      </div>
    </section>
  );
}
