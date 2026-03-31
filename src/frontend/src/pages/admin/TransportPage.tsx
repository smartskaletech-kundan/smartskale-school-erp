import { Button } from "@/components/ui/button";
import { mockRoutes } from "@/data/mockTransport";
import { exportToExcel, exportToPDF } from "@/utils/exportUtils";
import {
  Bus,
  FileSpreadsheet,
  FileText,
  MapPin,
  Phone,
  Plus,
} from "lucide-react";
import React from "react";
import { toast } from "sonner";

export function TransportPage() {
  const handleExportExcel = () => {
    const data = mockRoutes.map((r) => ({
      "Route Name": r.name,
      "Route No": r.routeNo,
      Stops: r.stops.join(" → "),
      Driver: r.driver,
      "Vehicle No": r.vehicleNo,
      "Student Count": r.enrolled,
      Capacity: r.capacity,
      Timing: r.timing,
    }));
    exportToExcel(data, "transport_routes", "Routes");
    toast.success("Excel downloaded!");
  };

  const handleExportPDF = () => {
    const columns = [
      "Route Name",
      "Driver",
      "Vehicle No",
      "Stops",
      "Students",
      "Timing",
    ];
    const rows = mockRoutes.map((r) => [
      r.name,
      r.driver,
      r.vehicleNo,
      r.stops.join(" → "),
      `${r.enrolled}/${r.capacity}`,
      r.timing,
    ]);
    exportToPDF("Transport Routes Report", columns, rows, "transport_routes");
    toast.success("PDF downloaded!");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">
            Transport Management
          </h1>
          <p className="text-muted-foreground text-sm">
            {mockRoutes.length} active routes
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            data-ocid="transport.export_excel.button"
            variant="outline"
            size="sm"
            className="text-emerald-700 border-emerald-200 hover:bg-emerald-50"
            onClick={handleExportExcel}
          >
            <FileSpreadsheet size={16} className="mr-2" /> Excel
          </Button>
          <Button
            data-ocid="transport.export_pdf.button"
            variant="outline"
            size="sm"
            className="text-rose-600 border-rose-200 hover:bg-rose-50"
            onClick={handleExportPDF}
          >
            <FileText size={16} className="mr-2" /> PDF
          </Button>
          <Button
            data-ocid="transport.add_route.button"
            size="sm"
            onClick={() => toast.info("Add route form")}
          >
            <Plus size={16} className="mr-2" /> Add Route
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {mockRoutes.map((route, i) => (
          <div
            data-ocid={`transport.route.item.${i + 1}`}
            key={route.id}
            className="bg-card border border-border rounded-2xl p-5 shadow-card"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">
                  <Bus size={20} />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground">
                    {route.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Route {route.routeNo} | {route.vehicleNo}
                  </p>
                </div>
              </div>
              <span className="text-xs font-medium bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                {route.enrolled}/{route.capacity} seats
              </span>
            </div>

            <div className="mb-4">
              <p className="text-xs font-medium text-muted-foreground mb-2">
                Stops:
              </p>
              <div className="flex items-center gap-1 flex-wrap">
                {route.stops.map((stop, j) => (
                  <React.Fragment key={stop}>
                    <div className="flex items-center gap-1 text-xs">
                      <MapPin size={10} className="text-muted-foreground" />
                      <span className="text-foreground">{stop}</span>
                    </div>
                    {j < route.stops.length - 1 && (
                      <span className="text-muted-foreground">→</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-muted/50 rounded-lg p-2">
                <p className="text-muted-foreground">Driver</p>
                <p className="font-medium text-foreground">{route.driver}</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-2">
                <p className="text-muted-foreground">Contact</p>
                <p className="font-medium text-foreground flex items-center gap-1">
                  <Phone size={10} />
                  {route.driverMobile.slice(-10)}
                </p>
              </div>
              <div className="bg-muted/50 rounded-lg p-2 col-span-2">
                <p className="text-muted-foreground">Timing</p>
                <p className="font-medium text-foreground">{route.timing}</p>
              </div>
            </div>

            <Button
              data-ocid="transport.assign.button"
              size="sm"
              variant="outline"
              className="w-full mt-3"
              onClick={() => toast.info("Assign students to route")}
            >
              Assign Students
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
