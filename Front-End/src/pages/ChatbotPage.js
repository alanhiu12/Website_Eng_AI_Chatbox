import React, { useEffect } from 'react';

const Chatbot = () => {
  useEffect(() => {
    // Dynamically create the chatbot configuration script
    const chatbotScript = document.createElement('script');
    chatbotScript.src = "https://www.chatbase.co/embed.min.js";
    chatbotScript.defer = true;
    chatbotScript.setAttribute("chatbotId", "fg7EHhAK8iHpmf_4ZF_VL");
    chatbotScript.setAttribute("domain", "www.chatbase.co");
    document.body.appendChild(chatbotScript);

    // Configure the embedded chatbot
    const chatbotConfigScript = document.createElement('script');
    chatbotConfigScript.innerHTML = `
      window.embeddedChatbotConfig = {
        chatbotId: "fg7EHhAK8iHpmf_4ZF_VL",
        domain: "www.chatbase.co"
      };
    `;
    document.body.appendChild(chatbotConfigScript);

    // Clean up by removing the scripts when the component is unmounted
    return () => {
      document.body.removeChild(chatbotScript);
      document.body.removeChild(chatbotConfigScript);
    };
  }, []);

  return (
    <div>
      <iframe
        src="https://www.chatbase.co/chatbot-iframe/fg7EHhAK8iHpmf_4ZF_VL"
        width="100%"
        style={{ height: '100%', minHeight: '700px' }}
        frameBorder="0"
        title="Chatbot"
      ></iframe>
    </div>
  );
};

export default Chatbot;
