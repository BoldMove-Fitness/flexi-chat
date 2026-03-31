import { Settings, Bell, HelpCircle } from 'lucide-react';
import { Avatar } from '../shared/Avatar';
import type { User } from '../../types';

interface HeaderProps {
  currentUser: User;
}

export function Header({ currentUser }: HeaderProps) {
  return (
    <header className="h-14 border-b border-surface-800 bg-surface-950 flex items-center justify-between px-5 shrink-0">
      {/* Left: Brand */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gold-500 flex items-center justify-center">
          <span className="text-surface-950 font-bold text-sm">F</span>
        </div>
        <div>
          <h1 className="text-sm font-semibold text-surface-100 leading-tight">
            FlexiHolding Chat
          </h1>
          <p className="text-[11px] text-surface-500 leading-tight">
            Operations Inbox
          </p>
        </div>
      </div>

      {/* Right: Actions + User */}
      <div className="flex items-center gap-1">
        <button
          className="p-2 rounded-lg text-surface-400 hover:text-surface-200 hover:bg-surface-800 transition-colors"
          title="Benachrichtigungen"
        >
          <Bell size={18} />
        </button>
        <button
          className="p-2 rounded-lg text-surface-400 hover:text-surface-200 hover:bg-surface-800 transition-colors"
          title="Hilfe"
        >
          <HelpCircle size={18} />
        </button>
        <button
          className="p-2 rounded-lg text-surface-400 hover:text-surface-200 hover:bg-surface-800 transition-colors"
          title="Einstellungen"
        >
          <Settings size={18} />
        </button>
        <div className="ml-2 pl-3 border-l border-surface-800">
          <Avatar name={currentUser.name} size="sm" isOnline={currentUser.isOnline} />
        </div>
      </div>
    </header>
  );
}
