import React, { useState, useEffect } from 'react';
import { X, Sliders, Check, Copy, Key, Server, Mail, ExternalLink, ShieldCheck } from 'lucide-react';
import { EMAILJS_ROUTING_CONFIG } from '../config/emailRouting';
import { getStoredPublicKey, setStoredPublicKey } from '../services/emailService';

interface ConfigDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConfigDrawer: React.FC<ConfigDrawerProps> = ({ isOpen, onClose }) => {
  const [publicKey, setPublicKey] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedSnippet, setCopiedSnippet] = useState(false);
  const [selectedRegionFilter, setSelectedRegionFilter] = useState('');

  useEffect(() => {
    if (isOpen) {
      setPublicKey(getStoredPublicKey());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveKey = (e: React.FormEvent) => {
    e.preventDefault();
    setStoredPublicKey(publicKey);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const codeSnippet = `// Snippet di invio con routing dinamico EmailJS
emailjs.send(
  "${EMAILJS_ROUTING_CONFIG.serviceId}",
  "${EMAILJS_ROUTING_CONFIG.templateId}",
  {
    region: formData.region,
    name: formData.name,
    surname: formData.surname,
    city: formData.city,
    mail: formData.mail,
    telephone: formData.telephone,
    recipient: recipientRegionalEmail, // Regione destinataria
    coordinator: adminEmail // Mail dell'amministratore
  },
  publicKey
);`;

  const copyCode = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  const regionsList = Object.entries(EMAILJS_ROUTING_CONFIG.regionalEmails).filter(
    ([reg]) => !selectedRegionFilter || reg.toLowerCase().includes(selectedRegionFilter.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8 text-slate-200 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Sliders className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Configurazione EmailJS & Routing Regioni</h3>
              <p className="text-xs text-slate-400">Verifica parametri template e destinatari per Vercel</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Chiudi configurazione"
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Snippet and Service/Template Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <Server className="h-4 w-4" />
              ID Servizio & Template
            </span>
            <button
              onClick={copyCode}
              className="flex items-center gap-1 rounded-md bg-slate-800 px-2.5 py-1 text-xs text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
            >
              {copiedSnippet ? (
                <>
                  <Check className="h-3 w-3 text-emerald-400" />
                  <span>Copiato!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  <span>Copia Snippet</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">SERVICE_ID:</span>
              <span className="font-mono text-emerald-400 font-bold">{EMAILJS_ROUTING_CONFIG.serviceId}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">TEMPLATE_ID:</span>
              <span className="font-mono text-emerald-400 font-bold">{EMAILJS_ROUTING_CONFIG.templateId}</span>
            </div>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">
              Parametri attesi da EmailJS (6 chiavi richieste):
            </span>
            <div className="flex flex-wrap gap-1.5 font-mono text-xs">
              {['region', 'name', 'surname', 'city', 'mail', 'telephone'].map((key) => (
                <span
                  key={key}
                  className="rounded-md bg-slate-900 border border-emerald-500/30 px-2 py-0.5 text-emerald-300 font-semibold"
                >
                  {key}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Public Key Config Form */}
        <form onSubmit={handleSaveKey} className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <label htmlFor="public-key-input" className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <Key className="h-4 w-4 text-emerald-400" />
              EmailJS Public Key (Opzionale per test locale / live)
            </label>
            <a
              href="https://dashboard.emailjs.com/admin/account"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-emerald-400 hover:underline flex items-center gap-1"
            >
              Trova in EmailJS <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <p className="text-xs text-slate-400">
            Per abilitare l'invio reale da Vercel puoi configurare la variabile d'ambiente{' '}
            <code className="bg-slate-900 text-emerald-300 px-1 py-0.5 rounded font-mono">
              VITE_EMAILJS_PUBLIC_KEY
            </code>{' '}
            nelle impostazioni del progetto su Vercel. In alternativa puoi incollarla qui per testarla subito nel browser:
          </p>

          <div className="flex gap-2">
            <input
              id="public-key-input"
              type="text"
              value={publicKey}
              onChange={(e) => setPublicKey(e.target.value)}
              placeholder="es. user_abc123xyz o public_key..."
              className="flex-1 rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-sm text-white font-mono placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-colors cursor-pointer"
            >
              Salva Chiave
            </button>
          </div>

          {savedSuccess && (
            <p className="text-xs text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5" />
              Chiave salvata! Ora le richieste verranno inviate tramite il tuo account EmailJS.
            </p>
          )}
        </form>

        {/* Routing Table for all 20 Regions */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                <Mail className="h-4 w-4 text-emerald-400" />
                Tabella Routing Email (Config File)
              </span>
              <p className="text-[11px] text-slate-400">
                Amministratore Centrale:{' '}
                <strong className="text-white font-mono">{EMAILJS_ROUTING_CONFIG.centralAdminEmail}</strong>
              </p>
            </div>

            <input
              type="text"
              value={selectedRegionFilter}
              onChange={(e) => setSelectedRegionFilter(e.target.value)}
              placeholder="Filtra 20 regioni..."
              className="rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="max-h-48 overflow-y-auto rounded-xl border border-slate-800/80 bg-slate-900/60 divide-y divide-slate-800/60">
            {regionsList.map(([region, email]) => (
              <div key={region} className="px-3.5 py-2 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-200">{region}</span>
                <span className="font-mono text-slate-400 text-[11px]">{email}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Close button */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-xl bg-slate-800 px-5 py-2.5 text-xs font-semibold text-white hover:bg-slate-700 transition-colors cursor-pointer"
          >
            Chiudi
          </button>
        </div>
      </div>
    </div>
  );
};
