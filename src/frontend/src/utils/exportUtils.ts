import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

const SCHOOL_NAME = "Saraswati Public School";
const SCHOOL_ADDRESS = "Bailey Road, Patna - 800001, Bihar | CBSE Affiliation";

export function exportToExcel(
  data: Record<string, unknown>[],
  filename: string,
  sheetName = "Sheet1",
) {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  XLSX.writeFile(wb, `${filename}.xlsx`);
}

export function exportToPDF(
  title: string,
  columns: string[],
  rows: (string | number)[][],
  filename: string,
) {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.setTextColor(30, 27, 75);
  doc.text(SCHOOL_NAME, 14, 15);
  doc.setFontSize(9);
  doc.setTextColor(100);
  doc.text(SCHOOL_ADDRESS, 14, 22);
  doc.setFontSize(13);
  doc.setTextColor(30, 27, 75);
  doc.text(title, 14, 32);
  doc.setFontSize(9);
  doc.setTextColor(120);
  doc.text(`Generated: ${new Date().toLocaleDateString("en-IN")}`, 14, 38);
  autoTable(doc, {
    head: [columns],
    body: rows,
    startY: 43,
    headStyles: { fillColor: [30, 27, 75], textColor: 255, fontSize: 9 },
    bodyStyles: { fontSize: 8 },
    alternateRowStyles: { fillColor: [245, 247, 255] },
  });
  doc.save(`${filename}.pdf`);
}

export function downloadSampleExcelTemplate() {
  const sample = [
    {
      "Admission No": "SPK/2024/001",
      Name: "Rahul Kumar",
      Class: "10",
      Section: "A",
      "Father's Name": "Suresh Kumar",
      "Mother's Name": "Sunita Devi",
      Mobile: "9876543210",
      Email: "rahul@example.com",
      DOB: "15/03/2010",
      Category: "General",
      Address: "Bailey Road, Patna",
    },
  ];
  exportToExcel(sample, "student_import_template", "Students");
}
