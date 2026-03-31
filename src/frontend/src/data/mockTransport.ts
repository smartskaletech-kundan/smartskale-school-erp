export interface TransportRoute {
  id: string;
  routeNo: string;
  name: string;
  stops: string[];
  driver: string;
  driverMobile: string;
  vehicle: string;
  vehicleNo: string;
  capacity: number;
  enrolled: number;
  timing: string;
}

export const mockRoutes: TransportRoute[] = [
  {
    id: "r1",
    routeNo: "R01",
    name: "Patna Sahib Route",
    stops: ["Patna Sahib", "Rajendra Nagar", "Gandhi Maidan", "Bailey Road"],
    driver: "Ram Babu",
    driverMobile: "+91 98765 00001",
    vehicle: "Bus",
    vehicleNo: "BR-01-PA-1234",
    capacity: 50,
    enrolled: 42,
    timing: "7:00 AM - 8:00 AM",
  },
  {
    id: "r2",
    routeNo: "R02",
    name: "Danapur Route",
    stops: ["Danapur", "Phulwari", "Anisabad", "Bailey Road"],
    driver: "Shyam Lal",
    driverMobile: "+91 98765 00002",
    vehicle: "Bus",
    vehicleNo: "BR-01-PA-5678",
    capacity: 48,
    enrolled: 38,
    timing: "6:45 AM - 8:00 AM",
  },
  {
    id: "r3",
    routeNo: "R03",
    name: "Khagaul Route",
    stops: ["Khagaul", "Naubatpur", "Bypass", "Bailey Road"],
    driver: "Ramu Singh",
    driverMobile: "+91 98765 00003",
    vehicle: "Mini Bus",
    vehicleNo: "BR-01-PA-9012",
    capacity: 35,
    enrolled: 30,
    timing: "7:15 AM - 8:00 AM",
  },
  {
    id: "r4",
    routeNo: "R04",
    name: "Muzaffarpur Express",
    stops: ["Hazipur", "Vaishali", "Patna Junction", "Bailey Road"],
    driver: "Birju Yadav",
    driverMobile: "+91 98765 00004",
    vehicle: "Bus",
    vehicleNo: "BR-01-PA-3456",
    capacity: 55,
    enrolled: 25,
    timing: "6:30 AM - 8:00 AM",
  },
];
