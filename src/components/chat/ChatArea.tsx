import { MessageSquare } from 'lucide-react';
import type { Conversation, Message } from '../../types';
import { ChatHeader } from './ChatHeader';
import { MessageList } from './MessageList';
import { Composer } from './Composer';
import { EmptyState } from '../shared/EmptyState';

interface ChatAreaProps {
  conversation: Conversation | null;
  messages: Message[];
  currentUserId: string;
  onSendMessage: (content: string) => void;
  onSendNote: (content: string) => void;
}

export function ChatArea({ conversation, messages, currentUserId, onSendMessage, onSendNote }: ChatAreaProps) {
  if (!conversation) {
    return (
      <EmptyState
        icon={MessageSquare}
        title="Konversation auswählen"
        description="Wähle eine Konversation aus der Inbox, um den Chat zu öffnen."
      />
    );
  }

  return (
    <div className="flex flex-col h-full">
      <ChatHeader conversation={conversation} currentUserId={currentUserId} />
      <MessageList messages={messages} />
      <Composer
        onSend={onSendMessage}
        onSendNote={onSendNote}
      />
    </div>
  );
}
