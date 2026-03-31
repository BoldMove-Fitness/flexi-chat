interface UnreadBadgeProps {
  count: number;
}

export function UnreadBadge({ count }: UnreadBadgeProps) {
  if (count <= 0) return null;

  return (
    <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-gold-500 text-surface-950 text-[11px] font-bold">
      {count > 99 ? '99+' : count}
    </span>
  );
}
