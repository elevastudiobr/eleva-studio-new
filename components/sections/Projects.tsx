"use client";

import { motion, useReducedMotion } from "framer-motion";

const projects = [
  {
    name: "VELTA",
    category: "Mobilidade elétrica",
    number: "01",
    image: "/images/projects/velta.webp",
    url: "https://velta-ten.vercel.app",
  },
  {
    name: "Nora Odontologia",
    category: "Saúde · Odontologia",
    number: "02",
    image: "/images/projects/nora-odontologia.webp",
    url: "https://nora-odontologia.vercel.app",
  },
  {
    name: "Paulínia Sports Club",
    category: "Esporte · Lazer",
    number: "03",
    image: "/images/projects/paulinia-sports-club.webp",
    url: "https://paulinia-sports-club.vercel.app",
  },
  {
    name: "Áurea Imóveis",
    category: "Mercado imobiliário",
    number: "04",
    image: "/images/projects/aurea-imoveis.webp",
    url: "https://aurea-imoveis-six.vercel.app",
  },
  {
    name: "Academia",
    category: "Fitness",
    number: "05",
    image: "/images/projects/academia.webp",
    url: "https://seven-academia.vercel.app",
  },
  {
    name: "VL Auto Clima",
    category: "Climatização automotiva",
    number: "06",
    image: "/images/projects/vl-autoclima.webp",
    url: "https://vl-autoclima.vercel.app",
  },
  {
    name: "Verion Motors",
    category: "Automotivo",
    number: "07",
    image: "/images/projects/verion-motors.webp",
    url: "https://verion-motors.vercel.app",
  },
];

type Project = (typeof projects)[number];

type ProjectsProps = {
  transitionProgress: number;
};

function ProjectCard({
  project,
  clone = false,
}: {
  project: Project;
  clone?: boolean;
}) {
  return (
    <article
      className="project-card group min-w-0"
      aria-hidden={clone || undefined}
    >
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={clone ? -1 : undefined}
        aria-label={`Visitar o site ${project.name}`}
        className="project-card__link block"
      >
        <div className="project-card__screen">
          <div className="project-card__toolbar">
            <div className="project-card__dots" aria-hidden="true">
              <span className="bg-[#ff5f57]" />
              <span className="bg-[#febc2e]" />
              <span className="bg-[#28c840]" />
            </div>

            <div className="project-card__address">
              <span>{project.name}</span>
            </div>

            <span className="project-card__external" aria-hidden="true">
              ↗
            </span>
          </div>

          <div className="project-card__image">
            <img
              src={project.image}
              alt={`Prévia do website ${project.name}`}
              loading={clone ? "lazy" : "eager"}
              decoding="async"
              draggable={false}
            />
          </div>
        </div>
      </a>

      <div className="flex items-start justify-between gap-2 px-1 pt-3">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-medium tracking-tight sm:text-base">
            {project.name}
          </h3>

          <p className="mt-1 text-[11px] sm:text-xs">
            {project.category}
          </p>
        </div>

        <span className="shrink-0 pt-0.5 text-[10px] tracking-[0.15em]">
          {project.number}
        </span>
      </div>
    </article>
  );
}

export default function Projects({ transitionProgress }: ProjectsProps) {
  const shouldReduceMotion = useReducedMotion();
  const transitionComplete = transitionProgress >= 0.999;

  return (
    <section
      id="projects"
      aria-hidden={!transitionComplete}
      style={{
        opacity: transitionComplete ? 1 : 0,
        visibility: transitionComplete ? "visible" : "hidden",
        pointerEvents: transitionComplete ? "auto" : "none",
        backgroundColor: "var(--site-background, #050505)",
        transition: shouldReduceMotion
          ? "none"
          : [
              "opacity 900ms cubic-bezier(0.16, 1, 0.3, 1)",
              "background-color 1800ms cubic-bezier(0.22, 1, 0.36, 1)",
            ].join(", "),
      }}
      className="relative z-30 -mt-[100svh] overflow-hidden px-5 py-24 sm:px-8 sm:py-32 lg:px-14 lg:py-36"
    >
      <style jsx global>{`
        #projects {
          position: relative;
          isolation: isolate;
          background-color: var(--site-background, #050505);
          --project-text: #ffffff;
          --project-muted: rgba(255, 255, 255, 0.45);
          transition:
            background-color 1800ms cubic-bezier(0.22, 1, 0.36, 1),
            color 850ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        html[data-light-section="true"] #projects {
          --project-text: #050505;
          --project-muted: rgba(0, 0, 0, 0.5);
        }

        html:not([data-light-section="true"]) #projects {
          --project-text: #ffffff;
          --project-muted: rgba(255, 255, 255, 0.45);
        }

        #projects h2,
        #projects h3 {
          color: var(--project-text);
          transition: color 850ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        #projects p,
        #projects .project-card > div > span {
          color: var(--project-muted);
          transition: color 850ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        #projects .project-ambient {
          opacity: 1;
          transition: opacity 850ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        html[data-light-section="true"] #projects .project-ambient {
          opacity: 0;
        }

        .project-carousel {
          --project-gap: 16px;
          position: relative;
          width: 100%;
          overflow: hidden;
          isolation: isolate;
        }

        .project-carousel__track {
          display: flex;
          align-items: flex-start;
          width: max-content;
          animation: eleva-projects-scroll 42s linear infinite;
          will-change: transform;
        }

        .project-carousel__group {
          display: flex;
          flex: 0 0 auto;
          align-items: flex-start;
          gap: var(--project-gap);
          padding-right: var(--project-gap);
        }

        .project-card {
          flex: 0 0 calc((100vw - 40px - 2 * var(--project-gap)) / 3);
          min-width: 0;
        }

        .project-card__link {
          display: block;
          overflow: hidden;
          border-radius: 12px;
          outline-offset: 4px;
        }

        .project-card__link:focus-visible {
          outline: 2px solid #7770ff;
        }

        .project-card__screen {
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 12px;
          background: #0a0a0d;
          box-shadow:
            0 12px 30px rgba(0, 0, 0, 0.18),
            inset 0 1px 0 rgba(255, 255, 255, 0.045);
          transition:
            border-color 300ms ease,
            box-shadow 300ms ease,
            transform 300ms ease;
        }

        .project-card__screen::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          border-radius: inherit;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.035),
            transparent 40%,
            transparent 78%,
            rgba(119, 112, 255, 0.025)
          );
        }

        .project-card:hover .project-card__screen {
          border-color: rgba(119, 112, 255, 0.45);
          box-shadow:
            0 16px 38px rgba(0, 0, 0, 0.26),
            0 0 20px rgba(91, 85, 255, 0.045);
          transform: translateY(-3px);
        }

        .project-card__toolbar {
          position: relative;
          z-index: 3;
          display: flex;
          height: 35px;
          align-items: center;
          gap: 9px;
          padding: 0 10px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.075);
          background: #0c0c0f;
        }

        .project-card__dots {
          display: flex;
          flex-shrink: 0;
          align-items: center;
          gap: 4px;
        }

        .project-card__dots span {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          opacity: 0.85;
        }

        .project-card__address {
          display: flex;
          min-width: 0;
          height: 21px;
          flex: 1;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 0 7px;
          border: 1px solid rgba(255, 255, 255, 0.065);
          border-radius: 5px;
          background: rgba(255, 255, 255, 0.018);
          color: rgba(255, 255, 255, 0.48);
          font-size: 10px;
        }

        .project-card__address span {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .project-card__external {
          flex-shrink: 0;
          color: rgba(255, 255, 255, 0.4);
          font-size: 11px;
        }

        .project-card__image {
          position: relative;
          width: 100%;
          height: 200px;
          overflow: hidden;
          background: #050505;
        }

        .project-card__image img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
        }

        @keyframes eleva-projects-scroll {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        @media (min-width: 640px) {
          .project-carousel {
            --project-gap: 20px;
          }

          .project-card {
            flex-basis: calc((100vw - 64px - 2 * var(--project-gap)) / 3);
          }

          .project-card__screen,
          .project-card__link {
            border-radius: 14px;
          }

          .project-card__toolbar {
            height: 38px;
            gap: 10px;
            padding: 0 12px;
          }

          .project-card__dots span {
            width: 8px;
            height: 8px;
          }

          .project-card__image {
            height: 220px;
          }
        }

        @media (min-width: 1024px) {
          .project-carousel {
            --project-gap: 24px;
          }

          .project-card {
            flex-basis: min(
              calc((100vw - 112px - 2 * var(--project-gap)) / 3),
              calc((1328px - 2 * var(--project-gap)) / 3)
            );
          }

          .project-card__screen,
          .project-card__link {
            border-radius: 15px;
          }

          .project-card__toolbar {
            height: 40px;
            padding: 0 13px;
          }

          .project-card__image {
            height: 230px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .project-carousel__track {
            animation: none;
            transform: none;
          }

          .project-card:hover .project-card__screen {
            transform: none;
          }

          #projects,
          #projects h2,
          #projects h3,
          #projects p,
          #projects .project-card > div > span {
            transition: none;
          }
        }
      `}</style>

      <div
        aria-hidden="true"
        className="project-ambient pointer-events-none absolute left-1/2 top-28 -z-10 h-64 w-[min(75vw,700px)] -translate-x-1/2 rounded-full bg-[#5b55ff]/[0.035] blur-[120px]"
      />

      <div className="relative mx-auto max-w-[1440px]">
        <motion.header
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mb-14 text-center sm:mb-20"
        >
          <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.35em] sm:text-xs">
            ELEVA STUDIO — TRABALHOS SELECIONADOS
          </p>

          <h2
            className="text-[clamp(3.5rem,9vw,8rem)] leading-[0.82] tracking-[-0.065em]"
            style={{
              fontFamily: '"Standard Black", "Arial Black", Impact, sans-serif',
              fontWeight: 900,
            }}
          >
            PORTFÓLIO<span className="text-[#7770ff]">.</span>
          </h2>

          <p className="mx-auto mt-7 max-w-lg text-sm leading-6 sm:text-base sm:leading-7">
            Diferentes negócios. Experiências digitais pensadas para
            apresentar cada marca da maneira que ela merece.
          </p>
        </motion.header>

        <div className="project-carousel">
          <div className="project-carousel__track">
            {[0, 1].map((copy) => (
              <div
                key={copy}
                className="project-carousel__group"
                aria-hidden={copy === 1 || undefined}
              >
                {projects.map((project) => (
                  <ProjectCard
                    key={`${copy}-${project.number}`}
                    project={project}
                    clone={copy === 1}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}