import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Quali sono i requisiti di età per iscriversi?',
      a: 'Possono iscriversi ragazze e ragazzi dai 13 anni compiuti in su. È richiesto essere residenti o domiciliati in Italia e presentare il certificato medico di idoneità all\'attività sportiva agonistica per la pallacanestro (rilasciabile da un medico dello sport).',
    },
    {
      q: 'Il corso arbitri di basket è davvero gratuito?',
      a: 'Sì, la partecipazione al corso organizzato dal CIA (Comitato Italiano Arbitri) per la FIP è al 100% gratuita. Al termine del percorso e al superamento dell\'esame finale, la federazione fornisce la divisa ufficiale di gara, il fischietto regolamentare e le regole tecniche.',
    },
    {
      q: 'Come sono organizzate le lezioni del corso?',
      a: 'I corsi si svolgono generalmente con 1 o 2 lezioni settimanali in orario tardo-pomeridiano o serale (tra le 18:30 e le 20:30), combinando lezioni teoriche sulle regole del gioco ed esercitazioni pratiche di meccanica arbitrale direttamente sul parquet del palasport.',
    },
    {
      q: 'Come funziona il rimborso spese per ciascuna partita?',
      a: 'Per ogni partita diretta sul parquet (fin dalle categorie giovanili Under 13, Under 14, ecc.) è previsto un rimborso economico chilometrico e una diaria federale FIP, accreditati periodicamente secondo le tabelle ufficiali.',
    },
    {
      q: 'Come funziona l\'ingresso gratuito nei palasport?',
      a: 'A tutti gli arbitri effettivi viene rilasciata la Tessera Federale FIP, che consente l\'accesso gratuito nei palazzetti dello sport e palasport di tutta Italia per assistere alle partite dei campionati nazionali di Serie A, Serie A2, Serie B e giovanili.',
    },
    {
      q: 'Cosa succede dopo aver inviato la richiesta di iscrizione?',
      a: 'Il modulo inoltra automaticamente i tuoi dati al Comitato Regionale Arbitri (CIA) della regione selezionata. Il formatore o referente della commissione provinciale ti contatterà telefonicamente o via email per fornirti il calendario e accoglierti alla prima lezione.',
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
