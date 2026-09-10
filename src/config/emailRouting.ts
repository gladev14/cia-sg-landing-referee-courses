/**
 * Configurazione per il Routing Email e Integrazione EmailJS
 * 
 * I parametri configurati e passati al template EmailJS sono:
 * - region: Regione selezionata dal richiedente
 * - name: Nome del richiedente
 * - surname: Cognome del richiedente
 * - city: Provincia o città di riferimento
 * - mail: Email del richiedente
 * - telephone: Recapito telefonico
 * - recipient: Regione destinataria (email di destinazione del comitato CIA regionale)
 * - coordinator: Mail dell'amministratore / coordinatore centrale
 * 
 * Snippet ufficiale di invio:
 * emailjs.send("service_fox1908", "template_5hy8zkd", templateParams, publicKey);
 */

import { ITALIAN_REGIONS } from './regions';

export interface EmailRoutingConfig {
  serviceId: string;
  templateId: string;
  centralAdminEmail: string; // coordinator (mail dell'amministratore)
  regionalEmails: Record<string, string>; // recipient (regione destinataria)
}

export const EMAILJS_ROUTING_CONFIG: EmailRoutingConfig = {
  // Service ID e Template ID forniti nel prompt utente
  serviceId: 'service_fox1908',
  templateId: 'template_5hy8zkd',

  // Email dell'amministratore centrale a cui inviare la notifica di nuova adesione
  centralAdminEmail: '',

  // Routing dei destinatari per ciascuna delle 20 Regioni italiane
  // Modificabili in base alle sezioni/comitati regionali effettivi
  regionalEmails: {
    'Abruzzo': '',
    'Basilicata': '',
    'Calabria': '',
    'Campania': '',
    'Emilia-Romagna': '',
    'Friuli-Venezia Giulia': '',
    'Lazio':  '',
    'Liguria': '',
    'Lombardia': 'alessandro589@hotmail.com',
    'Marche':  '',
    'Molise':  '',
    'Piemonte':  '',
    'Puglia': '',
    'Sardegna': 'gianluca.atzeni2000@gmail.com',
    'Sicilia':  '',
    'Toscana':  '',
    'Trentino-Alto Adige':  '',
    'Umbria':  '',
    "Valle d'Aosta":  '',
    'Veneto':  '',
  },
};

/**
 * Risolve gli indirizzi email di destinazione per una determinata regione
 */
export function getRecipientsForRegion(regionName: string): {
  regionalEmail: string;
  adminEmail: string;
} {
  const regEmail =
    EMAILJS_ROUTING_CONFIG.regionalEmails[regionName] ||
    ITALIAN_REGIONS.find((r) => r.name.toLowerCase() === regionName.toLowerCase())?.contactEmail ||
    EMAILJS_ROUTING_CONFIG.centralAdminEmail;

  return {
    regionalEmail: regEmail,
    adminEmail: EMAILJS_ROUTING_CONFIG.centralAdminEmail,
  };
}
