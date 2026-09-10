import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Quali sono i requisiti di età per iscriversi?',
      a: 'Possono iscriversi ragazze e ragazzi dai 13 anni compiuti in su. È richiesto essere residenti o domiciliati in Italia e presentare il certificato medico di idoneità per arbitro di pallacanestro (rilasciabile da un medico dello sport).',
    },
    {
      q: 'Il corso arbitri di basket è davvero gratuito?',
      a: 'Sì, la partecipazione al corso organizzato dal CIA (Comitato Italiano Arbitri) per la FIP è al 100% gratuita. Al termine del percorso e al superamento dell\'esame finale, la federazione fornisce la divisa ufficiale di gara e il fischietto regolamentare.',
    },
    {
      q: 'Come sono organizzate le lezioni del corso?',
      a: 'Il corso è strutturato in circa 8 lezioni della durata media di 2h ciascuna (solitamente 1 o 2 incontri a settimana in orario serale o tardo-pomeridiano), combinando lezioni teoriche sulle regole del gioco ed esercitazioni pratiche sul parquet.',
    },
    {
      q: 'Come funziona l\'accesso nei palasport con la tessera federale?',
      a: 'A tutti gli arbitri effettivi viene rilasciata la Tessera Federale FIP per accedere nei palazzetti dello sport d\'Italia per assistere alle partite dei campionati nazionali (Serie A, Serie A2, Serie B e giovanili), ma l\'ingresso dipende dall\'effettiva disponibilità di accrediti rilasciati dalla squadra di casa.',
    },
    {
      q: 'Cosa succede dopo aver inviato la richiesta di iscrizione?',
      a: 'Il modulo inoltra la richiesta alla commissione di competenza. Il referente ti contatterà telefonicamente o via email per ulteriori informazioni.',
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 border-t border-slate-900 bg-slate-950/40 scroll-mt-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-14">
          <span className="rounded-full border border-slate-700 bg-slate-900 px-3.5 py-1 text-xs font-semibold text-slate-300">
            Dubbi o Domande?
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Domande Frequenti sui Corsi Arbitri
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Tutto quello che c'è da sapere prima di iniziare la tua esperienza.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 transition-all overflow-hidden"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between p-5 text-left text-base sm:text-lg font-bold text-white hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  <span className="pr-4">{faq.q}</span>
                  <div
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-slate-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-emerald-400 bg-emerald-950/60' : ''
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
