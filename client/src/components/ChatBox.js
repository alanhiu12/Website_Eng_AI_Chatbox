// ChatBox.js
import React from 'react';

const ChatBox = ({ messages }) => {
  return (
    <div className="chatbox">
      {messages.map((msg, index) => (
        <div key={index} className={msg.sender}>
          {msg.text}
        </div>
      ))}
    </div>
  );
};

export default ChatBox;
