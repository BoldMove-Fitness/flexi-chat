import { AppShell } from './components/layout/AppShell';
import { InboxPanel } from './components/inbox/InboxPanel';
import { ChatArea } from './components/chat/ChatArea';
import { useConversations } from './hooks/useConversations';
import { CURRENT_USER } from './data/mock/users';

export default function App() {
  const {
    conversations,
    activeConversation,
    activeMessages,
    activeId,
    currentUserId,
    selectConversation,
    sendMessage,
    sendNote,
  } = useConversations();

  return (
    <AppShell
      currentUser={CURRENT_USER}
      sidebar={
        <InboxPanel
          conversations={conversations}
          activeId={activeId}
          currentUserId={currentUserId}
          onSelect={selectConversation}
        />
      }
      main={
        <ChatArea
          conversation={activeConversation}
          messages={activeMessages}
          currentUserId={currentUserId}
          onSendMessage={sendMessage}
          onSendNote={sendNote}
        />
      }
    />
  );
}
