export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  publisher: string;
  category: string;
  totalCopies: number;
  availableCopies: number;
  issuedTo?: string;
  dueDate?: string;
}

export interface BookIssue {
  id: string;
  bookId: string;
  bookTitle: string;
  studentId: string;
  studentName: string;
  class: string;
  issueDate: string;
  dueDate: string;
  returnDate?: string;
  fine: number;
  status: "Issued" | "Returned" | "Overdue";
}

export const mockBooks: Book[] = [
  {
    id: "b1",
    title: "Mathematics Class 10",
    author: "R.D. Sharma",
    isbn: "978-81-219-0001-1",
    publisher: "Dhanpat Rai",
    category: "Textbook",
    totalCopies: 50,
    availableCopies: 38,
  },
  {
    id: "b2",
    title: "Science Class 9",
    author: "NCERT",
    isbn: "978-81-7450-002-2",
    publisher: "NCERT",
    category: "Textbook",
    totalCopies: 45,
    availableCopies: 32,
  },
  {
    id: "b3",
    title: "Wings of Fire",
    author: "A.P.J. Abdul Kalam",
    isbn: "978-81-7371-146-6",
    publisher: "Orient Paperbacks",
    category: "Biography",
    totalCopies: 10,
    availableCopies: 7,
  },
  {
    id: "b4",
    title: "English Grammar",
    author: "Wren & Martin",
    isbn: "978-93-5510-003-3",
    publisher: "S. Chand",
    category: "Reference",
    totalCopies: 30,
    availableCopies: 22,
  },
  {
    id: "b5",
    title: "Hindi Sahitya",
    author: "Various Authors",
    isbn: "978-81-7450-004-4",
    publisher: "NCERT",
    category: "Textbook",
    totalCopies: 40,
    availableCopies: 35,
  },
  {
    id: "b6",
    title: "Physics Concepts",
    author: "H.C. Verma",
    isbn: "978-81-7755-005-5",
    publisher: "Bharati Bhawan",
    category: "Reference",
    totalCopies: 20,
    availableCopies: 15,
  },
  {
    id: "b7",
    title: "The Alchemist",
    author: "Paulo Coelho",
    isbn: "978-0-06-231500-7",
    publisher: "HarperCollins",
    category: "Fiction",
    totalCopies: 8,
    availableCopies: 5,
  },
  {
    id: "b8",
    title: "Computer Science Class 12",
    author: "Sumita Arora",
    isbn: "978-93-5910-006-6",
    publisher: "Dhanpat Rai",
    category: "Textbook",
    totalCopies: 35,
    availableCopies: 28,
  },
];

export const mockIssues: BookIssue[] = [
  {
    id: "i1",
    bookId: "b3",
    bookTitle: "Wings of Fire",
    studentId: "s1",
    studentName: "Rahul Kumar",
    class: "10-A",
    issueDate: "01/03/2024",
    dueDate: "15/03/2024",
    fine: 0,
    status: "Issued",
  },
  {
    id: "i2",
    bookId: "b4",
    bookTitle: "English Grammar",
    studentId: "s2",
    studentName: "Priya Singh",
    class: "9-B",
    issueDate: "20/02/2024",
    dueDate: "05/03/2024",
    returnDate: "03/03/2024",
    fine: 0,
    status: "Returned",
  },
  {
    id: "i3",
    bookId: "b6",
    bookTitle: "Physics Concepts",
    studentId: "s3",
    studentName: "Aman Verma",
    class: "12-A",
    issueDate: "10/02/2024",
    dueDate: "24/02/2024",
    fine: 30,
    status: "Overdue",
  },
];
