import { useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { useSearchPagination } from "@/hooks/use-search-pagination";
import { SearchPaginationBar } from "@/components/SearchPaginationBar";

interface Document {
  name: string;
  status: "received" | "pending" | "missing";
  date?: string;
}

const documents: Document[] = [
  { name: "Purchase Agreement", status: "received", date: "02/15/2026" },
  { name: "Property Disclosure", status: "received", date: "02/18/2026" },
  { name: "Inspection Report", status: "pending", date: "03/01/2026" },
  { name: "Title Commitment", status: "pending" },
  { name: "Appraisal Report", status: "missing" },
  { name: "Closing Statement", status: "missing" },
];

const statusConfig = {
  received: { color: "bg-status-approved/10 text-status-approved", icon: CheckCircle, label: "Received" },
  pending: { color: "bg-status-pending/10 text-status-pending", icon: Clock, label: "Pending" },
  missing: { color: "bg-destructive/10 text-destructive", icon: AlertCircle, label: "Missing" },
};

export function DocumentsSection() {
  const filterFn = useCallback(
    (doc: Document, q: string) =>
      doc.name.toLowerCase().includes(q) ||
      doc.status.toLowerCase().includes(q),
    []
  );

  const { search, setSearch, page, setPage, totalPages, filtered, paginated } =
    useSearchPagination(documents, filterFn, 5);

  return (
    <div>
      <SearchPaginationBar
        search={search}
        onSearchChange={setSearch}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        placeholder="Search documents..."
        totalItems={filtered.length}
      />
      <Card>
        <CardContent className="p-4">
          {paginated.length === 0 ? (
            <p className="text-center text-muted-foreground py-6">No documents found.</p>
          ) : (
            paginated.map((doc, i) => {
              const cfg = statusConfig[doc.status];
              return (
                <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">{doc.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {doc.date && <span className="text-xs text-muted-foreground">{doc.date}</span>}
                    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${cfg.color}`}>
                      <cfg.icon className="h-3 w-3" /> {cfg.label}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>
    </div>
  );
}
