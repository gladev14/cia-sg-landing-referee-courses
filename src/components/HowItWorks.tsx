import React from 'react';
import { ClipboardList, Users, Trophy } from 'lucide-react';

interface HowItWorksProps {
  onCtaClick: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onCtaClick }) => {
  const steps = [
    {
      number: '01',
      icon: ClipboardList,
      title: 'Compila il Modulo Online',
      description:
        'Inserisci i tuoi dati, la tua regione e la tua provincia di riferimento. La richiesta viene instradata automaticamente alla commissione provinciale CIA di competenza.',
    },
    {
      number: '02',
      icon: Users,
      title: 'Frequenta le Lezioni Gratuite',
      description:
        'Circa 2 mesi con lezioni serali tenute da formatori FIP: regolamento tecnico della pallacanestro, meccanica dei 2/3 arbitri e analisi video delle azioni.',
    },
    {
      number: '03',
      icon: Trophy,
      title: 'Esame e Primo Salto a Due',
      description:
        'Supera il test a risposta multipla, ricevi gratuitamente la divisa ufficiale CIA e scendi sul parquet con un tutor esperto al tuo fianco!',
    },
  ];

  return (
    <section id="come-funziona" className="py-16 sm:py-24 border-t border-slate-900 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <span className="rounded-full border border-teal-500/30 bg-teal-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-teal-400">
            Percorso Semplice
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Come si Diventa Arbitro di Basket in 3 Passi
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            Dalla richiesta di informazioni al debutto sul parquet: tutto quello che devi sapere.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative rounded-2xl border border-slate-800 bg-slate-900/60 p-7 sm:p-8 flex flex-col justify-between hover:border-slate-700 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-extrabold font-mono text-emerald-400/80">
                      {step.number}
                    </span>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 text-emerald-400">
                      <Icon className="h-6 w-6 stroke-[2]" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{step.description}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs font-medium text-emerald-400/90 flex items-center gap-1.5">
                  <span>Passo {idx + 1} di 3</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={onCtaClick}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-bold text-slate-950 shadow-md hover:bg-emerald-400 active:scale-95 transition-all cursor-pointer"
          >
            Inizia Ora il Tuo Percorso
          </button>
        </div>
      </div>
    </section>
  );
};
