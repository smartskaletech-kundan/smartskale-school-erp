import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockBooks } from "@/data/mockLibrary";
import { mockStudents } from "@/data/mockStudents";
import { useState } from "react";
import { toast } from "sonner";

export function LibraryIssue() {
  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<string>("none");
  const [selectedBook, setSelectedBook] = useState<string>("none");
  const [dueDate, setDueDate] = useState("");

  const filteredStudents = mockStudents.filter(
    (s) =>
      search.length > 1 &&
      (s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.admissionNo.toLowerCase().includes(search.toLowerCase())),
  );

  const availableBooks = mockBooks.filter((b) => b.availableCopies > 0);

  const handleIssue = () => {
    if (selectedStudent === "none" || selectedBook === "none" || !dueDate) {
      toast.error("Please fill all fields before issuing.");
      return;
    }
    const student = mockStudents.find((s) => s.id === selectedStudent);
    const book = mockBooks.find((b) => b.id === selectedBook);
    toast.success(
      `Book "${book?.title}" issued to ${student?.name} successfully!`,
    );
    setSelectedStudent("none");
    setSelectedBook("none");
    setDueDate("");
    setSearch("");
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">
          Issue Book
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Search student and issue a book with due date
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Book Issue Form</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Search Student (Name or Admission No.)</Label>
            <Input
              data-ocid="library_issue.search_input"
              className="mt-1"
              placeholder="e.g. Rahul Kumar or 2024-1045"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {filteredStudents.length > 0 && (
              <div className="mt-1 border rounded-lg overflow-hidden">
                {filteredStudents.slice(0, 5).map((s) => (
                  <button
                    type="button"
                    key={s.id}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-muted/50 transition-colors ${selectedStudent === s.id ? "bg-primary/10 font-medium" : ""}`}
                    onClick={() => {
                      setSelectedStudent(s.id);
                      setSearch(s.name);
                    }}
                  >
                    {s.name} — {s.admissionNo} — Class {s.class}-{s.section}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <Label>Select Book</Label>
            <Select value={selectedBook} onValueChange={setSelectedBook}>
              <SelectTrigger
                data-ocid="library_issue.book.select"
                className="mt-1"
              >
                <SelectValue placeholder="Choose a book..." />
              </SelectTrigger>
              <SelectContent>
                {availableBooks.map((b) => (
                  <SelectItem key={b.id} value={b.id}>
                    {b.title} — {b.author} ({b.availableCopies} available)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Due Date</Label>
            <Input
              data-ocid="library_issue.due_date.input"
              type="date"
              className="mt-1"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <Button
            data-ocid="library_issue.submit_button"
            className="w-full"
            onClick={handleIssue}
          >
            Issue Book
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
