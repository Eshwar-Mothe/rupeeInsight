import jsPDF from "jspdf";
import "jspdf-autotable";

const generatePDF = (userDetails, expenses, savings, investments, transactions) => {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(16);
  doc.text("User Financial Report", 14, 20);

  // User Details
  doc.setFontSize(12);
  doc.text(`Name: ${userDetails.name}`, 14, 30);
  doc.text(`Email: ${userDetails.email}`, 14, 40);
  doc.text(`Phone: ${userDetails.phone}`, 14, 50);

  // Expenses Table
  doc.autoTable({
    startY: 60,
    head: [["Date", "Category", "Amount"]],
    body: expenses.map(exp => [exp.date, exp.category, `$${exp.amount}`]),
  });

  // Savings Table
  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 10,
    head: [["Date", "Amount"]],
    body: savings.map(s => [s.date, `$${s.amount}`]),
  });

  // Investments Table
  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 10,
    head: [["Date", "Investment Type", "Amount"]],
    body: investments.map(inv => [inv.date, inv.type, `$${inv.amount}`]),
  });

  // Transactions Table
  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 10,
    head: [["Date", "Description", "Amount"]],
    body: transactions.map(t => [t.date, t.description, `$${t.amount}`]),
  });

  // Save PDF
  doc.save("User_Financial_Report.pdf");
};
