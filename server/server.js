const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Chatbase API Config
const CHATBASE_API_URL = "https://www.chatbase.co/api/v1/chat";
const CHATBASE_API_KEY = "58585775-d058-4228-a38b-14eac11927eb"; // Ensure this API key is correct
const CHATBOT_ID = "WqpEHCHu7nrwmQ1VjPBDX"; // Ensure chatbotId is correct

// API to handle vocabulary query and return an explanation in English
app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;

  console.log("Received messages for Chatbase:", messages);

  try {
    const messageText = messages[0]?.content?.toLowerCase() || "";

    // Check if the message contains a vocabulary query
    if (messageText.includes("define") || messageText.includes("meaning")) {
      const wordToDefine = messageText.replace(/define|meaning/g, "").trim();
      if (!wordToDefine) {
        return res.status(400).json({ error: "Please provide a word to define." });
      }

      // Prepare the prompt for Chatbase
      const prompt = `Please provide a clear and detailed explanation for the word: "${wordToDefine}". Include its definition, usage in a sentence, and any relevant additional information.`;

      // Send the prompt to Chatbase
      const chatbaseResponse = await axios.post(
        CHATBASE_API_URL,
        {
          messages: [{ role: "user", content: prompt }],
          chatbotId: CHATBOT_ID,
          stream: false,
          model: "gpt-4-turbo",
          temperature: 0,
        },
        {
          headers: {
            Authorization: `Bearer ${CHATBASE_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response from Chatbase:", chatbaseResponse.data);

      const responseText = chatbaseResponse.data.text || "No explanation provided.";
      res.json({ text: responseText });
    } else {
      // If the query is not a vocabulary query, return a default message
      res.status(400).json({ error: "Please use 'define' or 'meaning' to query a word." });
    }
  } catch (error) {
    console.error("Error communicating with Chatbase:", error.message);
    console.error("Error details:", error.response ? error.response.data : error);
    res.status(500).json({ error: "Failed to fetch response from Chatbase" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
