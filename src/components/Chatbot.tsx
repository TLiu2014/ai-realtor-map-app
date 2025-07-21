import React, { useState } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = input.trim();
    const aiReply = `Got it! Looking for properties matching: "${userMessage}". Click below to view.`;
    setMessages([...messages, "👤 " + userMessage, "🤖 " + aiReply]);
    setInput("");
    // TODO: trigger AI processing + update Map
  };

  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex-1 overflow-y-auto space-y-2 mb-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded ${
              msg.startsWith("👤") ? "bg-white text-right" : "bg-blue-100"
            }`}
          >
            {msg.replace("👤 ", "").replace("🤖 ", "")}
          </div>
        ))}
      </div>

      <div className="flex">
        <input
          className="flex-1 border border-gray-400 rounded-l px-2 py-1"
          placeholder="Ask something like: 2 bedroom in Toronto"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          className="bg-blue-500 text-white px-4 py-1 rounded-r"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
