interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'gold' | 'danger' | 'warning' | 'success' | 'muted';
  size?: 'sm' | 'md';
}

const VARIANT_MAP = {
  default: 'bg-surface-700 text-surface-200',
  gold: 'bg-gold-800/60 text-gold-300',
  danger: 'bg-red-900/40 text-red-400',
  warning: 'bg-amber-900/40 text-amber-400',
  success: 'bg-emerald-900/40 text-emerald-400',
  muted: 'bg-surface-800 text-surface-400',
} as const;

export function Badge({ children, variant = 'default', size = 'sm' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full font-medium whitespace-nowrap ${VARIANT_MAP[variant]} ${
        size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs'
      }`}
    >
      {children}
    </span>
  );
}
