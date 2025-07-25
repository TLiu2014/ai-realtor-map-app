import React, { useState } from "react";
import { mockListings } from "../data/mockListings";
import type { Property } from "../data/mockListings";

declare global {
  interface Window {
    puter: any;
  }
}

type Message = {
  id: number;
  text: string;
  sender: "user" | "ai";
};

interface ChatbotProps {
  onResults: (props: Property[]) => void;
  isSignedIn: boolean;
}

const Chatbot = ({ onResults, isSignedIn }: ChatbotProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim() || !isSignedIn) return;

    const newMsg: Message = {
      id: messages.length + 1,
      text: input,
      sender: "user",
    };
    setMessages((prev) => [...prev, newMsg]);

    try {
      const prompt = `
        Extract real estate filters from the user's request.

        Format:
        {
          "city": "string",
          "bedrooms": number,
          "maxPrice": number
        }

        User request: "${input}"
        Only respond with a valid JSON object.
      `;

      const response: string = await window.puter.ai.chat(prompt, {
        model: "gpt-4.1-nano",
      });

      // Clean and parse JSON
      // const jsonStart = response.indexOf("{");
      // const jsonEnd = response.lastIndexOf("}") + 1;
      // const jsonStr = response.substring(jsonStart, jsonEnd);
      const jsonStr = JSON.parse(response);
      console.log('jsonStr', jsonStr);
      const filters = JSON.parse(jsonStr);

      const filtered = mockListings.filter((prop) => {
        const matchCity = filters.city ? prop.address.toLowerCase().includes(filters.city.toLowerCase()) : true;
        const matchPrice = filters.maxPrice ? prop.price <= filters.maxPrice : true;
        const matchBeds = filters.bedrooms ? prop.bedrooms === filters.bedrooms : true;
        return matchCity && matchPrice && matchBeds;
      });

      const aiReply: Message = {
        id: newMsg.id + 1,
        text: `Found ${filtered.length} properties in ${filters.city}.`,
        sender: "ai",
      };

      setMessages((prev) => [...prev, aiReply]);
      onResults(filtered);
    } catch (err) {
      console.error("AI error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: newMsg.id + 1,
          text: "Sorry, I couldn't understand your request.",
          sender: "ai",
        },
      ]);
    }

    setInput("");
  };

  return (
    <div className="w-full h-full flex flex-col bg-white border-r border-gray-300">
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-2 rounded ${
              msg.sender === "user" ? "bg-blue-100 self-end" : "bg-gray-100 self-start"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="p-2 border-t flex gap-2">
        <input
          type="text"
          value={input}
          disabled={!isSignedIn}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border rounded"
          placeholder={isSignedIn ? "Ask: 2-bedroom in Toronto under 700k" : "Sign in to chat"}
        />
        <button
          onClick={sendMessage}
          disabled={!isSignedIn}
          className={`px-4 py-2 rounded ${isSignedIn ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
