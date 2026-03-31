import { Input } from "@/components/ui/input";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Search,
} from "lucide-react";
import type React from "react";
import { useMemo, useState } from "react";

interface Column<T> {
  key: string;
  header: string;
  render?: (value: any, row: T) => React.ReactNode;
  sortable?: boolean;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchKeys?: string[];
  pageSize?: number;
  isLoading?: boolean;
  onRowClick?: (row: T) => void;
  actions?: (row: T) => React.ReactNode;
  emptyMessage?: string;
  filterElement?: React.ReactNode;
}

function getNestedValue(obj: any, key: string): any {
  return key.split(".").reduce((acc, k) => acc?.[k], obj);
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  searchKeys = [],
  pageSize = 10,
  isLoading,
  onRowClick,
  actions,
  emptyMessage,
  filterElement,
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState("");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const filtered = useMemo(() => {
    let result = data;
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((row) =>
        searchKeys.some((key) =>
          String(getNestedValue(row, key) || "")
            .toLowerCase()
            .includes(q),
        ),
      );
    }
    if (sortKey) {
      result = [...result].sort((a, b) => {
        const av = getNestedValue(a, sortKey);
        const bv = getNestedValue(b, sortKey);
        const cmp = String(av).localeCompare(String(bv), undefined, {
          numeric: true,
        });
        return sortDir === "asc" ? cmp : -cmp;
      });
    }
    return result;
  }, [data, search, sortKey, sortDir, searchKeys]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentData = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleSort = (key: string) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: skeleton loader has no stable id
          <div key={i} className="h-12 bg-muted rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            data-ocid="table.search_input"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search..."
            className="pl-9 text-sm"
          />
        </div>
        {filterElement}
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => col.sortable !== false && handleSort(col.key)}
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    col.sortable !== false &&
                    handleSort(col.key)
                  }
                  tabIndex={col.sortable !== false ? 0 : undefined}
                  className={`px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap ${
                    col.sortable !== false
                      ? "cursor-pointer hover:text-foreground select-none"
                      : ""
                  } ${col.className || ""}`}
                >
                  <div className="flex items-center gap-1">
                    {col.header}
                    {col.sortable !== false &&
                      sortKey === col.key &&
                      (sortDir === "asc" ? (
                        <ChevronUp size={12} />
                      ) : (
                        <ChevronDown size={12} />
                      ))}
                  </div>
                </th>
              ))}
              {actions && (
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {currentData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="px-4 py-12 text-center text-muted-foreground"
                >
                  {emptyMessage || "No data found"}
                </td>
              </tr>
            ) : (
              currentData.map((row, i) => (
                <tr
                  data-ocid={`table.item.${i + 1}`}
                  key={(row as any).id ?? i}
                  onClick={() => onRowClick?.(row)}
                  onKeyDown={(e) => e.key === "Enter" && onRowClick?.(row)}
                  tabIndex={onRowClick ? 0 : undefined}
                  className={`border-b border-border last:border-0 ${
                    onRowClick
                      ? "cursor-pointer hover:bg-muted/50"
                      : "hover:bg-muted/30"
                  } transition-colors`}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={`px-4 py-3 ${col.className || ""}`}
                    >
                      {col.render
                        ? col.render(getNestedValue(row, col.key), row)
                        : String(getNestedValue(row, col.key) ?? "")}
                    </td>
                  ))}
                  {actions && <td className="px-4 py-3">{actions(row)}</td>}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Showing {(page - 1) * pageSize + 1}–
            {Math.min(page * pageSize, filtered.length)} of {filtered.length}
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              data-ocid="table.pagination_prev"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-1.5 rounded-lg border border-border disabled:opacity-50 hover:bg-muted"
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum =
                Math.max(1, Math.min(page - 2, totalPages - 4)) + i;
              return (
                <button
                  type="button"
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`w-8 h-8 rounded-lg text-xs font-medium ${
                    page === pageNum
                      ? "bg-primary text-primary-foreground"
                      : "border border-border hover:bg-muted"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              type="button"
              data-ocid="table.pagination_next"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-1.5 rounded-lg border border-border disabled:opacity-50 hover:bg-muted"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
