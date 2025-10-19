import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

// Helper function to convert base64 to Generative Part object
function base64ToGenerativePart(base64Data, mimeType) {
  return {
    inlineData: {
      data: base64Data,
      mimeType,
    },
  };
}

/**
 * Sends a message, potentially with an image and previous history.
 * @param {string} message - The user's text message.
 * @param {Array<object>} chatHistory - The conversation history in Gemini API format.
 * @param {object | null} imageFile - { data: base64 string, type: mimeType }
 */
export const sendMessage = async (message, chatHistory, imageFile) => {
  const contents = [...chatHistory];
  let userParts = [];

  if (imageFile) {
    const base64Data = imageFile.data.split(",")[1];
    userParts.push(base64ToGenerativePart(base64Data, imageFile.type));
  }
  
  // Text part hamesha aakhri mein aayega
  userParts.push({ text: message });

  // User ka naya message history mein add karo
  contents.push({ role: "user", parts: userParts });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error: Couldn't get response";
  }
};