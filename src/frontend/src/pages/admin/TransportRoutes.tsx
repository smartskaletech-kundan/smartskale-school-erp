import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { mockRoutes } from "@/data/mockTransport";
import { Bus, Phone, Users } from "lucide-react";

const extendedRoutes = [
  ...mockRoutes,
  {
    id: "r5",
    routeNo: "R05",
    name: "Boring Road Route",
    stops: ["Boring Road", "Kankarbagh", "Rajendra Nagar", "Bailey Road"],
    driver: "Manoj Prasad",
    driverMobile: "+91 98765 00005",
    vehicle: "Bus",
    vehicleNo: "BR-01-PA-7890",
    capacity: 50,
    enrolled: 44,
    timing: "7:00 AM - 8:00 AM",
  },
  {
    id: "r6",
    routeNo: "R06",
    name: "Patliputra Route",
    stops: ["Patliputra", "Buddha Marg", "Ashok Nagar", "Bailey Road"],
    driver: "Santosh Kumar",
    driverMobile: "+91 98765 00006",
    vehicle: "Mini Bus",
    vehicleNo: "BR-01-PA-2345",
    capacity: 35,
    enrolled: 28,
    timing: "7:15 AM - 8:00 AM",
  },
];

export function TransportRoutes() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">
          Transport Routes
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          All active school bus routes with driver and vehicle details
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {extendedRoutes.map((route, i) => (
          <Card
            key={route.id}
            data-ocid={`transport_routes.item.${i + 1}`}
            className="hover:shadow-md transition-shadow"
          >
            <CardContent className="pt-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded">
                      {route.routeNo}
                    </span>
                    <h3 className="font-heading font-bold text-foreground">
                      {route.name}
                    </h3>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {route.timing}
                  </p>
                </div>
                <Badge
                  variant={
                    route.enrolled >= route.capacity * 0.9
                      ? "destructive"
                      : "secondary"
                  }
                  className="text-xs"
                >
                  <Users size={10} className="mr-1" />
                  {route.enrolled}/{route.capacity}
                </Badge>
              </div>
              <div className="mb-3">
                <p className="text-xs text-muted-foreground mb-1 font-medium">
                  Stops:
                </p>
                <div className="flex flex-wrap gap-1">
                  {route.stops.map((stop) => (
                    <span
                      key={stop}
                      className="text-xs bg-muted px-2 py-0.5 rounded-full"
                    >
                      {stop}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t">
                <div className="flex items-center gap-2">
                  <Bus size={14} className="text-muted-foreground" />
                  <span className="text-sm font-medium">{route.vehicleNo}</span>
                  <span className="text-xs text-muted-foreground">
                    ({route.vehicle})
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Phone size={13} />
                  <span>{route.driver}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
