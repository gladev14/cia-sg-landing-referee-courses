import React from 'react';
import { Shield, Sparkles, Sliders, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenConfig?: () => void;
  onScrollToForm: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onScrollToForm }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 text-slate-950 shadow-lg shadow-emerald-500/20 ring-1 ring-emerald-400/40">
            <Shield className="h-5 w-5 text-slate-950 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-extrabold tracking-tight text-white sm:text-lg">
                CORSI ARBITRI BASKET
              </span>
              <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400 border border-emerald-500/30">
                FIP - CIA
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Diventa arbitro ufficiale di pallacanestro nella tua regione</p>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <button
            onClick={() => scrollToSection('vantaggi')}
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            Vantaggi
          </button>
          <button
            onClick={() => scrollToSection('come-funziona')}
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            Come Funziona
          </button>
          <button
            onClick={() => scrollToSection('faq')}
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            FAQ
          </button>

          <button
            onClick={onScrollToForm}
            className="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-bold text-slate-950 shadow-md shadow-emerald-500/25 hover:bg-emerald-400 active:scale-95 transition-all cursor-pointer"
          >
            <Sparkles className="h-4 w-4" />
            <span>Iscriviti Ora</span>
          </button>
        </nav>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Apri menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-300"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-800 bg-slate-950 px-4 py-4 md:hidden space-y-3">
          <button
            onClick={() => scrollToSection('vantaggi')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-300 hover:text-white"
          >
            Vantaggi del corso
          </button>
          <button
            onClick={() => scrollToSection('come-funziona')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-300 hover:text-white"
          >
            Come funziona
          </button>
          <button
            onClick={() => scrollToSection('faq')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-300 hover:text-white"
          >
            Domande frequenti
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onScrollToForm();
            }}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-500 py-2.5 text-sm font-bold text-slate-950 shadow-md shadow-emerald-500/25"
          >
            <Sparkles className="h-4 w-4" />
            <span>Iscriviti / Richiedi Info</span>
          </button>
        </div>
      )}
    </header>
  );
};
