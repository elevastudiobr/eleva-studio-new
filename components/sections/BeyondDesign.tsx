
"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

const images = [
  {
    src: "/images/beyond/beyond-01.webp",
    alt: "Escultura tridimensional de vidro violeta",
  },
  {
    src: "/images/beyond/beyond-02.webp",
    alt: "Escultura abstrata de metal líquido",
  },
  {
    src: "/images/beyond/beyond-03.webp",
    alt: "Paisagem cinematográfica envolta em neblina",
  },
  {
    src: "/images/beyond/beyond-04.webp",
    alt: "Retrato cinematográfico de uma pessoa",
  },
  {
    src: "/images/beyond/beyond-05.webp",
    alt: "Sombras complexas projetadas sobre uma parede",
  },
  {
    src: "/images/beyond/beyond-06.webp",
    alt: "Reflexos de luz sobre a água",
  },
  {
    src: "/images/beyond/beyond-07.webp",
    alt: "Retrato artístico em filme analógico",
  },
  {
    src: "/images/beyond/beyond-08.webp",
    alt: "Paisagem surreal com formações rochosas",
  },
];

type BeyondDesignProps = {
  onTransitionProgressChange: (progress: number) => void;
};

type BackgroundSection = {
  element: HTMLElement;
  color: string;
  name: string;
};

const COLORS = {
  black: "#050505",
  beyond: "#FFFFFF",
  manifesto: "#EEE7F7",
  services: "#DCEBFF",
  team: "rgb(194, 222, 255)",
  faq: "#e7faf9",
};

export default function BeyondDesign({
  onTransitionProgressChange,
}: BeyondDesignProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [activeImage, setActiveImage] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    onTransitionProgressChange(latest);
  });

  const contentY = useTransform(
    scrollYProgress,
    [0, 0.68, 0.84, 1],
    [0, 0, -35, -115]
  );

  const contentRotateX = useTransform(
    scrollYProgress,
    [0, 0.68, 0.84, 1],
    [0, 0, 4, 13]
  );

  const contentScale = useTransform(
    scrollYProgress,
    [0, 0.68, 0.84, 1],
    [1, 1, 0.97, 0.88]
  );

  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.72, 0.9, 1],
    [1, 1, 0.55, 0]
  );

  useEffect(() => {
    if (shouldReduceMotion) return;

    const interval = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % images.length);
    }, 450);

    return () => window.clearInterval(interval);
  }, [shouldReduceMotion]);

  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;

    const getSections = (): BackgroundSection[] => {
      const sections: BackgroundSection[] = [];

      const projects = document.getElementById("projects");
      const beyond = document.getElementById("visao");
      const manifesto = document.getElementById("manifesto");

      const services =
        document.querySelector<HTMLElement>(
          "[data-services-process-section]"
        ) ?? document.getElementById("servicos");

      const team =
        document.querySelector<HTMLElement>("[data-team-section]") ??
        document.getElementById("equipe");

      // Detecta o FAQ por atributo ou por ID.
      const faq =
        document.querySelector<HTMLElement>("[data-faq-section]") ??
        document.getElementById("faq");

      if (projects) {
        sections.push({
          element: projects,
          color: COLORS.black,
          name: "projects",
        });
      }

      if (beyond) {
        sections.push({
          element: beyond,
          color: COLORS.beyond,
          name: "beyond",
        });
      }

      if (manifesto) {
        sections.push({
          element: manifesto,
          color: COLORS.manifesto,
          name: "manifesto",
        });
      }

      if (services) {
        sections.push({
          element: services,
          color: COLORS.services,
          name: "services",
        });
      }

      if (team) {
        sections.push({
          element: team,
          color: COLORS.team,
          name: "team",
        });
      }

      if (faq) {
        sections.push({
          element: faq,
          color: COLORS.faq,
          name: "faq",
        });
      }

      return sections;
    };

    const updateBackground = () => {
      cancelAnimationFrame(frame);

      frame = window.requestAnimationFrame(() => {
        const middle = window.innerHeight / 2;
        const sections = getSections();

        const measuredSections = sections.map((section) => {
          const rect = section.element.getBoundingClientRect();

          return {
            ...section,
            top: rect.top,
            bottom: rect.bottom,
            center: rect.top + rect.height / 2,
            containsMiddle:
              rect.top <= middle && rect.bottom > middle,
          };
        });

        const activeSections = measuredSections
          .filter((section) => section.containsMiddle)
          .sort((a, b) => {
            // Serviços prevalece sobre a Equipe em caso de sobreposição.
            if (
              a.name === "services" &&
              b.name === "team"
            ) {
              return -1;
            }

            if (
              a.name === "team" &&
              b.name === "services"
            ) {
              return 1;
            }

            // Em outras sobreposições, o FAQ prevalece quando
            // seu centro está mais próximo do centro da tela.
            return (
              Math.abs(a.center - middle) -
              Math.abs(b.center - middle)
            );
          });

        let activeName = "none";
        let background = COLORS.black;

        if (activeSections.length > 0) {
          activeName = activeSections[0].name;
          background = activeSections[0].color;
        } else {
          const nearestSections = measuredSections
            .map((section) => {
              const distance =
                middle < section.top
                  ? section.top - middle
                  : middle > section.bottom
                    ? middle - section.bottom
                    : 0;

              return {
                ...section,
                distance,
              };
            })
            .sort((a, b) => a.distance - b.distance);

          const nearest = nearestSections[0];

          if (nearest && nearest.distance <= 100) {
            activeName = nearest.name;
            background = nearest.color;
          }
        }

        root.style.setProperty("--site-background", background);

        root.dataset.lightSection = String(
          activeName === "beyond" ||
            activeName === "manifesto" ||
            activeName === "services" ||
            activeName === "team" ||
            activeName === "faq"
        );

        root.dataset.manifestoSection = String(
          activeName === "manifesto"
        );

        root.dataset.servicesSection = String(
          activeName === "services"
        );

        root.dataset.teamSection = String(
          activeName === "team"
        );

        root.dataset.faqSection = String(activeName === "faq");
      });
    };

    root.style.setProperty(
      "--site-background-transition",
      shouldReduceMotion
        ? "none"
        : "background-color 1400ms cubic-bezier(0.22, 1, 0.36, 1)"
    );

    updateBackground();

    window.addEventListener("scroll", updateBackground, {
      passive: true,
    });
    window.addEventListener("resize", updateBackground);
    window.addEventListener("pageshow", updateBackground);
    window.addEventListener("load", updateBackground);

    return () => {
      cancelAnimationFrame(frame);

      window.removeEventListener("scroll", updateBackground);
      window.removeEventListener("resize", updateBackground);
      window.removeEventListener("pageshow", updateBackground);
      window.removeEventListener("load", updateBackground);
    };
  }, [shouldReduceMotion]);

  return (
    <section
      ref={sectionRef}
      id="visao"
      className="perspective-stage relative z-10 overflow-hidden bg-transparent px-5 py-24 text-[#050505] sm:px-8 sm:py-32 lg:px-14 lg:py-36"
    >
      <motion.div
        className="perspective-plane mx-auto max-w-[1440px]"
        style={
          shouldReduceMotion
            ? undefined
            : {
                y: contentY,
                rotateX: contentRotateX,
                scale: contentScale,
                opacity: contentOpacity,
                transformOrigin: "center bottom",
              }
        }
      >
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <motion.div
            initial={
              shouldReduceMotion ? false : { opacity: 0, y: 18 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative z-10"
          >
            <h2
              className="max-w-[850px] text-[clamp(3.2rem,7.5vw,7.6rem)] leading-[0.86] tracking-[-0.075em]"
              style={{
                fontFamily:
                  '"Standard Black", "Arial Black", Impact, sans-serif',
                fontWeight: 900,
              }}
            >
              NÃO É SOBRE
              <br />
              O QUE SE VÊ.
              <br />
              É SOBRE O QUE
              <br />
              <span className="text-[#7770ff]">SE SENTE.</span>
            </h2>

            <div className="mt-9 max-w-xl border-t border-black/15 pt-6 sm:mt-12">
              <p className="text-base leading-7 text-black/65 sm:text-lg sm:leading-8">
                Antes de uma marca ser lembrada, ela precisa provocar
                alguma coisa. Criamos experiências digitais que
                transformam percepção em presença.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={
              shouldReduceMotion ? false : { opacity: 0, y: 18 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.9,
              delay: 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mx-auto w-full max-w-[460px] lg:ml-auto lg:max-w-none"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-transparent">
              <AnimatePresence mode="sync">
                <motion.img
                  key={images[activeImage].src}
                  src={images[activeImage].src}
                  alt={images[activeImage].alt}
                  className="absolute inset-0 h-full w-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    opacity: { duration: 0.2, ease: "linear" },
                  }}
                />
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
