const port = 5000;
// const baseUrl = `https://rupeeinsightbackend.onrender.com`;
const baseUrl = `http://localhost:5000`;

// User-related endpoints
const postRegisterDataUrl = `${baseUrl}/signup`;
const postEmailVerificationUrl = `${baseUrl}/sendMail`;
const postVerifyOtpUrl = `${baseUrl}/verifyOtp`;
const postLoginDataUrl = `${baseUrl}/login`;

// Expense & Financial data
const postExpensesDataUrl = `${baseUrl}/expenses`;
const postRemindersDataUrl = `${baseUrl}/reminders`;
const postLoanDataUrl = `${baseUrl}/loans`;
const postInvestmentData = `${baseUrl}/investment`;

// Dashboard & Data Fetching
const getDashBoardDataUrl = `${baseUrl}/home`;
const getReminderDataUrl = `${baseUrl}/reminders`;
const getExpensesDataUrl = `${baseUrl}/expenses`;
const getDebtsDataUrl = `${baseUrl}/debts`;
const getInvestmentDataUrl = `${baseUrl}/investments`;

export { 
    postRegisterDataUrl, 
    postEmailVerificationUrl, 
    postVerifyOtpUrl, 
    postLoginDataUrl, 
    postExpensesDataUrl, 
    postRemindersDataUrl, 
    postLoanDataUrl, 
    getDashBoardDataUrl, 
    getExpensesDataUrl, 
    getDebtsDataUrl, 
    getInvestmentDataUrl,
    getReminderDataUrl
};
