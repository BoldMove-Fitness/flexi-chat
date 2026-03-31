import type { ReactNode } from 'react';
import { Header } from './Header';
import type { User } from '../../types';

interface AppShellProps {
  currentUser: User;
  sidebar: ReactNode;
  main: ReactNode;
  detail?: ReactNode;
}

export function AppShell({ currentUser, sidebar, main, detail }: AppShellProps) {
  return (
    <div className="h-screen flex flex-col bg-surface-950 overflow-hidden">
      <Header currentUser={currentUser} />
      <div className="flex flex-1 min-h-0">
        {/* Inbox sidebar */}
        <aside className="w-[380px] border-r border-surface-800 flex flex-col shrink-0 bg-surface-950">
          {sidebar}
        </aside>

        {/* Main chat area */}
        <main className="flex-1 flex flex-col min-w-0 bg-surface-900">
          {main}
        </main>

        {/* Optional detail panel – prepared for future use */}
        {detail && (
          <aside className="w-[340px] border-l border-surface-800 flex flex-col shrink-0 bg-surface-950">
            {detail}
          </aside>
        )}
      </div>
    </div>
  );
}
