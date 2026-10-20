
"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

const COLORS = {
  text: "#10182B",
  muted: "#526477",
  accent: "#6557B8",
  line: "rgba(43, 83, 125, 0.19)",
};

export default function Team() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const contentY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [35, 0, -20]
  );

  const contentRotateX = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [2, 0, -1.5]
  );

  const titleY = useTransform(
    scrollYProgress,
    [0, 0.35, 0.75, 1],
    [28, 0, 0, -12]
  );

  return (
    <section
      ref={sectionRef}
      id="equipe"
      data-team-section
      className="relative isolate overflow-hidden bg-transparent px-5 py-20 sm:px-8 sm:py-24 lg:px-14 lg:py-28"
      style={{
        color: COLORS.text,
        perspective: "1800px",
      }}
    >
      {/* FUNDO AZUL-CLARO */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div
          className="absolute -right-40 top-20 h-[440px] w-[440px] rounded-full blur-[110px]"
          style={{ background: "rgba(126, 160, 193, 0.22)" }}
        />

        <div
          className="absolute -bottom-24 -left-32 h-[360px] w-[360px] rounded-full blur-[100px]"
          style={{ background: "rgba(177, 199, 219, 0.28)" }}
        />

        <div
          className="absolute left-[35%] top-[40%] h-[280px] w-[420px] rounded-full blur-[120px]"
          style={{ background: "rgba(218, 230, 241, 0.30)" }}
        />
      </div>

      <motion.div
        className="mx-auto max-w-[1280px]"
        style={
          shouldReduceMotion
            ? undefined
            : {
                y: contentY,
                rotateX: contentRotateX,
                transformOrigin: "center center",
              }
        }
      >
        {/* CABEÇALHO */}
        <motion.div
          style={shouldReduceMotion ? undefined : { y: titleY }}
          className="mb-12 grid grid-cols-1 gap-6 lg:mb-16 lg:grid-cols-[1fr_0.55fr] lg:items-end lg:gap-12"
        >
          <div>
            <motion.h2
              initial={
                shouldReduceMotion ? false : { opacity: 0, y: 22 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.8,
                delay: 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="max-w-[780px] text-[clamp(2.8rem,7vw,6.8rem)] leading-[0.86] tracking-[-0.075em]"
              style={{
                fontFamily:
                  '"Standard Black", "Arial Black", Impact, sans-serif',
                fontWeight: 900,
              }}
            >
              PESSOAS
              <br />
              POR TRÁS
              <br />
              <span style={{ color: COLORS.accent }}>
                DAS IDEIAS.
              </span>
            </motion.h2>
          </div>

          <motion.div
            initial={
              shouldReduceMotion ? false : { opacity: 0, y: 18 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.75,
              delay: 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="max-w-md lg:ml-auto lg:pb-1"
          >
            <div
              className="mb-4 h-px w-14"
              style={{ background: COLORS.accent }}
            />

            <p
              className="text-sm leading-7 sm:text-base sm:leading-7"
              style={{ color: COLORS.muted }}
            >
              Boas experiências digitais começam muito antes do código.
              Elas nascem de escuta, visão estratégica e atenção a cada
              detalhe — da primeira conversa à entrega final.
            </p>
          </motion.div>
        </motion.div>

        {/* COLABORADORES */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-6 lg:gap-8">
          {/* LUCAS MORAES */}
          <motion.article
            initial={
              shouldReduceMotion ? false : { opacity: 0, y: 30 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.85,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="group min-w-0"
          >
            <div
              className="relative mx-auto mb-5 w-full max-w-[500px] overflow-hidden"
              style={{
                aspectRatio: "4 / 3.8",
                background:
                  "linear-gradient(145deg, rgba(255,255,255,0.58), rgba(196,215,233,0.42))",
                border: `1px solid ${COLORS.line}`,
              }}
            >
              <img
                src="/images/lucas.webp"
                alt="Lucas Moraes, fundador da Eleva Studio"
                loading="eager"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.025]"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#10182B]/15 via-transparent to-transparent" />

              <div className="absolute left-4 top-4 sm:left-5 sm:top-5">
                <span
                  className="inline-block text-[10px] font-semibold uppercase tracking-[0.18em]"
                  style={{
                    color: "#FFFFFF",
                    textShadow: "0 1px 10px rgba(0,0,0,0.55)",
                  }}
                >
                  Fundador
                </span>
              </div>
            </div>

            <div
              className="flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-start sm:justify-between"
              style={{ borderColor: COLORS.line }}
            >
              <div>
                <h3
                  className="text-xl tracking-[-0.045em] sm:text-2xl"
                  style={{
                    fontFamily:
                      '"Standard Black", "Arial Black", Impact, sans-serif',
                    fontWeight: 900,
                  }}
                >
                  Lucas Moraes
                </h3>

                <p
                  className="mt-2 text-sm"
                  style={{ color: COLORS.accent }}
                >
                  Estratégia, comercial e desenvolvimento
                </p>
              </div>

              <span
                className="mt-1 text-[10px] uppercase tracking-[0.16em] sm:text-right"
                style={{ color: COLORS.muted }}
              >
                Eleva Studio
              </span>
            </div>

            <p
              className="mt-4 max-w-lg text-sm leading-6"
              style={{ color: COLORS.muted }}
            >
              Da primeira conversa à entrega final, conduzo cada etapa
              do projeto. Uno visão estratégica, relacionamento com
              clientes e desenvolvimento para transformar oportunidades
              em experiências digitais.
            </p>
          </motion.article>

          {/* GUSTAVO VICTOR */}
          <motion.article
            initial={
              shouldReduceMotion ? false : { opacity: 0, y: 30 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.85,
              delay: 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="group min-w-0"
          >
            <div
              className="relative mx-auto mb-5 w-full max-w-[500px] overflow-hidden"
              style={{
                aspectRatio: "4 / 3.8",
                background:
                  "linear-gradient(145deg, rgba(207,225,241,0.62), rgba(255,255,255,0.52))",
                border: `1px solid ${COLORS.line}`,
              }}
            >
              <img
                src="/images/gustavo.webp"
                alt="Gustavo Victor, desenvolvedor da Eleva Studio"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.025]"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#10182B]/15 via-transparent to-transparent" />

              <div className="absolute left-4 top-4 sm:left-5 sm:top-5">
                <span
                  className="inline-block text-[10px] font-semibold uppercase tracking-[0.18em]"
                  style={{
                    color: "#FFFFFF",
                    textShadow: "0 1px 10px rgba(0,0,0,0.55)",
                  }}
                >
                  Desenvolvimento
                </span>
              </div>
            </div>

            <div
              className="flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-start sm:justify-between"
              style={{ borderColor: COLORS.line }}
            >
              <div>
                <h3
                  className="text-xl tracking-[-0.045em] sm:text-2xl"
                  style={{
                    fontFamily:
                      '"Standard Black", "Arial Black", Impact, sans-serif',
                    fontWeight: 900,
                  }}
                >
                  Gustavo Victor
                </h3>

                <p
                  className="mt-2 text-sm"
                  style={{ color: COLORS.accent }}
                >
                  Desenvolvimento e criatividade
                </p>
              </div>

              <span
                className="mt-1 text-[10px] uppercase tracking-[0.16em] sm:text-right"
                style={{ color: COLORS.muted }}
              >
                Eleva Studio
              </span>
            </div>

            <p
              className="mt-4 max-w-lg text-sm leading-6"
              style={{ color: COLORS.muted }}
            >
              Com foco em desenvolvimento e soluções criativas, Gustavo
              contribui para transformar ideias em experiências digitais
              funcionais, bem estruturadas e visualmente consistentes.
              Seu olhar técnico e criativo complementa a construção
              de projetos pensados para gerar resultados.
            </p>
          </motion.article>
        </div>

        {/* FECHAMENTO */}
        <motion.div
          initial={
            shouldReduceMotion ? false : { opacity: 0, y: 18 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.75,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mt-16 flex flex-col gap-4 border-t pt-5 sm:mt-20 sm:flex-row sm:items-center sm:justify-between"
          style={{ borderColor: COLORS.line }}
        >
          <p
            className="max-w-xl text-sm leading-6 sm:text-base"
            style={{ color: COLORS.muted }}
          >
            Uma boa ideia só ganha força quando estratégia, execução
            e intenção caminham na mesma direção.
          </p>

          <span
            className="shrink-0 text-[10px] font-medium uppercase tracking-[0.2em]"
            style={{ color: COLORS.accent }}
          >
            Experiências que elevam
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
