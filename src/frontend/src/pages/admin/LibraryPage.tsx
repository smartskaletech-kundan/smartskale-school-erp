import { DataTable } from "@/components/shared/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockBooks, mockIssues } from "@/data/mockLibrary";
import { exportToExcel, exportToPDF } from "@/utils/exportUtils";
import { formatCurrency } from "@/utils/formatCurrency";
import { BookOpen, FileSpreadsheet, FileText } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

export function LibraryPage() {
  const handleExportBooksExcel = () => {
    const data = mockBooks.map((b) => ({
      ISBN: b.isbn,
      Title: b.title,
      Author: b.author,
      Category: b.category,
      "Total Copies": b.totalCopies,
      Available: b.availableCopies,
      Issued: b.totalCopies - b.availableCopies,
    }));
    exportToExcel(data, "book_catalog", "Books");
    toast.success("Excel downloaded!");
  };

  const handleExportBooksPDF = () => {
    const columns = [
      "ISBN",
      "Title",
      "Author",
      "Category",
      "Total",
      "Available",
    ];
    const rows = mockBooks.map((b) => [
      b.isbn,
      b.title,
      b.author,
      b.category,
      b.totalCopies,
      b.availableCopies,
    ]);
    exportToPDF("Book Catalog Report", columns, rows, "book_catalog");
    toast.success("PDF downloaded!");
  };

  const bookColumns = [
    {
      key: "title",
      header: "Title",
      render: (v: string, row: any) => (
        <div>
          <p className="font-medium text-foreground text-sm">{v}</p>
          <p className="text-xs text-muted-foreground">{row.author}</p>
        </div>
      ),
    },
    {
      key: "isbn",
      header: "ISBN",
      render: (v: string) => <span className="font-mono text-xs">{v}</span>,
    },
    { key: "category", header: "Category" },
    { key: "totalCopies", header: "Total" },
    {
      key: "availableCopies",
      header: "Available",
      render: (v: number) => (
        <span
          className={
            v > 0
              ? "text-success font-semibold"
              : "text-destructive font-semibold"
          }
        >
          {v}
        </span>
      ),
    },
  ];

  const issueColumns = [
    { key: "bookTitle", header: "Book" },
    {
      key: "studentName",
      header: "Student",
      render: (v: string, row: any) => (
        <div>
          <p className="font-medium text-sm">{v}</p>
          <p className="text-xs text-muted-foreground">{row.class}</p>
        </div>
      ),
    },
    { key: "issueDate", header: "Issue Date" },
    { key: "dueDate", header: "Due Date" },
    {
      key: "fine",
      header: "Fine",
      render: (v: number) =>
        v > 0 ? (
          <span className="text-destructive font-semibold">
            {formatCurrency(v)}
          </span>
        ) : (
          <span className="text-success">₹0</span>
        ),
    },
    {
      key: "status",
      header: "Status",
      render: (v: string) => (
        <Badge
          className={
            v === "Returned"
              ? "bg-green-100 text-green-700"
              : v === "Overdue"
                ? "bg-red-100 text-red-700"
                : "bg-blue-100 text-blue-700"
          }
        >
          {v}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">
            Library Management
          </h1>
          <p className="text-muted-foreground text-sm">
            Book catalog, issue & return management
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            data-ocid="library.export_excel.button"
            variant="outline"
            size="sm"
            className="text-emerald-700 border-emerald-200 hover:bg-emerald-50"
            onClick={handleExportBooksExcel}
          >
            <FileSpreadsheet size={16} className="mr-2" /> Excel
          </Button>
          <Button
            data-ocid="library.export_pdf.button"
            variant="outline"
            size="sm"
            className="text-rose-600 border-rose-200 hover:bg-rose-50"
            onClick={handleExportBooksPDF}
          >
            <FileText size={16} className="mr-2" /> PDF
          </Button>
        </div>
      </div>
      <Tabs defaultValue="catalog">
        <TabsList className="bg-muted">
          <TabsTrigger value="catalog">Catalog</TabsTrigger>
          <TabsTrigger value="issue">Issue Book</TabsTrigger>
          <TabsTrigger value="returns">Returns</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="catalog" className="mt-4">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
            <div className="flex justify-between mb-4">
              <h3 className="font-heading font-semibold text-foreground">
                Book Catalog ({mockBooks.length} books)
              </h3>
              <Button
                data-ocid="library.add_book.button"
                size="sm"
                onClick={() => toast.info("Add book form")}
              >
                <BookOpen size={16} className="mr-2" /> Add Book
              </Button>
            </div>
            <DataTable
              data={mockBooks}
              columns={bookColumns}
              searchKeys={["title", "author", "isbn", "category"]}
            />
          </div>
        </TabsContent>
        <TabsContent value="issue" className="mt-4">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
            <h3 className="font-heading font-semibold text-foreground mb-4">
              Issue Book
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
              <div className="space-y-1.5">
                <label
                  htmlFor="library-student"
                  className="text-sm font-medium"
                >
                  Student (Admission No)
                </label>
                <Input
                  id="library-student"
                  data-ocid="library.student.input"
                  placeholder="2024-1045"
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="library-book" className="text-sm font-medium">
                  Book (Title or ISBN)
                </label>
                <Input
                  id="library-book"
                  data-ocid="library.book.input"
                  placeholder="Search book..."
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="library-due" className="text-sm font-medium">
                  Due Date
                </label>
                <Input id="library-due" type="date" />
              </div>
            </div>
            <Button
              data-ocid="library.issue.button"
              className="mt-4"
              onClick={() => toast.success("Book issued successfully!")}
            >
              Issue Book
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="returns" className="mt-4">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
            <h3 className="font-heading font-semibold text-foreground mb-4">
              Return Books
            </h3>
            <DataTable
              data={mockIssues.filter((i) => i.status !== "Returned")}
              columns={issueColumns}
              searchKeys={["bookTitle", "studentName"]}
              actions={(row) => (
                <Button
                  size="sm"
                  variant="outline"
                  data-ocid="library.return.button"
                  onClick={() =>
                    toast.success(
                      `${row.bookTitle} returned! Fine: ${formatCurrency(row.fine)}`,
                    )
                  }
                >
                  Return{" "}
                  {row.fine > 0 ? `+ Fine: ${formatCurrency(row.fine)}` : ""}
                </Button>
              )}
            />
          </div>
        </TabsContent>
        <TabsContent value="reports" className="mt-4">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
            <DataTable
              data={mockIssues}
              columns={issueColumns}
              searchKeys={["bookTitle", "studentName"]}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
