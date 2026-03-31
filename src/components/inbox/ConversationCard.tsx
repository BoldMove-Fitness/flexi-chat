import type { Conversation } from '../../types';
import { Avatar } from '../shared/Avatar';
import { ChannelIcon } from '../shared/ChannelIcon';
import { StatusBadge } from '../shared/StatusBadge';
import { UnreadBadge } from '../shared/UnreadBadge';
import { PresenceIndicator } from '../shared/PresenceIndicator';

interface ConversationCardProps {
  conversation: Conversation;
  isActive: boolean;
  currentUserId: string;
  onClick: () => void;
}

function formatTime(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
  }
  if (diffDays === 1) return 'Gestern';
  if (diffDays < 7) {
    return date.toLocaleDateString('de-DE', { weekday: 'short' });
  }
  return date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' });
}

export function ConversationCard({ conversation, isActive, currentUserId, onClick }: ConversationCardProps) {
  const { contact, lastMessage, unreadCount, channel, status, priority, assignee, tags, presence } = conversation;
  const hasUnread = unreadCount > 0;

  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3 border-b border-surface-800/50 transition-colors group ${
        isActive
          ? 'bg-surface-800/80 border-l-2 border-l-gold-500'
          : 'hover:bg-surface-800/40 border-l-2 border-l-transparent'
      }`}
    >
      <div className="flex gap-3">
        {/* Avatar */}
        <Avatar name={contact.name} size="md" />

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Row 1: Name + Time */}
          <div className="flex items-center justify-between gap-2 mb-0.5">
            <span
              className={`text-sm truncate ${
                hasUnread ? 'font-semibold text-surface-100' : 'font-medium text-surface-300'
              }`}
            >
              {contact.name}
            </span>
            <span className="text-[11px] text-surface-500 shrink-0">
              {formatTime(lastMessage.timestamp)}
            </span>
          </div>

          {/* Row 2: Channel + Status */}
          <div className="flex items-center gap-2 mb-1">
            <ChannelIcon channel={channel} size={12} />
            <StatusBadge status={status} />
            {priority === 'urgent' && (
              <span className="text-[10px] font-bold text-red-400 uppercase tracking-wide">
                Dringend
              </span>
            )}
            {priority === 'high' && (
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wide">
                Hoch
              </span>
            )}
          </div>

          {/* Row 3: Last message preview */}
          <div className="flex items-center justify-between gap-2">
            <p
              className={`text-xs truncate ${
                hasUnread ? 'text-surface-300' : 'text-surface-500'
              }`}
            >
              {lastMessage.type === 'outbound' && (
                <span className="text-surface-500">Du: </span>
              )}
              {lastMessage.content}
            </p>
            <UnreadBadge count={unreadCount} />
          </div>

          {/* Row 4: Tags + Assignee */}
          {(tags.length > 0 || assignee) && (
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              {tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] px-1.5 py-0.5 rounded bg-surface-800 text-surface-400"
                >
                  {tag}
                </span>
              ))}
              {tags.length > 2 && (
                <span className="text-[10px] text-surface-500">
                  +{tags.length - 2}
                </span>
              )}
              {assignee && (
                <span className="text-[10px] text-gold-600 ml-auto truncate">
                  {assignee.name}
                </span>
              )}
            </div>
          )}

          {/* Row 5: Presence */}
          <PresenceIndicator presence={presence} variant="compact" excludeUserId={currentUserId} />
        </div>
      </div>
    </button>
  );
}
