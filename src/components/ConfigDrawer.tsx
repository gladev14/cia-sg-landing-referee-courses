import React, { useState, useEffect } from 'react';
import { X, Sliders, Check, Copy, Server, Mail, ShieldCheck } from 'lucide-react';
import { BACKEND_API_CONFIG } from '../config/emailRouting';
import { getBackendBaseUri, setBackendBaseUri, getBackendEndpointUrl } from '../services/emailService';

interface ConfigDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConfigDrawer: React.FC<ConfigDrawerProps> = ({ isOpen, onClose }) => {
  const [baseUri, setBaseUri] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedSnippet, setCopiedSnippet] = useState(false);
  const [selectedRegionFilter, setSelectedRegionFilter] = useState('');

  useEffect(() => {
    if (isOpen) {
      setBaseUri(getBackendBaseUri());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveUri = (e: React.FormEvent) => {
    e.preventDefault();
    setBackendBaseUri(baseUri);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const payloadExample = `{
  "region": "Lombardia",
  "name": "Mario",
  "surname": "Rossi",
  "city": "Milano",
  "mail": "mario.rossi@example.it",
  "telephone": "+39 340 1234567",
  "recipient": "alessandro589@hotmail.com",
  "coordinator": "coordinamento.corsi@cia.example.it",
  "to_email": "alessandro589@hotmail.com",
  "admin_email": "coordinamento.corsi@cia.example.it",
  "cc_email": "mario.rossi@example.it",
  "regional_email": "alessandro589@hotmail.com",
  "regional_committee": "CIA Lombardia",
  "submitted_at": "10/09/2026, 12:15:30"
}`;

  const copyCode = () => {
    navigator.clipboard.writeText(payloadExample);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  const regionsList = Object.entries(BACKEND_API_CONFIG.regionalEmails).filter(
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
              <h3 className="text-lg font-bold text-white">Configurazione Backend Custom & Routing</h3>
              <p className="text-xs text-slate-400">Endpoint: POST /api/sendCourseInfoRequest</p>
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

        {/* Endpoint Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <Server className="h-4 w-4" />
              Endpoint Servizio Backend
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
                  <span>Copia Payload JSON</span>
                </>
              )}
            </button>
          </div>

          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-medium">Metodo HTTP:</span>
              <span className="font-mono text-emerald-400 font-bold">POST</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-medium">Header Obbligatorio:</span>
              <span className="font-mono text-slate-200">Content-Type: application/json</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-medium">URL Completo:</span>
              <span className="font-mono text-emerald-300 text-[11px]">{getBackendEndpointUrl()}</span>
            </div>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">
              Payload JSON inviato al backend:
            </span>
            <pre className="rounded-xl bg-slate-900 border border-slate-800 p-3 text-[11px] text-slate-300 font-mono overflow-x-auto max-h-40">
              {payloadExample}
            </pre>
          </div>
        </div>

        {/* Base URI Config Form */}
        <form onSubmit={handleSaveUri} className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5 space-y-3">
          <label htmlFor="base-uri-input" className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
            <Server className="h-4 w-4 text-emerald-400" />
            Base URI Servizio Backend
          </label>

          <p className="text-xs text-slate-400">
            Valore predefinito: <code className="bg-slate-900 text-emerald-300 px-1 py-0.5 rounded font-mono">https://corsiarbitri-fip-be.vercel.app</code>
          </p>

          <div className="flex gap-2">
            <input
              id="base-uri-input"
              type="text"
              value={baseUri}
              onChange={(e) => setBaseUri(e.target.value)}
              placeholder="https://corsiarbitri-fip-be.vercel.app"
              className="flex-1 rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-sm text-white font-mono placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-colors cursor-pointer"
            >
              Salva URI
            </button>
          </div>

          {savedSuccess && (
            <p className="text-xs text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5" />
              Base URI aggiornato con successo!
            </p>
          )}
        </form>

        {/* Routing Table for all 20 Regions */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                <Mail className="h-4 w-4 text-emerald-400" />
                Tabella Routing Destinatari Regionali (recipient)
              </span>
              <p className="text-[11px] text-slate-400">
                Coordinatore centrale:{' '}
                <strong className="text-white font-mono">{BACKEND_API_CONFIG.centralAdminEmail || 'Non impostato'}</strong>
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
                <span className="font-mono text-slate-400 text-[11px]">{email || '-'}</span>
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
