import { Bot, StickyNote } from 'lucide-react';
import type { Message } from '../../types';

interface MessageBubbleProps {
  message: Message;
}

function formatTimestamp(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Heute';
  if (diffDays === 1) return 'Gestern';
  return d.toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' });
}

export function DateSeparator({ date }: { date: string }) {
  return (
    <div className="flex items-center gap-3 my-4">
      <div className="flex-1 h-px bg-surface-800" />
      <span className="text-[11px] text-surface-500 font-medium">{formatDate(date)}</span>
      <div className="flex-1 h-px bg-surface-800" />
    </div>
  );
}

export function MessageBubble({ message }: MessageBubbleProps) {
  // System message
  if (message.type === 'system') {
    return (
      <div className="flex justify-center my-2">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-800/60 max-w-md">
          <Bot size={12} className="text-surface-500 shrink-0" />
          <span className="text-[11px] text-surface-500">{message.content}</span>
          {message.automationSource && (
            <span className="text-[10px] text-gold-600 font-medium">
              {message.automationSource}
            </span>
          )}
        </div>
      </div>
    );
  }

  // Internal note
  if (message.type === 'internal_note') {
    return (
      <div className="flex justify-center my-2 px-4">
        <div className="w-full max-w-lg border border-gold-800/30 bg-gold-900/10 rounded-lg px-4 py-3">
          <div className="flex items-center gap-2 mb-1">
            <StickyNote size={12} className="text-gold-500" />
            <span className="text-[11px] font-semibold text-gold-500">Interne Notiz</span>
            <span className="text-[10px] text-gold-700 ml-auto">
              {message.senderName} · {formatTimestamp(message.timestamp)}
            </span>
          </div>
          <p className="text-xs text-gold-200/80 leading-relaxed">{message.content}</p>
        </div>
      </div>
    );
  }

  const isOutbound = message.type === 'outbound';

  return (
    <div className={`flex ${isOutbound ? 'justify-end' : 'justify-start'} px-4 my-1`}>
      <div className={`max-w-[70%] ${isOutbound ? 'items-end' : 'items-start'}`}>
        {/* Sender name for inbound */}
        {!isOutbound && (
          <span className="text-[11px] text-surface-500 mb-1 block ml-1">
            {message.senderName}
          </span>
        )}

        <div
          className={`rounded-2xl px-4 py-2.5 ${
            isOutbound
              ? 'bg-gold-700/25 text-surface-100 rounded-br-md'
              : 'bg-surface-800 text-surface-200 rounded-bl-md'
          }`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        </div>

        <div className={`flex items-center gap-1 mt-0.5 ${isOutbound ? 'justify-end' : 'justify-start'} px-1`}>
          <span className="text-[10px] text-surface-600">
            {formatTimestamp(message.timestamp)}
          </span>
          {isOutbound && (
            <span className="text-[10px] text-surface-600">
              · {message.senderName}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
