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

export interface CourseInfoRequestPayload {
  region: string;
  name: string;
  surname: string;
  city: string;
  mail: string;
  telephone: string;
  recipient: string;
  coordinator: string;
  to_email: string;
  admin_email: string;
  cc_email: string;
  regional_email: string;
  regional_committee: string;
  submitted_at: string;
}

// Alias for backward compatibility
export type EmailJsParams = CourseInfoRequestPayload;

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
    paramsSent: CourseInfoRequestPayload;
    status?: number;
    endpoint?: string;
  };
}
