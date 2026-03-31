import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockRoutes } from "@/data/mockTransport";
import { Bus } from "lucide-react";

const todaySchedule = [
  {
    id: "s1",
    route: "R01 — Patna Sahib",
    departure: "7:00 AM",
    driver: "Ram Babu",
    status: "Departed",
  },
  {
    id: "s2",
    route: "R02 — Danapur",
    departure: "6:45 AM",
    driver: "Shyam Lal",
    status: "Departed",
  },
  {
    id: "s3",
    route: "R03 — Khagaul",
    departure: "7:15 AM",
    driver: "Ramu Singh",
    status: "Arrived",
  },
  {
    id: "s4",
    route: "R04 — Muzaffarpur",
    departure: "6:30 AM",
    driver: "Birju Yadav",
    status: "Delayed",
  },
  {
    id: "s5",
    route: "R05 — Boring Road",
    departure: "7:00 AM",
    driver: "Manoj Prasad",
    status: "Departed",
  },
  {
    id: "s6",
    route: "R06 — Patliputra",
    departure: "7:15 AM",
    driver: "Santosh Kumar",
    status: "On Route",
  },
];

const vehicles = [
  {
    busNo: "BR-01-PA-1234",
    route: "Patna Sahib Route",
    driver: "Ram Babu",
    status: "Active",
  },
  {
    busNo: "BR-01-PA-5678",
    route: "Danapur Route",
    driver: "Shyam Lal",
    status: "Active",
  },
  {
    busNo: "BR-01-PA-9012",
    route: "Khagaul Route",
    driver: "Ramu Singh",
    status: "Active",
  },
  {
    busNo: "BR-01-PA-3456",
    route: "Muzaffarpur Express",
    driver: "Birju Yadav",
    status: "Maintenance",
  },
  {
    busNo: "BR-01-PA-7890",
    route: "Boring Road Route",
    driver: "Manoj Prasad",
    status: "Active",
  },
  {
    busNo: "BR-01-PA-2345",
    route: "Patliputra Route",
    driver: "Santosh Kumar",
    status: "Active",
  },
];

const totalStudents = mockRoutes.reduce((s, r) => s + r.enrolled, 0);

interface Props {
  navigate: (path: string) => void;
}

export function TransportManagerDashboard({ navigate }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">
          Transport Dashboard
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Routes, drivers, vehicles, and scheduling overview
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Active Routes</p>
            <p className="text-2xl font-heading font-bold mt-1">6</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Students on Bus</p>
            <p className="text-2xl font-heading font-bold text-blue-600 mt-1">
              {totalStudents}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Drivers</p>
            <p className="text-2xl font-heading font-bold text-emerald-600 mt-1">
              6
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Vehicles</p>
            <p className="text-2xl font-heading font-bold text-amber-600 mt-1">
              6
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          data-ocid="transport_mgr.add_route.button"
          onClick={() => navigate("/admin/transport/routes")}
          className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90"
        >
          Add Route
        </button>
        <button
          type="button"
          data-ocid="transport_mgr.assign.button"
          onClick={() => navigate("/admin/transport/assign")}
          className="inline-flex items-center px-4 py-2 border rounded-lg text-sm font-medium hover:bg-muted"
        >
          Assign Student
        </button>
        <button
          type="button"
          data-ocid="transport_mgr.tracking.button"
          onClick={() => navigate("/admin/transport/tracking")}
          className="inline-flex items-center px-4 py-2 border rounded-lg text-sm font-medium hover:bg-muted"
        >
          View Tracking
        </button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Today&apos;s Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 font-medium text-muted-foreground">
                    Route
                  </th>
                  <th className="text-left py-2 font-medium text-muted-foreground">
                    Departure
                  </th>
                  <th className="text-left py-2 font-medium text-muted-foreground">
                    Driver
                  </th>
                  <th className="text-left py-2 font-medium text-muted-foreground">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {todaySchedule.map((row, i) => (
                  <tr
                    key={row.id}
                    data-ocid={`transport_mgr.item.${i + 1}`}
                    className="border-b last:border-0 hover:bg-muted/30"
                  >
                    <td className="py-2.5 font-medium">{row.route}</td>
                    <td className="py-2.5 text-muted-foreground">
                      {row.departure}
                    </td>
                    <td className="py-2.5">{row.driver}</td>
                    <td className="py-2.5">
                      <Badge
                        variant={
                          row.status === "Arrived"
                            ? "default"
                            : row.status === "Delayed"
                              ? "destructive"
                              : "secondary"
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {vehicles.map((v, i) => (
          <Card key={v.busNo} data-ocid={`transport_mgr.card.${i + 1}`}>
            <CardContent className="pt-5">
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-3">
                  <Bus size={18} className="text-blue-600" />
                </div>
                <Badge
                  variant={v.status === "Active" ? "default" : "destructive"}
                  className="text-xs"
                >
                  {v.status}
                </Badge>
              </div>
              <p className="font-heading font-bold">{v.busNo}</p>
              <p className="text-sm text-muted-foreground">{v.route}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Driver: {v.driver}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
