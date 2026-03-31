import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockBooks, mockIssues } from "@/data/mockLibrary";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const popularBooks = [
  { title: "Maths Cl.10", issued: 42 },
  { title: "Wings of Fire", issued: 38 },
  { title: "H.C. Verma", issued: 31 },
  { title: "Wren & Martin", issued: 28 },
  { title: "The Alchemist", issued: 25 },
];

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#8B5CF6", "#F43F5E"];

const allActivity = [
  ...mockIssues,
  {
    id: "i4",
    bookId: "b1",
    bookTitle: "Mathematics Class 10",
    studentId: "s4",
    studentName: "Anjali Sharma",
    class: "8-A",
    issueDate: "15/03/2024",
    dueDate: "29/03/2024",
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
    issueDate: "10/03/2024",
    dueDate: "24/03/2024",
    fine: 0,
    status: "Issued" as const,
  },
];

const totalBooks = mockBooks.reduce((s, b) => s + b.totalCopies, 0);
const issuedToday = 12;
const overdueCount = 6;
const members = 842;

interface Props {
  navigate: (path: string) => void;
}

export function LibrarianDashboard({ navigate }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">
          Library Dashboard
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Book inventory, issue/return activity, and member stats
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Total Books</p>
            <p className="text-2xl font-heading font-bold mt-1">{totalBooks}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Issued Today</p>
            <p className="text-2xl font-heading font-bold text-blue-600 mt-1">
              {issuedToday}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Overdue Books</p>
            <p className="text-2xl font-heading font-bold text-rose-600 mt-1">
              {overdueCount}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Active Members</p>
            <p className="text-2xl font-heading font-bold text-emerald-600 mt-1">
              {members}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          data-ocid="librarian.issue.button"
          onClick={() => navigate("/admin/library/issue")}
          className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90"
        >
          Issue Book
        </button>
        <button
          type="button"
          data-ocid="librarian.return.button"
          onClick={() => navigate("/admin/library/returns")}
          className="inline-flex items-center px-4 py-2 border rounded-lg text-sm font-medium hover:bg-muted"
        >
          Record Return
        </button>
        <button
          type="button"
          data-ocid="librarian.catalog.button"
          onClick={() => navigate("/admin/library")}
          className="inline-flex items-center px-4 py-2 border rounded-lg text-sm font-medium hover:bg-muted"
        >
          Add Book
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Popular Books (This Month)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={popularBooks}
                layout="vertical"
                margin={{ left: 10, right: 20 }}
              >
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis
                  dataKey="title"
                  type="category"
                  tick={{ fontSize: 11 }}
                  width={110}
                />
                <Tooltip />
                <Bar dataKey="issued" name="Issues" radius={[0, 4, 4, 0]}>
                  {popularBooks.map((entry, i) => (
                    <Cell key={entry.title} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {allActivity.slice(0, 5).map((issue, i) => (
                <div
                  key={issue.id}
                  data-ocid={`librarian.item.${i + 1}`}
                  className="flex items-center justify-between py-2 border-b last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium">{issue.bookTitle}</p>
                    <p className="text-xs text-muted-foreground">
                      {issue.studentName} · {issue.class}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={
                        issue.status === "Overdue"
                          ? "destructive"
                          : issue.status === "Returned"
                            ? "default"
                            : "secondary"
                      }
                      className="text-xs"
                    >
                      {issue.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {issue.issueDate}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
