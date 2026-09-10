import { getRecipientsForRegion } from '../config/emailRouting';
import { CourseInfoRequestPayload, RegistrationFormData, SubmissionResult } from '../types';

export const DEFAULT_BACKEND_BASE_URI = 'https://corsiarbitri-fip-be.vercel.app';
export const DEFAULT_BACKEND_ENDPOINT = '/api/sendCourseInfoRequest';

export const getBackendBaseUri = (): string => {
  if (typeof window !== 'undefined') {
    const local = localStorage.getItem('backend_base_uri');
    if (local && local.trim()) return local.trim();
  }
  return (import.meta.env.VITE_BACKEND_BASE_URI as string | undefined)?.trim() || DEFAULT_BACKEND_BASE_URI;
};

export const setBackendBaseUri = (uri: string) => {
  if (typeof window !== 'undefined') {
    if (uri.trim()) {
      localStorage.setItem('backend_base_uri', uri.trim());
    } else {
      localStorage.removeItem('backend_base_uri');
    }
  }
};

export const getBackendEndpointUrl = (): string => {
  const base = getBackendBaseUri().replace(/\/+$/, '');
  const path = DEFAULT_BACKEND_ENDPOINT.startsWith('/') ? DEFAULT_BACKEND_ENDPOINT : `/${DEFAULT_BACKEND_ENDPOINT}`;
  return `${base}${path}`;
};

// Recupero della chiave API amministratore da localStorage o da variabili di ambiente (VITE_ADMIN_API_KEY o ADMIN_API_KEY)
export const getAdminApiKey = (): string => {
  if (typeof window !== 'undefined') {
    const local = localStorage.getItem('admin_api_key');
    if (local && local.trim()) return local.trim();
  }
  const viteKey = (import.meta.env.VITE_ADMIN_API_KEY as string | undefined)?.trim();
  if (viteKey) return viteKey;

  const rawEnvKey = ((import.meta.env as Record<string, string | undefined>)?.ADMIN_API_KEY as string | undefined)?.trim();
  if (rawEnvKey) return rawEnvKey;

  return '';
};

export const setAdminApiKey = (key: string) => {
  if (typeof window !== 'undefined') {
    if (key.trim()) {
      localStorage.setItem('admin_api_key', key.trim());
    } else {
      localStorage.removeItem('admin_api_key');
    }
  }
};

/**
 * Genera gli header HTTP per la chiamata backend con Content-Type e
 * supporto agli Header di Autorizzazione:
 * - Authorization: Bearer <ADMIN_API_KEY>
 * - x-api-key: <ADMIN_API_KEY>
 */
export const buildRequestHeaders = (): Record<string, string> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  const adminApiKey = getAdminApiKey();
  if (adminApiKey) {
    headers['Authorization'] = `Bearer ${adminApiKey}`;
    headers['x-api-key'] = adminApiKey;
  }

  return headers;
};

// Retrocompatibilità per eventuali riferimenti a chiavi pubbliche EmailJS
export const getStoredPublicKey = (): string => '';
export const setStoredPublicKey = (_key: string) => {};

/**
 * Invia la richiesta di adesione / info corso al servizio backend custom:
 * Base URI: https://corsiarbitri-fip-be.vercel.app
 * Endpoint: /api/sendCourseInfoRequest
 * Metodo HTTP: POST
 * Header Obbligatorio: Content-Type: application/json
 * Header di Autorizzazione: Authorization: Bearer <ADMIN_API_KEY>, x-api-key: <ADMIN_API_KEY>
 */
export async function sendRegistrationEmail(
  formData: RegistrationFormData
): Promise<SubmissionResult> {
  const { regionalEmail, adminEmail } = getRecipientsForRegion(formData.region);

  // Payload JSON completo richiesto dal backend custom
  const payload: CourseInfoRequestPayload = {
    region: formData.region,
    name: formData.name.trim(),
    surname: formData.surname.trim(),
    city: formData.city.trim(),
    mail: formData.mail.trim().toLowerCase(),
    telephone: formData.telephone.trim(),
    // Parametri di configurazione routing
    recipient: regionalEmail,
    coordinator: adminEmail,
    to_email: regionalEmail,
    admin_email: adminEmail,
    cc_email: formData.mail.trim().toLowerCase(),
    regional_email: regionalEmail,
    regional_committee: `CIA ${formData.region}`,
    submitted_at: new Date().toLocaleString('it-IT', { timeZone: 'Europe/Rome' }),
  };

  const baseUri = getBackendBaseUri().replace(/\/+$/, '');
  let endpointPath = (import.meta.env.VITE_BACKEND_API_PATH as string | undefined)?.trim() || DEFAULT_BACKEND_ENDPOINT;
  let endpointUrl = `${baseUri}${endpointPath.startsWith('/') ? endpointPath : `/${endpointPath}`}`;

  const headers = buildRequestHeaders();

  try {
    let response = await fetch(endpointUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    // Se l'endpoint primario restituisce 404, tenta automaticamente l'endpoint alternativo kebab-case
    if (response.status === 404 && endpointPath === DEFAULT_BACKEND_ENDPOINT) {
      const fallbackUrl = `${baseUri}/api/send-course-info-request`;
      try {
        const fallbackResponse = await fetch(fallbackUrl, {
          method: 'POST',
          headers,
          body: JSON.stringify(payload),
        });
        if (fallbackResponse.status !== 404) {
          response = fallbackResponse;
          endpointUrl = fallbackUrl;
        }
      } catch {
        // prosegui con la risposta originale
      }
    }

    let responseData: unknown = null;
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      try {
        responseData = await response.json();
      } catch {
        // ignora errore parsing JSON
      }
    } else {
      try {
        responseData = await response.text();
      } catch {
        // ignora errore parsing testo
      }
    }

    if (!response.ok) {
      const respObj = typeof responseData === 'object' && responseData !== null ? (responseData as Record<string, unknown>) : null;
      const errorDetail =
        (respObj && (respObj.message || respObj.error)) ||
        (typeof responseData === 'string' && responseData.trim()) ||
        `Errore HTTP ${response.status} (${response.statusText})`;

      console.error('[Backend API Error]', response.status, errorDetail);

      return {
        success: false,
        isSimulated: false,
        message: `Il server ha restituito un errore: ${errorDetail}`,
        details: {
          recipientRegional: regionalEmail,
          recipientAdmin: adminEmail,
          recipientUserCc: formData.mail,
          paramsSent: payload,
          status: response.status,
          endpoint: endpointUrl,
        },
      };
    }

    const respObj = typeof responseData === 'object' && responseData !== null ? (responseData as Record<string, unknown>) : null;
    const successMessage =
      (respObj && (respObj.message || respObj.status)) ||
      'Richiesta inviata con successo!';

    return {
      success: true,
      isSimulated: false,
      message: String(successMessage),
      details: {
        recipientRegional: regionalEmail,
        recipientAdmin: adminEmail,
        recipientUserCc: formData.mail,
        paramsSent: payload,
        status: response.status,
        endpoint: endpointUrl,
      },
    };
  } catch (error: unknown) {
    console.error('[Backend API Connection Error]', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Errore di connessione di rete.';

    return {
      success: false,
      isSimulated: false,
      message: `Impossibile raggiungere il server (${endpointUrl}): ${errorMessage}. Verifica la connessione di rete o i permessi CORS del backend.`,
      details: {
        recipientRegional: regionalEmail,
        recipientAdmin: adminEmail,
        recipientUserCc: formData.mail,
        paramsSent: payload,
        endpoint: endpointUrl,
      },
    };
  }
}
