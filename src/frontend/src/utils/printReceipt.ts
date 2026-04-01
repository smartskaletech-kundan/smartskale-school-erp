/**
 * Utility to print or download a fee receipt.
 * Uses a hidden iframe for printing and Blob URL for download.
 */

export interface ReceiptData {
  receiptNo: string;
  txnId?: string;
  studentName: string;
  studentClass: string;
  admissionNo: string;
  fatherName?: string;
  feeItems: { head: string; amount: number }[];
  lateFine?: number;
  totalAmount: number;
  paymentMethod: string;
  dateTime: string;
  collectedBy?: string;
}

const SCHOOL = {
  name: "Saraswati Public School",
  address: "Bailey Road, Patna - 800001, Bihar",
  phone: "+91-612-2345678",
  email: "info@saraswatischool.in",
  board: "CBSE",
  principal: "Dr. Rajesh Kumar Sharma",
};

function buildReceiptHTML(data: ReceiptData): string {
  const itemRows = data.feeItems
    .map(
      (item) =>
        `<tr>
          <td style="padding:6px 12px;border-bottom:1px solid #e5e7eb;">${item.head}</td>
          <td style="padding:6px 12px;border-bottom:1px solid #e5e7eb;text-align:right;">&#8377;${item.amount.toLocaleString("en-IN")}</td>
        </tr>`,
    )
    .join("");

  const lateFineRow =
    data.lateFine && data.lateFine > 0
      ? `<tr>
          <td style="padding:6px 12px;border-bottom:1px solid #e5e7eb;color:#dc2626;">Late Fine</td>
          <td style="padding:6px 12px;border-bottom:1px solid #e5e7eb;text-align:right;color:#dc2626;">&#8377;${data.lateFine.toLocaleString("en-IN")}</td>
        </tr>`
      : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Fee Receipt - ${data.receiptNo}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Arial, sans-serif; font-size: 13px; color: #111; background: #fff; }
    .page { width: 100%; max-width: 680px; margin: 0 auto; padding: 24px; }
    .header { text-align: center; border-bottom: 3px double #1e3a8a; padding-bottom: 14px; margin-bottom: 14px; }
    .school-name { font-size: 22px; font-weight: 800; color: #1e3a8a; letter-spacing: 0.5px; }
    .school-meta { font-size: 11px; color: #555; margin-top: 3px; }
    .receipt-title { font-size: 15px; font-weight: 700; color: #1e3a8a; text-transform: uppercase; letter-spacing: 1px; margin-top: 10px; }
    .receipt-meta { display: flex; justify-content: space-between; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; padding: 10px 14px; margin: 14px 0; font-size: 12px; }
    .student-info { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 14px; font-size: 12px; }
    .info-row { display: flex; gap: 6px; }
    .info-label { color: #6b7280; min-width: 90px; }
    .info-value { font-weight: 600; color: #111; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 10px; }
    thead tr { background: #1e3a8a; color: #fff; }
    thead th { padding: 8px 12px; text-align: left; font-size: 12px; }
    thead th:last-child { text-align: right; }
    .total-row td { padding: 10px 12px; font-weight: 800; font-size: 14px; background: #eff6ff; border-top: 2px solid #1e3a8a; }
    .total-row td:last-child { text-align: right; color: #1e3a8a; }
    .footer { display: flex; justify-content: space-between; align-items: flex-end; margin-top: 30px; padding-top: 14px; border-top: 1px dashed #ccc; }
    .sig-block { text-align: center; font-size: 11px; }
    .sig-line { width: 130px; border-bottom: 1px solid #555; margin-bottom: 4px; }
    .note { font-size: 10px; color: #6b7280; margin-top: 12px; text-align: center; }
    .paid-stamp { display: inline-block; border: 3px solid #16a34a; color: #16a34a; font-weight: 800; font-size: 18px; letter-spacing: 2px; padding: 4px 16px; transform: rotate(-8deg); border-radius: 4px; margin-top: 6px; }
    @media print {
      body { background: #fff; }
      .page { padding: 0; }
      @page { margin: 15mm; size: A5 portrait; }
    }
  </style>
</head>
<body>
  <div class="page">
    <div class="header">
      <div class="school-name">${SCHOOL.name}</div>
      <div class="school-meta">${SCHOOL.address} &bull; ${SCHOOL.phone} &bull; ${SCHOOL.email}</div>
      <div class="school-meta">${SCHOOL.board} Affiliated &bull; Principal: ${SCHOOL.principal}</div>
      <div class="receipt-title">&#128196; Fee Payment Receipt</div>
    </div>

    <div class="receipt-meta">
      <div><strong>Receipt No:</strong> ${data.receiptNo}</div>
      ${data.txnId ? `<div><strong>Txn ID:</strong> ${data.txnId}</div>` : ""}
      <div><strong>Date &amp; Time:</strong> ${data.dateTime}</div>
    </div>

    <div class="student-info">
      <div class="info-row"><span class="info-label">Student Name:</span><span class="info-value">${data.studentName}</span></div>
      <div class="info-row"><span class="info-label">Class / Section:</span><span class="info-value">${data.studentClass}</span></div>
      <div class="info-row"><span class="info-label">Admission No:</span><span class="info-value">${data.admissionNo}</span></div>
      ${data.fatherName ? `<div class="info-row"><span class="info-label">Father's Name:</span><span class="info-value">${data.fatherName}</span></div>` : ""}
      <div class="info-row"><span class="info-label">Payment Mode:</span><span class="info-value">${data.paymentMethod}</span></div>
      ${data.collectedBy ? `<div class="info-row"><span class="info-label">Collected By:</span><span class="info-value">${data.collectedBy}</span></div>` : ""}
    </div>

    <table>
      <thead>
        <tr>
          <th>Fee Head</th>
          <th style="text-align:right;">Amount</th>
        </tr>
      </thead>
      <tbody>
        ${itemRows}
        ${lateFineRow}
        <tr class="total-row">
          <td>Total Amount Paid</td>
          <td>&#8377;${data.totalAmount.toLocaleString("en-IN")}</td>
        </tr>
      </tbody>
    </table>

    <div style="text-align:center;">
      <div class="paid-stamp">PAID</div>
    </div>

    <div class="footer">
      <div class="sig-block">
        <div class="sig-line"></div>
        <div>Cashier / Accountant</div>
      </div>
      <div class="sig-block">
        <div class="sig-line"></div>
        <div>Principal's Seal</div>
      </div>
    </div>

    <div class="note">This is a computer-generated receipt. No signature required. Keep this receipt for your records.</div>
  </div>
</body>
</html>`;
}

/** Open receipt in a new window and trigger print dialog */
export function printReceipt(data: ReceiptData): void {
  const html = buildReceiptHTML(data);
  const win = window.open("", "_blank", "width=720,height=900");
  if (!win) {
    alert("Pop-up blocked. Please allow pop-ups for this site and try again.");
    return;
  }
  win.document.open();
  win.document.write(html);
  win.document.close();
  win.focus();
  // Slight delay so browser can render before print dialog
  setTimeout(() => {
    win.print();
  }, 400);
}

/** Download receipt as an HTML file */
export function downloadReceipt(data: ReceiptData): void {
  const html = buildReceiptHTML(data);
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Receipt_${data.receiptNo}_${data.studentName.replace(/\s+/g, "_")}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
