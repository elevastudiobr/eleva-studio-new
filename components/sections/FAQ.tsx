
"use client";

import { useState, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Plus, Minus } from "lucide-react";

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
      "O investimento depende do tipo de projeto, da quantidade de páginas e das funcionalidades necessárias. Cada proposta é pensada de acordo com os objetivos do negócio. Entre em contato com a Eleva para conversarmos sobre sua ideia e definirmos a melhor solução.",
  },
  {
    question: "Quanto tempo leva para criar um site?",
    answer:
      "O prazo varia conforme a complexidade do projeto, a quantidade de conteúdo e as funcionalidades envolvidas. Depois de entendermos suas necessidades, alinhamos um cronograma com as etapas e os prazos previstos para o desenvolvimento.",
  },
  {
    question: "Como funciona o processo de desenvolvimento?",
    answer:
      "Começamos entendendo seu negócio, seus objetivos e o público que deseja alcançar. A partir disso, definimos a direção visual, desenvolvemos o site e realizamos os ajustes necessários antes da publicação. Você acompanha o projeto ao longo desse processo.",
  },
  {
    question: "O site funciona em celulares e tablets?",
    answer:
      "Sim. Os projetos são desenvolvidos para se adaptar a diferentes tamanhos de tela, incluindo celulares, tablets e computadores. A experiência é planejada para manter a navegação clara, o conteúdo legível e a identidade visual consistente.",
  },
  {
    question: "Posso solicitar alterações durante o projeto?",
    answer:
      "Sim. As etapas de revisão e os ajustes incluídos são alinhados no início do projeto. Assim, trabalhamos com expectativas claras e conseguimos direcionar as alterações para que o resultado final esteja de acordo com o que foi combinado.",
  },
  {
    question: "A Eleva oferece manutenção após a entrega?",
    answer:
      "Podemos conversar sobre suporte e manutenção conforme as necessidades do seu site. O escopo, a frequência dos ajustes e os valores são combinados separadamente, para que você saiba exatamente o que está incluído.",
  },
  {
    question: "O que preciso ter para começar?",
    answer:
      "Você não precisa ter tudo definido. Ter uma ideia do seu negócio, dos seus objetivos e do que deseja transmitir já é um ótimo começo. Vamos conversar sobre suas necessidades e orientar os próximos passos, incluindo os materiais necessários para o projeto.",
  },
  {
    question: "Como posso iniciar um projeto com a Eleva?",
    answer:
      "É simples: entre em contato pelo WhatsApp e conte um pouco sobre sua ideia. Vamos entender o que você precisa, conversar sobre as possibilidades e definir os próximos passos para transformar essa ideia em um projeto.",
  },
];

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const contentY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [24, 0, -14]
  );

  const titleY = useTransform(
    scrollYProgress,
    [0, 0.4, 1],
    [20, 0, -10]
  );

  return (
    <section
      ref={sectionRef}
      id="faq"
      data-faq-section
      className="relative isolate overflow-hidden bg-transparent px-5 py-24 sm:px-8 sm:py-28 lg:px-14 lg:py-32"
      style={{
        color: COLORS.text,
        perspective: "1600px",
      }}
    >
      {/* Atmosfera suave */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div
          className="absolute -right-40 top-[12%] h-[420px] w-[420px] rounded-full blur-[120px]"
          style={{
            background: "rgba(126, 160, 193, 0.16)",
          }}
        />

        <div
          className="absolute -bottom-20 -left-40 h-[380px] w-[380px] rounded-full blur-[110px]"
          style={{
            background: "rgba(101, 87, 184, 0.09)",
          }}
        />

        <div
          className="absolute left-[38%] top-[48%] h-[300px] w-[420px] rounded-full blur-[130px]"
          style={{
            background: "rgba(218, 230, 241, 0.28)",
          }}
        />
      </div>

      <motion.div
        className="mx-auto max-w-[1280px]"
        style={
          shouldReduceMotion
            ? undefined
            : {
                y: contentY,
                transformOrigin: "center center",
              }
        }
      >
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          {/* Cabeçalho */}

          <motion.div
            style={shouldReduceMotion ? undefined : { y: titleY }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <motion.p
              initial={
                shouldReduceMotion ? false : { opacity: 0, y: 12 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mb-6 text-xs font-semibold uppercase tracking-[0.24em]"
              style={{ color: COLORS.accent }}
            >
              Dúvidas frequentes
            </motion.p>

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
              className="max-w-[600px] text-[clamp(3.2rem,7vw,6.4rem)] leading-[0.86] tracking-[-0.075em]"
              style={{
                fontFamily:
                  '"Standard Black", "Arial Black", Impact, sans-serif',
                fontWeight: 900,
              }}
            >
              ANTES
              <br />
              DE DAR
              <br />
              <span style={{ color: COLORS.accent }}>
                O PRÓXIMO
              </span>
              <br />
              PASSO.
            </motion.h2>

            <motion.div
              initial={
                shouldReduceMotion ? false : { opacity: 0, y: 16 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.7,
                delay: 0.16,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-8 max-w-sm"
            >
              <div
                className="mb-5 h-px w-14"
                style={{ background: COLORS.accent }}
              />

              <p
                className="text-sm leading-7 sm:text-base"
                style={{ color: COLORS.muted }}
              >
                Reunimos as principais dúvidas para você entender como
                funciona o desenvolvimento de um projeto com a Eleva.
                Se ainda tiver alguma pergunta, estamos por aqui.
              </p>
            </motion.div>
          </motion.div>

          {/* Perguntas */}

          <div className="min-w-0">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openIndex === index;
              const number = String(index + 1).padStart(2, "0");

              return (
                <motion.div
                  key={item.question}
                  initial={
                    shouldReduceMotion
                      ? false
                      : { opacity: 0, y: 18 }
                  }
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.55,
                    delay: shouldReduceMotion ? 0 : index * 0.045,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="border-b"
                  style={{ borderColor: COLORS.line }}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    onClick={() =>
                      setOpenIndex(isOpen ? null : index)
                    }
                    className="group flex w-full items-center gap-4 py-6 text-left sm:gap-6 sm:py-7"
                  >
                    <span
                      className="w-7 shrink-0 text-[10px] font-medium tracking-[0.12em]"
                      style={{
                        color: isOpen ? COLORS.accent : COLORS.muted,
                      }}
                    >
                      {number}
                    </span>

                    <span
                      className="flex-1 text-base font-medium leading-snug tracking-[-0.035em] transition-colors duration-300 sm:text-lg lg:text-xl"
                      style={{
                        color: isOpen ? COLORS.accent : COLORS.text,
                      }}
                    >
                      {item.question}
                    </span>

                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 sm:h-9 sm:w-9"
                      style={{
                        color: isOpen ? "#FFFFFF" : COLORS.text,
                        background: isOpen
                          ? COLORS.accent
                          : "rgba(255,255,255,0.48)",
                        border: `1px solid ${
                          isOpen ? COLORS.accent : COLORS.line
                        }`,
                      }}
                    >
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
                        id={`faq-answer-${index}`}
                        key="answer"
                        initial={
                          shouldReduceMotion
                            ? false
                            : { height: 0, opacity: 0 }
                        }
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: shouldReduceMotion ? 0 : 0.3,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <p
                          className="max-w-[620px] pb-7 pl-11 pr-2 text-sm leading-7 sm:pb-8 sm:pl-[3.25rem] sm:text-[15px]"
                          style={{ color: COLORS.muted }}
                        >
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
      </motion.div>
    </section>
  );
}
