import React from 'react';
import { Award, Ticket, Coins, GraduationCap, ChevronRight, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onCtaClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background glow and decorative stadium pitch lines */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 blur-[130px] rounded-full" />
        <div className="absolute top-1/3 right-10 w-72 h-72 bg-teal-500/10 blur-[110px] rounded-full" />
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Main Copy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top notification pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-emerald-300">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Nuove iscrizioni aperte per la stagione in corso</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
              Fischietto, passione e rispetto.{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                Diventa Arbitro di Basket.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Il corso è <strong>completamente gratuito</strong> ed è aperto a ragazze e ragazzi dai <strong>13 anni compiuti</strong> in su.
              Impara il regolamento della pallacanestro, allena la leadership e scendi sul parquet da protagonista con la Federazione Italiana Pallacanestro (FIP).
            </p>

            {/* Benefit Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 pt-2 text-left">
              <div className="flex items-start gap-2.5 rounded-xl border border-slate-800 bg-slate-900/60 p-3">
                <Ticket className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-xs sm:text-sm font-bold text-white">Tessera FIP</h2>
                  <p className="text-[11px] text-slate-400">Ingresso gratuito in tutti i palasport d'Italia</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 rounded-xl border border-slate-800 bg-slate-900/60 p-3">
                <Coins className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-xs sm:text-sm font-bold text-white">Rimborso Spese</h2>
                  <p className="text-[11px] text-slate-400">Compenso economico e diaria per ogni gara</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 rounded-xl border border-slate-800 bg-slate-900/60 p-3">
                <Award className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-xs sm:text-sm font-bold text-white">Divisa Ufficiale</h2>
                  <p className="text-[11px] text-slate-400">Kit CIA, fischietto e regolamento inclusi</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 rounded-xl border border-slate-800 bg-slate-900/60 p-3">
                <GraduationCap className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-xs sm:text-sm font-bold text-white">Crediti Formativi</h2>
                  <p className="text-[11px] text-slate-400">Riconosciuti per scuole superiori e università</p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 justify-center lg:justify-start">
              <button
                onClick={onCtaClick}
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 text-base font-bold text-slate-950 shadow-lg shadow-emerald-500/30 hover:bg-emerald-400 active:scale-95 transition-all cursor-pointer"
              >
                <span>Richiedi Informazioni / Iscriviti</span>
                <ChevronRight className="h-5 w-5" />
              </button>
              <a
                href="#come-funziona"
                className="w-full sm:w-auto text-center rounded-xl border border-slate-700 bg-slate-900/80 px-5 py-3.5 text-sm font-semibold text-slate-200 hover:border-slate-600 hover:text-white transition-all"
              >
                Scopri come funziona
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4 text-xs text-slate-400 border-t border-slate-800/60">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                20 Regioni coperte
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                107 Province con comitati CIA
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                Qualifica Ufficiale FIP / CIA
              </span>
            </div>
          </div>

          {/* Hero Visual Card / Badge */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/90 to-slate-950 p-6 shadow-2xl shadow-emerald-950/40">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="h-3 w-3 rounded-full bg-orange-500" />
                  <div className="h-3 w-3 rounded-full bg-sky-500" />
                  <div className="h-3 w-3 rounded-full bg-emerald-500" />
                  <span className="text-xs font-mono text-slate-400 ml-2">CORSO ARBITRI FIP</span>
                </div>
                <span className="rounded-md bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400 uppercase">
                  Gratuito
                </span>
              </div>

              {/* Graphic referee card preview */}
              <div className="mt-5 space-y-4">
                <div className="rounded-xl bg-slate-950 border border-slate-800/80 p-4">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span>Durata percorso</span>
                    <span className="font-semibold text-slate-200">~ 2 Mesi (lezioni teorico-pratiche)</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span>Età di accesso</span>
                    <span className="font-semibold text-emerald-400 font-bold">Dai 13 anni compiuti</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Certificato richiesto</span>
                    <span className="font-semibold text-slate-200">Idoneità sportiva agonistica</span>
                  </div>
                </div>

                {/* Basketball referee kit graphic */}
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800/70 to-slate-900 p-5 border border-slate-700/50">
                  <div className="flex items-center gap-4">
                    {/* CIA and FIP federation badges visual */}
                    <div className="relative flex">
                      <div className="h-14 w-11 rounded-lg bg-orange-500 shadow-md transform -rotate-6 border border-orange-400 flex flex-col items-center justify-center font-black text-slate-950 text-xs">
                        <span className="text-[9px] uppercase tracking-tighter opacity-80">BASKET</span>
                        CIA
                      </div>
                      <div className="h-14 w-11 rounded-lg bg-sky-600 shadow-md transform rotate-12 -ml-3 border border-sky-400 flex flex-col items-center justify-center font-black text-white text-xs">
                        <span className="text-[9px] uppercase tracking-tighter opacity-80">ITALIA</span>
                        FIP
                      </div>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-white">Kit Ufficiale Arbitro FIP</h3>
                      <p className="text-xs text-slate-300">
                        Fornito gratuitamente al superamento del corso: divisa tecnica, fischietto e regolamento.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Regional Routing Alert */}
                <div className="rounded-lg bg-emerald-950/40 border border-emerald-800/40 p-3 text-xs text-emerald-300/90 flex items-start gap-2.5">
                  <span className="text-base">📍</span>
                  <p>
                    La tua richiesta viene inoltrata automaticamente al <strong>Comitato Regionale Arbitri (CIA)</strong> per assegnarti la commissione provinciale più vicina.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
