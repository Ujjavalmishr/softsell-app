import { useState } from 'react';

// Function to interact with the DeepSeek API
async function getBotReply(prompt) {
  const key = import.meta.env.VITE_DEEPSEEK_API_KEY; // Get API key from environment
  const res = await fetch('https://api.deepseek.com/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`, // Add Bearer token authorization
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: 'You are a helpful assistant for SoftSell.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
    }),
  });

  if (res.status === 429) {
    return 'Our AI quota is currently exhausted. Please try again later.';
  }

  if (!res.ok) {
    const errorText = await res.text(); // Fetch detailed error message
    console.error(`DeepSeek API error (Status: ${res.status}):`, errorText);
    return 'Sorry, something went wrong on my end.';
  }

  try {
    const { choices } = await res.json(); // Parse the response JSON
    return choices[0].message.content.trim(); // Return the reply
  } catch (err) {
    console.error('Error parsing DeepSeek response:', err);
    return 'Sorry, something went wrong on my end.';
  }
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const quickQuestions = [
    'How do I sell my license?',
    'What license types do you support?',
    'How long until I get paid?',
  ];

  // Send message and handle responses
  const sendMessage = async (text, fromUser = true) => {
    setMessages((prev) => [...prev, { text, fromUser }]);
    setInput(''); // Clear input field
    if (!fromUser) return;

    try {
      const reply = await getBotReply(text); // Fetch bot reply
      setMessages((prev) => [...prev, { text: reply, fromUser: false }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { text: 'Sorry, something went wrong.', fromUser: false },
      ]);
    }
  };

  return (
    <>
      <button
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 z-50"
        onClick={() => setOpen((o) => !o)}
      >
        {open ? '✖️' : '💬'}
      </button>

      {open && (
        <div className="fixed bottom-20 right-6 w-80 max-h-[70vh] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg flex flex-col overflow-hidden z-50">
          {/* Header */}
          <div className="bg-blue-600 text-white p-3 flex justify-between items-center">
            <h3 className="font-semibold">SoftSell Help</h3>
            <button onClick={() => setOpen(false)}>✖️</button>
          </div>

          {/* Quick Questions */}
          <div className="p-2 flex flex-wrap gap-2 bg-gray-100 dark:bg-gray-700">
            {quickQuestions.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="text-xs px-2 py-1 bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-full hover:bg-gray-200"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.fromUser ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`px-3 py-1 rounded-lg max-w-[70%] ${
                    m.fromUser
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Field */}
          <div className="p-2 border-t border-gray-200 dark:border-gray-700 flex">
            <input
              type="text"
              className="flex-1 p-2 border rounded-l bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && input.trim() && sendMessage(input.trim())}
            />
            <button
              onClick={() => input.trim() && sendMessage(input.trim())}
              className="px-4 bg-blue-600 text-white rounded-r hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
