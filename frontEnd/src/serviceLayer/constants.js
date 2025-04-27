const port = 5000;
const baseUrl = `https://rupeeinsightbackend.onrender.com`;
// const baseUrl = `http://localhost:5000`;

const postRegisterDataUrl = `${baseUrl}/signup`;
const postEmailVerificationUrl = `${baseUrl}/sendMail`;
const postVerifyOtpUrl = `${baseUrl}/verifyOtp`;
const postLoginDataUrl = `${baseUrl}/login`;
const postResetPasswordUrl = `${baseUrl}/reset`

const postExpensesDataUrl = `${baseUrl}/expenses`;
const postRemindersDataUrl = `${baseUrl}/reminders`;
const postLoanDataUrl = `${baseUrl}/loans`;
const postInvestmentData = `${baseUrl}/investment`;

const getDashBoardDataUrl = `${baseUrl}/home`;
const getReminderDataUrl = `${baseUrl}/reminders`;
const getExpensesDataUrl = `${baseUrl}/expenses`;
const getDebtsDataUrl = `${baseUrl}/debts`;
const getInvestmentDataUrl = `${baseUrl}/investments`;

const updatePaymentStatusUrl = `${baseUrl}/updatePayment`
const updateSnoozeStatusUrl = `${baseUrl}/updateSnooze`
const updateReminderUrl = `${baseUrl}/updateReminder`

export {
    postRegisterDataUrl,
    postEmailVerificationUrl,
    postVerifyOtpUrl,
    postLoginDataUrl,
    postResetPasswordUrl,
    postExpensesDataUrl,
    postRemindersDataUrl,
    postLoanDataUrl,
    getDashBoardDataUrl,
    getExpensesDataUrl,
    getDebtsDataUrl,
    getInvestmentDataUrl,
    getReminderDataUrl,
    updatePaymentStatusUrl,
    updateSnoozeStatusUrl,
    updateReminderUrl,
};
