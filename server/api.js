const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.post('/api/chat', async (req, res) => {
    const { message } = req.body;

    try {
        const response = await axios.post(
            `https://api.openai.com/v1/chat/completions`,
            {
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: message }],
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const reply = response.data.choices[0].message.content;
        res.json({ reply });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
