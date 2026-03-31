import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";

const spendingData = [
  { month: "Oct", amount: 142000 },
  { month: "Nov", amount: 168000 },
  { month: "Dec", amount: 195000 },
  { month: "Jan", amount: 122000 },
  { month: "Feb", amount: 158000 },
  { month: "Mar", amount: 187500 },
];

const purchaseOrders = [
  {
    id: "po1",
    vendor: "Rathi Stationery Pvt. Ltd.",
    item: "Notebooks & Stationery",
    amount: 48500,
    date: "15/03/2024",
    status: "Approved",
  },
  {
    id: "po2",
    vendor: "Bihar Lab Supplies",
    item: "Science Lab Equipment",
    amount: 32000,
    date: "14/03/2024",
    status: "Pending",
  },
  {
    id: "po3",
    vendor: "Patna Book Depot",
    item: "Library Books (Batch)",
    amount: 21500,
    date: "12/03/2024",
    status: "Delivered",
  },
  {
    id: "po4",
    vendor: "TechWorld Electronics",
    item: "Computer Peripherals",
    amount: 67000,
    date: "10/03/2024",
    status: "Approved",
  },
  {
    id: "po5",
    vendor: "Green Gardens",
    item: "Gardening & Maintenance",
    amount: 8500,
    date: "08/03/2024",
    status: "Pending",
  },
  {
    id: "po6",
    vendor: "SafeGuard Security",
    item: "CCTV Camera Maintenance",
    amount: 12000,
    date: "05/03/2024",
    status: "Delivered",
  },
  {
    id: "po7",
    vendor: "Foodrite Canteen",
    item: "Canteen Monthly Contract",
    amount: 45000,
    date: "01/03/2024",
    status: "Paid",
  },
  {
    id: "po8",
    vendor: "Sparkling Clean",
    item: "Housekeeping Services",
    amount: 22000,
    date: "01/03/2024",
    status: "Paid",
  },
];

const fmt = (n: number) => `\u20B9${n.toLocaleString("en-IN")}`;

export function VendorDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">
          Vendor Dashboard
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Purchase orders, vendor management, and spending overview
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Registered Vendors</p>
            <p className="text-2xl font-heading font-bold mt-1">24</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Pending POs</p>
            <p className="text-2xl font-heading font-bold text-amber-600 mt-1">
              7
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Bills Due (Week)</p>
            <p className="text-2xl font-heading font-bold text-rose-600 mt-1">
              {fmt(87500)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Total Spend (Mar)</p>
            <p className="text-2xl font-heading font-bold text-blue-600 mt-1">
              {fmt(187500)}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          data-ocid="vendor.new_po.button"
          onClick={() => toast.success("New PO form — coming soon")}
          className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90"
        >
          New PO
        </button>
        <button
          type="button"
          data-ocid="vendor.register.button"
          onClick={() =>
            toast.success("Vendor registration form — coming soon")
          }
          className="inline-flex items-center px-4 py-2 border rounded-lg text-sm font-medium hover:bg-muted"
        >
          Register Vendor
        </button>
        <button
          type="button"
          data-ocid="vendor.pay_bill.button"
          onClick={() => toast.success("Bill payment — coming soon")}
          className="inline-flex items-center px-4 py-2 border rounded-lg text-sm font-medium hover:bg-muted"
        >
          Pay Bill
        </button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Monthly Spending (Last 6 Months)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={spendingData}>
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                tick={{ fontSize: 11 }}
              />
              <Tooltip formatter={(v: number) => fmt(v)} />
              <Bar
                dataKey="amount"
                name="Spending"
                fill="#8B5CF6"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent Purchase Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 font-medium text-muted-foreground">
                    Vendor
                  </th>
                  <th className="text-left py-2 font-medium text-muted-foreground">
                    Item
                  </th>
                  <th className="text-right py-2 font-medium text-muted-foreground">
                    Amount
                  </th>
                  <th className="text-left py-2 font-medium text-muted-foreground">
                    Date
                  </th>
                  <th className="text-left py-2 font-medium text-muted-foreground">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {purchaseOrders.map((row, i) => (
                  <tr
                    key={row.id}
                    data-ocid={`vendor.item.${i + 1}`}
                    className="border-b last:border-0 hover:bg-muted/30"
                  >
                    <td className="py-2.5 font-medium text-xs">{row.vendor}</td>
                    <td className="py-2.5 text-muted-foreground text-xs">
                      {row.item}
                    </td>
                    <td className="py-2.5 text-right font-medium">
                      {fmt(row.amount)}
                    </td>
                    <td className="py-2.5 text-muted-foreground">{row.date}</td>
                    <td className="py-2.5">
                      <Badge
                        variant={
                          row.status === "Paid" || row.status === "Delivered"
                            ? "default"
                            : row.status === "Approved"
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
    </div>
  );
}
