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
  { title: "Mathematics Class 10", issued: 42 },
  { title: "Wings of Fire", issued: 38 },
  { title: "Physics Concepts", issued: 31 },
  { title: "English Grammar", issued: 28 },
  { title: "The Alchemist", issued: 25 },
];

const overdueList = [
  {
    id: "od1",
    book: "Physics Concepts",
    student: "Aman Verma",
    class: "12-A",
    dueDate: "24/02/2024",
    days: 23,
    fine: 46,
  },
  {
    id: "od2",
    book: "The Alchemist",
    student: "Rohan Gupta",
    class: "11-B",
    dueDate: "15/02/2024",
    days: 32,
    fine: 64,
  },
  {
    id: "od3",
    book: "Wings of Fire",
    student: "Kavita Devi",
    class: "9-A",
    dueDate: "01/03/2024",
    days: 17,
    fine: 34,
  },
  {
    id: "od4",
    book: "Science Class 9",
    student: "Bunty Kumar",
    class: "8-B",
    dueDate: "10/03/2024",
    days: 8,
    fine: 16,
  },
];

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#8B5CF6", "#F43F5E"];

const totalBooks = mockBooks.reduce((s, b) => s + b.totalCopies, 0);
const issuedBooks = mockBooks.reduce(
  (s, b) => s + (b.totalCopies - b.availableCopies),
  0,
);
const overdueCount =
  mockIssues.filter((i) => i.status === "Overdue").length + 2;
const members = 842;

export function LibraryReports() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">
          Library Reports
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Library activity overview and overdue tracking
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Total Books</p>
            <p className="text-3xl font-heading font-bold mt-1">{totalBooks}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Issued</p>
            <p className="text-3xl font-heading font-bold text-blue-600 mt-1">
              {issuedBooks}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Overdue</p>
            <p className="text-3xl font-heading font-bold text-rose-600 mt-1">
              {overdueCount}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Active Members</p>
            <p className="text-3xl font-heading font-bold text-emerald-600 mt-1">
              {members}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Most Issued Books (This Month)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={popularBooks}
              layout="vertical"
              margin={{ left: 20, right: 20 }}
            >
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis
                dataKey="title"
                type="category"
                tick={{ fontSize: 11 }}
                width={160}
              />
              <Tooltip />
              <Bar dataKey="issued" name="Times Issued" radius={[0, 4, 4, 0]}>
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
          <CardTitle className="text-base">Overdue Books</CardTitle>
        </CardHeader>
        <CardContent>
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
                    Due Date
                  </th>
                  <th className="text-right py-2 font-medium text-muted-foreground">
                    Days Overdue
                  </th>
                  <th className="text-right py-2 font-medium text-muted-foreground">
                    Fine (₹)
                  </th>
                </tr>
              </thead>
              <tbody>
                {overdueList.map((row, i) => (
                  <tr
                    key={row.id}
                    data-ocid={`library_reports.item.${i + 1}`}
                    className="border-b last:border-0"
                  >
                    <td className="py-2.5 font-medium">{row.book}</td>
                    <td className="py-2.5">{row.student}</td>
                    <td className="py-2.5 text-muted-foreground">
                      {row.class}
                    </td>
                    <td className="py-2.5 text-muted-foreground">
                      {row.dueDate}
                    </td>
                    <td className="py-2.5 text-right">
                      <Badge variant="destructive" className="text-xs">
                        {row.days} days
                      </Badge>
                    </td>
                    <td className="py-2.5 text-right font-medium text-rose-600">
                      ₹{row.fine}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
