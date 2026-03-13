import { AlertCircle } from "lucide-react";

export function TransactionStatus() {
  return (
    <div className="bg-status-due/10 border border-status-due/30 rounded-lg px-4 py-3 flex items-center gap-2 mb-6">
      <AlertCircle className="h-4 w-4 text-status-due shrink-0" />
      <span className="text-sm font-semibold text-status-due">Transaction Status:</span>
      <span className="text-sm text-foreground font-medium">Commission Due - Funds Missing</span>
    </div>
  );
}
