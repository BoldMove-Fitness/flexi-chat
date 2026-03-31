import { Eye, PenLine } from 'lucide-react';
import type { ConversationPresence } from '../../types';

interface PresenceIndicatorProps {
  presence: ConversationPresence[];
  /** Compact mode for inbox cards, full mode for chat header */
  variant?: 'compact' | 'full';
  /** Hide presence entries for this user (typically the current user) */
  excludeUserId?: string;
}

export function PresenceIndicator({ presence, variant = 'compact', excludeUserId }: PresenceIndicatorProps) {
  const visible = excludeUserId
    ? presence.filter((p) => p.userId !== excludeUserId)
    : presence;

  if (visible.length === 0) return null;

  const composers = visible.filter((p) => p.state === 'composing');
  const viewers = visible.filter((p) => p.state === 'viewing');

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-2 mt-1">
        {composers.map((p) => (
          <span key={p.userId} className="inline-flex items-center gap-1 text-[10px] text-emerald-400">
            <PenLine size={10} className="shrink-0" />
            <span className="truncate">{p.userName} schreibt</span>
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
            </span>
          </span>
        ))}
        {viewers.map((p) => (
          <span key={p.userId} className="inline-flex items-center gap-1 text-[10px] text-sky-400">
            <Eye size={10} className="shrink-0" />
            <span className="truncate">{p.userName}</span>
          </span>
        ))}
      </div>
    );
  }

  // Full variant for chat header
  return (
    <div className="flex items-center gap-3">
      {composers.map((p) => (
        <span
          key={p.userId}
          className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-900/30 border border-emerald-800/40 text-[11px] text-emerald-400 font-medium"
        >
          <PenLine size={11} className="shrink-0" />
          {p.userName} schreibt
          <span className="relative flex h-1.5 w-1.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
          </span>
        </span>
      ))}
      {viewers.map((p) => (
        <span
          key={p.userId}
          className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-sky-900/25 border border-sky-800/30 text-[11px] text-sky-400 font-medium"
        >
          <Eye size={11} className="shrink-0" />
          {p.userName} sieht zu
        </span>
      ))}
    </div>
  );
}
