
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
import { Plus, Minus } from "lucide-react";

const ContactLaptop = dynamic(
  () => import("@/components/sections/ContactLaptop"),
  { ssr: false }
);

const COLORS = {
  text: "#10182B",
  muted: "#526477",
  accent: "#6557B8",
  line: "rgba(43, 83, 125, 0.19)",
};

const FAQ_ITEMS = [
  {
    question: "Quanto custa desenvolver um site?",
    answer:
      "O investimento depende do tipo de projeto, da quantidade de páginas e das funcionalidades necessárias. Entendemos os objetivos do seu negócio para apresentar uma proposta adequada às suas necessidades.",
  },
  {
    question: "Quanto tempo leva para criar um site?",
    answer:
      "O prazo depende da complexidade do projeto, dos conteúdos e das funcionalidades. Depois de entender suas necessidades, definimos um cronograma para o desenvolvimento.",
  },
  {
    question: "Como funciona o processo de desenvolvimento?",
    answer:
      "Começamos entendendo seu negócio, seus objetivos e seu público. Em seguida, definimos a direção visual, desenvolvemos o site, realizamos os ajustes previstos e preparamos tudo para a publicação.",
  },
  {
    question: "O site funciona em celulares e tablets?",
    answer:
      "Sim. Desenvolvemos experiências responsivas para que o site funcione bem em celulares, tablets e computadores, mantendo uma navegação consistente em diferentes telas.",
  },
  {
    question: "Posso solicitar alterações durante o projeto?",
    answer:
      "Sim. O projeto conta com etapas de revisão e ajustes alinhadas no início do trabalho, para que o resultado final esteja de acordo com o que foi definido.",
  },
  {
    question: "A Eleva oferece manutenção após a entrega?",
    answer:
      "Sim. Podemos conversar sobre suporte e manutenção conforme as necessidades do seu negócio, com um escopo definido separadamente.",
  },
  {
    question: "O que preciso ter para começar?",
    answer:
      "Você não precisa ter tudo definido. Basta compartilhar um pouco sobre seu negócio e seus objetivos. Ajudamos a organizar as ideias e identificar o que será necessário para começar.",
  },
  {
    question: "Como posso iniciar um projeto com a Eleva?",
    answer:
      "Entre em contato com a gente pelo WhatsApp. Vamos conversar sobre sua ideia, entender suas necessidades e definir os próximos passos para tirar o projeto do papel.",
  },
];

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const runwayRef = useRef<HTMLDivElement>(null);
  const laptopProgressRef = useRef(0);

  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const { scrollYProgress: laptopScrollProgress } = useScroll({
    target: runwayRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(laptopScrollProgress, "change", (latest) => {
    laptopProgressRef.current = Math.max(0, Math.min(1, latest));
  });

  const contentY = useTransform(
    sectionProgress,
    [0, 0.5, 1],
    [24, 0, -14]
  );

  const titleY = useTransform(
    sectionProgress,
    [0, 0.4, 1],
    [20, 0, -10]
  );

  return (
    <section
      ref={sectionRef}
      id="faq"
      data-faq-section
      className="relative isolate bg-transparent px-5 pt-24 sm:px-8 sm:pt-28 lg:px-14 lg:pt-32"
      style={{ color: COLORS.text }}
    >
      <motion.div
        style={{ y: reducedMotion ? 0 : contentY }}
        className="relative z-10 mx-auto grid w-full max-w-[1280px] gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20"
      >
        <div className="relative">
          <motion.div style={{ y: reducedMotion ? 0 : titleY }}>
            <span
              className="mb-5 block text-xs font-semibold uppercase tracking-[0.28em]"
              style={{ color: COLORS.accent }}
            >
              Dúvidas frequentes
            </span>

            <h2 className="max-w-[520px] text-4xl font-semibold leading-[1.08] tracking-[-0.055em] sm:text-5xl lg:text-6xl">
              Tudo o que você precisa saber.
            </h2>

            <p
              className="mt-6 max-w-[420px] text-base leading-7 sm:text-lg"
              style={{ color: COLORS.muted }}
            >
              Reunimos as principais dúvidas sobre nossos projetos e sobre
              como podemos ajudar sua marca a evoluir no digital.
            </p>
          </motion.div>
        </div>

        <div className="w-full">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={item.question}
                className="border-b"
                style={{ borderColor: COLORS.line }}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="group flex w-full items-center justify-between gap-6 py-6 text-left sm:py-7"
                >
                  <span className="text-base font-medium leading-6 tracking-[-0.02em] sm:text-lg">
                    {item.question}
                  </span>

                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-200"
                    style={{
                      borderColor: COLORS.line,
                      color: COLORS.accent,
                    }}
                  >
                    {isOpen ? (
                      <Minus size={16} strokeWidth={1.6} />
                    ) : (
                      <Plus size={16} strokeWidth={1.6} />
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
                          duration: 0.3,
                          ease: "easeInOut",
                        },
                        opacity: { duration: 0.2 },
                      }}
                      className="overflow-hidden"
                    >
                      <p
                        className="max-w-[620px] pb-6 pr-8 text-sm leading-7 sm:text-base"
                        style={{ color: COLORS.muted }}
                      >
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* A tela inteira fica preta; o Canvas do laptop permanece transparente. */}
      <div
        ref={runwayRef}
        className="relative mt-0 h-[360vh] w-full"
        aria-label="Transição para o laptop"
      >
        <div className="sticky top-0 z-20 h-[100svh] w-full overflow-hidden bg-black">
          <div className="absolute inset-0">
            <ContactLaptop progressRef={laptopProgressRef} />
          </div>
        </div>
      </div>
    </section>
  );
}
