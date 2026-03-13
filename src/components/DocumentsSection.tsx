import { useCallback, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import { FileText, CheckCircle, Clock, AlertCircle, Download } from "lucide-react";
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
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);

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
                <div
                  key={i}
                  onClick={() => setSelectedDoc(doc)}
                  className="flex items-center justify-between py-3 border-b border-border last:border-0 cursor-pointer hover:bg-muted/50 rounded px-2 -mx-2 transition-colors"
                >
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

      <Dialog open={!!selectedDoc} onOpenChange={(open) => !open && setSelectedDoc(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              {selectedDoc?.name}
            </DialogTitle>
            <DialogDescription>Document details and download</DialogDescription>
          </DialogHeader>
          {selectedDoc && (() => {
            const cfg = statusConfig[selectedDoc.status];
            return (
              <div className="space-y-4 py-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${cfg.color}`}>
                    <cfg.icon className="h-3 w-3" /> {cfg.label}
                  </span>
                </div>
                {selectedDoc.date && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Date</span>
                    <span className="text-sm text-foreground">{selectedDoc.date}</span>
                  </div>
                )}
                <div className="rounded-lg border border-border bg-muted/50 p-8 flex flex-col items-center justify-center gap-2">
                  <FileText className="h-12 w-12 text-muted-foreground/50" />
                  <p className="text-xs text-muted-foreground">Document preview not available</p>
                </div>
              </div>
            );
          })()}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedDoc(null)}>Close</Button>
            <Button className="gap-2">
              <Download className="h-4 w-4" /> Download
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
