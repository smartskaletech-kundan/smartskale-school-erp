import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

export interface Notification {
  id: string;
  type: "fee" | "homework" | "exam" | "ptm" | "message" | "alert";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    type: "fee",
    title: "Fee Due Reminder",
    message: "Tuition fee due on 10th March",
    time: "2 min ago",
    read: false,
  },
  {
    id: "2",
    type: "homework",
    title: "New Homework",
    message: "Maths Ch.5 homework posted by Mr. Anil",
    time: "25 min ago",
    read: false,
  },
  {
    id: "3",
    type: "exam",
    title: "Exam Schedule",
    message: "Half-yearly exams start from 15th March",
    time: "1 hr ago",
    read: false,
  },
  {
    id: "4",
    type: "ptm",
    title: "PTM Scheduled",
    message: "Parent-Teacher Meeting on 20th March",
    time: "2 hr ago",
    read: true,
  },
  {
    id: "5",
    type: "message",
    title: "New Message",
    message: "Message from Class Teacher",
    time: "3 hr ago",
    read: true,
  },
  {
    id: "6",
    type: "alert",
    title: "Fee Overdue",
    message: "23 students have overdue fees",
    time: "Today",
    read: true,
  },
];

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAllRead: () => void;
  markRead: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  unreadCount: 0,
  markAllRead: () => {},
  markRead: () => {},
});

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(
    INITIAL_NOTIFICATIONS,
  );
  const unreadCount = notifications.filter((n) => !n.read).length;
  const markAllRead = () =>
    setNotifications((ns) => ns.map((n) => ({ ...n, read: true })));
  const markRead = (id: string) =>
    setNotifications((ns) =>
      ns.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );

  return (
    <NotificationContext.Provider
      value={{ notifications, unreadCount, markAllRead, markRead }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  return useContext(NotificationContext);
}
