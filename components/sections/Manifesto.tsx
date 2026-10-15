
"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

type ManifestoProps = {
  transitionProgress: number;
};

export default function Manifesto({
  transitionProgress,
}: ManifestoProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const titleY = useTransform(
    scrollYProgress,
    [0, 0.35, 0.8, 1],
    [20, 0, 0, -14]
  );

  const titleOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.35, 1, 1, 0.45]
  );

  const introY = useTransform(
    scrollYProgress,
    [0, 0.35, 0.8, 1],
    [14, 0, 0, -10]
  );

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      data-manifesto-section
      data-transition-progress={transitionProgress}
      className="relative z-10 isolate overflow-hidden bg-transparent px-5 py-12 text-[#17151C] sm:px-8 sm:py-16 lg:px-14 lg:py-20"
    >
      {/* TÍTULO PRINCIPAL */}
      <motion.div
        style={
          shouldReduceMotion
            ? undefined
            : { y: titleY, opacity: titleOpacity }
        }
      >
        <div className="mb-5 flex items-center gap-3">
          <span className="h-[7px] w-[7px] rounded-full bg-[#6B5CE7]" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-black/55 sm:text-xs">
            Nossa visão
          </span>
        </div>

        <h2
          className="max-w-[1250px] text-[clamp(3.1rem,8.2vw,8.5rem)] leading-[0.84] tracking-[-0.075em]"
          style={{
            fontFamily:
              '"Standard Black", "Arial Black", Impact, sans-serif',
            fontWeight: 900,
          }}
        >
          ESTRATÉGIA EM
          <br />
          CADA ESCOLHA.
          <br />
          INTENÇÃO EM
          <br />
          <span className="text-[#7062D9]">CADA DETALHE.</span>
        </h2>
      </motion.div>

      {/* INTRODUÇÃO */}
      <motion.div
        className="mt-7 grid grid-cols-1 gap-5 border-t border-black/15 pt-5 sm:mt-9 sm:gap-8 lg:grid-cols-[1fr_0.8fr] lg:gap-20"
        initial={
          shouldReduceMotion ? false : { opacity: 0, y: 14 }
        }
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.7,
          ease,
        }}
        style={shouldReduceMotion ? undefined : { y: introY }}
      >
        <p className="max-w-[650px] text-xl leading-snug tracking-[-0.035em] sm:text-2xl lg:text-[2rem]">
          Um projeto digital começa muito antes da primeira linha
          de código. Começa entendendo{" "}
          <span className="text-[#7062D9]">
            o que o negócio precisa alcançar.
          </span>
        </p>

        <div className="max-w-[480px] lg:ml-auto">
          <p className="text-sm leading-6 text-black/65 sm:text-base sm:leading-7">
            Investigamos o contexto, o público e o posicionamento
            de cada marca para construir experiências com direção.
            Porque design sem propósito pode chamar atenção,
            mas estratégia é o que dá sentido a cada escolha.
          </p>
        </div>
      </motion.div>

      {/* COMPOSIÇÕES EDITORIAIS */}
      <div className="mt-10 space-y-10 sm:mt-12 sm:space-y-12 lg:mt-14 lg:space-y-14">
        {/* 01 — VISÃO DE MARCA */}
        <motion.article
          className="grid grid-cols-1 items-center gap-5 sm:gap-7 lg:grid-cols-[1.12fr_0.88fr] lg:gap-14"
          initial={
            shouldReduceMotion ? false : { opacity: 0, y: 22 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.75,
            ease,
          }}
        >
          <div className="group relative overflow-hidden bg-[#E5DFEF]">
            <div className="relative aspect-[5/3] overflow-hidden">
              <img
                src="/images/manifesto/visao-de-marca.webp"
                alt="Composição escultural em vidro violeta representando a essência de uma marca"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.035]"
              />
            </div>
          </div>

          <div className="flex flex-col items-start py-0 lg:py-2">
            <span className="mb-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7062D9] sm:mb-5 sm:text-xs">
              01 — Visão de marca
            </span>

            <h3
              className="max-w-[560px] text-[clamp(2.5rem,5vw,5rem)] leading-[0.91] tracking-[-0.07em]"
              style={{
                fontFamily:
                  '"Standard Black", "Arial Black", Impact, sans-serif',
                fontWeight: 900,
              }}
            >
              ANTES DA
              <br />
              FORMA,
              <br />
              EXISTE UMA
              <br />
              <span className="text-[#7062D9]">INTENÇÃO.</span>
            </h3>

            <p className="mt-4 max-w-[440px] text-base leading-6 tracking-[-0.02em] text-black/65 sm:mt-5 sm:text-lg sm:leading-7">
              Toda marca tem algo que a torna única. Nosso trabalho
              começa identificando essa essência e transformando
              seus objetivos em uma presença digital coerente,
              reconhecível e com personalidade.
            </p>

            <div className="mt-5 h-px w-12 bg-[#7062D9]/60" />
          </div>
        </motion.article>

        {/* 02 — DIREÇÃO CRIATIVA */}
        <motion.article
          className="grid grid-cols-1 items-center gap-5 sm:gap-7 lg:grid-cols-[0.88fr_1.12fr] lg:gap-14"
          initial={
            shouldReduceMotion ? false : { opacity: 0, y: 22 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.75,
            ease,
          }}
        >
          <div className="flex flex-col items-start py-0 lg:py-2">
            <span className="mb-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7062D9] sm:mb-5 sm:text-xs">
              02 — Direção criativa
            </span>

            <h3
              className="max-w-[560px] text-[clamp(2.5rem,5vw,5rem)] leading-[0.91] tracking-[-0.07em]"
              style={{
                fontFamily:
                  '"Standard Black", "Arial Black", Impact, sans-serif',
                fontWeight: 900,
              }}
            >
              CADA
              <br />
              DETALHE
              <br />
              TEM UM
              <br />
              <span className="text-[#7062D9]">MOTIVO.</span>
            </h3>

            <p className="mt-4 max-w-[440px] text-base leading-6 tracking-[-0.02em] text-black/65 sm:mt-5 sm:text-lg sm:leading-7">
              Da escolha tipográfica à última interação, nada
              precisa estar ali por acaso. Unimos estética,
              experiência e estratégia para que cada elemento
              contribua para uma mensagem clara e uma experiência
              que faça sentido.
            </p>

            <div className="mt-5 h-px w-12 bg-[#7062D9]/60" />
          </div>

          <div className="group relative overflow-hidden bg-[#E5DFEF]">
            <div className="relative aspect-[5/3] overflow-hidden">
              <img
                src="/images/manifesto/direcao-criativa.webp"
                alt="Detalhe de vidro fosco e metal cromado com reflexos violetas"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.035]"
              />
            </div>
          </div>
        </motion.article>
      </div>

      {/* ENCERRAMENTO */}
      <motion.div
        className="mt-10 flex flex-col gap-4 border-t border-black/15 pt-5 sm:mt-12 sm:flex-row sm:items-end sm:justify-between lg:mt-14"
        initial={
          shouldReduceMotion ? false : { opacity: 0, y: 14 }
        }
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.7,
          ease,
        }}
      >
        <p className="max-w-[700px] text-2xl leading-tight tracking-[-0.05em] sm:text-3xl lg:text-4xl">
          Não criamos apenas para impressionar.
          <br />
          <span className="text-[#7062D9]">
            Criamos para fazer sentido.
          </span>
        </p>

        <span className="text-[10px] uppercase tracking-[0.2em] text-black/45 sm:text-xs">
          Estratégia antes da execução
        </span>
      </motion.div>
    </section>
  );
}
