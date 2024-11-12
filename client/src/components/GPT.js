import React, { useState } from 'react';
import axios from 'axios';

const GPT = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    const handleSend = async () => {
        if (input.trim() === '') return;

        const newMessage = { user: input };
        setMessages([...messages, newMessage]);

        try {
            const response = await axios.post('/api/chat', { message: input });
            const botMessage = { bot: response.data.reply };
            setMessages([...messages, newMessage, botMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
        }

        setInput('');
    };

    return (
        <div>
            <h1>Chatbot AI</h1>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>
                        {msg.user && <p><strong>User:</strong> {msg.user}</p>}
                        {msg.bot && <p><strong>AI:</strong> {msg.bot}</p>}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
            />
            <button onClick={handleSend}>Send</button>
        </div>
    );
};

export default GPT;
