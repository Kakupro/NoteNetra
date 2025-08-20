import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';

// UI strings (no preset answers)
const translations = {
  en: {
    title: "AI Chatbot",
    welcome: "Welcome to the NoteNetra AI Chatbot. Ask anything related to business, finance, investments, GST, and market trends.",
    placeholder: "Type your question here...",
    send: "Send",
    language: "Language:"
  },
  hi: { // Hindi
    title: "एआई चैटबॉट",
    welcome: "नोटनेत्रा एआई चैटबॉट में आपका स्वागत है। व्यवसाय, वित्त, निवेश, जीएसटी और मार्केट ट्रेंड्स से जुड़े सवाल पूछें।",
    placeholder: "अपना प्रश्न यहां टाइप करें...",
    send: "भेजें",
    language: "भाषा:"
  }
};

const ChatbotPage = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const t = translations[currentLanguage];

  const systemPrompt = useMemo(() => {
    const english = `You are NoteNetra's AI assistant focused on Indian MSME finance, business operations, and compliance. Provide clear, actionable, and concise answers in 6-10 sentences max unless the user asks for depth. Prioritize:
    - GST (GSTR-1, GSTR-3B, input tax credit, registration, composition vs regular, e-invoicing)
    - Accounting (cash vs accrual, ledgers, reconciliation, invoice best-practices)
    - Credit & lending (MSME loans, working capital, credit score factors, documentation)
    - Digital payments (UPI, settlement, chargebacks, fraud prevention)
    - Compliance & taxes (TDS/TCS basics, due dates, turnover thresholds)
    - Practical business tips (inventory, pricing, margins, CAC/LTV basics)
    Rules: Avoid legal guarantees, include disclaimers when needed, ask clarifying questions if the query is broad, and prefer examples with INR.`;
    const hindi = `आप NoteNetra के एआई सहायक हैं — भारतीय MSME फाइनेंस, बिज़नेस ऑपरेशन और कंप्लायंस पर केंद्रित। जवाब स्पष्ट, कार्य-उन्मुख और संक्षिप्त रखें (6-10 वाक्य)। प्राथमिकता दें: GST, अकाउंटिंग, क्रेडिट/लोन, डिजिटल पेमेंट्स, कंप्लायंस/टैक्स और व्यावहारिक बिज़नेस सुझाव। आवश्यक होने पर डिस्क्लेमर दें और अस्पष्ट सवालों पर स्पष्टीकरण माँगें। उदाहरण INR में दें।`;
    return currentLanguage === 'hi' ? hindi : english;
  }, [currentLanguage]);

  const suggestedPrompts = useMemo(() => ([
    'How to claim Input Tax Credit for GST with cash + UPI sales?',
    'What affects MSME credit score and how to improve it in 90 days?',
    'Best way to reconcile UPI settlements with daily cash ledger?',
    'Should I choose composition scheme or regular GST for turnover 65L?',
    'How to price products to maintain 25% net margin with GST?',
  ]), []);


  // Removed custom fallback endpoint; Gemini is the sole source for answers

  const callGeminiAI = async (userText, history) => {
    const apiKey = import.meta?.env?.VITE_GEMINI_API_KEY || 'AIzaSyAj5nqO8k1cmguQ9bpfiCTch8w5NtPmI9A';

    const preferred = import.meta?.env?.VITE_GEMINI_MODEL || 'gemini-1.5-flash';
    const candidateModels = [preferred, 'gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-1.0-pro'];

    const contents = [];
    history.forEach(m => {
      contents.push({ role: m.sender === 'user' ? 'user' : 'model', parts: [{ text: m.text }] });
    });
    contents.push({ role: 'user', parts: [{ text: userText }] });

    let lastError = null;
    for (const model of candidateModels) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': apiKey
          },
          body: JSON.stringify({
            contents,
            systemInstruction: { parts: [{ text: systemPrompt }] },
            generationConfig: { temperature: 0.2, topP: 0.9, topK: 40, maxOutputTokens: 1024 }
          })
        });
        if (!res.ok) {
          const errText = await res.text().catch(() => '');
          throw new Error(`HTTP ${res.status} ${res.statusText} ${errText}`);
        }
        const data = await res.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text || !text.trim()) throw new Error('Empty response');
        return text;
      } catch (err) {
        lastError = err;
        continue;
      }
    }
    throw lastError || new Error('Gemini request failed');
  };

  // Removed all rule-based preset answers; Gemini generates all responses

  const handleSendMessage = async () => {
    if (input.trim() === '') return;
    setError('');
    const userText = input;
    const newUserMessage = { text: userText, sender: 'user' };
    setMessages(prev => [...prev, newUserMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const aiReply = await callGeminiAI(userText, messages);
      setMessages(prev => [...prev, { text: aiReply, sender: 'bot' }]);
    } catch (e) {
      setError((currentLanguage === 'hi' ? 'एआई सेवा उपलब्ध नहीं है: ' : 'AI service is unavailable: ') + (e?.message || ''));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg-primary text-dark-text-primary p-8">
      <Helmet>
        <title>{t.title} - NoteNetra</title>
        <meta name="description" content={t.welcome} />
      </Helmet>

      <h1 className="text-3xl font-bold mb-4">{t.title}</h1>
      <p className="text-lg mb-6">{t.welcome}</p>
      {error && (
        <div className="mb-4 p-3 rounded-md bg-yellow-900/30 border border-yellow-700 text-yellow-200 text-sm">
          {error}
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="language-select" className="mr-2">{t.language}</label>
        <select
          id="language-select"
          value={currentLanguage}
          onChange={(e) => setCurrentLanguage(e.target.value)}
          className="bg-dark-bg-card border border-dark-border-primary rounded-md px-2 py-1 text-dark-text-primary"
        >
          <option value="en">English</option>
          <option value="hi">हिंदी</option>
        </select>
      </div>

      <div className="flex flex-col h-[60vh] bg-dark-bg-card rounded-lg shadow-lg border border-dark-border-primary">
        <div className="p-3 border-b border-dark-border-primary flex flex-wrap gap-2">
          {suggestedPrompts.map((sp, idx) => (
            <button
              key={idx}
              onClick={() => setInput(sp)}
              className="text-xs px-2 py-1 rounded-md bg-gray-700/60 hover:bg-gray-700 text-white"
            >
              {sp}
            </button>
          ))}
        </div>
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg max-w-[70%] ${msg.sender === 'user' ? 'ml-auto bg-blue-600 text-white' : 'mr-auto bg-gray-700 text-white'}`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-dark-border-primary flex space-x-2">
          <input
            type="text"
            className="flex-1 px-4 py-2 bg-dark-bg-input text-dark-text-primary border border-dark-border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={t.placeholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
          />
          <button
            onClick={handleSendMessage}
            className="px-4 py-2 bg-dark-accent-primary text-white rounded-lg hover:bg-dark-accent-hover transition-colors disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? (currentLanguage === 'hi' ? 'सोच रहा/रही…' : 'Thinking…') : t.send}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
