import React from 'react';
import { Heart, ArrowUp, ExternalLink } from 'lucide-react';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenConfig?: () => void;
}

export const Footer: React.FC<FooterProps> = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-900 bg-slate-950 text-slate-400 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-900">
          {/* Brand */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-8 items-center justify-center shrink-0">
                <img
                  src="/fip-logo.svg"
                  alt="Logo FIP"
                  className="h-8 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-base font-extrabold tracking-tight text-white">
                CORSI ARBITRI BASKET
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              Piattaforma unificata per la raccolta adesioni e informazioni sui corsi arbitri di pallacanestro in tutte le regioni italiane. Instradamento diretto al CIA della tua regione.
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Navigazione</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#vantaggi" className="hover:text-emerald-400 transition-colors">
                  Vantaggi e Perks
                </a>
              </li>
              <li>
                <a href="#come-funziona" className="hover:text-emerald-400 transition-colors">
                  Come Funziona il Corso
                </a>
              </li>
              <li>
                <a href="#form-iscrizione" className="hover:text-emerald-400 transition-colors">
                  Modulo di Adesione
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-emerald-400 transition-colors">
                  Domande Frequenti (FAQ)
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Links */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Trasparenza & Link Utili</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://cia.fip.it"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer inline-flex items-center gap-1"
                >
                  <span>cia.fip.it</span>
                  <ExternalLink className="h-3 w-3 inline" />
                </a>
              </li>
              <li>
                <a
                  href="https://fip.it/privacy-policy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer inline-flex items-center gap-1"
                >
                  <span>Informativa Privacy</span>
                  <ExternalLink className="h-3 w-3 inline" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-1.5 text-slate-500">
            <span>Promosso per il CIA con</span>
            <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" />
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] text-slate-500">
              © {new Date().getFullYear()}. Tutti i diritti riservati.
            </span>
            <button
              onClick={scrollToTop}
              aria-label="Torna in cima"
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
