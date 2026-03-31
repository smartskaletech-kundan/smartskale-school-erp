import { Input } from "@/components/ui/input";
import { Search, Send } from "lucide-react";
import React, { useState } from "react";

const conversations = [
  {
    id: "c1",
    name: "Mr. Anil Kumar",
    role: "Math Teacher",
    lastMsg: "Please ensure Rahul completes the homework",
    time: "2:30 PM",
    unread: 2,
    avatar: "A",
  },
  {
    id: "c2",
    name: "Mrs. Priya Verma",
    role: "English Teacher",
    lastMsg: "Project submission deadline is tomorrow",
    time: "11:00 AM",
    unread: 0,
    avatar: "P",
  },
  {
    id: "c3",
    name: "School Admin",
    role: "Administration",
    lastMsg: "Fee receipt for March has been generated",
    time: "Yesterday",
    unread: 1,
    avatar: "S",
  },
  {
    id: "c4",
    name: "Mr. Rakesh Sharma",
    role: "Science Teacher",
    lastMsg: "Science project topic approved",
    time: "Mon",
    unread: 0,
    avatar: "R",
  },
];

const initialMessages: Record<
  string,
  { from: string; text: string; time: string; sent: boolean }[]
> = {
  c1: [
    {
      from: "Mr. Anil Kumar",
      text: "Good afternoon! I wanted to discuss Rahul's progress in Mathematics.",
      time: "2:10 PM",
      sent: false,
    },
    {
      from: "Me",
      text: "Good afternoon Sir! Yes, please go ahead.",
      time: "2:15 PM",
      sent: true,
    },
    {
      from: "Mr. Anil Kumar",
      text: "Rahul is doing well in class but needs to complete homework regularly.",
      time: "2:25 PM",
      sent: false,
    },
    {
      from: "Mr. Anil Kumar",
      text: "Please ensure Rahul completes the homework",
      time: "2:30 PM",
      sent: false,
    },
  ],
};

export function MessagesPage() {
  const [activeConv, setActiveConv] = useState("c1");
  const [messages, setMessages] = useState(initialMessages);
  const [newMsg, setNewMsg] = useState("");

  const currentMessages = messages[activeConv] || [];
  const currentConv = conversations.find((c) => c.id === activeConv);

  const sendMessage = () => {
    if (!newMsg.trim()) return;
    setMessages((prev) => ({
      ...prev,
      [activeConv]: [
        ...(prev[activeConv] || []),
        {
          from: "Me",
          text: newMsg,
          time: new Date().toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          sent: true,
        },
      ],
    }));
    setNewMsg("");
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col">
      <div className="mb-4">
        <h1 className="text-2xl font-heading font-bold text-foreground">
          Messages
        </h1>
      </div>
      <div className="flex-1 flex bg-card border border-border rounded-2xl shadow-card overflow-hidden">
        {/* Sidebar */}
        <div className="w-72 border-r border-border flex flex-col">
          <div className="p-3 border-b border-border">
            <div className="relative">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                placeholder="Search messages"
                className="pl-8 h-8 text-sm"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conv) => (
              <button
                type="button"
                data-ocid={`messages.conversation.item.${conv.id}`}
                key={conv.id}
                onClick={() => setActiveConv(conv.id)}
                className={`w-full px-4 py-3 flex items-start gap-3 hover:bg-muted/50 transition-colors border-b border-border last:border-0 ${
                  activeConv === conv.id ? "bg-primary/5" : ""
                }`}
              >
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm flex-shrink-0">
                  {conv.avatar}
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex justify-between">
                    <p className="text-sm font-semibold text-foreground truncate">
                      {conv.name}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {conv.time}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {conv.lastMsg}
                  </p>
                </div>
                {conv.unread > 0 && (
                  <span className="w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    {conv.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          <div className="px-4 py-3 border-b border-border flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
              {currentConv?.avatar}
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm">
                {currentConv?.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {currentConv?.role}
              </p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {currentMessages.map((msg, i) => (
              <div
                data-ocid={`messages.message.item.${i + 1}`}
                key={`${msg.from}-${msg.time}`}
                className={`flex ${msg.sent ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs rounded-2xl px-4 py-2 ${
                    msg.sent
                      ? "bg-primary text-primary-foreground rounded-tr-sm"
                      : "bg-muted text-foreground rounded-tl-sm"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p
                    className={`text-xs mt-1 ${msg.sent ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                  >
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-border flex gap-2">
            <Input
              data-ocid="messages.message.input"
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              className="flex-1"
            />
            <button
              type="button"
              data-ocid="messages.send.button"
              onClick={sendMessage}
              className="p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
