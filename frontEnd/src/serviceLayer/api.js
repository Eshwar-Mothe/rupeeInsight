import { postRegisterDataUrl, getDashBoardDataUrl, getDebtsDataUrl, getExpensesDataUrl, getInvestmentDataUrl, postExpensesDataUrl, postLoanDataUrl, postLoginDataUrl, postRemindersDataUrl, postEmailVerificationUrl, getReminderDataUrl, updatePaymentStatusUrl, updateReminderUrl, updateSnoozeStatusUrl, postResetPasswordUrl } from './constants'
// Data posting Apis
const postRegisterData = async (payload) => {
    console.log("payload in postRegisterData", payload);

    const formData = new FormData();

    Object.keys(payload).forEach((key) => {
        if (key === "profileImage" && payload[key] instanceof File) {
            formData.append(key, payload[key]);
        } else if (key !== "profileImage") {
            formData.append(key, payload[key]);
        }
    });

    console.log("formdata in registering", formData);

    try {
        const res = await fetch(postRegisterDataUrl, {
            method: "POST",
            body: formData,
        });

        return await res.json();
    } catch (error) {
        console.error("Error in API call:", error);
        throw error;
    }
};

const postEmailVerificationData = async (payload) => {
    console.log("payload in postEmailVerificationData", payload);

    const { email, subject, text } = payload;

    const formBody = new URLSearchParams();
    formBody.append("to", email);
    formBody.append("subject", subject);
    formBody.append("text", text);

    console.log("FormBody", formBody);

    const res = await fetch(postEmailVerificationUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formBody.toString(),
    });

    return await res.json();
};

const postLoginData = async (payload) => {
    const res = await fetch(`${postLoginDataUrl}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    return await res.json();
}


const postResetPassword = async (payload) => {
    console.log("payload in postEmailVerificationData", payload);

    const { to, subject, text } = payload;

    const formBody = new URLSearchParams();
    formBody.append("to", to);
    formBody.append("subject", subject);
    formBody.append("text", text);

    console.log("FormBody", formBody);

    const res = await fetch(postResetPasswordUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formBody.toString(),
    });

    return await res.json();
};

const postExpensesData = async (payload) => {
    try {
        console.log("payload for the expense", payload);
        const res = await fetch(postExpensesDataUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        
        return await res.json("Expense Details Added");
    } catch (error) {
        console.error("Error posting expense data:", error);
        return { success: false, error: error.message };
    }
};


const postRemindersData = async (payload) => {
    console.log("Sending reminders data to the backend...", payload);
    const res = await fetch(`${postRemindersDataUrl}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    return await res.json();
}

const postLoanData = async (payload) => {
    const res = await fetch(`${postLoanDataUrl}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    return await res.json();
}


const getDashBoardData = async () => {
    console.log("fetching the data for dashboard")
    const res = await fetch(`${getDashBoardDataUrl}`)
    const data = await res.json()
    // console.log("fetched Data",data)
    return data
}

const getRemindersData = async () => {
    console.log("fetching the data for reminders")
    const res = await fetch(`${getReminderDataUrl}`)
    const data = await res.json()
    return data
}

const getDebtsData = async () => {
    const res = await fetch(`${getDebtsDataUrl}`)
    const data = await res.json()
    return data
}

const getExpensesData = async () => {
    const res = await fetch(`${getExpensesDataUrl}`)
    const data = await res.json()
    return data
}

const getInvestmentData = async () => {
    const res = await fetch(`${getInvestmentDataUrl}`)
    const data = await res.json()
    return data
}

const updatePaymentStatusData = async (payload) => {
    console.log('Making api call for update payment Status')
    const res = await fetch(`${updatePaymentStatusUrl}`, {
        method: "PUT",
        body: payload
    })
}

const updateSnoozeStatusData = async (payload) => {
    console.log('Making api call for update payment Status')
    const res = await fetch(`${updatePaymentStatusUrl}`, {
        method: "PUT",
        body: payload
    })
}

const updateReminderData = async (payload) => {
    console.log('Making api call for update Reminder')
    const res = await fetch(`${updateReminderUrl}`, {
        method: "PUT",
        body: payload
    })
}

const deleteReminder = async (payload) => {
    console.log('Making api call for update Reminder')
    const res = await fetch(`${updateReminderUrl}`, {
        method: "DELETE",
        body: payload
    })
}

export { postRegisterData, postLoginData, postEmailVerificationData,postResetPassword, postExpensesData, postRemindersData, postLoanData, getDashBoardData, getRemindersData, getDebtsData, getExpensesData, updatePaymentStatusData,updateReminderData,updateSnoozeStatusData,deleteReminder }