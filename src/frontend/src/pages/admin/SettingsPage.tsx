import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockStaff } from "@/data/mockStaff";
import { Save } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

export function SettingsPage() {
  const [schoolData, setSchoolData] = useState({
    name: "Saraswati Public School",
    address: "Bailey Road, Patna - 800001, Bihar",
    phone: "+91 612 234 5678",
    email: "info@saraswatipublic.edu.in",
    board: "CBSE",
    affiliation: "330045",
    principal: "Dr. Rajesh Kumar Sharma",
    estYear: "1998",
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">
          Settings
        </h1>
        <p className="text-muted-foreground text-sm">
          System configuration and management
        </p>
      </div>
      <Tabs defaultValue="school">
        <TabsList className="bg-muted">
          <TabsTrigger value="school">School Profile</TabsTrigger>
          <TabsTrigger value="academic">Academic Year</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent
          value="school"
          className="bg-card border border-border rounded-2xl p-6 shadow-card mt-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries({
              name: "School Name",
              address: "Address",
              phone: "Phone",
              email: "Email",
              board: "Board",
              affiliation: "Affiliation No",
              principal: "Principal Name",
              estYear: "Established Year",
            }).map(([key, label]) => (
              <div key={key} className="space-y-1.5">
                <Label>{label}</Label>
                {key === "board" ? (
                  <Select defaultValue={schoolData.board}>
                    <SelectTrigger data-ocid={`settings.${key}.select`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "CBSE",
                        "ICSE",
                        "UP Board",
                        "Bihar Board",
                        "State Board",
                      ].map((b) => (
                        <SelectItem key={b} value={b}>
                          {b}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    data-ocid={`settings.${key}.input`}
                    value={schoolData[key as keyof typeof schoolData]}
                    onChange={(e) =>
                      setSchoolData((d) => ({ ...d, [key]: e.target.value }))
                    }
                  />
                )}
              </div>
            ))}
          </div>
          <Button
            data-ocid="settings.save.button"
            className="mt-6"
            onClick={() => toast.success("Settings saved!")}
          >
            <Save size={16} className="mr-2" /> Save Changes
          </Button>
        </TabsContent>

        <TabsContent
          value="academic"
          className="bg-card border border-border rounded-2xl p-6 shadow-card mt-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md">
            <div className="space-y-1.5">
              <Label>Academic Year</Label>
              <Input defaultValue="2024-25" />
            </div>
            <div className="space-y-1.5">
              <Label>Session Start</Label>
              <Input defaultValue="01/04/2024" />
            </div>
            <div className="space-y-1.5">
              <Label>Session End</Label>
              <Input defaultValue="31/03/2025" />
            </div>
            <div className="space-y-1.5">
              <Label>Working Days</Label>
              <Input defaultValue="220" />
            </div>
          </div>
          <Button
            className="mt-4"
            onClick={() => toast.success("Academic year updated!")}
          >
            <Save size={16} className="mr-2" /> Update
          </Button>
        </TabsContent>

        <TabsContent
          value="users"
          className="bg-card border border-border rounded-2xl p-6 shadow-card mt-4"
        >
          <DataTable
            data={mockStaff}
            columns={[
              { key: "name", header: "Name" },
              { key: "empId", header: "Employee ID" },
              { key: "role", header: "Role" },
              { key: "status", header: "Status" },
            ]}
            searchKeys={["name", "empId", "role"]}
          />
        </TabsContent>

        <TabsContent
          value="integrations"
          className="bg-card border border-border rounded-2xl p-6 shadow-card mt-4"
        >
          <div className="space-y-4 max-w-md">
            <h3 className="font-heading font-semibold text-foreground">
              Razorpay Configuration
            </h3>
            <div className="space-y-1.5">
              <Label>API Key ID</Label>
              <Input
                data-ocid="settings.razorpay_key.input"
                placeholder="rzp_live_xxxxxxx"
              />
            </div>
            <div className="space-y-1.5">
              <Label>API Key Secret</Label>
              <Input type="password" placeholder="••••••••••••" />
            </div>
            <div className="space-y-1.5">
              <Label>SMS API Key</Label>
              <Input placeholder="SMS gateway API key" />
            </div>
            <div className="space-y-1.5">
              <Label>WhatsApp Business API</Label>
              <Input placeholder="WhatsApp API key" />
            </div>
            <Button
              data-ocid="settings.integrations.button"
              onClick={() => toast.success("Integration config saved!")}
            >
              <Save size={16} className="mr-2" /> Save Integrations
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
