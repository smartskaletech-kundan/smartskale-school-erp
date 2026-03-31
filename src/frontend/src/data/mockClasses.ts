export interface LiveClass {
  id: string;
  subject: string;
  teacher: string;
  class: string;
  date: string;
  time: string;
  duration: string;
  link: string;
  status: "Live" | "Upcoming" | "Ended";
}

export interface RecordedClass {
  id: string;
  title: string;
  subject: string;
  teacher: string;
  class: string;
  duration: string;
  uploadDate: string;
  views: number;
  thumbnail?: string;
}

export const mockLiveClasses: LiveClass[] = [
  {
    id: "lc1",
    subject: "Mathematics",
    teacher: "Mr. Anil Kumar",
    class: "10-A",
    date: "25/03/2024",
    time: "10:00 AM",
    duration: "60 min",
    link: "https://meet.google.com/abc-def-ghi",
    status: "Live",
  },
  {
    id: "lc2",
    subject: "Science",
    teacher: "Mr. Rakesh Sharma",
    class: "9-B",
    date: "25/03/2024",
    time: "11:30 AM",
    duration: "45 min",
    link: "https://zoom.us/j/123456789",
    status: "Upcoming",
  },
  {
    id: "lc3",
    subject: "English",
    teacher: "Mrs. Priya Verma",
    class: "8-A",
    date: "25/03/2024",
    time: "2:00 PM",
    duration: "45 min",
    link: "https://meet.google.com/xyz-uvw-rst",
    status: "Upcoming",
  },
];

export const mockRecordedClasses: RecordedClass[] = [
  {
    id: "rc1",
    title: "Quadratic Equations - Part 1",
    subject: "Mathematics",
    teacher: "Mr. Anil Kumar",
    class: "10-A",
    duration: "52:30",
    uploadDate: "20/03/2024",
    views: 145,
  },
  {
    id: "rc2",
    title: "Chemical Reactions & Equations",
    subject: "Science",
    teacher: "Mr. Rakesh Sharma",
    class: "9-B",
    duration: "48:15",
    uploadDate: "19/03/2024",
    views: 98,
  },
  {
    id: "rc3",
    title: "The Road Not Taken - Analysis",
    subject: "English",
    teacher: "Mrs. Priya Verma",
    class: "8-A",
    duration: "35:00",
    uploadDate: "18/03/2024",
    views: 76,
  },
  {
    id: "rc4",
    title: "Trigonometry Basics",
    subject: "Mathematics",
    teacher: "Mr. Anil Kumar",
    class: "11-B",
    duration: "65:00",
    uploadDate: "17/03/2024",
    views: 112,
  },
  {
    id: "rc5",
    title: "Heredity and Evolution",
    subject: "Science",
    teacher: "Mr. Rakesh Sharma",
    class: "10-A",
    duration: "42:20",
    uploadDate: "16/03/2024",
    views: 89,
  },
];

export const timetableData: Record<string, Record<string, string>> = {
  Monday: {
    "Period 1": "Mathematics (Mr. Anil)",
    "Period 2": "English (Mrs. Priya)",
    "Period 3": "Science (Mr. Rakesh)",
    "Period 4": "Hindi (Mrs. Sunita)",
    "Period 5": "Social Science (Mr. Vivek)",
    "Period 6": "Computer (Mr. Deepak)",
    "Period 7": "Art (Mrs. Meena)",
    "Period 8": "Sports",
  },
  Tuesday: {
    "Period 1": "Hindi (Mrs. Sunita)",
    "Period 2": "Mathematics (Mr. Anil)",
    "Period 3": "Social Science (Mr. Vivek)",
    "Period 4": "Science (Mr. Rakesh)",
    "Period 5": "Sanskrit (Mrs. Rekha)",
    "Period 6": "English (Mrs. Priya)",
    "Period 7": "Computer (Mr. Deepak)",
    "Period 8": "Library",
  },
  Wednesday: {
    "Period 1": "Science (Mr. Rakesh)",
    "Period 2": "Hindi (Mrs. Sunita)",
    "Period 3": "Mathematics (Mr. Anil)",
    "Period 4": "English (Mrs. Priya)",
    "Period 5": "Computer (Mr. Deepak)",
    "Period 6": "Sanskrit (Mrs. Rekha)",
    "Period 7": "Social Science (Mr. Vivek)",
    "Period 8": "Sports",
  },
  Thursday: {
    "Period 1": "English (Mrs. Priya)",
    "Period 2": "Science (Mr. Rakesh)",
    "Period 3": "Hindi (Mrs. Sunita)",
    "Period 4": "Mathematics (Mr. Anil)",
    "Period 5": "Art (Mrs. Meena)",
    "Period 6": "Social Science (Mr. Vivek)",
    "Period 7": "Sanskrit (Mrs. Rekha)",
    "Period 8": "Library",
  },
  Friday: {
    "Period 1": "Computer (Mr. Deepak)",
    "Period 2": "Mathematics (Mr. Anil)",
    "Period 3": "English (Mrs. Priya)",
    "Period 4": "Science (Mr. Rakesh)",
    "Period 5": "Hindi (Mrs. Sunita)",
    "Period 6": "Mathematics (Mr. Anil)",
    "Period 7": "Social Science (Mr. Vivek)",
    "Period 8": "Sports",
  },
  Saturday: {
    "Period 1": "Sanskrit (Mrs. Rekha)",
    "Period 2": "Hindi (Mrs. Sunita)",
    "Period 3": "Art (Mrs. Meena)",
    "Period 4": "Mathematics (Mr. Anil)",
    "Period 5": "English (Mrs. Priya)",
    "Period 6": "Computer (Mr. Deepak)",
    "Period 7": "Assembly",
    "Period 8": "Games",
  },
};
