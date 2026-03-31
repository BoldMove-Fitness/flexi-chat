import type { InboxFilter } from '../../types';
import { INBOX_FILTERS } from '../../types/config';

interface InboxFiltersProps {
  active: InboxFilter;
  onChange: (filter: InboxFilter) => void;
  counts?: Partial<Record<InboxFilter, number>>;
}

export function InboxFilters({ active, onChange, counts }: InboxFiltersProps) {
  return (
    <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-hide">
      {INBOX_FILTERS.map(({ key, label }) => {
        const isActive = active === key;
        const count = counts?.[key];
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              isActive
                ? 'bg-gold-700/30 text-gold-300 border border-gold-700/50'
                : 'text-surface-400 hover:text-surface-200 hover:bg-surface-800 border border-transparent'
            }`}
          >
            {label}
            {count !== undefined && count > 0 && (
              <span className={`ml-1.5 ${isActive ? 'text-gold-400' : 'text-surface-500'}`}>
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
