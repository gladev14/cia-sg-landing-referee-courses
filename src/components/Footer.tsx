import React from 'react';
import { Shield, Heart, ArrowUp } from 'lucide-react';
import { EMAILJS_ROUTING_CONFIG } from '../config/emailRouting';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenConfig?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy }) => {
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
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-slate-950 font-black">
                <Shield className="h-4 w-4 stroke-[2.5]" />
              </div>
              <span className="text-base font-extrabold tracking-tight text-white">
                CORSI ARBITRI BASKET ITALIA
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              Piattaforma unificata per la raccolta adesioni e informazioni sui corsi arbitri di pallacanestro
              ufficiali in tutte le 20 regioni italiane. Instradamento diretto al Comitato Italiano Arbitri (CIA - FIP).
            </p>
            <div className="pt-1 flex items-center gap-2 text-xs">
              <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-400 border border-emerald-500/20">
                Federazione Italiana Pallacanestro
              </span>
              <span className="inline-flex items-center rounded-full bg-slate-900 px-2.5 py-0.5 text-[11px] font-semibold text-slate-300 border border-slate-800">
                CIA • Comitato Italiano Arbitri
              </span>
            </div>
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

          {/* Legal & Info */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Trasparenza & Privacy</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onOpenPrivacy}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Informativa Privacy (GDPR)
                </button>
              </li>
              <li className="text-[11px] text-slate-400">
                Riconoscimento ufficiale: FIP - CIA
              </li>
              <li className="text-[11px] text-slate-500">
                Presidio Nazionale: {EMAILJS_ROUTING_CONFIG.centralAdminEmail}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-1.5 text-slate-500">
            <span>Promosso per il CIA - Federazione Italiana Pallacanestro con</span>
            <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" />
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] text-slate-500">
              © {new Date().getFullYear()} Corsi Arbitri Basket FIP - CIA. Tutti i diritti riservati.
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
