export interface RegistrationFormData {
  name: string;
  surname: string;
  mail: string;
  telephone: string;
  region: string;
  city: string; // Provincia di riferimento
  privacyConsent: boolean;
  birthYear?: string;
  preferredSport?: string;
  notes?: string;
}

export interface EmailJsParams {
  region: string;
  name: string;
  surname: string;
  city: string;
  mail: string;
  telephone: string;
  // Parametri di configurazione routing
  recipient: string; // Regione destinataria (email comitato CIA regionale)
  coordinator: string; // Mail dell'amministratore centrale
  // Dynamic recipient fields for routing in EmailJS templates
  to_email?: string;
  admin_email?: string;
  cc_email?: string;
  regional_email?: string;
  regional_committee?: string;
  submitted_at?: string;
}

export interface Province {
  code: string; // e.g. "MI", "RM", "NA"
  name: string; // e.g. "Milano", "Roma", "Napoli"
}

export interface RegionConfig {
  id: string;
  name: string;
  contactEmail: string;
  phone?: string;
  committeeName: string;
  provinces: Province[];
}

export interface SubmissionResult {
  success: boolean;
  message: string;
  isSimulated?: boolean;
  details?: {
    recipientRegional: string;
    recipientAdmin: string;
    recipientUserCc: string;
    paramsSent: EmailJsParams;
  };
}
