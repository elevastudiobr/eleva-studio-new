
"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const COLORS = {
  text: "#10182B",
  muted: "#526078",
  accent: "#6557B8",
  accentHover: "#51439F",
  line: "rgba(30, 45, 75, 0.16)",
  soft: "rgba(30, 45, 75, 0.07)",
};

const services = [
  {
    number: "01",
    title: "SITES",
    accent: "INSTITUCIONAIS.",
    description:
      "Uma presença digital que traduz o valor do seu negócio, fortalece sua marca e transmite confiança em cada detalhe.",
    details: ["Estrutura estratégica", "Design responsivo", "Performance"],
  },
  {
    number: "02",
    title: "LANDING",
    accent: "PAGES.",
    description:
      "Páginas construídas para comunicar uma proposta com clareza, conduzir a atenção e transformar interesse em ação.",
    details: ["Foco em conversão", "Comunicação objetiva", "Experiência fluida"],
  },
  {
    number: "03",
    title: "EXPERIÊNCIAS",
    accent: "DIGITAIS.",
    description:
      "Soluções personalizadas que combinam direção criativa, interação e tecnologia para necessidades que não cabem em fórmulas prontas.",
    details: [
      "Interações autorais",
      "Desenvolvimento personalizado",
      "Direção visual",
    ],
  },
];

const processSteps = [
  {
    number: "01",
    title: "Entender",
    description:
      "Investigamos o negócio, o público e o objetivo por trás do projeto.",
  },
  {
    number: "02",
    title: "Direcionar",
    description:
      "Definimos a estrutura, a linguagem visual e o caminho da experiência.",
  },
  {
    number: "03",
    title: "Construir",
    description:
      "Transformamos as decisões em um projeto funcional, responsivo e consistente.",
  },
  {
    number: "04",
    title: "Entregar",
    description:
      "Refinamos os detalhes, validamos o resultado e preparamos a publicação.",
  },
];

export default function ServicesProcess() {
  const shouldReduceMotion = useReducedMotion();

  const reveal = {
    initial: shouldReduceMotion ? false : { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: {
      duration: shouldReduceMotion ? 0 : 0.7,
      ease,
    },
  };

  const displayFont = {
    fontFamily: '"Standard Black", "Arial Black", Impact, sans-serif',
    fontWeight: 900,
  } as const;

  return (
    <section
      id="servicos"
      data-services-process-section
      className="relative z-10 overflow-hidden px-5 py-16 sm:px-8 sm:py-24 lg:px-14 lg:py-32"
      style={{
        backgroundColor: "transparent",
        color: COLORS.text,
      }}
    >
      <div className="mx-auto max-w-[1440px]">
        {/* ABERTURA */}

        <motion.div {...reveal} className="relative">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.42fr] lg:items-end lg:gap-12">
            <h2
              className="text-[clamp(3.3rem,9vw,9rem)] leading-[0.79] tracking-[-0.085em]"
              style={displayFont}
            >
              IDEIAS
              <br />
              GANHAM
              <br />
              <span style={{ color: COLORS.accent }}>FORMA.</span>
            </h2>

            <div className="max-w-[400px] lg:ml-auto lg:pb-2">
              <p className="text-lg leading-snug tracking-[-0.035em] sm:text-xl lg:text-2xl">
                Do primeiro entendimento à experiência final.
              </p>

              <p
                className="mt-4 text-sm leading-6 sm:text-base sm:leading-7"
                style={{ color: COLORS.muted }}
              >
                Criamos soluções digitais a partir do que cada
                negócio realmente precisa. Sem fórmulas prontas.
                Sem decisões por acaso.
              </p>
            </div>
          </div>
        </motion.div>

        {/* NOSSOS SERVIÇOS */}

        <div
          id="lista-servicos"
          className="mt-16 border-t sm:mt-24 lg:mt-32"
          style={{ borderColor: COLORS.line }}
        >
          <div
            className="flex items-center justify-between gap-4 border-b py-5"
            style={{ borderColor: COLORS.line }}
          >
            <span
              className="text-[10px] font-medium uppercase tracking-[0.24em] sm:text-xs"
              style={{ color: COLORS.muted }}
            >
              Nossos serviços
            </span>

            <span
              className="text-[10px] tracking-[0.16em] sm:text-xs"
              style={{ color: COLORS.muted }}
            >
              01 — 03
            </span>
          </div>

          {services.map((service, index) => (
            <motion.article
              key={service.number}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.7,
                ease,
                delay: shouldReduceMotion ? 0 : index * 0.07,
              }}
              className="group relative grid grid-cols-1 gap-6 border-b py-9 sm:py-11 lg:grid-cols-[0.12fr_1.08fr_0.8fr] lg:items-start lg:gap-8 lg:py-12"
              style={{ borderColor: COLORS.line }}
            >
              <div className="flex items-start justify-between lg:block">
                <span
                  className="text-[2.25rem] leading-none tracking-[-0.09em] sm:text-4xl lg:text-5xl"
                  style={{
                    ...displayFont,
                    color: COLORS.accent,
                  }}
                >
                  {service.number}
                </span>

                <span
                  className="mt-1 text-[9px] uppercase tracking-[0.2em] lg:mt-3 lg:block"
                  style={{ color: COLORS.muted }}
                >
                  Serviço
                </span>
              </div>

              <div className="min-w-0">
                <h3
                  className="text-[clamp(2.2rem,4.3vw,4.5rem)] leading-[0.87] tracking-[-0.075em]"
                  style={displayFont}
                >
                  {service.title}
                  <br />
                  <span
                    className="transition-colors duration-300 group-hover:text-[#51439F]"
                    style={{ color: COLORS.accent }}
                  >
                    {service.accent}
                  </span>
                </h3>

                <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2.5 sm:mt-6 sm:gap-x-5">
                  {service.details.map((detail) => (
                    <span
                      key={detail}
                      className="text-[10px] uppercase tracking-[0.1em] sm:text-[11px]"
                      style={{ color: COLORS.muted }}
                    >
                      {detail}
                    </span>
                  ))}
                </div>
              </div>

              <div className="min-w-0 lg:pt-1">
                <p
                  className="max-w-[390px] text-sm leading-7 sm:text-base sm:leading-7"
                  style={{ color: COLORS.muted }}
                >
                  {service.description}
                </p>
              </div>

              <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 left-0 h-px w-0 transition-all duration-500 ease-out group-hover:w-full"
                style={{ backgroundColor: COLORS.accent }}
              />
            </motion.article>
          ))}
        </div>

        {/* NOSSO PROCESSO */}

        <motion.div
          {...reveal}
          className="relative mt-24 grid gap-8 sm:mt-32 lg:mt-40 lg:grid-cols-[1fr_0.55fr] lg:items-end lg:gap-16"
        >
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: COLORS.accent }}
              />

              <span
                className="text-[10px] font-medium uppercase tracking-[0.24em] sm:text-xs"
                style={{ color: COLORS.muted }}
              >
                Nosso processo
              </span>
            </div>

            <h3
              className="text-[clamp(3rem,7.5vw,7.5rem)] leading-[0.82] tracking-[-0.08em]"
              style={displayFont}
            >
              NADA
              <br />
              É POR
              <br />
              <span style={{ color: COLORS.accent }}>ACASO.</span>
            </h3>
          </div>

          <p
            className="max-w-[410px] text-base leading-7 sm:text-lg sm:leading-8 lg:ml-auto lg:pb-2"
            style={{ color: COLORS.muted }}
          >
            Um projeto consistente não nasce de decisões isoladas.
            Cada etapa prepara a próxima, mantendo estratégia,
            design e desenvolvimento na mesma direção.
          </p>
        </motion.div>

        {/* ETAPAS DO PROCESSO */}

        <div className="relative mt-12 sm:mt-16 lg:mt-20">
          {/* Linha vertical para telas menores */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-[15px] top-0 w-px sm:left-[22px] lg:hidden"
            style={{ backgroundColor: COLORS.line }}
          >
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 1.1,
                ease,
              }}
              style={{
                originY: 0,
                backgroundColor: COLORS.accent,
              }}
              className="h-full w-full"
            />
          </div>

          {/* Linha horizontal para desktop */}
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-[22px] hidden h-px lg:block"
            style={{ backgroundColor: COLORS.line }}
          >
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 1.1,
                ease,
              }}
              style={{
                originX: 0,
                backgroundColor: COLORS.accent,
              }}
              className="h-full w-full"
            />
          </div>

          <div className="grid grid-cols-1 gap-0 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <motion.article
                key={step.number}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.65,
                  ease,
                  delay: shouldReduceMotion ? 0 : index * 0.08,
                }}
                className="relative grid grid-cols-[46px_1fr] gap-4 pb-9 last:pb-0 sm:grid-cols-[58px_1fr] sm:gap-5 lg:grid-cols-1 lg:gap-0 lg:pb-0 lg:pr-7 lg:last:pr-0"
              >
                {/* CÍRCULO ACIMA DA LINHA */}
                <div className="relative z-10 flex h-[31px] w-[31px] items-center justify-center sm:h-[45px] sm:w-[45px] lg:mb-8">
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full border"
                    style={{
                      borderColor: "rgba(101, 87, 184, 0.35)",
                      backgroundColor: "#DCEBFF",
                      boxShadow: "0 0 0 5px #DCEBFF",
                    }}
                  />

                  <span
                    className="relative z-10 text-[10px] font-medium sm:text-xs"
                    style={{ color: COLORS.accent }}
                  >
                    {step.number}
                  </span>
                </div>

                <div className="pt-0.5 lg:pt-0">
                  <h4
                    className="text-2xl leading-none tracking-[-0.055em] sm:text-3xl lg:text-[2rem]"
                    style={displayFont}
                  >
                    {step.title}
                    <span style={{ color: COLORS.accent }}>.</span>
                  </h4>

                  <p
                    className="mt-3 max-w-[290px] text-sm leading-6 sm:mt-4 sm:leading-7"
                    style={{ color: COLORS.muted }}
                  >
                    {step.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* SUPORTE */}

        <motion.div
          {...reveal}
          className="mt-20 border-y py-7 sm:mt-28 sm:py-9 lg:mt-36"
          style={{ borderColor: COLORS.line }}
        >
          <div className="grid gap-5 lg:grid-cols-[0.25fr_1fr] lg:items-center lg:gap-10">
            <span
              className="text-[10px] font-medium uppercase tracking-[0.2em]"
              style={{ color: COLORS.accent }}
            >
              Depois da entrega
            </span>

            <div>
              <h3
                className="text-2xl leading-tight tracking-[-0.06em] sm:text-3xl lg:text-4xl"
                style={displayFont}
              >
                A EVOLUÇÃO PODE CONTINUAR.
              </h3>

              <p
                className="mt-3 max-w-[570px] text-sm leading-7 sm:text-base"
                style={{ color: COLORS.muted }}
              >
                Manutenção e suporte podem ser contratados à parte
                para pequenos ajustes, atualizações e acompanhamento
                do site após sua publicação.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ENCERRAMENTO */}

        <motion.div
          {...reveal}
          className="mt-16 flex flex-col gap-8 sm:mt-20 sm:flex-row sm:items-end sm:justify-between lg:mt-24"
        >
          <p
            className="text-[clamp(2.2rem,5.5vw,5.5rem)] leading-[0.88] tracking-[-0.075em]"
            style={displayFont}
          >
            O PRÓXIMO PASSO
            <br />
            <span style={{ color: COLORS.accent }}>
              COMEÇA COM UMA IDEIA.
            </span>
          </p>

          <a
            href="#contato"
            className="group inline-flex min-h-[54px] w-fit shrink-0 items-center justify-between gap-8 rounded-full border px-6 py-4 text-xs font-medium uppercase tracking-[0.12em] transition-all duration-300 hover:-translate-y-0.5 sm:min-h-[58px]"
            style={{
              borderColor: "rgba(30, 45, 75, 0.25)",
              backgroundColor: COLORS.soft,
              color: COLORS.text,
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.borderColor = COLORS.accent;
              event.currentTarget.style.backgroundColor = COLORS.accent;
              event.currentTarget.style.color = "#FFFFFF";
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.borderColor =
                "rgba(30, 45, 75, 0.25)";
              event.currentTarget.style.backgroundColor = COLORS.soft;
              event.currentTarget.style.color = COLORS.text;
            }}
          >
            <span>Iniciar um projeto</span>

            <ArrowUpRight
              size={17}
              strokeWidth={1.6}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
