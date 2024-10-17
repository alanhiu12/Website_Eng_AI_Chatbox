// src/components/ChatBox.js (updated with audio)
import React from 'react';
import ReactAudioPlayer from 'react-audio-player';
import './styles/ChatBox.css';

const ChatBox = ({ messages }) => {
  return (
    <div className="chat-box">
      {messages.map((msg, index) => (
        <div key={index} className={`message ${msg.sender}`}>
          <p>{msg.text}</p>
          {msg.audio && (
            <ReactAudioPlayer
              src={msg.audio}  // Link to the audio file from chatbot API response
              controls
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatBox;
