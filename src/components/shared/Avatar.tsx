interface AvatarProps {
  name: string;
  avatarUrl?: string;
  size?: 'sm' | 'md' | 'lg';
  isOnline?: boolean;
}

const SIZE_MAP = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
} as const;

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function getColor(name: string): string {
  const colors = [
    'bg-gold-600', 'bg-amber-700', 'bg-emerald-700',
    'bg-sky-700', 'bg-violet-700', 'bg-rose-700',
    'bg-teal-700', 'bg-orange-700',
  ];
  let hash = 0;
  for (const ch of name) hash = ch.charCodeAt(0) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length]!;
}

export function Avatar({ name, avatarUrl, size = 'md', isOnline }: AvatarProps) {
  return (
    <div className="relative shrink-0">
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={name}
          className={`${SIZE_MAP[size]} rounded-full object-cover`}
        />
      ) : (
        <div
          className={`${SIZE_MAP[size]} ${getColor(name)} rounded-full flex items-center justify-center font-semibold text-white select-none`}
        >
          {getInitials(name)}
        </div>
      )}
      {isOnline !== undefined && (
        <span
          className={`absolute bottom-0 right-0 block w-2.5 h-2.5 rounded-full ring-2 ring-surface-900 ${
            isOnline ? 'bg-emerald-400' : 'bg-surface-500'
          }`}
        />
      )}
    </div>
  );
}
