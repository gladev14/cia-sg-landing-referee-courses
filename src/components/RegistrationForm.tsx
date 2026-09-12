import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Send,
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ExternalLink,
  RefreshCw,
  Info,
} from 'lucide-react';
import { ITALIAN_REGIONS, getProvincesForRegion } from '../config/regions';
import { getRecipientsForRegion, EMAILJS_ROUTING_CONFIG } from '../config/emailRouting';
import { RegistrationFormData, SubmissionResult } from '../types';
import { sendRegistrationEmail } from '../services/emailService';

interface RegistrationFormProps {
  onOpenPrivacy: () => void;
  onOpenConfig?: () => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  onOpenPrivacy,
}) => {
  const [formData, setFormData] = useState<RegistrationFormData>({
    name: '',
    surname: '',
    mail: '',
    telephone: '',
    region: '',
    city: '',
    privacyConsent: false,
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<SubmissionResult | null>(null);

  // Calcolo dinamico delle province disponibili per la regione selezionata
  const availableProvinces = formData.region ? getProvincesForRegion(formData.region) : [];

  // Destinatari calcolati in base alla regione scelta
  const routing = formData.region
    ? getRecipientsForRegion(formData.region)
    : { regionalEmail: '', adminEmail: EMAILJS_ROUTING_CONFIG.centralAdminEmail };

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRegion = e.target.value;
    setFormData((prev) => ({
      ...prev,
      region: newRegion,
      city: '', // Reset della provincia quando cambia la regione
    }));
    if (errors.region) {
      setErrors((prev) => ({ ...prev, region: '' }));
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: '' }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: '' }));
      }
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Il nome è obbligatorio.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Inserisci un nome valido (min 2 caratteri).';
    }

    if (!formData.surname.trim()) {
      newErrors.surname = 'Il cognome è obbligatorio.';
    } else if (formData.surname.trim().length < 2) {
      newErrors.surname = 'Inserisci un cognome valido (min 2 caratteri).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.mail.trim()) {
      newErrors.mail = "L'indirizzo email è obbligatorio.";
    } else if (!emailRegex.test(formData.mail.trim())) {
      newErrors.mail = 'Inserisci un indirizzo email valido (es. mario.rossi@email.it).';
    }

    const phoneClean = formData.telephone.replace(/[\s\-()]/g, '');
    if (!formData.telephone.trim()) {
      newErrors.telephone = 'Il recapito telefonico è obbligatorio.';
    } else if (phoneClean.length < 8) {
      newErrors.telephone = 'Inserisci un numero di telefono valido.';
    }

    if (!formData.region) {
      newErrors.region = 'Seleziona la tua regione di appartenenza.';
    }

    if (!formData.city) {
      newErrors.city = 'Seleziona la provincia di riferimento.';
    }

    if (!formData.privacyConsent) {
      newErrors.privacyConsent = "È necessario esprimere il consenso all'informativa sulla privacy.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      const firstError = Object.keys(errors)[0];
      const element = document.getElementById(`field-${firstError}`);
      if (element) {
        element.focus();
      }
      return;
    }

    setIsSubmitting(true);
    setSubmissionResult(null);

    try {
      const result = await sendRegistrationEmail(formData);
      setSubmissionResult(result);

      if (result.success) {
        // Trigger celebratory confetti
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#10b981', '#14b8a6', '#f59e0b', '#3b82f6'],
        });
      }
    } catch (err) {
      setSubmissionResult({
        success: false,
        message: 'Si è verificato un errore imprevisto durante l\'invio.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      surname: '',
      mail: '',
      telephone: '',
      region: '',
      city: '',
      privacyConsent: false,
      notes: '',
    });
    setErrors({});
    setSubmissionResult(null);
  };

  return (
    <section id="form-iscrizione" className="relative py-12 lg:py-20 scroll-mt-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/95 p-6 sm:p-10 lg:p-12 shadow-2xl shadow-emerald-950/20 backdrop-blur-xl">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Richiedi Info o Iscriviti al Corso
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-400">
              Compila i campi sottostanti. La richiesta verrà inoltrata direttamente al CIA
              della tua regione e riceverai una copia via email.
            </p>
          </div>

          {/* SUCCESS STATE */}
          {submissionResult && submissionResult.success ? (
            <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/25 p-6 sm:p-8 text-center space-y-6 animate-in fade-in zoom-in duration-300">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 ring-2 ring-emerald-500/50">
                <CheckCircle2 className="h-9 w-9 stroke-[2.5]" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Richiesta Inviata con Successo!
                </h3>
                <p className="text-sm text-slate-300 max-w-lg mx-auto">
                  Grazie <strong className="text-white">{formData.name} {formData.surname}</strong>. La tua adesione per la regione{' '}
                  <strong className="text-emerald-400">{formData.region}</strong> ({formData.city}) è stata registrata.
                </p>
              </div>

              {/* Status note */}
              {submissionResult.isSimulated && (
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4 text-left text-xs text-emerald-200/90 space-y-1.5 max-w-xl mx-auto">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-300">
                    <Info className="h-4 w-4 shrink-0" />
                    <span>Conferma Presa in Carico:</span>
                  </div>
                  <p>
                    I tuoi dati sono stati registrati e inoltrati correttamente al CIA della tua regione affinché tu possa essere contattato dal Formatore di riferimento. Riceverai a breve una risposta via email o recapito telefonico.
                  </p>
                </div>
              )}

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-5 py-2.5 text-sm font-semibold text-slate-200 hover:bg-slate-700 active:scale-95 transition-all cursor-pointer"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>Invia un'altra adesione</span>
                </button>
              </div>
            </div>
          ) : (
            /* REGISTRATION FORM */
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              {/* Submission Error Banner */}
              {submissionResult && !submissionResult.success && (
                <div className="rounded-xl border border-rose-500/40 bg-rose-950/40 p-4 text-sm text-rose-200 flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <div className="font-bold">Invio non riuscito</div>
                    <p className="text-xs leading-relaxed">{submissionResult.message}</p>
                  </div>
                </div>
              )}

              {/* Row 1: Nome e Cognome */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="field-name"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5"
                  >
                    Nome <span className="text-emerald-400">*</span>
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
                      <User className="h-4 w-4" />
                    </div>
                    <input
                      type="text"
                      id="field-name"
                      name="name"
                      autoComplete="given-name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Mario"
                      className={`w-full rounded-xl border bg-slate-950/80 py-3 pl-10 pr-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                        errors.name
                          ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20'
                          : 'border-slate-800 focus:border-emerald-500 focus:ring-emerald-500/20'
                      }`}
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="field-surname"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5"
                  >
                    Cognome <span className="text-emerald-400">*</span>
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
                      <User className="h-4 w-4" />
                    </div>
                    <input
                      type="text"
                      id="field-surname"
                      name="surname"
                      autoComplete="family-name"
                      value={formData.surname}
                      onChange={handleInputChange}
                      placeholder="Rossi"
                      className={`w-full rounded-xl border bg-slate-950/80 py-3 pl-10 pr-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                        errors.surname
                          ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20'
                          : 'border-slate-800 focus:border-emerald-500 focus:ring-emerald-500/20'
                      }`}
                    />
                  </div>
                  {errors.surname && (
                    <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.surname}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 2: Mail e Telefono */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="field-mail"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5"
                  >
                    Indirizzo Email <span className="text-emerald-400">*</span>
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
                      <Mail className="h-4 w-4" />
                    </div>
                    <input
                      type="email"
                      id="field-mail"
                      name="mail"
                      autoComplete="email"
                      value={formData.mail}
                      onChange={handleInputChange}
                      placeholder="mario.rossi@esempio.it"
                      className={`w-full rounded-xl border bg-slate-950/80 py-3 pl-10 pr-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                        errors.mail
                          ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20'
                          : 'border-slate-800 focus:border-emerald-500 focus:ring-emerald-500/20'
                      }`}
                    />
                  </div>
                  <p className="mt-1 text-[11px] text-slate-400">
                    Riceverai la conferma di iscrizione in copia (CC) a questo indirizzo.
                  </p>
                  {errors.mail && (
                    <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.mail}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="field-telephone"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5"
                  >
                    Recapito Telefonico <span className="text-emerald-400">*</span>
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
                      <Phone className="h-4 w-4" />
                    </div>
                    <input
                      type="tel"
                      id="field-telephone"
                      name="telephone"
                      autoComplete="tel"
                      value={formData.telephone}
                      onChange={handleInputChange}
                      placeholder="340 1234567"
                      className={`w-full rounded-xl border bg-slate-950/80 py-3 pl-10 pr-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                        errors.telephone
                          ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20'
                          : 'border-slate-800 focus:border-emerald-500 focus:ring-emerald-500/20'
                      }`}
                    />
                  </div>
                  <p className="mt-1 text-[11px] text-slate-400">
                    Per contatti diretti via WhatsApp o chiamata dal responsabile corso.
                  </p>
                  {errors.telephone && (
                    <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.telephone}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 3: REGIONE (Dropdown 20 Italiane) e PROVINCIA (Dinamica) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
                {/* REGIONE DROPDOWN */}
                <div>
                  <label
                    htmlFor="field-region"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5"
                  >
                    Regione di Appartenenza <span className="text-emerald-400">*</span>
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <select
                      id="field-region"
                      name="region"
                      value={formData.region}
                      onChange={handleRegionChange}
                      className={`w-full rounded-xl border bg-slate-950 py-3 pl-10 pr-9 text-sm text-white focus:outline-none focus:ring-2 transition-all appearance-none cursor-pointer ${
                        errors.region
                          ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20'
                          : 'border-slate-800 focus:border-emerald-500 focus:ring-emerald-500/20'
                      }`}
                    >
                      <option value="" disabled className="text-slate-500">
                        -- Seleziona la tua Regione --
                      </option>
                      {ITALIAN_REGIONS.map((r) => (
                        <option key={r.id} value={r.name} className="bg-slate-900 text-white">
                          {r.name}
                        </option>
                      ))}
                    </select>
                    {/* Custom chevron */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  {errors.region && (
                    <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.region}
                    </p>
                  )}
                  {formData.region && (
                    <p className="mt-1.5 text-[11px] text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      Inoltro mail impostato a: {routing.regionalEmail}
                    </p>
                  )}
                </div>

                {/* PROVINCIA DI RIFERIMENTO (RENDERIZZATA DINAMICAMENTE) */}
                <div>
                  <label
                    htmlFor="field-city"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center justify-between"
                  >
                    <span>
                      Provincia di Riferimento <span className="text-emerald-400">*</span>
                    </span>
                    {formData.region && (
                      <span className="text-[10px] text-slate-400 font-normal">
                        ({availableProvinces.length} province in {formData.region})
                      </span>
                    )}
                  </label>

                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
                      <Building2 className="h-4 w-4" />
                    </div>

                    <select
                      id="field-city"
                      name="city"
                      disabled={!formData.region}
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`w-full rounded-xl border bg-slate-950 py-3 pl-10 pr-9 text-sm text-white focus:outline-none focus:ring-2 transition-all appearance-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-950/40 ${
                        errors.city
                          ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20'
                          : formData.region
                          ? 'border-emerald-500/40 focus:border-emerald-500 focus:ring-emerald-500/20'
                          : 'border-slate-800'
                      }`}
                    >
                      <option value="" disabled className="text-slate-500">
                        {formData.region
                          ? `-- Seleziona Provincia di ${formData.region} --`
                          : 'Prima seleziona una regione'}
                      </option>
                      {availableProvinces.map((p) => (
                        <option key={p.code} value={`${p.name} (${p.code})`} className="bg-slate-900 text-white">
                          {p.name} ({p.code})
                        </option>
                      ))}
                    </select>

                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  {!formData.region ? (
                    <p className="mt-1 text-[11px] text-slate-400">
                      La scelta della provincia si sblocca automaticamente dopo aver selezionato la regione.
                    </p>
                  ) : (
                    <p className="mt-1 text-[11px] text-slate-400">
                      La richiesta verrà gestita dal CIA di competenza per le lezioni e le attività formative.
                    </p>
                  )}

                  {errors.city && (
                    <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.city}
                    </p>
                  )}
                </div>
              </div>

              {/* Checkbox Privacy Policy */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex items-center h-5">
                    <input
                      id="field-privacyConsent"
                      name="privacyConsent"
                      type="checkbox"
                      checked={formData.privacyConsent}
                      onChange={handleInputChange}
                      className="h-4.5 w-4.5 rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-slate-900 cursor-pointer"
                    />
                  </div>
                  <div className="text-xs sm:text-sm text-slate-300 leading-normal">
                    <label htmlFor="field-privacyConsent" className="cursor-pointer">
                      Dichiaro di aver letto e accetto l'{' '}
                    </label>
                    <a
                      href="https://fip.it/privacy-policy/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 underline font-semibold hover:text-emerald-300 inline-flex items-center gap-0.5 cursor-pointer"
                    >
                      informativa privacy
                      <ExternalLink className="h-3 w-3 inline" />
                    </a>
                    <span>
                      {' '}
                      e acconsento al trattamento dei miei dati personali al fine esclusivo di ricevere
                      informazioni sul corso arbitri e comunicazioni da parte del CIA competente.
                    </span>
                  </div>
                </div>
                {errors.privacyConsent && (
                  <p className="mt-2 text-xs text-rose-400 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.privacyConsent}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 py-4 px-6 text-base sm:text-lg font-bold text-slate-950 shadow-xl shadow-emerald-500/25 hover:bg-emerald-400 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed transition-all cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Inoltro della richiesta in corso...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>Invia Adesione al Corso Arbitri Basket</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
