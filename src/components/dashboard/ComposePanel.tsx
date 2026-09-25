import { useState, useRef, useCallback } from 'react';
import { UploadCloud, FileText, X, Calendar, Send } from 'lucide-react';
import { SlideOver } from '@/components/SlideOver';
import { Button } from '@/components/Button';

interface ComposePanelProps {
  open: boolean;
  onClose: () => void;
  onSchedule: (data: { subject: string; body: string; recipients: string[]; startTime: string }) => void;
}

export function ComposePanel({ open, onClose, onSchedule }: ComposePanelProps) {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [recipients, setRecipients] = useState<string[]>([]);
  const [startTime, setStartTime] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const emails = text
        .split(/[\s,\n;]+/)
        .map(s => s.trim())
        .filter(s => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s));
      setRecipients(emails);
    };
    reader.readAsText(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const handleSchedule = () => {
    if (!subject || !body || recipients.length === 0 || !startTime) return;
    onSchedule({ subject, body, recipients, startTime });
    setSubject('');
    setBody('');
    setRecipients([]);
    setStartTime('');
    setFileName('');
  };

  return (
    <SlideOver open={open} onClose={onClose} title="Compose New Email">
      <div className="space-y-6">
        {/* Subject */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">Subject line</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Quick follow-up about your roadmap"
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-violet-500/40 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all"
          />
        </div>

        {/* Body */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">Email body</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={6}
            placeholder="Hi {{first_name}},&#10;&#10;Thanks for the chat earlier — here's a quick summary of what we discussed…"
            className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm leading-relaxed text-white placeholder:text-slate-500 focus:border-violet-500/40 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all"
          />
        </div>

        {/* Upload zone */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">Recipients (CSV / TXT)</label>
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`cursor-pointer rounded-xl border-2 border-dashed p-6 text-center transition-all ${
              dragOver
                ? 'border-violet-500/50 bg-violet-500/5'
                : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.txt"
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />
            {fileName ? (
              <div className="flex items-center justify-center gap-2">
                <FileText className="h-5 w-5 text-violet-400" />
                <span className="text-sm font-medium text-white">{fileName}</span>
                <button
                  onClick={(e) => { e.stopPropagation(); setRecipients([]); setFileName(''); }}
                  className="ml-1 text-slate-500 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <>
                <UploadCloud className="mx-auto h-8 w-8 text-slate-500" />
                <p className="mt-2 text-sm text-slate-400">Drag &amp; drop or click to upload</p>
                <p className="mt-0.5 text-xs text-slate-600">CSV or TXT with one email per line</p>
              </>
            )}
          </div>
          {recipients.length > 0 && (
            <div className="mt-3 flex items-center gap-2 animate-fade-in">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-brand text-xs font-bold text-white">
                {recipients.length}
              </span>
              <span className="text-sm text-slate-300">
                {recipients.length === 1 ? 'email detected' : 'emails detected'}
              </span>
            </div>
          )}
        </div>

        {/* Start time */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">Start time</label>
          <div className="relative">
            <Calendar className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-3 pl-10 pr-4 text-sm text-white focus:border-violet-500/40 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all [color-scheme:dark]"
            />
          </div>
        </div>

        {/* Schedule button */}
        <div className="pt-2">
          <Button
            size="lg"
            className="w-full"
            onClick={handleSchedule}
            disabled={!subject || !body || recipients.length === 0 || !startTime}
          >
            <Send className="h-4 w-4" />
            Schedule Send
          </Button>
          {(!subject || !body || recipients.length === 0 || !startTime) && (
            <p className="mt-2 text-center text-xs text-slate-600">
              Fill in all fields and upload recipients to schedule
            </p>
          )}
        </div>
      </div>
    </SlideOver>
  );
}
