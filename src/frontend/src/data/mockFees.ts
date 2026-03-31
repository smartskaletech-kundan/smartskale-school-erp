export interface FeeTransaction {
  id: string;
  receiptNo: string;
  studentId: string;
  studentName: string;
  class: string;
  amount: number;
  method: "Cash" | "UPI" | "Card" | "Net Banking";
  status: "Paid" | "Pending" | "Overdue" | "Partial";
  date: string;
  feeHead: string;
  month?: string;
}

export interface FeeStructureItem {
  id: string;
  head: string;
  class: string;
  amount: number;
  frequency: "Monthly" | "Annual" | "One-time";
  category: string;
}

export const mockTransactions: FeeTransaction[] = [
  {
    id: "f1",
    receiptNo: "RCP-2024-0892",
    studentId: "s1",
    studentName: "Rahul Kumar",
    class: "10-A",
    amount: 4550,
    method: "UPI",
    status: "Paid",
    date: "05/03/2024",
    feeHead: "Tuition + Transport",
    month: "March",
  },
  {
    id: "f2",
    receiptNo: "RCP-2024-0893",
    studentId: "s2",
    studentName: "Priya Singh",
    class: "9-B",
    amount: 2500,
    method: "Cash",
    status: "Paid",
    date: "08/03/2024",
    feeHead: "Tuition Fee",
    month: "March",
  },
  {
    id: "f3",
    receiptNo: "RCP-2024-0894",
    studentId: "s3",
    studentName: "Aman Verma",
    class: "12-A",
    amount: 3000,
    method: "Card",
    status: "Paid",
    date: "02/03/2024",
    feeHead: "Tuition + Computer",
    month: "March",
  },
  {
    id: "f4",
    receiptNo: "RCP-2024-0895",
    studentId: "s4",
    studentName: "Anjali Sharma",
    class: "8-A",
    amount: 3200,
    method: "UPI",
    status: "Partial",
    date: "12/03/2024",
    feeHead: "Tuition Fee",
    month: "March",
  },
  {
    id: "f5",
    receiptNo: "RCP-2024-0896",
    studentId: "s5",
    studentName: "Rohan Gupta",
    class: "11-B",
    amount: 1800,
    method: "Net Banking",
    status: "Pending",
    date: "15/03/2024",
    feeHead: "Tuition Fee",
    month: "March",
  },
  {
    id: "f6",
    receiptNo: "RCP-2024-0897",
    studentId: "s6",
    studentName: "Kavya Yadav",
    class: "7-A",
    amount: 1500,
    method: "Cash",
    status: "Overdue",
    date: "18/03/2024",
    feeHead: "Tuition Fee",
    month: "February",
  },
  {
    id: "f7",
    receiptNo: "RCP-2024-0898",
    studentId: "s7",
    studentName: "Mohit Tiwari",
    class: "6-B",
    amount: 800,
    method: "UPI",
    status: "Paid",
    date: "03/03/2024",
    feeHead: "Transport",
    month: "March",
  },
  {
    id: "f8",
    receiptNo: "RCP-2024-0899",
    studentId: "s8",
    studentName: "Sneha Pandey",
    class: "5-A",
    amount: 2200,
    method: "Cash",
    status: "Paid",
    date: "01/03/2024",
    feeHead: "Tuition Fee",
    month: "March",
  },
];

export const feeStructure: FeeStructureItem[] = [
  {
    id: "fs1",
    head: "Tuition Fee",
    class: "10",
    amount: 2500,
    frequency: "Monthly",
    category: "Academic",
  },
  {
    id: "fs2",
    head: "Annual Development",
    class: "10",
    amount: 1000,
    frequency: "Annual",
    category: "Development",
  },
  {
    id: "fs3",
    head: "Computer Fee",
    class: "10",
    amount: 500,
    frequency: "Monthly",
    category: "Academic",
  },
  {
    id: "fs4",
    head: "Library Fee",
    class: "10",
    amount: 200,
    frequency: "Annual",
    category: "Academic",
  },
  {
    id: "fs5",
    head: "Transport (Patna Sahib)",
    class: "10",
    amount: 800,
    frequency: "Monthly",
    category: "Transport",
  },
  {
    id: "fs6",
    head: "Tuition Fee",
    class: "9",
    amount: 2200,
    frequency: "Monthly",
    category: "Academic",
  },
  {
    id: "fs7",
    head: "Transport (Danapur)",
    class: "9",
    amount: 700,
    frequency: "Monthly",
    category: "Transport",
  },
  {
    id: "fs8",
    head: "Tuition Fee",
    class: "12",
    amount: 3000,
    frequency: "Monthly",
    category: "Academic",
  },
];

export const monthlyCollectionData = [
  { month: "Apr", amount: 645000 },
  { month: "May", amount: 712000 },
  { month: "Jun", amount: 689000 },
  { month: "Jul", amount: 798000 },
  { month: "Aug", amount: 724000 },
  { month: "Sep", amount: 845200 },
  { month: "Oct", amount: 756000 },
  { month: "Nov", amount: 823000 },
  { month: "Dec", amount: 701000 },
  { month: "Jan", amount: 798000 },
  { month: "Feb", amount: 834000 },
  { month: "Mar", amount: 845200 },
];
