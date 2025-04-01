import { postRegisterDataUrl, getDashBoardDataUrl, getDebtsDataUrl, getExpensesDataUrl, getInvestmentDataUrl, postExpensesDataUrl, postLoanDataUrl, postLoginDataUrl, postRemindersDataUrl, postEmailVerificationUrl, postVerifyOtpUrl } from './constants'
// Data posting Apis
const postRegisterData = async (payload) => {
    console.log("payload in postRegisterData", payload);

    const formData = new FormData();

    Object.keys(payload).forEach((key) => {
        if (key === "profileImage" && payload[key] instanceof File) {
            formData.append(key, payload[key]); // Append the image file
        } else if (key !== "profileImage") {
            formData.append(key, payload[key]); // Append other fields
        }
    });


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

const postExpensesData = async (payload) => {
    try {
        const res = await fetch(postExpensesDataUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        if (!res.ok) {
            throw new Error(`Failed to post expense: ${res.status} ${res.statusText}`);
        }
        return await res.json("Expense Details Added");
    } catch (error) {
        console.error("Error posting expense data:", error);
        return { success: false, error: error.message };
    }
};


const postRemindersData = async (payload) => {
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

// const postEmailVerificationData = async(req, res) => {
//     const res = await fetch(`${postEmailVerificationUrl}`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//     });
//     return await res.json();
// }

// Data Fetching Apis

const getDashBoardData = async () => {
    const res = await fetch(`${getDashBoardDataUrl}`)
    const data = await res.json()
    console.log(data)
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

export { postRegisterData, postLoginData, postEmailVerificationData, postExpensesData, postRemindersData, postLoanData, getDashBoardData, getDebtsData, getExpensesData }