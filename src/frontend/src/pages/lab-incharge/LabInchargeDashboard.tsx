import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Monitor } from "lucide-react";
import { toast } from "sonner";

const labSchedule = [
  {
    id: "ls1",
    class: "10-A",
    time: "8:00–9:00 AM",
    teacher: "Mr. Anil Kumar",
    topic: "MS Excel Basics",
    status: "Completed",
  },
  {
    id: "ls2",
    class: "9-B",
    time: "9:00–10:00 AM",
    teacher: "Ms. Rekha Devi",
    topic: "HTML Introduction",
    status: "Ongoing",
  },
  {
    id: "ls3",
    class: "12-A",
    time: "10:30–11:30 AM",
    teacher: "Mr. Anil Kumar",
    topic: "Python Lists",
    status: "Upcoming",
  },
  {
    id: "ls4",
    class: "8-A",
    time: "11:30 AM–12:30 PM",
    teacher: "Ms. Rekha Devi",
    topic: "Typing Practice",
    status: "Upcoming",
  },
  {
    id: "ls5",
    class: "11-B",
    time: "1:30–2:30 PM",
    teacher: "Mr. Anil Kumar",
    topic: "Database Basics",
    status: "Upcoming",
  },
  {
    id: "ls6",
    class: "7-A",
    time: "2:30–3:30 PM",
    teacher: "Ms. Rekha Devi",
    topic: "Internet Safety",
    status: "Upcoming",
  },
];

const software = [
  { name: "Windows 11", version: "23H2", license: "Volume", count: 42 },
  {
    name: "Microsoft Office 2021",
    version: "16.0",
    license: "Volume",
    count: 42,
  },
  { name: "Python 3.11", version: "3.11.5", license: "Open Source", count: 42 },
  { name: "Tally Prime", version: "4.0", license: "Commercial", count: 10 },
  {
    name: "Adobe Acrobat Reader",
    version: "2023",
    license: "Freeware",
    count: 42,
  },
  { name: "Google Chrome", version: "120", license: "Freeware", count: 42 },
  {
    name: "Visual Studio Code",
    version: "1.85",
    license: "Open Source",
    count: 42,
  },
  { name: "Scratch 3.0", version: "3.0", license: "Open Source", count: 42 },
];

export function LabInchargeDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">
          Computer Lab Dashboard
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Lab scheduling, equipment, and software management
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Total PCs</p>
            <p className="text-2xl font-heading font-bold mt-1">42</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Available</p>
            <p className="text-2xl font-heading font-bold text-emerald-600 mt-1">
              30
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Occupied</p>
            <p className="text-2xl font-heading font-bold text-blue-600 mt-1">
              12
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Sessions Today</p>
            <p className="text-2xl font-heading font-bold text-amber-600 mt-1">
              6
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          data-ocid="lab.schedule.button"
          onClick={() => toast.success("Schedule session dialog — coming soon")}
          className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90"
        >
          Schedule Session
        </button>
        <button
          type="button"
          data-ocid="lab.equipment.button"
          onClick={() => toast.success("Add equipment dialog — coming soon")}
          className="inline-flex items-center px-4 py-2 border rounded-lg text-sm font-medium hover:bg-muted"
        >
          Add Equipment
        </button>
        <button
          type="button"
          data-ocid="lab.inventory.button"
          onClick={() => toast.success("Inventory view — coming soon")}
          className="inline-flex items-center px-4 py-2 border rounded-lg text-sm font-medium hover:bg-muted"
        >
          View Inventory
        </button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Today&apos;s Lab Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 font-medium text-muted-foreground">
                    Class
                  </th>
                  <th className="text-left py-2 font-medium text-muted-foreground">
                    Time
                  </th>
                  <th className="text-left py-2 font-medium text-muted-foreground">
                    Teacher
                  </th>
                  <th className="text-left py-2 font-medium text-muted-foreground">
                    Topic
                  </th>
                  <th className="text-left py-2 font-medium text-muted-foreground">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {labSchedule.map((row, i) => (
                  <tr
                    key={row.id}
                    data-ocid={`lab.item.${i + 1}`}
                    className="border-b last:border-0 hover:bg-muted/30"
                  >
                    <td className="py-2.5 font-medium">{row.class}</td>
                    <td className="py-2.5 text-muted-foreground">{row.time}</td>
                    <td className="py-2.5">{row.teacher}</td>
                    <td className="py-2.5 text-muted-foreground">
                      {row.topic}
                    </td>
                    <td className="py-2.5">
                      <Badge
                        variant={
                          row.status === "Completed"
                            ? "default"
                            : row.status === "Ongoing"
                              ? "secondary"
                              : "outline"
                        }
                        className="text-xs"
                      >
                        {row.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Software Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {software.map((sw, i) => (
              <div
                key={sw.name}
                data-ocid={`lab.card.${i + 1}`}
                className="flex items-center gap-3 p-3 rounded-xl border"
              >
                <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                  <Monitor size={16} className="text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{sw.name}</p>
                  <p className="text-xs text-muted-foreground">
                    v{sw.version} · {sw.license}
                  </p>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {sw.count} PCs
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
