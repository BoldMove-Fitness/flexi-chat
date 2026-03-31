import { useEffect, useRef } from 'react';
import type { Message } from '../../types';
import { MessageBubble, DateSeparator } from './MessageBubble';

interface MessageListProps {
  messages: Message[];
}

function isSameDay(a: string, b: string): boolean {
  const da = new Date(a);
  const db = new Date(b);
  return (
    da.getFullYear() === db.getFullYear() &&
    da.getMonth() === db.getMonth() &&
    da.getDate() === db.getDate()
  );
}

export function MessageList({ messages }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  return (
    <div className="flex-1 overflow-y-auto py-4">
      {messages.map((msg, i) => {
        const prev = messages[i - 1];
        const showDate = !prev || !isSameDay(prev.timestamp, msg.timestamp);

        return (
          <div key={msg.id}>
            {showDate && <DateSeparator date={msg.timestamp} />}
            <MessageBubble message={msg} />
          </div>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
}
