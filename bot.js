const axios = require("axios");

const TOKEN = process.env.TOKEN;  // Lấy token từ GitHub Secrets
const THREAD_ID = process.env.THREAD_ID;
const MSG = process.env.MSG;

async function spam() {
    try {
        await axios.post(
            `https://graph.facebook.com/v17.0/t_${THREAD_ID}/messages`,
            { message: MSG },
            { headers: { Authorization: `Bearer ${TOKEN}` } }
        );

        console.log("Đã gửi");
    } catch (error) {
        console.log("Lỗi:", error?.response?.data || error);
    }
}

async function loop() {
    while (true) {
        await spam();
        await new Promise(r => setTimeout(r, 2000)); // spam mỗi 2 giây
    }
}

loop();
