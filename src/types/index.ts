// ── Channel types ──────────────────────────────────────────────
export type Channel = 'whatsapp' | 'internal' | 'system' | 'email';

// ── Conversation status ────────────────────────────────────────
export type ConversationStatus = 'open' | 'waiting' | 'resolved' | 'escalated';

// ── Priority ───────────────────────────────────────────────────
export type Priority = 'low' | 'normal' | 'high' | 'urgent';

// ── User roles (internal team members) ─────────────────────────
export type UserRole = 'agent' | 'teamlead' | 'admin';

// ── User (internal team member) ────────────────────────────────
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  isOnline: boolean;
}

// ── Contact (external person: applicant, patient, etc.) ────────
export interface Contact {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  company?: string;
  avatarUrl?: string;
  tags: string[];
  notes?: string;
  /** Metadata from WhatsApp or other external sources */
  externalMeta?: Record<string, string>;
}

// ── Message ────────────────────────────────────────────────────
export type MessageType = 'inbound' | 'outbound' | 'system' | 'internal_note';

export interface Message {
  id: string;
  conversationId: string;
  type: MessageType;
  channel: Channel;
  content: string;
  senderId: string;
  senderName: string;
  timestamp: string; // ISO 8601
  /** For system messages: the automation source, e.g. "n8n", "system" */
  automationSource?: string;
  /** Attachments placeholder for future use */
  attachments?: Attachment[];
  /** Template id if sent from a quick reply */
  templateId?: string;
}

export interface Attachment {
  id: string;
  name: string;
  type: string;
  url: string;
  size: number;
}

// ── Presence ───────────────────────────────────────────────────
export type PresenceState = 'viewing' | 'composing';

export interface ConversationPresence {
  userId: string;
  userName: string;
  state: PresenceState;
  since: string; // ISO 8601
}

// ── Conversation ───────────────────────────────────────────────
export interface Conversation {
  id: string;
  /** Display title – contact name or group name */
  title: string;
  channel: Channel;
  status: ConversationStatus;
  priority: Priority;
  contactId: string;
  contact: Contact;
  /** Assigned internal user */
  assigneeId?: string;
  assignee?: User;
  /** Live presence: who is viewing or composing in this conversation */
  presence: ConversationPresence[];
  tags: string[];
  unreadCount: number;
  lastMessage: Pick<Message, 'content' | 'timestamp' | 'type' | 'senderName'>;
  createdAt: string;
  updatedAt: string;
  /** Internal notes count (badge) */
  internalNotesCount: number;
  /** Whether n8n or automation has flagged this conversation */
  automationFlag?: string;
}

// ── Quick Reply Template ───────────────────────────────────────
export interface QuickReplyTemplate {
  id: string;
  title: string;
  content: string;
  channel?: Channel;
}

// ── Filter state for inbox ─────────────────────────────────────
export type InboxFilter = 'all' | 'unread' | 'assigned' | 'whatsapp' | 'internal' | 'escalated';
