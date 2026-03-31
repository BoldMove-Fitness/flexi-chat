import { useState, useMemo } from 'react';
import { Inbox } from 'lucide-react';
import type { Conversation, InboxFilter } from '../../types';
import { InboxSearch } from './InboxSearch';
import { InboxFilters } from './InboxFilters';
import { ConversationCard } from './ConversationCard';
import { EmptyState } from '../shared/EmptyState';

interface InboxPanelProps {
  conversations: Conversation[];
  activeId: string | null;
  currentUserId: string;
  onSelect: (id: string) => void;
}

export function InboxPanel({ conversations, activeId, currentUserId, onSelect }: InboxPanelProps) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<InboxFilter>('all');

  const filtered = useMemo(() => {
    let result = conversations;

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.contact.name.toLowerCase().includes(q) ||
          c.lastMessage.content.toLowerCase().includes(q) ||
          c.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Filter
    switch (filter) {
      case 'unread':
        result = result.filter((c) => c.unreadCount > 0);
        break;
      case 'assigned':
        result = result.filter((c) => c.assigneeId);
        break;
      case 'whatsapp':
        result = result.filter((c) => c.channel === 'whatsapp');
        break;
      case 'internal':
        result = result.filter((c) => c.channel === 'internal');
        break;
      case 'escalated':
        result = result.filter((c) => c.status === 'escalated');
        break;
    }

    return result;
  }, [conversations, search, filter]);

  const counts: Partial<Record<InboxFilter, number>> = useMemo(() => ({
    all: conversations.length,
    unread: conversations.filter((c) => c.unreadCount > 0).length,
    assigned: conversations.filter((c) => c.assigneeId).length,
    whatsapp: conversations.filter((c) => c.channel === 'whatsapp').length,
    internal: conversations.filter((c) => c.channel === 'internal').length,
    escalated: conversations.filter((c) => c.status === 'escalated').length,
  }), [conversations]);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 space-y-3 shrink-0">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-surface-100">Inbox</h2>
          <span className="text-xs text-surface-500">
            {filtered.length} Konversation{filtered.length !== 1 ? 'en' : ''}
          </span>
        </div>
        <InboxSearch value={search} onChange={setSearch} />
        <InboxFilters active={filter} onChange={setFilter} counts={counts} />
      </div>

      {/* Conversation list */}
      <div className="flex-1 overflow-y-auto">
        {filtered.length > 0 ? (
          filtered.map((conv) => (
            <ConversationCard
              key={conv.id}
              conversation={conv}
              isActive={activeId === conv.id}
              currentUserId={currentUserId}
              onClick={() => onSelect(conv.id)}
            />
          ))
        ) : (
          <EmptyState
            icon={Inbox}
            title="Keine Konversationen"
            description={
              search || filter !== 'all'
                ? 'Versuche andere Suchbegriffe oder Filter.'
                : 'Noch keine Konversationen vorhanden.'
            }
          />
        )}
      </div>
    </div>
  );
}
