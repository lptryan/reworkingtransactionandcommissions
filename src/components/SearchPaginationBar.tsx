import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

interface SearchPaginationBarProps {
  search: string;
  onSearchChange: (v: string) => void;
  page: number;
  totalPages: number;
  onPageChange: (p: number) => void;
  placeholder?: string;
  totalItems: number;
}

export function SearchPaginationBar({
  search, onSearchChange, page, totalPages, onPageChange, placeholder = "Search...", totalItems,
}: SearchPaginationBarProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3">
      <div className="relative w-full sm:w-64">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          className="pl-8 h-8 text-sm"
        />
      </div>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>{totalItems} result{totalItems !== 1 ? "s" : ""}</span>
        <span className="text-border">|</span>
        <Button variant="ghost" size="icon" className="h-7 w-7" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
          <ChevronLeft className="h-3.5 w-3.5" />
        </Button>
        <span>{page} / {totalPages}</span>
        <Button variant="ghost" size="icon" className="h-7 w-7" disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}>
          <ChevronRight className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}
