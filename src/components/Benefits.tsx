import React from 'react';
import { Ticket, Coins, Award, GraduationCap } from 'lucide-react';

export const Benefits: React.FC = () => {
  const benefitsList = [
    {
      icon: Ticket,
      title: 'Tessera Federale Gratuita',
      description:
        'Con la tessera ufficiale FIP hai diritto all\'ingresso gratuito in tutti i palasport e palazzetti d\'Italia per le partite di Serie A, Serie A2, Serie B e campionati nazionali.',
      badge: 'Accesso Palasport',
    },
    {
      icon: Coins,
      title: 'Rimborso Spese per Gara',
      description:
        'Per ogni partita diretta sul parquet percepisci un rimborso economico chilometrico e una diaria federale stabilita dalle tabelle ufficiali FIP.',
      badge: 'Compenso Gara',
    },
    {
      icon: Award,
      title: 'Divisa & Materiale Ufficiale',
      description:
        'Al termine del corso ricevi gratuitamente la divisa ufficiale di gara CIA, il fischietto regolamentare e il manuale delle regole tecniche FIP.',
      badge: 'Kit Incluso',
    },
    {
      icon: GraduationCap,
      title: 'Crediti Formativi Scolastici',
      description:
        'Il corso arbitri e l\'attività sul parquet sono ufficialmente riconosciuti per l\'attribuzione di crediti formativi scolastici (PCTO) e universitari.',
      badge: 'Scuola & Uni',
    },
  ];

  return (
    <section id="vantaggi" className="py-16 sm:py-24 border-t border-slate-900 bg-slate-950/60 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-400">
            Perché Diventare Arbitro di Basket
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            I Vantaggi Esclusivi del Corso FIP - CIA
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            Non è solo un hobby sportivo: è una scuola di vita che sviluppa leadership, prontezza
            decisionale e offre vantaggi concreti dal primo giorno sul parquet.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefitsList.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group relative rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 hover:border-emerald-500/40 hover:bg-slate-900/70 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
                      <Icon className="h-6 w-6 stroke-[2]" />
                    </div>
                    <span className="rounded-md bg-slate-800/80 px-2.5 py-1 text-[11px] font-semibold text-slate-300">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
