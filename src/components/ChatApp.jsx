import React, { useState, useRef, useEffect } from "react";
import { sendMessage } from "../api/gemini";

// Helper function to convert simple Markdown (like **bold**) to HTML
const renderMarkdown = (text) => {
  if (!text) return { __html: "" };
  // **text** ko <strong>text</strong> mein badlega
  const html = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  return { __html: html };
};

const ChatApp = () => {
  // UI Display ke liye messages
  const [messages, setMessages] = useState([]);
  // Gemini API ke liye conversation history (role/parts format)
  const [chatHistory, setChatHistory] = useState([]);
  // Image data (base64) jo text ke saath send hoga
  const [pendingImage, setPendingImage] = useState(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Image data ko pending state se hataane ke liye
  const clearPendingImage = () => {
    setPendingImage(null);
  };

  // Send text or text + image message
  const handleSend = async () => {
    // Agar input khaali hai aur koi image pending nahi hai, toh ruk jao
    if ((!input.trim() && !pendingImage) || loading) return;

    const userMessage = input.trim();
    const currentImage = pendingImage;
    
    // --- 1. UI mein User ka message add karo ---
    setMessages((prev) => [
      ...prev,
      { 
        text: userMessage, 
        sender: "user", 
        image: currentImage ? currentImage.data : null 
      },
    ]);

    // --- 2. Chat history for API update karo ---
    let historyUpdate = { role: "user", parts: [] };
    
    if (currentImage) {
      // Image part
      historyUpdate.parts.push({
          inlineData: {
            data: currentImage.data.split(",")[1], // Base64 data (without header)
            mimeType: currentImage.type,
          },
      });
    }
    
    // Text part
    historyUpdate.parts.push({ text: userMessage || "Describe this image." });

    // --- 3. States ko reset karo ---
    setInput("");
    setPendingImage(null);
    setLoading(true);

    try {
      // API call
      const botResponseText = await sendMessage(
        userMessage || "Describe this image.",
        chatHistory, // Previous history
        currentImage
      );
      
      // --- 4. Bot ka response UI mein aur History mein add karo ---
      const botMessage = { text: botResponseText, sender: "bot" };
      setMessages((prev) => [...prev, botMessage]);
      
      // History mein user aur model response dono add karo
      setChatHistory((prev) => [
          ...prev,
          historyUpdate, // User ka message jo abhi bheja
          { role: "model", parts: [{ text: botResponseText }] }
      ]);
      
    } catch (error) {
      const errorMessage = { text: "Error: Couldn't get response", sender: "bot" };
      setMessages((prev) => [...prev, errorMessage]);

    } finally {
      setLoading(false);
    }
  };

  // Handle image upload
  const handleImageUpload = (file) => {
    if (!file || loading) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      // Image ko pending state mein store karo aur uska naam bhi store karo
      setPendingImage({ 
        data: e.target.result, 
        type: file.type, 
        name: file.name // File ka naam store kiya
      });
      // Input field mein ab koi hint set nahi hoga
    };
    reader.readAsDataURL(file);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="flex flex-col w-full bg-white shadow-lg rounded-lg p-4">
      <h1 className="text-xl font-bold mb-4">HealthMate</h1>

      {/* --- Chat Display Area --- */}
      <div className="flex flex-col gap-2 h-96 overflow-y-auto mb-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded-lg max-w-xs break-words ${
              msg.sender === "user"
                ? "self-end bg-blue-500 text-white"
                : "self-start bg-gray-200"
            }`}
          >
            {/* User ka image show karo */}
            {msg.image && msg.sender === "user" && (
              <img
                src={msg.image}
                alt="Uploaded Image" 
                className="max-w-full max-h-60 object-contain rounded-lg mb-1"
              />
            )}
            {/* Text show karo aur Markdown ko fix karo */}
            {msg.text && (
                <span
                  // Bot messages ke liye Markdown rendering (bold fix)
                  dangerouslySetInnerHTML={renderMarkdown(msg.text)} 
                />
            )}
          </div>
        ))}

        {loading && (
          <div className="self-start bg-gray-200 p-2 rounded-lg animate-pulse">
            Typing...
          </div>
        )}

        <div ref={messagesEndRef}></div>
      </div>

      {/* --- Pending Image Preview --- */}
      {pendingImage && (
        <div className="flex items-center justify-between p-2 mb-2 bg-yellow-100 border border-yellow-300 rounded-lg">
          <img
            src={pendingImage.data}
            alt="Pending upload preview"
            className="w-10 h-10 object-cover rounded mr-2"
          />
          <span className="text-sm text-yellow-800 truncate">
             Image ready to send: **{pendingImage.name || "Unnamed File"}**
          </span>
          <button onClick={clearPendingImage} className="text-red-500 font-bold ml-2">X</button>
        </div>
      )}

      {/* --- Input Area --- */}
      <div className="flex gap-2">
        <input
          type="text"
          className={`flex-1 p-2 border rounded-lg ${
            loading ? "border-gray-400 bg-gray-100" : "border-gray-300 bg-white"
          }`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder={pendingImage ? "Image ke liye message likho..." : "Type your message..."}
          disabled={loading}
        />
        <button
          onClick={handleSend}
          className={`px-4 py-2 rounded-lg text-white ${
            loading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={loading}
        >
          Send
        </button>
        <button
          onClick={() => fileInputRef.current.click()}
          className={`px-4 py-2 rounded-lg ${
            loading || pendingImage
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gray-300 text-gray-700 hover:bg-gray-400"
          }`}
          disabled={loading || pendingImage}
        >
          📎
        </button>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={(e) => {
            handleImageUpload(e.target.files[0]);
            e.target.value = null;
          }}
        />
      </div>
    </div>
  );
};

export default ChatApp;