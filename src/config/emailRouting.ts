/**
 * Configurazione per il Routing Email e Integrazione EmailJS
 * 
 * I parametri attesi dal template EmailJS sono:
 * - region
 * - name
 * - surname
 * - city
 * - mail
 * - telephone
 * 
 * Snippet ufficiale di invio:
 * emailjs.send("service_fox1908", "template_5hy8zkd", templateParams, publicKey);
 */

import { ITALIAN_REGIONS } from './regions';

export interface EmailRoutingConfig {
  serviceId: string;
  templateId: string;
  centralAdminEmail: string;
  regionalEmails: Record<string, string>;
}

export const EMAILJS_ROUTING_CONFIG: EmailRoutingConfig = {
  // Service ID e Template ID forniti nel prompt utente
  serviceId: 'service_fox1908',
  templateId: 'template_5hy8zkd',

  // Email dell'amministratore centrale a cui inviare la notifica di nuova adesione
  centralAdminEmail: 'amministrazione@corsiarbitri.it',

  // Routing dei destinatari per ciascuna delle 20 Regioni italiane
  // Modificabili in base alle sezioni/comitati regionali effettivi
  regionalEmails: {
    'Abruzzo': 'abruzzo@corsiarbitri.it',
    'Basilicata': 'basilicata@corsiarbitri.it',
    'Calabria': 'calabria@corsiarbitri.it',
    'Campania': 'campania@corsiarbitri.it',
    'Emilia-Romagna': 'emiliaromagna@corsiarbitri.it',
    'Friuli-Venezia Giulia': 'friulivg@corsiarbitri.it',
    'Lazio': 'lazio@corsiarbitri.it',
    'Liguria': 'liguria@corsiarbitri.it',
    'Lombardia': 'lombardia@corsiarbitri.it',
    'Marche': 'marche@corsiarbitri.it',
    'Molise': 'molise@corsiarbitri.it',
    'Piemonte': 'piemonte@corsiarbitri.it',
    'Puglia': 'puglia@corsiarbitri.it',
    'Sardegna': 'sardegna@corsiarbitri.it',
    'Sicilia': 'sicilia@corsiarbitri.it',
    'Toscana': 'toscana@corsiarbitri.it',
    'Trentino-Alto Adige': 'trentinoaltoadige@corsiarbitri.it',
    'Umbria': 'umbria@corsiarbitri.it',
    "Valle d'Aosta": 'valledaosta@corsiarbitri.it',
    'Veneto': 'veneto@corsiarbitri.it',
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
