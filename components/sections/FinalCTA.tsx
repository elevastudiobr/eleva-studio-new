
"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

type FinalCTAProps = {
  progress: MotionValue<number>;
};

const COLORS = {
  background: "#050505",
  text: "#FFFFFF",
  muted: "rgba(255, 255, 255, 0.58)",
  accent: "#8176ED",
  line: "rgba(255, 255, 255, 0.18)",
};

const displayFont = {
  fontFamily: '"Standard Black", "Arial Black", Impact, sans-serif',
  fontWeight: 900,
} as const;

export default function FinalCTA({ progress }: FinalCTAProps) {
  // A CTA só aparece depois que o texto em movimento termina.
  const opacity = useTransform(
    progress,
    [0, 0.84, 0.91, 0.97, 1],
    [0, 0, 1, 1, 1]
  );

  const y = useTransform(
    progress,
    [0.84, 0.97, 1],
    [22, 0, 0]
  );

  const pointerEvents = useTransform(
    progress,
    (value) => (value >= 0.91 ? "auto" : "none")
  );

  return (
    <motion.section
      aria-label="Entre em contato com a Eleva Studio"
      className="absolute inset-0 z-40 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      style={{
        opacity,
        y,
        pointerEvents,
        backgroundColor: COLORS.background,
        color: COLORS.text,
      }}
    >
      {/* Fundo exclusivo da CTA */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <div className="absolute -right-[25%] -top-[35%] h-[95vw] w-[95vw] rounded-full bg-[#6557B8]/20 blur-[120px] sm:blur-[180px]" />

        <div className="absolute -bottom-[45%] -left-[25%] h-[100vw] w-[100vw] rounded-full bg-[#293D8F]/20 blur-[120px] sm:blur-[190px]" />

        <div className="absolute left-[25%] top-[30%] h-[45vw] w-[45vw] rounded-full bg-[#6557B8]/[0.07] blur-[100px] sm:blur-[150px]" />

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.08)_0%,rgba(5,5,5,0.28)_55%,rgba(5,5,5,0.72)_100%)]" />
      </div>

      <div className="relative mx-auto flex min-h-full w-full max-w-[1800px] flex-col px-5 py-8 sm:px-8 sm:py-10 lg:px-14 lg:py-12">
        <main className="flex flex-1 flex-col justify-center py-10 sm:py-14 lg:py-12">
          <div className="mb-7 flex items-center gap-3 sm:mb-9">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: COLORS.accent }}
            />

            <span
              className="text-[10px] font-medium uppercase tracking-[0.22em] sm:text-xs"
              style={{ color: COLORS.muted }}
            >
              Vamos conversar?
            </span>
          </div>

          <h2
            className="max-w-[1400px] text-[clamp(3.5rem,11.5vw,11rem)] leading-[0.77] tracking-[-0.085em]"
            style={displayFont}
          >
            SUA IDEIA.
            <br />
            NOSSO
            <br />
            <span style={{ color: COLORS.accent }}>PRÓXIMO</span>
            <br />
            PROJETO.
          </h2>

          <div
            className="mt-10 grid gap-8 border-t pt-6 sm:mt-14 sm:pt-8 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-12"
            style={{ borderColor: COLORS.line }}
          >
            <div className="max-w-[500px]">
              <p className="text-lg leading-snug tracking-[-0.04em] sm:text-xl lg:text-2xl">
                Tem algo em mente? Vamos tirar do papel.
              </p>

              <p
                className="mt-3 max-w-[440px] text-sm leading-6 sm:mt-4 sm:text-base sm:leading-7"
                style={{ color: COLORS.muted }}
              >
                Seja um novo site ou uma ideia que ainda está tomando
                forma, queremos entender o que você precisa e pensar
                junto em como levar seu projeto adiante.
              </p>
            </div>

            <a
              href="https://wa.me/SEU_NUMERO_AQUI"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-[62px] w-full items-center justify-between gap-10 border px-5 py-4 transition-all duration-300 hover:border-white hover:bg-white hover:text-[#050505] sm:w-fit sm:min-w-[260px] sm:px-6"
              style={{ borderColor: COLORS.line }}
            >
              <span className="text-xs font-medium uppercase tracking-[0.12em]">
                Falar com a Eleva
              </span>

              <ArrowUpRight
                size={20}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </a>
          </div>
        </main>

        <footer
          className="border-t pt-5 sm:pt-6"
          style={{ borderColor: COLORS.line }}
        >
          <span
            className="text-[10px] uppercase tracking-[0.14em] sm:text-xs"
            style={{ color: COLORS.muted }}
          >
            © {new Date().getFullYear()} Eleva Studio
          </span>
        </footer>
      </div>
    </motion.section>
  );
}
