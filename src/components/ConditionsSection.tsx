import { useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, PlusCircle } from "lucide-react";
import { useSearchPagination } from "@/hooks/use-search-pagination";
import { SearchPaginationBar } from "@/components/SearchPaginationBar";

interface Condition {
  description: string;
  submittedDate: string;
  submittedBy: string;
  clearedDate: string;
  clearedBy: string;
  createdBy: string;
  createdAt: string;
  tags: { label: string; color: "gold" | "red" | "green" }[];
}

const conditions: Condition[] = [
  {
    description: "EM/OM Receipt",
    submittedDate: "03/12/26 10:41", submittedBy: "Lola Dobbins",
    clearedDate: "03/12/26 10:41", clearedBy: "Lola Dobbins",
    createdBy: "Lola Dobbins", createdAt: "03/06/26 12:39",
    tags: [{ label: "Pre-Compliance", color: "gold" }, { label: "If Applicable", color: "green" }],
  },
  {
    description: "IABS and Representation Disclosure for unrepresented buyer",
    submittedDate: "03/09/26 10:00", submittedBy: "Lola Dobbins",
    clearedDate: "03/09/26 10:00", clearedBy: "Lola Dobbins",
    createdBy: "Lola Dobbins", createdAt: "03/06/26 12:41",
    tags: [{ label: "Pre-Compliance", color: "gold" }, { label: "If Applicable", color: "green" }],
  },
  {
    description: "Information About Brokerage Services",
    submittedDate: "03/09/26 10:05", submittedBy: "Lola Dobbins",
    clearedDate: "03/09/26 10:05", clearedBy: "Lola Dobbins",
    createdBy: "Dezzy AI", createdAt: "03/06/26 12:41",
    tags: [{ label: "Pre-Compliance", color: "gold" }, { label: "Required", color: "red" }],
  },
  {
    description: "Residential Real Estate Listing Agreement Exclusive Right to Sell",
    submittedDate: "03/09/26 09:59", submittedBy: "Lola Dobbins",
    clearedDate: "03/09/26 09:59", clearedBy: "Lola Dobbins",
    createdBy: "Dezzy AI", createdAt: "03/06/26 12:41",
    tags: [{ label: "Pre-Compliance", color: "gold" }, { label: "Required", color: "red" }],
  },
  {
    description: "Wire Fraud Notice",
    submittedDate: "03/09/26 09:59", submittedBy: "Lola Dobbins",
    clearedDate: "03/09/26 09:59", clearedBy: "Lola Dobbins",
    createdBy: "Dezzy AI", createdAt: "03/06/26 12:41",
    tags: [{ label: "Pre-Compliance", color: "gold" }, { label: "Required", color: "red" }],
  },
];

const tagColors = {
  gold: "bg-status-pending/15 text-status-pending border-status-pending/30",
  red: "bg-destructive/10 text-destructive border-destructive/30",
  green: "bg-status-approved/10 text-status-approved border-status-approved/30",
};

export function ConditionsSection() {
  const filterFn = useCallback(
    (c: Condition, q: string) =>
      c.description.toLowerCase().includes(q) ||
      c.createdBy.toLowerCase().includes(q) ||
      c.tags.some((t) => t.label.toLowerCase().includes(q)),
    []
  );

  const { search, setSearch, page, setPage, totalPages, filtered, paginated } =
    useSearchPagination(conditions, filterFn, 5);

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <Button size="sm" className="gap-1.5 bg-status-approved text-primary-foreground hover:bg-status-approved/90">
          <Bell className="h-3.5 w-3.5" /> Notify Agent
        </Button>
        <Button size="sm" className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90">
          <PlusCircle className="h-3.5 w-3.5" /> New Post Condition
        </Button>
      </div>

      <SearchPaginationBar
        search={search}
        onSearchChange={setSearch}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        placeholder="Search conditions..."
        totalItems={filtered.length}
      />

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left font-semibold text-foreground px-4 py-3">Description</th>
                  <th className="text-right font-semibold text-foreground px-4 py-3 whitespace-nowrap">Submitted Date</th>
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="px-4 py-8 text-center text-muted-foreground">No conditions found.</td>
                  </tr>
                ) : (
                  paginated.map((c, i) => (
                    <tr key={i} className="border-b border-border last:border-0">
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          <Badge variant="outline" className={`text-xs font-medium ${tagColors.gold}`}>
                            Created By {c.createdBy} - {c.createdAt}
                          </Badge>
                          {c.tags.map((tag, ti) => (
                            <Badge key={ti} variant="outline" className={`text-xs font-medium ${tagColors[tag.color]}`}>
                              {tag.label}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-foreground font-medium">{c.description}</p>
                      </td>
                      <td className="px-4 py-3 text-right align-top">
                        <div className="text-xs text-muted-foreground">
                          <p className="font-medium text-foreground">{c.submittedDate}</p>
                          <p>{c.submittedBy}</p>
                        </div>
                        <div className="text-xs text-muted-foreground mt-2">
                          <p className="font-medium text-foreground">{c.clearedDate}</p>
                          <p>{c.clearedBy}</p>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
