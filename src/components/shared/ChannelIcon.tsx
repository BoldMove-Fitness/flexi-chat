import { MessageCircle, Mail, Monitor, Bot } from 'lucide-react';
import type { Channel } from '../../types';
import { CHANNEL_CONFIG } from '../../types/config';

interface ChannelIconProps {
  channel: Channel;
  size?: number;
  showLabel?: boolean;
}

const ICONS: Record<Channel, React.ElementType> = {
  whatsapp: MessageCircle,
  email: Mail,
  internal: Monitor,
  system: Bot,
};

export function ChannelIcon({ channel, size = 14, showLabel = false }: ChannelIconProps) {
  const Icon = ICONS[channel];
  const config = CHANNEL_CONFIG[channel];

  return (
    <span className="inline-flex items-center gap-1" title={config.label}>
      <Icon size={size} style={{ color: config.color }} />
      {showLabel && (
        <span className="text-[11px] font-medium" style={{ color: config.color }}>
          {config.label}
        </span>
      )}
    </span>
  );
}
