import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { mockIssues } from "@/data/mockLibrary";
import { useState } from "react";
import { toast } from "sonner";

const FINE_PER_DAY = 2;

function calcFine(dueDate: string): number {
  const [d, m, y] = dueDate.split("/").map(Number);
  const due = new Date(y, m - 1, d);
  const today = new Date();
  const days = Math.max(
    0,
    Math.floor((today.getTime() - due.getTime()) / 86400000),
  );
  return days * FINE_PER_DAY;
}

const extraIssues = [
  {
    id: "i4",
    bookId: "b1",
    bookTitle: "Mathematics Class 10",
    studentId: "s4",
    studentName: "Anjali Sharma",
    class: "8-A",
    issueDate: "05/03/2024",
    dueDate: "19/03/2024",
    fine: 0,
    status: "Issued" as const,
  },
  {
    id: "i5",
    bookId: "b7",
    bookTitle: "The Alchemist",
    studentId: "s5",
    studentName: "Rohan Gupta",
    class: "11-B",
    issueDate: "01/02/2024",
    dueDate: "15/02/2024",
    fine: 56,
    status: "Overdue" as const,
  },
  {
    id: "i6",
    bookId: "b2",
    bookTitle: "Science Class 9",
    studentId: "s6",
    studentName: "Kavya Yadav",
    class: "7-A",
    issueDate: "10/03/2024",
    dueDate: "24/03/2024",
    fine: 0,
    status: "Issued" as const,
  },
];

export function LibraryReturns() {
  const [search, setSearch] = useState("");
  const [returned, setReturned] = useState<string[]>([]);

  const allIssues = [...mockIssues, ...extraIssues];

  const activeIssues = allIssues.filter(
    (i) => !returned.includes(i.id) && i.status !== "Returned",
  );

  const filtered = activeIssues.filter(
    (i) =>
      !search ||
      i.studentName.toLowerCase().includes(search.toLowerCase()) ||
      i.bookTitle.toLowerCase().includes(search.toLowerCase()),
  );

  const handleReturn = (issue: (typeof allIssues)[0]) => {
    const fine = issue.fine || calcFine(issue.dueDate);
    setReturned((prev) => [...prev, issue.id]);
    if (fine > 0) {
      toast.success(`Book returned. Fine collected: \u20B9${fine}`);
    } else {
      toast.success(`"${issue.bookTitle}" returned by ${issue.studentName}.`);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">
          Book Returns
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage returns. Fine calculated at \u20B92/day after due date.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Issued Books</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            data-ocid="library_returns.search_input"
            placeholder="Search by student name or book title..."
            className="mb-4"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 font-medium text-muted-foreground">
                    Book
                  </th>
                  <th className="text-left py-2 font-medium text-muted-foreground">
                    Student
                  </th>
                  <th className="text-left py-2 font-medium text-muted-foreground">
                    Class
                  </th>
                  <th className="text-left py-2 font-medium text-muted-foreground">
                    Issue Date
                  </th>
                  <th className="text-left py-2 font-medium text-muted-foreground">
                    Due Date
                  </th>
                  <th className="text-right py-2 font-medium text-muted-foreground">
                    Fine (₹)
                  </th>
                  <th className="text-left py-2 font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="py-2" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((issue, i) => {
                  const fine = issue.fine || calcFine(issue.dueDate);
                  return (
                    <tr
                      key={issue.id}
                      data-ocid={`library_returns.item.${i + 1}`}
                      className="border-b last:border-0 hover:bg-muted/30"
                    >
                      <td className="py-2.5 font-medium">{issue.bookTitle}</td>
                      <td className="py-2.5">{issue.studentName}</td>
                      <td className="py-2.5 text-muted-foreground">
                        {issue.class}
                      </td>
                      <td className="py-2.5 text-muted-foreground">
                        {issue.issueDate}
                      </td>
                      <td className="py-2.5 text-muted-foreground">
                        {issue.dueDate}
                      </td>
                      <td className="py-2.5 text-right font-medium">
                        {fine > 0 ? (
                          <span className="text-rose-600">₹{fine}</span>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>
                      <td className="py-2.5">
                        <Badge
                          variant={
                            issue.status === "Overdue" || fine > 0
                              ? "destructive"
                              : "secondary"
                          }
                          className="text-xs"
                        >
                          {fine > 0 ? "Overdue" : "Issued"}
                        </Badge>
                      </td>
                      <td className="py-2.5">
                        <button
                          type="button"
                          data-ocid={`library_returns.delete_button.${i + 1}`}
                          onClick={() => handleReturn(issue)}
                          className="inline-flex items-center px-3 py-1 border rounded-md text-xs font-medium hover:bg-muted"
                        >
                          Return
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td
                      colSpan={8}
                      className="py-8 text-center text-muted-foreground"
                      data-ocid="library_returns.empty_state"
                    >
                      No active issues found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
