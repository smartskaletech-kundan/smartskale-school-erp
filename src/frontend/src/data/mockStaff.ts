export interface StaffMember {
  id: string;
  empId: string;
  name: string;
  role: string;
  subject?: string;
  mobile: string;
  email: string;
  qualification: string;
  salary: number;
  joinDate: string;
  status: "Active" | "On Leave" | "Inactive";
  department: string;
}

export const mockStaff: StaffMember[] = [
  {
    id: "t1",
    empId: "T001",
    name: "Mr. Anil Kumar",
    role: "Senior Teacher",
    subject: "Mathematics",
    mobile: "+91 98765 11111",
    email: "anil@school.com",
    qualification: "M.Sc, B.Ed",
    salary: 45000,
    joinDate: "01/07/2015",
    status: "Active",
    department: "Science",
  },
  {
    id: "t2",
    empId: "T002",
    name: "Mrs. Sunita Devi",
    role: "Teacher",
    subject: "Hindi",
    mobile: "+91 98765 22222",
    email: "sunita@school.com",
    qualification: "M.A., B.Ed",
    salary: 38000,
    joinDate: "01/08/2016",
    status: "Active",
    department: "Languages",
  },
  {
    id: "t3",
    empId: "T003",
    name: "Mr. Rakesh Sharma",
    role: "Teacher",
    subject: "Science",
    mobile: "+91 98765 33333",
    email: "rakesh@school.com",
    qualification: "M.Sc, B.Ed",
    salary: 40000,
    joinDate: "01/06/2018",
    status: "Active",
    department: "Science",
  },
  {
    id: "t4",
    empId: "T004",
    name: "Mrs. Priya Verma",
    role: "Teacher",
    subject: "English",
    mobile: "+91 98765 44444",
    email: "priya@school.com",
    qualification: "M.A. English, B.Ed",
    salary: 38000,
    joinDate: "15/09/2019",
    status: "Active",
    department: "Languages",
  },
  {
    id: "t5",
    empId: "T005",
    name: "Mr. Vivek Singh",
    role: "Teacher",
    subject: "Social Science",
    mobile: "+91 98765 55555",
    email: "vivek@school.com",
    qualification: "M.A., B.Ed",
    salary: 36000,
    joinDate: "01/04/2020",
    status: "On Leave",
    department: "Social Studies",
  },
  {
    id: "t6",
    empId: "T006",
    name: "Mrs. Rekha Gupta",
    role: "Senior Teacher",
    subject: "Sanskrit",
    mobile: "+91 98765 66666",
    email: "rekha@school.com",
    qualification: "M.A. Sanskrit, B.Ed",
    salary: 42000,
    joinDate: "01/07/2012",
    status: "Active",
    department: "Languages",
  },
  {
    id: "t7",
    empId: "T007",
    name: "Mr. Deepak Pandey",
    role: "Teacher",
    subject: "Computer Science",
    mobile: "+91 98765 77777",
    email: "deepak@school.com",
    qualification: "MCA, B.Ed",
    salary: 41000,
    joinDate: "01/01/2021",
    status: "Active",
    department: "Computer",
  },
  {
    id: "t8",
    empId: "T008",
    name: "Mrs. Meena Tiwari",
    role: "Teacher",
    subject: "Art & Craft",
    mobile: "+91 98765 88888",
    email: "meena@school.com",
    qualification: "B.F.A., D.Ed",
    salary: 30000,
    joinDate: "01/04/2022",
    status: "Active",
    department: "Arts",
  },
];
