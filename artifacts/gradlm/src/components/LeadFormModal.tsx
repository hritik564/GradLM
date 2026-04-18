import { X } from "lucide-react";
import LeadForm from "./LeadForm";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LeadFormModal({ open, onOpenChange }: Props) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      data-testid="lead-form-modal"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      <div className="relative z-10 bg-background rounded-3xl shadow-2xl w-full max-w-lg p-8 overflow-y-auto max-h-[90vh]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-foreground">Talk to an Expert</h2>
            <p className="text-sm text-muted-foreground">Free consultation — no commitment</p>
          </div>
          <button
            onClick={() => onOpenChange(false)}
            className="w-9 h-9 rounded-full hover:bg-muted flex items-center justify-center transition-colors"
            data-testid="modal-close"
          >
            <X size={18} />
          </button>
        </div>
        <LeadForm onSuccess={() => {}} />
      </div>
    </div>
  );
}
