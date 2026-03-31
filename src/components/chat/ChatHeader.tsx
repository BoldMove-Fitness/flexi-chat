import { Phone, MoreVertical, UserPlus, Tag } from 'lucide-react';
import type { Conversation } from '../../types';
import { Avatar } from '../shared/Avatar';
import { ChannelIcon } from '../shared/ChannelIcon';
import { StatusBadge } from '../shared/StatusBadge';
import { Badge } from '../shared/Badge';
import { PresenceIndicator } from '../shared/PresenceIndicator';
import { PRIORITY_CONFIG } from '../../types/config';

interface ChatHeaderProps {
  conversation: Conversation;
  currentUserId: string;
}

export function ChatHeader({ conversation, currentUserId }: ChatHeaderProps) {
  const { contact, channel, status, priority, assignee, tags, automationFlag, presence } = conversation;

  return (
    <div className="border-b border-surface-800 bg-surface-900 shrink-0">
      {/* Main header row */}
      <div className="h-16 flex items-center justify-between px-5">
        {/* Left */}
        <div className="flex items-center gap-3 min-w-0">
          <Avatar name={contact.name} size="md" />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-surface-100 truncate">
                {contact.name}
              </h2>
              <ChannelIcon channel={channel} size={14} showLabel />
              <StatusBadge status={status} />
              {priority !== 'normal' && priority !== 'low' && (
                <Badge variant={priority === 'urgent' ? 'danger' : 'warning'} size="sm">
                  {PRIORITY_CONFIG[priority].label}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              {assignee && (
                <span className="text-[11px] text-surface-500">
                  Zuständig: <span className="text-gold-400 font-medium">{assignee.name}</span>
                </span>
              )}
              {contact.phone && (
                <span className="text-[11px] text-surface-600">{contact.phone}</span>
              )}
              {automationFlag && (
                <Badge variant="gold" size="sm">{automationFlag}</Badge>
              )}
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1 shrink-0">
          {tags.length > 0 && (
            <div className="hidden lg:flex items-center gap-1 mr-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="muted" size="sm">{tag}</Badge>
              ))}
            </div>
          )}
          <button
            className="p-2 rounded-lg text-surface-400 hover:text-surface-200 hover:bg-surface-800 transition-colors"
            title="Tags verwalten"
          >
            <Tag size={16} />
          </button>
          <button
            className="p-2 rounded-lg text-surface-400 hover:text-surface-200 hover:bg-surface-800 transition-colors"
            title="Zuweisen"
          >
            <UserPlus size={16} />
          </button>
          <button
            className="p-2 rounded-lg text-surface-400 hover:text-surface-200 hover:bg-surface-800 transition-colors"
            title="Anrufen"
          >
            <Phone size={16} />
          </button>
          <button
            className="p-2 rounded-lg text-surface-400 hover:text-surface-200 hover:bg-surface-800 transition-colors"
            title="Weitere Aktionen"
          >
            <MoreVertical size={16} />
          </button>
        </div>
      </div>

      {/* Presence bar – only shown when others are present */}
      {presence.filter((p) => p.userId !== currentUserId).length > 0 && (
        <div className="px-5 pb-2.5 -mt-1">
          <PresenceIndicator presence={presence} variant="full" excludeUserId={currentUserId} />
        </div>
      )}
    </div>
  );
}
