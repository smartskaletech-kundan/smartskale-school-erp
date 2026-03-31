import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Navigation } from "lucide-react";

const routeStatuses = [
  {
    routeNo: "R01",
    name: "Patna Sahib Route",
    driver: "Ram Babu",
    time: "7:42 AM",
    status: "On Route",
    eta: "8 min",
  },
  {
    routeNo: "R02",
    name: "Danapur Route",
    driver: "Shyam Lal",
    time: "7:38 AM",
    status: "On Route",
    eta: "12 min",
  },
  {
    routeNo: "R03",
    name: "Khagaul Route",
    driver: "Ramu Singh",
    time: "7:55 AM",
    status: "Arrived",
    eta: "—",
  },
  {
    routeNo: "R04",
    name: "Muzaffarpur Express",
    driver: "Birju Yadav",
    time: "7:20 AM",
    status: "Delayed",
    eta: "22 min",
  },
];

export function TransportTracking() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">
          GPS Tracking
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Live location tracking for all school buses
        </p>
      </div>

      <Card className="overflow-hidden">
        <div
          className="relative bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800"
          style={{ height: 320 }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <div className="w-16 h-16 rounded-full bg-white/80 dark:bg-slate-600 flex items-center justify-center">
              <Navigation size={32} className="text-blue-500" />
            </div>
            <div className="text-center">
              <p className="font-heading font-bold text-xl text-foreground">
                GPS Tracking
              </p>
              <p className="text-muted-foreground text-sm">Coming Soon</p>
              <p className="text-xs text-muted-foreground mt-1">
                Real-time bus tracking will be available in the next update
              </p>
            </div>
            <Badge variant="secondary" className="text-xs">
              Feature in Development
            </Badge>
          </div>
          <svg
            className="absolute inset-0 w-full h-full opacity-20"
            role="presentation"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Live Route Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {routeStatuses.map((route, i) => (
              <div
                key={route.routeNo}
                data-ocid={`transport_tracking.item.${i + 1}`}
                className="flex items-center justify-between p-3 rounded-xl border hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MapPin size={14} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">
                      {route.routeNo} — {route.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Driver: {route.driver} · Last update: {route.time}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge
                    variant={
                      route.status === "Arrived"
                        ? "default"
                        : route.status === "Delayed"
                          ? "destructive"
                          : "secondary"
                    }
                    className="text-xs mb-1"
                  >
                    {route.status}
                  </Badge>
                  {route.eta !== "—" && (
                    <p className="text-xs text-muted-foreground">
                      ETA: {route.eta}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
