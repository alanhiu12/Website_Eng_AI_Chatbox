import React, { useEffect } from 'react';

const ChatBubble = () => {
  useEffect(() => {
    // Dynamically add the Chatbase script
    const script = document.createElement('script');
    script.src = "https://www.chatbase.co/embed.min.js";
    script.defer = true;
    script.setAttribute("chatbotId", "WqpEHCHu7nrwmQ1VjPBDX");
    script.setAttribute("domain", "www.chatbase.co");
    document.body.appendChild(script);

    // Set global configuration for the chat bubble
    window.embeddedChatbotConfig = {
      chatbotId: "WqpEHCHu7nrwmQ1VjPBDX",
      domain: "www.chatbase.co",
    };

    return () => {
      // Cleanup script when the component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return null; // Chat bubble is automatically added by the script
};

export default ChatBubble;
