"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Minus, Plus } from "lucide-react";

const ContactLaptop = dynamic(
  () => import("@/components/sections/ContactLaptop"),
  { ssr: false }
);

const COLORS = {
  text: "#10182B",
  muted: "#526477",
  accent: "#6557B8",
  line: "rgba(43, 83, 125, 0.19)",
  faqBackground: "#e7e8fa",
  black: "#050505",
};

const FAQ_ITEMS = [
  {
    question: "Quanto custa desenvolver um site?",
    answer:
      "O investimento depende do tipo de projeto, da quantidade de páginas e das funcionalidades necessárias. Primeiro, entendemos seus objetivos para propor uma solução adequada ao seu negócio.",
  },
  {
    question: "Quanto tempo leva para criar um site?",
    answer:
      "O prazo depende da complexidade do projeto, dos conteúdos e das funcionalidades. Depois de entender suas necessidades, definimos um cronograma para desenvolver e entregar o site.",
  },
  {
    question: "Como funciona o processo de desenvolvimento?",
    answer:
      "Começamos entendendo seu negócio, seus objetivos e seu público. Depois, definimos a direção visual, desenvolvemos a experiência, realizamos os ajustes necessários e publicamos o projeto.",
  },
  {
    question: "O site funciona em celulares e tablets?",
    answer:
      "Sim. Desenvolvemos experiências responsivas, adaptadas a celulares, tablets e computadores, para que seu site funcione bem em diferentes tamanhos de tela.",
  },
  {
    question: "Posso solicitar alterações durante o projeto?",
    answer:
      "Sim. O projeto prevê etapas de revisão e ajustes alinhadas ao escopo combinado, para que o resultado final esteja de acordo com a direção definida.",
  },
  {
    question: "A Eleva oferece manutenção após a entrega?",
    answer:
      "Podemos conversar sobre suporte e manutenção após a publicação. A necessidade e o formato desse acompanhamento são definidos de acordo com cada projeto.",
  },
  {
    question: "O que preciso ter para começar?",
    answer:
      "Você não precisa ter tudo pronto. Basta compartilhar informações sobre seu negócio, suas ideias e seus objetivos. Ajudamos a organizar as informações necessárias para iniciar o projeto.",
  },
  {
    question: "Como posso iniciar um projeto com a Eleva?",
    answer:
      "Entre em contato pelo WhatsApp para conversarmos sobre sua ideia, entendermos suas necessidades e definirmos os próximos passos.",
  },
];

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const runwayRef = useRef<HTMLDivElement>(null);
  const laptopProgressRef = useRef(0);

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const reducedMotion = useReducedMotion();

  const { scrollYProgress: closingProgress } = useScroll({
    target: runwayRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(closingProgress, "change", (latest) => {
    laptopProgressRef.current = clamp(latest);
  });

  /*
   * IMPORTANTE:
   * A cor muda na própria seção da FAQ.
   * Não há um painel de fundo independente na transição.
   */
  const sectionBackground = useTransform(
    closingProgress,
    [0, 0.18, 0.36, 0.48, 1],
    [
      COLORS.faqBackground,
      "#c4c3d6",
      "#777583",
      COLORS.black,
      COLORS.black,
    ]
  );

  /*
   * O texto só entra depois que o fundo chega ao preto.
   * Ele atravessa a tela da esquerda para a direita.
   */
  const textX = useTransform(
    closingProgress,
    [0, 0.48, 0.54, 1],
    ["-125vw", "-125vw", "-100vw", "110vw"]
  );

  const textOpacity = useTransform(
    closingProgress,
    [0, 0.47, 0.53, 0.94, 1],
    [0, 0, 1, 1, 0]
  );

  const textScale = useTransform(
    closingProgress,
    [0.48, 0.72, 1],
    [0.94, 1, 0.96]
  );

  return (
    <motion.section
      ref={sectionRef}
      id="faq"
      data-faq-section
      className="relative isolate overflow-clip text-[#10182B]"
      style={{
        backgroundColor: sectionBackground,
      }}
    >
      {/* CONTEÚDO DA FAQ */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 pt-24 sm:px-8 sm:pb-28 sm:pt-32 lg:px-12 lg:pb-36 lg:pt-40">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          {/* INTRODUÇÃO */}
          <div className="max-w-xl">
            <motion.p
              className="mb-5 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#6557B8] sm:text-xs"
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              Dúvidas frequentes
            </motion.p>

            <motion.h2
              className="max-w-lg text-4xl font-black leading-[0.98] tracking-[-0.065em] sm:text-5xl lg:text-6xl"
              initial={reducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              Tudo o que você precisa saber.
            </motion.h2>

            <motion.p
              className="mt-6 max-w-md text-sm leading-7 text-[#526477] sm:text-base"
              initial={reducedMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.7,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              Reunimos as principais dúvidas sobre nossos projetos, nosso
              processo de desenvolvimento e como podemos transformar sua ideia
              em uma experiência digital.
            </motion.p>
          </div>

          {/* PERGUNTAS */}
          <div className="w-full">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <motion.div
                  key={item.question}
                  className="border-b"
                  style={{ borderColor: COLORS.line }}
                  initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.12 }}
                  transition={{
                    duration: 0.5,
                    delay: Math.min(index * 0.04, 0.24),
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() =>
                      setOpenIndex(isOpen ? null : index)
                    }
                    className="flex w-full items-center justify-between gap-5 py-6 text-left sm:py-7"
                  >
                    <span className="text-base font-semibold leading-snug tracking-[-0.025em] sm:text-lg">
                      {item.question}
                    </span>

                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#6557B8]/20 text-[#6557B8] transition-colors duration-300">
                      {isOpen ? (
                        <Minus size={15} strokeWidth={1.7} />
                      ) : (
                        <Plus size={15} strokeWidth={1.7} />
                      )}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          height: {
                            duration: reducedMotion ? 0 : 0.35,
                            ease: [0.22, 1, 0.36, 1],
                          },
                          opacity: {
                            duration: reducedMotion ? 0 : 0.25,
                          },
                        }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-6 pr-8 text-sm leading-7 text-[#526477] sm:pb-7 sm:text-base">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/*
       * TRANSIÇÃO:
       * Esta área cria apenas o espaço de scroll.
       * O sticky e o Canvas não têm background próprio.
       * O fundo que o usuário vê é o da própria seção da FAQ.
       */}
      <div
        ref={runwayRef}
        data-faq-laptop-runway
        className="relative h-[400vh] w-full"
        aria-label="Transição visual da Eleva Studio"
      >
        <div className="sticky top-0 z-20 h-[100svh] w-full overflow-hidden">
          {/* LAPTOP 3D COM FUNDO TRANSPARENTE */}
          <div className="pointer-events-none absolute inset-0 z-10">
            <ContactLaptop progressRef={laptopProgressRef} />
          </div>

          {/* TEXTO EM MOVIMENTO */}
          <motion.div
            className="pointer-events-none absolute inset-0 z-20 flex items-center overflow-visible"
            style={{
              x: reducedMotion ? 0 : textX,
              opacity: reducedMotion ? textOpacity : textOpacity,
              scale: reducedMotion ? 1 : textScale,
            }}
          >
            <h2 className="whitespace-nowrap text-[clamp(3.5rem,11.5vw,12rem)] font-black uppercase leading-[0.82] tracking-[-0.075em] text-white">
              SUA MARCA MERECE SER INESQUECÍVEL.
            </h2>
          </motion.div>

          {/* IDENTIFICAÇÃO DISCRETA */}
          <div className="pointer-events-none absolute bottom-8 left-6 z-30 sm:bottom-10 sm:left-12">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/50 sm:text-xs">
              Eleva Studio — Experiências digitais
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}