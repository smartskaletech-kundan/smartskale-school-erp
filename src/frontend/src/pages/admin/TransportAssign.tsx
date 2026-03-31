import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockStudents } from "@/data/mockStudents";
import { mockRoutes } from "@/data/mockTransport";
import { useState } from "react";
import { toast } from "sonner";

export function TransportAssign() {
  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("none");
  const [selectedRoute, setSelectedRoute] = useState("none");
  const [selectedStop, setSelectedStop] = useState("none");

  const filteredStudents = mockStudents.filter(
    (s) =>
      search.length > 1 &&
      (s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.admissionNo.toLowerCase().includes(search.toLowerCase())),
  );

  const currentRoute = mockRoutes.find((r) => r.id === selectedRoute);

  const handleSave = () => {
    if (
      selectedStudent === "none" ||
      selectedRoute === "none" ||
      selectedStop === "none"
    ) {
      toast.error("Please select student, route, and stop.");
      return;
    }
    const student = mockStudents.find((s) => s.id === selectedStudent);
    const route = mockRoutes.find((r) => r.id === selectedRoute);
    toast.success(
      `${student?.name} assigned to ${route?.name} (${selectedStop}) successfully!`,
    );
    setSelectedStudent("none");
    setSelectedRoute("none");
    setSelectedStop("none");
    setSearch("");
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">
          Assign Students to Routes
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Search a student and assign them to a bus route and stop
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Assignment Form</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Search Student</Label>
            <Input
              data-ocid="transport_assign.search_input"
              className="mt-1"
              placeholder="Student name or admission number..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {filteredStudents.length > 0 && (
              <div className="mt-1 border rounded-lg overflow-hidden">
                {filteredStudents.slice(0, 5).map((s) => (
                  <button
                    type="button"
                    key={s.id}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-muted/50 ${selectedStudent === s.id ? "bg-primary/10 font-medium" : ""}`}
                    onClick={() => {
                      setSelectedStudent(s.id);
                      setSearch(s.name);
                    }}
                  >
                    {s.name} — {s.admissionNo} — Class {s.class}-{s.section}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <Label>Select Route</Label>
            <Select
              value={selectedRoute}
              onValueChange={(v) => {
                setSelectedRoute(v);
                setSelectedStop("none");
              }}
            >
              <SelectTrigger
                data-ocid="transport_assign.select"
                className="mt-1"
              >
                <SelectValue placeholder="Choose route..." />
              </SelectTrigger>
              <SelectContent>
                {mockRoutes.map((r) => (
                  <SelectItem key={r.id} value={r.id}>
                    {r.routeNo} — {r.name} ({r.enrolled}/{r.capacity} students)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {currentRoute && (
            <div>
              <Label>Select Boarding Stop</Label>
              <Select value={selectedStop} onValueChange={setSelectedStop}>
                <SelectTrigger
                  data-ocid="transport_assign.stop.select"
                  className="mt-1"
                >
                  <SelectValue placeholder="Choose stop..." />
                </SelectTrigger>
                <SelectContent>
                  {currentRoute.stops.map((stop) => (
                    <SelectItem key={stop} value={stop}>
                      {stop}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <Button
            data-ocid="transport_assign.submit_button"
            className="w-full"
            onClick={handleSave}
          >
            Save Assignment
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
