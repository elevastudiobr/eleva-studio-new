"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const links = [
  { label: "PROJETOS", href: "#projects", sectionId: "projects" },
  { label: "CONTATO", href: "#contact", sectionId: "contact" },
];

const progressSections = [
  { sectionId: "inicio" },
  ...links.map(({ sectionId }) => ({ sectionId })),
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightBackground, setLightBackground] = useState(false);

  const progressRefs = useRef<Record<string, HTMLSpanElement | null>>({});
  const mobileProgressRefs = useRef<Record<string, HTMLSpanElement | null>>(
    {}
  );

  useEffect(() => {
    let frameId = 0;

    const updateNavbar = () => {
      cancelAnimationFrame(frameId);

      frameId = requestAnimationFrame(() => {
        const isLight =
          document.documentElement.dataset.lightSection === "true";

        setLightBackground((current) =>
          current === isLight ? current : isLight
        );

        progressSections.forEach(({ sectionId }) => {
          const section = document.getElementById(sectionId);
          const desktopBar = progressRefs.current[sectionId];
          const mobileBar = mobileProgressRefs.current[sectionId];

          let progress = 0;

          if (section) {
            const rect = section.getBoundingClientRect();
            const sectionTop = window.scrollY + rect.top;

            const scrollDistance = Math.max(
              section.offsetHeight - window.innerHeight,
              1
            );

            progress = Math.min(
              1,
              Math.max(
                0,
                (window.scrollY - sectionTop) / scrollDistance
              )
            );
          }

          const width = `${progress * 100}%`;

          if (desktopBar) desktopBar.style.width = width;
          if (mobileBar) mobileBar.style.width = width;
        });
      });
    };

    updateNavbar();

    window.addEventListener("scroll", updateNavbar, { passive: true });
    window.addEventListener("resize", updateNavbar);

    const observer = new MutationObserver(updateNavbar);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-light-section"],
    });

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", updateNavbar);
      window.removeEventListener("resize", updateNavbar);
      observer.disconnect();
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const textColor = lightBackground ? "text-black" : "text-white";
  const mutedColor = lightBackground ? "text-black/70" : "text-white/70";
  const lineColor = lightBackground ? "bg-black/25" : "bg-white/25";
  const progressColor = lightBackground ? "bg-black" : "bg-white";
  const borderColor = lightBackground ? "border-black/20" : "border-white/20";

  return (
    <header className="fixed inset-x-0 top-0 z-[100] bg-transparent">
      <nav
        aria-label="Navegação principal"
        className="mx-auto flex h-[84px] w-full max-w-[1600px] items-center justify-between px-5 sm:px-8 lg:px-14"
      >
        {/* Logo */}
        <a
          href="#inicio"
          onClick={closeMenu}
          aria-label="Eleva Studio — início"
          className="relative flex h-[42px] w-[235px] shrink-0 flex-col sm:w-[250px]"
        >
          <span className="absolute inset-x-0 top-0 flex h-[50px] -translate-y-[5px] items-center">
            <img
              src={
                lightBackground
                  ? "/images/logo-eleva-black.webp"
                  : "/images/logo-eleva-white.webp"
              }
              alt="Eleva Studio"
              className="block h-auto max-h-full w-full object-contain object-left transition-opacity duration-[850ms]"
            />
          </span>

          <span
            className={`absolute inset-x-0 bottom-0 block h-px overflow-hidden ${lineColor} transition-colors duration-[850ms]`}
          >
            <span
              ref={(element) => {
                progressRefs.current.inicio = element;
              }}
              className={`absolute inset-y-0 left-0 ${progressColor} transition-colors duration-[850ms]`}
              style={{
                width: "0%",
                transitionProperty: "width, background-color",
              }}
            />
          </span>
        </a>

        {/* Links desktop */}
        <div className="hidden items-center gap-9 md:flex lg:gap-12">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative flex h-[42px] flex-col items-center"
            >
              <span
                className={`relative top-[10px] inline-block whitespace-nowrap text-[10px] font-medium tracking-[0.17em] ${mutedColor} transition-colors duration-[850ms] lg:text-[11px]`}
              >
                {link.label}

                <span
                  className={`absolute inset-x-0 -bottom-[8px] block h-px overflow-hidden ${lineColor} transition-colors duration-[850ms]`}
                >
                  <span
                    ref={(element) => {
                      progressRefs.current[link.sectionId] = element;
                    }}
                    className={`absolute inset-y-0 left-0 ${progressColor} transition-colors duration-[850ms]`}
                    style={{
                      width: "0%",
                      transitionProperty: "width, background-color",
                    }}
                  />
                </span>
              </span>
            </a>
          ))}
        </div>

        {/* CTA desktop */}
        <a
          href="#contact"
          className={`group hidden items-center gap-3 text-[10px] font-medium tracking-[0.15em] ${textColor} transition-colors duration-[850ms] md:flex lg:text-[11px]`}
        >
          <span>VAMOS CONVERSAR</span>

          <span
            className={`grid h-8 w-8 place-items-center rounded-full border ${borderColor} transition-colors duration-[850ms]`}
          >
            <ArrowUpRight
              size={14}
              strokeWidth={1.5}
              className="transition-colors duration-[850ms]"
            />
          </span>
        </a>

        {/* Botão mobile */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          className={`grid h-10 w-10 place-items-center ${textColor} transition-colors duration-[850ms] md:hidden`}
        >
          {menuOpen ? (
            <X size={22} strokeWidth={1.4} />
          ) : (
            <Menu size={22} strokeWidth={1.4} />
          )}
        </button>
      </nav>

      {/* Menu mobile */}
      <div
        className={`overflow-hidden bg-transparent transition-[max-height,opacity] duration-300 md:hidden ${
          menuOpen
            ? "max-h-[380px] opacity-100"
            : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <div
          className={`mx-5 border-t ${borderColor} px-1 pb-6 pt-3 transition-colors duration-[850ms]`}
        >
          {links.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className={`group flex items-center justify-between border-b ${borderColor} py-4 transition-colors duration-[850ms]`}
            >
              <span className="flex items-center gap-4">
                <span
                  className={`text-[10px] ${mutedColor} transition-colors duration-[850ms]`}
                >
                  0{index + 1}
                </span>

                <span
                  className={`text-xs tracking-[0.14em] ${textColor} transition-colors duration-[850ms]`}
                >
                  {link.label}
                </span>
              </span>

              <span
                className={`relative h-px w-16 overflow-hidden ${lineColor} transition-colors duration-[850ms]`}
              >
                <span
                  ref={(element) => {
                    mobileProgressRefs.current[link.sectionId] = element;
                  }}
                  className={`absolute inset-y-0 left-0 ${progressColor} transition-colors duration-[850ms]`}
                  style={{
                    width: "0%",
                    transitionProperty: "width, background-color",
                  }}
                />
              </span>
            </a>
          ))}

          <a
            href="#contact"
            onClick={closeMenu}
            className={`mt-5 flex items-center justify-between text-xs tracking-[0.12em] ${textColor} transition-colors duration-[850ms]`}
          >
            VAMOS CONVERSAR
            <ArrowUpRight size={17} strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </header>
  );
}