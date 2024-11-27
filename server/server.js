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

// Oxford Dictionary API Config
const OXFORD_API_URL = "https://od-api-sandbox.oxforddictionaries.com/api/v2/entries/en-gb/";
const OXFORD_API_KEY = "f05324703d98ac5a27046a1f88e89129"; // Replace with your actual API key
const OXFORD_APP_ID = "d246bdcd"; // Replace with your actual app ID

// Function to fetch word definition and example from Oxford API
const getOxfordDefinition = async (word) => {
  try {
    const response = await axios.get(`${OXFORD_API_URL}${word}`, {
      headers: {
        "app_id": OXFORD_APP_ID,
        "app_key": OXFORD_API_KEY,
      },
    });

    // Extracting the first definition and example sentence
    const lexicalEntries = response.data.results[0].lexicalEntries[0].entries[0].senses[0];
    const definition = lexicalEntries.definitions[0];
    const example = lexicalEntries.examples[0]?.text || "No example available";

    return { definition, example };
  } catch (error) {
    console.error("Error fetching definition from Oxford:", error);
    return { definition: "No definition found.", example: "No example found." };
  }
};

// API to handle vocabulary query and return an explanation in English
app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;

  console.log("Received messages for Chatbase:", messages);

  try {
    const messageText = messages[0]?.content?.toLowerCase() || '';

    // Check if the message contains a vocabulary query
    if (messageText.includes("define") || messageText.includes("meaning")) {
      const wordToDefine = messageText.replace(/define|meaning/g, "").trim();
      if (!wordToDefine) {
        return res.status(400).json({ error: "Please provide a word to define." });
      }

      // Fetch definition and example from Oxford
      const { definition, example } = await getOxfordDefinition(wordToDefine);

      // Combine with Chatbase explanation
      const prompt = `Provide a clear and detailed English explanation for the following word: "${wordToDefine}".`;

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

      // Prepare the response combining both Oxford definition/example and Chatbase explanation
      const responseText = `
        Oxford Definition: ${definition}\n
        Example: ${example}\n
        Chatbase Explanation: ${chatbaseResponse.data.text}
      `;

      res.json({ text: responseText });
    } else {
      // If the query is not a vocabulary query, return an error or a default message
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
