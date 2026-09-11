/**
 * Configurazione per il Servizio Backend Custom e Routing Email
 * 
 * Base URI: https://corsiarbitri-fip-be.vercel.app
 * Metodo HTTP: POST
 * Path Endpoint: /api/sendCourseInfoRequest
 * Header: Content-Type: application/json
 * 
 * Payload JSON:
 * {
 *   "region": "Lombardia",
 *   "name": "Mario",
 *   "surname": "Rossi",
 *   "city": "Milano",
 *   "mail": "mario.rossi@example.it",
 *   "telephone": "+39 340 1234567",
 *   "recipient": "lombardia@cia.example.it",
 *   "coordinator": "coordinamento.corsi@cia.example.it",
 *   "to_email": "lombardia@cia.example.it",
 *   "admin_email": "coordinamento.corsi@cia.example.it",
 *   "cc_email": "mario.rossi@example.it",
 *   "regional_email": "lombardia@cia.example.it",
 *   "regional_committee": "CIA Lombardia",
 *   "submitted_at": "10/09/2026, 12:15:30"
 * }
 */

import { ITALIAN_REGIONS } from './regions';

export interface BackendApiConfig {
  baseUrl: string;
  endpoint: string;
  serviceId?: string;
  templateId?: string;
  centralAdminEmail: string; // coordinator (mail dell'amministratore)
  regionalEmails: Record<string, string>; // recipient (regione destinataria)
}

export const BACKEND_API_CONFIG: BackendApiConfig = {
  baseUrl: 'https://corsiarbitri-fip-be.vercel.app',
  endpoint: '/api/sendCourseInfoRequest',
  serviceId: 'service_fox1908',
  templateId: 'template_5hy8zkd',

  // Email dell'amministratore centrale (coordinator)
  centralAdminEmail: '',

  // Routing dei destinatari per ciascuna delle 20 Regioni italiane (recipient)
  regionalEmails: {
    'Abruzzo': '',
    'Basilicata': '',
    'Calabria': '',
    'Campania': '',
    'Emilia-Romagna': '',
    'Friuli-Venezia Giulia': '',
    'Lazio': 'zaramassimo.mz@gmail.com',
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

// Retrocompatibilità
export const EMAILJS_ROUTING_CONFIG = BACKEND_API_CONFIG;

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
