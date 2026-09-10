import React from 'react';
import { X, ShieldCheck, Lock } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8 text-slate-200 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Informativa sul Trattamento dei Dati</h3>
              <p className="text-xs text-slate-400">Regolamento Generale UE 2016/679 (GDPR)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Chiudi informativa"
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="mt-5 space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <section className="space-y-1.5">
            <h4 className="font-bold text-white text-sm flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5 text-emerald-400" />
              1. Titolare del Trattamento
            </h4>
            <p>
              I dati personali inseriti nel form di registrazione (nome, cognome, email, recapito telefonico,
              regione e provincia di riferimento) sono trattati dal Comitato Italiano Arbitri (CIA - FIP) competente per territorio e
              dall'Amministrazione Centrale per la gestione delle manifestazioni di interesse ai corsi per arbitri di basket.
            </p>
          </section>

          <section className="space-y-1.5">
            <h4 className="font-bold text-white text-sm">2. Finalità e Base Giuridica</h4>
            <p>
              I dati raccolti vengono trattati esclusivamente per ricontattare l'utente via email o telefono,
              fornire chiarimenti sul corso arbitri, comunicare il calendario delle lezioni della sezione di
              competenza e procedere con l'iscrizione preliminare. Il trattamento è fondato sul consenso esplicito
              espresso tramite il modulo online.
            </p>
          </section>

          <section className="space-y-1.5">
            <h4 className="font-bold text-white text-sm">3. Destinatari dei Dati e Routing Email</h4>
            <p>
              In ottemperanza alla logica di routing territoriale, i dati vengono trasmessi in forma protetta
              al Comitato Regionale di residenza dell'utente selezionato (es. CIA della regione) e all'Amministratore
              Centrale via servizio di posta, con contestuale invio di una ricevuta in copia (CC) all'interessato.
              I dati non vengono ceduti a terze parti commerciali né utilizzati a scopi pubblicitari.
            </p>
          </section>

          <section className="space-y-1.5">
            <h4 className="font-bold text-white text-sm">4. Periodo di Conservazione</h4>
            <p>
              I dati saranno conservati per il tempo strettamente necessario all'espletamento del corso e alla
              gestione della candidatura, e comunque non oltre il termine della stagione sportiva di riferimento,
              salvo perfezionamento del tesseramento federale.
            </p>
          </section>

          <section className="space-y-1.5">
            <h4 className="font-bold text-white text-sm">5. Diritti dell'Interessato</h4>
            <p>
              Ai sensi degli artt. 15-22 del GDPR, l'utente ha diritto di richiedere l'accesso, la rettifica, la
              cancellazione dei propri dati o la revoca del consenso in qualunque momento contattando
              l'indirizzo dell'amministrazione centrale: <span className="text-emerald-400 font-mono">amministrazione@corsiarbitri.it</span>.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-xl bg-emerald-500 px-5 py-2 text-xs font-bold text-slate-950 hover:bg-emerald-400 active:scale-95 transition-all cursor-pointer"
          >
            Ho compreso e accetto
          </button>
        </div>
      </div>
    </div>
  );
};
