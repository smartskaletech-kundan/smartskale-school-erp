import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const termData = [
  { term: "Term 1", classAvg: 72, topper: 95, lowest: 48 },
  { term: "Term 2", classAvg: 76, topper: 97, lowest: 52 },
  { term: "Term 3", classAvg: 81, topper: 98, lowest: 57 },
];

const subjectData = [
  { subject: "Maths", avg: 78, pass: 88 },
  { subject: "Science", avg: 82, pass: 91 },
  { subject: "English", avg: 74, pass: 93 },
  { subject: "Hindi", avg: 86, pass: 96 },
  { subject: "Soc. Sci.", avg: 80, pass: 95 },
];

const passFail = [
  { name: "Pass", value: 88, color: "#10B981" },
  { name: "Fail", value: 12, color: "#F43F5E" },
];

const rankTable = [
  {
    rank: 1,
    name: "Anjali Sharma",
    class: "10-A",
    marks: 490,
    pct: "98.0%",
    grade: "A+",
  },
  {
    rank: 2,
    name: "Rohit Verma",
    class: "10-B",
    marks: 485,
    pct: "97.0%",
    grade: "A+",
  },
  {
    rank: 3,
    name: "Rahul Kumar",
    class: "10-A",
    marks: 475,
    pct: "95.0%",
    grade: "A+",
  },
  {
    rank: 4,
    name: "Priya Singh",
    class: "9-B",
    marks: 468,
    pct: "93.6%",
    grade: "A",
  },
  {
    rank: 5,
    name: "Sneha Pandey",
    class: "10-A",
    marks: 462,
    pct: "92.4%",
    grade: "A",
  },
  {
    rank: 6,
    name: "Amit Kumar",
    class: "9-A",
    marks: 458,
    pct: "91.6%",
    grade: "A",
  },
  {
    rank: 7,
    name: "Pooja Devi",
    class: "10-B",
    marks: 451,
    pct: "90.2%",
    grade: "A",
  },
  {
    rank: 8,
    name: "Ravi Shankar",
    class: "9-A",
    marks: 447,
    pct: "89.4%",
    grade: "B+",
  },
  {
    rank: 9,
    name: "Meena Kumari",
    class: "10-A",
    marks: 442,
    pct: "88.4%",
    grade: "B+",
  },
  {
    rank: 10,
    name: "Suresh Yadav",
    class: "9-B",
    marks: 438,
    pct: "87.6%",
    grade: "B+",
  },
];

export function ExamAnalytics() {
  const [cls, setCls] = useState("10");
  const [section, setSection] = useState("all");
  const [exam, setExam] = useState("half-yearly");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">
            Exam Analytics
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Student performance analysis across terms and subjects
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={cls} onValueChange={setCls}>
            <SelectTrigger
              className="w-24"
              data-ocid="exam_analytics.class.select"
            >
              <SelectValue placeholder="Class" />
            </SelectTrigger>
            <SelectContent>
              {["6", "7", "8", "9", "10", "11", "12"].map((c) => (
                <SelectItem key={c} value={c}>
                  Class {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={section} onValueChange={setSection}>
            <SelectTrigger
              className="w-28"
              data-ocid="exam_analytics.section.select"
            >
              <SelectValue placeholder="Section" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sections</SelectItem>
              <SelectItem value="a">Section A</SelectItem>
              <SelectItem value="b">Section B</SelectItem>
            </SelectContent>
          </Select>
          <Select value={exam} onValueChange={setExam}>
            <SelectTrigger
              className="w-36"
              data-ocid="exam_analytics.exam.select"
            >
              <SelectValue placeholder="Exam" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="unit-test-1">Unit Test 1</SelectItem>
              <SelectItem value="half-yearly">Half Yearly</SelectItem>
              <SelectItem value="unit-test-2">Unit Test 2</SelectItem>
              <SelectItem value="annual">Annual</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Class Topper */}
      <Card className="border-2 border-amber-200 bg-amber-50/50 dark:bg-amber-900/10 dark:border-amber-800">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-2xl">
              🏆
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                Class Topper — Class {cls}
              </p>
              <p className="text-xl font-heading font-bold text-foreground">
                Anjali Sharma
              </p>
              <p className="text-sm text-muted-foreground">
                490/500 marks · 98.0% · Grade A+
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">
              Performance Trend (3 Terms)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={termData}>
                <XAxis dataKey="term" tick={{ fontSize: 12 }} />
                <YAxis domain={[40, 100]} tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v: number) => `${v}%`} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="classAvg"
                  name="Class Avg"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot
                />
                <Line
                  type="monotone"
                  dataKey="topper"
                  name="Topper"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot
                />
                <Line
                  type="monotone"
                  dataKey="lowest"
                  name="Lowest"
                  stroke="#F43F5E"
                  strokeWidth={2}
                  strokeDasharray="4 2"
                  dot
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Pass / Fail Ratio</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={passFail}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                  labelLine={false}
                >
                  {passFail.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: number) => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-2">
              {passFail.map((d) => (
                <div key={d.name} className="flex items-center gap-1.5 text-sm">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: d.color }}
                  />
                  <span>
                    {d.name}: <strong>{d.value}%</strong>
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Subject-wise Average Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={subjectData}>
              <XAxis dataKey="subject" tick={{ fontSize: 12 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="avg"
                name="Class Avg %"
                fill="#3B82F6"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="pass"
                name="Pass %"
                fill="#10B981"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Rank Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Top 10 Students — Rank Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 font-medium text-muted-foreground">
                    Rank
                  </th>
                  <th className="text-left py-2 font-medium text-muted-foreground">
                    Student
                  </th>
                  <th className="text-left py-2 font-medium text-muted-foreground">
                    Class
                  </th>
                  <th className="text-right py-2 font-medium text-muted-foreground">
                    Marks
                  </th>
                  <th className="text-right py-2 font-medium text-muted-foreground">
                    %
                  </th>
                  <th className="text-left py-2 font-medium text-muted-foreground">
                    Grade
                  </th>
                </tr>
              </thead>
              <tbody>
                {rankTable.map((row) => (
                  <tr
                    key={row.rank}
                    data-ocid={`exam_analytics.item.${row.rank}`}
                    className="border-b last:border-0 hover:bg-muted/30"
                  >
                    <td className="py-2.5">
                      <span
                        className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${row.rank <= 3 ? "bg-amber-100 text-amber-700" : "bg-muted text-muted-foreground"}`}
                      >
                        {row.rank}
                      </span>
                    </td>
                    <td className="py-2.5 font-medium">{row.name}</td>
                    <td className="py-2.5 text-muted-foreground">
                      {row.class}
                    </td>
                    <td className="py-2.5 text-right">{row.marks}/500</td>
                    <td className="py-2.5 text-right font-medium">{row.pct}</td>
                    <td className="py-2.5">
                      <Badge variant="outline" className="text-xs">
                        {row.grade}
                      </Badge>
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
