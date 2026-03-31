import type { Channel, ConversationStatus, Priority, InboxFilter } from './index';

// ── Channel display config ─────────────────────────────────────
export const CHANNEL_CONFIG: Record<Channel, { label: string; color: string }> = {
  whatsapp:  { label: 'WhatsApp', color: '#25D366' },
  internal:  { label: 'Intern',   color: '#A88762' },
  system:    { label: 'System',   color: '#6B7280' },
  email:     { label: 'E-Mail',   color: '#3B82F6' },
};

// ── Status display config ──────────────────────────────────────
export const STATUS_CONFIG: Record<ConversationStatus, { label: string; color: string; bgColor: string }> = {
  open:      { label: 'Offen',     color: '#22C55E', bgColor: 'rgba(34,197,94,0.15)' },
  waiting:   { label: 'Wartet',    color: '#F59E0B', bgColor: 'rgba(245,158,11,0.15)' },
  resolved:  { label: 'Erledigt',  color: '#6B7280', bgColor: 'rgba(107,114,128,0.15)' },
  escalated: { label: 'Eskaliert', color: '#EF4444', bgColor: 'rgba(239,68,68,0.15)' },
};

// ── Priority display config ────────────────────────────────────
export const PRIORITY_CONFIG: Record<Priority, { label: string; color: string }> = {
  low:    { label: 'Niedrig', color: '#6B7280' },
  normal: { label: 'Normal',  color: '#A88762' },
  high:   { label: 'Hoch',    color: '#F59E0B' },
  urgent: { label: 'Dringend', color: '#EF4444' },
};

// ── Inbox filter tabs ──────────────────────────────────────────
export const INBOX_FILTERS: { key: InboxFilter; label: string }[] = [
  { key: 'all',       label: 'Alle' },
  { key: 'unread',    label: 'Ungelesen' },
  { key: 'assigned',  label: 'Zugewiesen' },
  { key: 'whatsapp',  label: 'WhatsApp' },
  { key: 'internal',  label: 'Intern' },
  { key: 'escalated', label: 'Eskaliert' },
];

// ── Predefined tags ────────────────────────────────────────────
export const AVAILABLE_TAGS = [
  'Bewerbung',
  'Patient',
  'Mitarbeiter',
  'Interessent',
  'Dringend',
  'Rückruf',
  'Vertrag',
  'Onboarding',
  'Beschwerde',
  'Lob',
] as const;
