import { CheckCircle, XCircle, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FloatingActions() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 items-end">
      <Button size="sm" className="gap-1.5 animate-pulse-blue text-primary-foreground shadow-lg">
        <ClipboardList className="h-4 w-4" /> Intake Wizard
      </Button>
      <Button size="sm" className="gap-1.5 bg-status-approved text-primary-foreground hover:bg-status-approved/90 shadow-lg">
        <CheckCircle className="h-4 w-4" /> Confirm Closed
      </Button>
      <Button size="sm" variant="outline" className="gap-1.5 bg-card shadow-lg border-destructive text-destructive hover:bg-destructive hover:text-primary-foreground">
        <XCircle className="h-4 w-4" /> Confirm Did Not Close
      </Button>
    </div>
  );
}
