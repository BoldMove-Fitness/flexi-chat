import { useState, useCallback, useMemo } from 'react';
import type { Conversation, Message } from '../types';
import { MOCK_CONVERSATIONS, MOCK_MESSAGES } from '../data/mock';
import { CURRENT_USER } from '../data/mock/users';

export function useConversations() {
  const [conversations, setConversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);
  const [messages, setMessages] = useState<Record<string, Message[]>>(MOCK_MESSAGES);
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeConversation = useMemo(
    () => conversations.find((c) => c.id === activeId) ?? null,
    [conversations, activeId]
  );

  const activeMessages = useMemo(
    () => (activeId ? messages[activeId] ?? [] : []),
    [messages, activeId]
  );

  const selectConversation = useCallback((id: string) => {
    const previousId = activeId;

    setActiveId(id);

    setConversations((prev) =>
      prev.map((c) => {
        // Remove current user's presence from previously active conversation
        if (c.id === previousId && previousId !== id) {
          return {
            ...c,
            presence: c.presence.filter((p) => p.userId !== CURRENT_USER.id),
          };
        }
        // Add current user as viewer to newly selected conversation + mark read
        if (c.id === id) {
          const alreadyPresent = c.presence.some((p) => p.userId === CURRENT_USER.id);
          return {
            ...c,
            unreadCount: 0,
            presence: alreadyPresent
              ? c.presence
              : [
                  ...c.presence,
                  {
                    userId: CURRENT_USER.id,
                    userName: CURRENT_USER.name,
                    state: 'viewing' as const,
                    since: new Date().toISOString(),
                  },
                ],
          };
        }
        return c;
      })
    );
  }, [activeId]);

  const sendMessage = useCallback(
    (content: string) => {
      if (!activeId) return;

      const newMsg: Message = {
        id: `msg-${Date.now()}`,
        conversationId: activeId,
        type: 'outbound',
        channel: activeConversation?.channel ?? 'internal',
        content,
        senderId: CURRENT_USER.id,
        senderName: CURRENT_USER.name,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => ({
        ...prev,
        [activeId]: [...(prev[activeId] ?? []), newMsg],
      }));

      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeId
            ? {
                ...c,
                lastMessage: {
                  content,
                  timestamp: newMsg.timestamp,
                  type: 'outbound',
                  senderName: CURRENT_USER.name,
                },
                updatedAt: newMsg.timestamp,
              }
            : c
        )
      );
    },
    [activeId, activeConversation]
  );

  const sendNote = useCallback(
    (content: string) => {
      if (!activeId) return;

      const newNote: Message = {
        id: `note-${Date.now()}`,
        conversationId: activeId,
        type: 'internal_note',
        channel: 'internal',
        content,
        senderId: CURRENT_USER.id,
        senderName: CURRENT_USER.name,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => ({
        ...prev,
        [activeId]: [...(prev[activeId] ?? []), newNote],
      }));

      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeId
            ? { ...c, internalNotesCount: c.internalNotesCount + 1 }
            : c
        )
      );
    },
    [activeId]
  );

  // Sort conversations: unread + recent first
  const sortedConversations = useMemo(() => {
    return [...conversations].sort((a, b) => {
      // Escalated first
      if (a.status === 'escalated' && b.status !== 'escalated') return -1;
      if (b.status === 'escalated' && a.status !== 'escalated') return 1;
      // Then by unread
      if (a.unreadCount > 0 && b.unreadCount === 0) return -1;
      if (b.unreadCount > 0 && a.unreadCount === 0) return 1;
      // Then by date
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
  }, [conversations]);

  return {
    conversations: sortedConversations,
    activeConversation,
    activeMessages,
    activeId,
    currentUserId: CURRENT_USER.id,
    selectConversation,
    sendMessage,
    sendNote,
  };
}
