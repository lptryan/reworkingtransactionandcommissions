import { useState } from "react";
import { CheckCircle, XCircle, ClipboardList, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Section } from "@/hooks/use-section-tracker";

interface FloatingActionsProps {
  sections: Section[];
  activeSection: string;
  onSectionClick: (id: string) => void;
}

export function FloatingActions({ sections, activeSection, onSectionClick }: FloatingActionsProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed right-4 bottom-6 z-50 flex flex-col items-end gap-2">
      {/* Expanded panel */}
      {open && (
        <div className="bg-card border border-border rounded-xl shadow-xl w-56 overflow-hidden animate-fade-in">
          {/* Section nav */}
          <div className="px-3 pt-3 pb-2">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-2">Sections</p>
            <nav className="flex flex-col gap-0.5">
              {sections.map((s) => {
                const isActive = activeSection === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => { onSectionClick(s.id); }}
                    className={`text-left text-xs px-2.5 py-1.5 rounded-md transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground font-semibold"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    {s.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Divider */}
          <div className="border-t border-border mx-3" />

          {/* Action buttons */}
          <div className="p-3 flex flex-col gap-1.5">
            <Button size="sm" className="w-full justify-start gap-1.5 animate-pulse-blue text-primary-foreground text-xs">
              <ClipboardList className="h-3.5 w-3.5" /> Intake Wizard
            </Button>
            <Button size="sm" className="w-full justify-start gap-1.5 bg-status-approved text-primary-foreground hover:bg-status-approved/90 text-xs">
              <CheckCircle className="h-3.5 w-3.5" /> Confirm Closed
            </Button>
            <Button size="sm" variant="outline" className="w-full justify-start gap-1.5 border-destructive text-destructive hover:bg-destructive hover:text-primary-foreground text-xs">
              <XCircle className="h-3.5 w-3.5" /> Did Not Close
            </Button>
          </div>
        </div>
      )}

      {/* Toggle FAB */}
      <button
        onClick={() => setOpen(!open)}
        className="h-12 w-12 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-[hsl(211,70%,25%)] transition-colors"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
    </div>
  );
}
