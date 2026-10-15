import Link from "next/link";

const footerLinks = [
  { label: "Projetos", href: "#projetos" },
  { label: "Serviços", href: "#servicos" },
  { label: "Sobre", href: "#sobre" },
  { label: "Contato", href: "#contato" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#040611]">
      <div className="section-shell py-10 md:py-12">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Link href="#inicio" className="inline-flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl border border-white/15 bg-white/[0.04] text-sm font-semibold tracking-[-0.08em]">
                EA
              </span>
              <span className="text-[13px] font-medium tracking-[0.04em]">ELEVA <span className="text-white/45">STUDIO</span></span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-6 text-white/45">
              Experiências digitais que elevam negócios.
            </p>
          </div>
          <nav aria-label="Links do rodapé" className="flex flex-wrap gap-x-6 gap-y-3">
            {footerLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-xs text-white/50 transition hover:text-white">
                {link.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="mt-9 flex flex-col gap-2 border-t border-white/[0.08] pt-5 text-[10px] tracking-[0.08em] text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} ELEVA STUDIO. TODOS OS DIREITOS RESERVADOS.</span>
          <span>DESIGN · ESTRATÉGIA · DESENVOLVIMENTO</span>
        </div>
      </div>
    </footer>
  );
}
