# SmartSkale School ERP

## Current State

The app has a Students page with basic CSV export. No Excel (.xlsx) export or PDF export exists anywhere. No bulk import of students exists. The package.json does not include `xlsx` or `jspdf` libraries.

## Requested Changes (Diff)

### Add

1. **Bulk Student Import via Excel**
   - In `StudentsPage.tsx`: Add an "Import Students" button that opens a modal/dialog
   - Modal shows: download sample template button (generates a sample .xlsx with correct columns), file upload area (drag & drop or click), preview table of parsed rows, Import button
   - Parse uploaded Excel file using `xlsx` library, validate required fields (Name, Class, Section, Father's Name, Mobile), show row-level errors
   - On Import: add students to local state with toast "X students imported successfully"
   - Sample template columns: Admission No, Name, Class, Section, Father's Name, Mother's Name, Mobile, Email, DOB, Category, Address

2. **Export Utilities** (`src/frontend/src/utils/exportUtils.ts`)
   - `exportToExcel(data, filename, sheetName)` — uses `xlsx` to generate and download .xlsx file
   - `exportToPDF(title, columns, rows, filename)` — uses `jspdf` + `jspdf-autotable` to generate and download PDF with school header "Saraswati Public School, Bailey Road, Patna - 800001, Bihar"

3. **Add export buttons to ALL pages that have data tables or reports:**
   - `StudentsPage.tsx` — Export Excel + Export PDF buttons (replace/add to existing CSV export)
   - `StaffDirectory.tsx` — Export Excel + PDF
   - `FeeTransactions.tsx` — Export Excel + PDF
   - `FeeReminders.tsx` (pending defaulters) — Export Excel + PDF
   - `FeeReports.tsx` — Export Excel + PDF (make existing mock buttons functional)
   - `SalaryPage.tsx` — Export Excel + PDF
   - `LeavePage.tsx` — Export Excel + PDF
   - `AttendanceReports.tsx` — Export Excel + PDF
   - `ExamsPage.tsx` — Export Excel + PDF
   - `MarksEntry.tsx` — Export Excel + PDF
   - `LibraryPage.tsx` — Export Excel + PDF
   - `LibraryReturns.tsx` — Export Excel + PDF (overdue/fine report)
   - `LibraryReports.tsx` — Export Excel + PDF
   - `TransportRoutes.tsx` — Export Excel + PDF
   - `AccountantDashboard.tsx` — Export Excel + PDF for transactions
   - `ExamAnalytics.tsx` — Export PDF for analytics report

### Modify

- `package.json` — Add `xlsx` (sheetjs-style) and `jspdf` + `jspdf-autotable` dependencies

### Remove
- Replace the existing basic CSV export in StudentsPage with the proper Excel export

## Implementation Plan

1. Install `xlsx`, `jspdf`, `@types/jspdf` via package.json (add to dependencies)
2. Create `src/frontend/src/utils/exportUtils.ts` with `exportToExcel` and `exportToPDF` helpers
3. Build BulkImportModal component in StudentsPage
4. Update all data-table pages with Export Excel + PDF buttons
5. Validate build, fix any TypeScript errors
