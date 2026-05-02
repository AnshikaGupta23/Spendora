import { useState } from "react";
import axios from "axios";

export default function AIAssistant({ expenses }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const askAI = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/ai", {
        question,
        expenses,
      });

      setAnswer(res.data.answer);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-md p-4 rounded-xl shadow w-full">
      <h2 className="font-bold mb-2">🤖 AI Assistant</h2>

      <input
        className="border p-2 w-full mb-2 rounded"
        placeholder="Ask about your expenses..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <button
        onClick={askAI}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Ask AI
      </button>

      {answer && (
        <div className="mt-3 p-2 bg-gray-100 rounded text-sm">
          {answer}
        </div>
      )}
    </div>
  );
}