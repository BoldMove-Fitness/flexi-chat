import { Search } from 'lucide-react';

interface InboxSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function InboxSearch({ value, onChange }: InboxSearchProps) {
  return (
    <div className="relative">
      <Search
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500 pointer-events-none"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Konversation suchen…"
        className="w-full h-9 pl-9 pr-3 rounded-lg bg-surface-800 border border-surface-700 text-sm text-surface-100 placeholder:text-surface-500 focus:outline-none focus:border-gold-600 focus:ring-1 focus:ring-gold-600/30 transition-colors"
      />
    </div>
  );
}
