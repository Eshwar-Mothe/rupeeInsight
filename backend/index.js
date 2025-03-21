const express = require("express");
const sendMail = require("./mailService");

const app = express();
app.use(express.json());

app.post("/sendmail", async (req, res) => {
    try {
        const { email, subject, text } = req.body;
        const response = await sendMail(email, subject, text);
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to send email." });
    }
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});