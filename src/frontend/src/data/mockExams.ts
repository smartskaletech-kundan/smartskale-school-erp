export interface Exam {
  id: string;
  name: string;
  type: "Unit Test" | "Half Yearly" | "Annual" | "Pre-Board";
  classes: string[];
  startDate: string;
  endDate: string;
  status: "Upcoming" | "Ongoing" | "Completed";
}

export interface ExamResult {
  studentId: string;
  studentName: string;
  examId: string;
  subjects: {
    name: string;
    maxMarks: number;
    obtained: number;
    grade: string;
  }[];
  total: number;
  maxTotal: number;
  percentage: number;
  grade: string;
  rank: number;
  remarks: string;
}

export const mockExams: Exam[] = [
  {
    id: "e1",
    name: "Unit Test 1",
    type: "Unit Test",
    classes: ["6", "7", "8", "9", "10", "11", "12"],
    startDate: "20/04/2024",
    endDate: "25/04/2024",
    status: "Completed",
  },
  {
    id: "e2",
    name: "Half Yearly Exam",
    type: "Half Yearly",
    classes: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    startDate: "15/09/2024",
    endDate: "25/09/2024",
    status: "Completed",
  },
  {
    id: "e3",
    name: "Unit Test 2",
    type: "Unit Test",
    classes: ["6", "7", "8", "9", "10", "11", "12"],
    startDate: "15/11/2024",
    endDate: "20/11/2024",
    status: "Completed",
  },
  {
    id: "e4",
    name: "Pre-Board Exam",
    type: "Pre-Board",
    classes: ["10", "12"],
    startDate: "15/01/2025",
    endDate: "25/01/2025",
    status: "Upcoming",
  },
  {
    id: "e5",
    name: "Annual Exam",
    type: "Annual",
    classes: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    startDate: "15/03/2025",
    endDate: "30/03/2025",
    status: "Upcoming",
  },
];

export const mockResults: ExamResult[] = [
  {
    studentId: "s1",
    studentName: "Rahul Kumar",
    examId: "e2",
    subjects: [
      { name: "Mathematics", maxMarks: 100, obtained: 88, grade: "A" },
      { name: "Science", maxMarks: 100, obtained: 82, grade: "A" },
      { name: "English", maxMarks: 100, obtained: 76, grade: "B+" },
      { name: "Hindi", maxMarks: 100, obtained: 90, grade: "A+" },
      { name: "Social Science", maxMarks: 100, obtained: 79, grade: "B+" },
    ],
    total: 415,
    maxTotal: 500,
    percentage: 83.0,
    grade: "A",
    rank: 3,
    remarks: "Excellent performance. Keep it up!",
  },
];
