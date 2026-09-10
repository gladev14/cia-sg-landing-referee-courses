import emailjs from '@emailjs/browser';
import { EMAILJS_ROUTING_CONFIG, getRecipientsForRegion } from '../config/emailRouting';
import { EmailJsParams, RegistrationFormData, SubmissionResult } from '../types';

// Chiave pubblica salvabile da localStorage o da variabile d'ambiente VITE_EMAILJS_PUBLIC_KEY
export const getStoredPublicKey = (): string => {
  if (typeof window !== 'undefined') {
    const local = localStorage.getItem('emailjs_public_key');
    if (local && local.trim()) return local.trim();
  }
  return (import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined)?.trim() || '';
};

export const setStoredPublicKey = (key: string) => {
  if (typeof window !== 'undefined') {
    if (key.trim()) {
      localStorage.setItem('emailjs_public_key', key.trim());
    } else {
      localStorage.removeItem('emailjs_public_key');
    }
  }
};

/**
 * Invia l'adesione tramite EmailJS
 * Parametri richiesti: region, name, surname, city, mail, telephone
 * Snippet: emailjs.send("service_fox1908", "template_5hy8zkd", templateParams)
 */
export async function sendRegistrationEmail(
  formData: RegistrationFormData,
  overridePublicKey?: string
): Promise<SubmissionResult> {
  const { regionalEmail, adminEmail } = getRecipientsForRegion(formData.region);
  const activePublicKey = (overridePublicKey || getStoredPublicKey()).trim();

  // Parametri esatti richiesti da EmailJS
  const templateParams: EmailJsParams = {
    region: formData.region,
    name: formData.name.trim(),
    surname: formData.surname.trim(),
    city: formData.city.trim(),
    mail: formData.mail.trim().toLowerCase(),
    telephone: formData.telephone.trim(),
    // Parametri aggiuntivi utili per il routing dinamico configurato sul pannello EmailJS
    to_email: regionalEmail,
    admin_email: adminEmail,
    cc_email: formData.mail.trim().toLowerCase(),
    regional_email: regionalEmail,
    regional_committee: `CIA ${formData.region}`,
    submitted_at: new Date().toLocaleString('it-IT', { timeZone: 'Europe/Rome' }),
  };

  // Se non c'è ancora la Public Key impostata, eseguiamo una simulazione guidata
  // che mostra esattamente il payload inviato e come impostare la chiave per Vercel
  if (!activePublicKey) {
    console.info(
      '[EmailJS] Nessuna Public Key impostata. Simulazione invio riuscita con payload:',
      templateParams
    );
    // Simuliamo un leggero delay di rete realistico
    await new Promise((resolve) => setTimeout(resolve, 900));

    return {
      success: true,
      isSimulated: true,
      message:
        'Adesione simulata con successo! I dati sono pronti per essere inviati. Per attivare l\'invio reale via EmailJS, inserisci la tua Public Key nelle impostazioni o imposta VITE_EMAILJS_PUBLIC_KEY su Vercel.',
      details: {
        recipientRegional: regionalEmail,
        recipientAdmin: adminEmail,
        recipientUserCc: formData.mail,
        paramsSent: templateParams,
      },
    };
  }

  try {
    const response = await emailjs.send(
      EMAILJS_ROUTING_CONFIG.serviceId,
      EMAILJS_ROUTING_CONFIG.templateId,
      templateParams as unknown as Record<string, unknown>,
      {
        publicKey: activePublicKey,
      }
    );

    return {
      success: true,
      isSimulated: false,
      message: `Richiesta inviata con successo! (Status: ${response.status} - ${response.text})`,
      details: {
        recipientRegional: regionalEmail,
        recipientAdmin: adminEmail,
        recipientUserCc: formData.mail,
        paramsSent: templateParams,
      },
    };
  } catch (error: unknown) {
    console.error('[EmailJS Send Error]', error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : typeof error === 'object' && error !== null && 'text' in error
        ? String((error as { text: unknown }).text)
        : 'Errore di connessione a EmailJS.';

    return {
      success: false,
      isSimulated: false,
      message: `Errore durante l'invio della mail: ${errorMessage}. Verifica che la Public Key, il serviceId (${EMAILJS_ROUTING_CONFIG.serviceId}) e il templateId (${EMAILJS_ROUTING_CONFIG.templateId}) siano attivi nel pannello EmailJS.`,
      details: {
        recipientRegional: regionalEmail,
        recipientAdmin: adminEmail,
        recipientUserCc: formData.mail,
        paramsSent: templateParams,
      },
    };
  }
}
