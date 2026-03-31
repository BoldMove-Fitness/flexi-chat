import { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, FileText, StickyNote, Zap } from 'lucide-react';

interface ComposerProps {
  onSend: (content: string) => void;
  onSendNote?: (content: string) => void;
  disabled?: boolean;
}

export function Composer({ onSend, onSendNote, disabled }: ComposerProps) {
  const [value, setValue] = useState('');
  const [isNoteMode, setIsNoteMode] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [value]);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed) return;

    if (isNoteMode && onSendNote) {
      onSendNote(trimmed);
    } else {
      onSend(trimmed);
    }
    setValue('');
    setIsNoteMode(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-surface-800 bg-surface-900 shrink-0">
      {/* Note mode indicator */}
      {isNoteMode && (
        <div className="px-4 pt-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-t-lg bg-gold-900/20 border border-gold-800/30 border-b-0">
            <StickyNote size={12} className="text-gold-500" />
            <span className="text-[11px] text-gold-400 font-medium">Interne Notiz – nur für Team sichtbar</span>
            <button
              onClick={() => setIsNoteMode(false)}
              className="ml-auto text-[11px] text-gold-600 hover:text-gold-400"
            >
              Abbrechen
            </button>
          </div>
        </div>
      )}

      <div className="flex items-end gap-2 p-4 pt-3">
        {/* Toolbar */}
        <div className="flex items-center gap-0.5 shrink-0 pb-1">
          <button
            className="p-2 rounded-lg text-surface-500 hover:text-surface-300 hover:bg-surface-800 transition-colors"
            title="Datei anhängen"
          >
            <Paperclip size={18} />
          </button>
          <button
            className="p-2 rounded-lg text-surface-500 hover:text-surface-300 hover:bg-surface-800 transition-colors"
            title="Vorlage verwenden"
          >
            <FileText size={18} />
          </button>
          <button
            onClick={() => setIsNoteMode(!isNoteMode)}
            className={`p-2 rounded-lg transition-colors ${
              isNoteMode
                ? 'text-gold-400 bg-gold-900/30'
                : 'text-surface-500 hover:text-surface-300 hover:bg-surface-800'
            }`}
            title="Interne Notiz"
          >
            <StickyNote size={18} />
          </button>
          <button
            className="p-2 rounded-lg text-surface-500 hover:text-surface-300 hover:bg-surface-800 transition-colors"
            title="Quick Actions"
          >
            <Zap size={18} />
          </button>
        </div>

        {/* Input */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder={
              isNoteMode ? 'Interne Notiz schreiben…' : 'Nachricht schreiben…'
            }
            rows={1}
            className={`w-full resize-none rounded-xl px-4 py-2.5 text-sm text-surface-100 placeholder:text-surface-500 focus:outline-none focus:ring-1 transition-colors ${
              isNoteMode
                ? 'bg-gold-900/15 border border-gold-800/30 focus:border-gold-600 focus:ring-gold-600/30'
                : 'bg-surface-800 border border-surface-700 focus:border-gold-600 focus:ring-gold-600/30'
            }`}
          />
        </div>

        {/* Send */}
        <button
          onClick={handleSend}
          disabled={!value.trim() || disabled}
          className={`p-2.5 rounded-xl transition-colors shrink-0 mb-0.5 ${
            value.trim()
              ? 'bg-gold-500 text-surface-950 hover:bg-gold-400'
              : 'bg-surface-800 text-surface-600 cursor-not-allowed'
          }`}
          title="Senden (Enter)"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
