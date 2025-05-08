// import { useState } from 'react';

// async function getBotReply(prompt) {
//   const key = import.meta.env.VITE_OPENAI_API_KEY;
//   const res = await fetch('/api/v1/chat/completions', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${key}`,
//     },
//     body: JSON.stringify({
//       model: 'gpt-3.5-turbo',
//       messages: [
//         { role: 'system', content: 'You are a helpful assistant for SoftSell.' },
//         { role: 'user', content: prompt },
//       ],
//       temperature: 0.7,
//     }),
//   });

//   if (!res.ok) {
//     const errText = await res.text();
//     console.error('OpenAI API responded with error:', errText);
//     throw new Error(errText);
//   }

//   const { choices } = await res.json();
//   return choices[0].message.content.trim();
// }

// export default function ChatWidget() {
//   const [open, setOpen] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');

//   const quickQuestions = [
//     'How do I sell my license?',
//     'What license types do you support?',
//     'How long until I get paid?',
//   ];

//   const sendMessage = async (text, fromUser = true) => {
//     setMessages((m) => [...m, { text, fromUser }]);
//     setInput('');

//     if (!fromUser) return;

//     try {
//       const reply = await getBotReply(text);
//       setMessages((m) => [...m, { text: reply, fromUser: false }]);
//     } catch (err) {
//       console.error('Bot fetch error', err);
//       setMessages((m) => [
//         ...m,
//         { text: "Sorry, something went wrong on my end.", fromUser: false },
//       ]);
//     }
//   };

//   return (
//     <>
//       <button
//         className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 z-50"
//         onClick={() => setOpen((o) => !o)}
//       >
//         {open ? '✖️' : '💬'}
//       </button>

//       {open && (
//         <div className="fixed bottom-20 right-6 w-80 max-h-[70vh] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg flex flex-col overflow-hidden z-50">
//           <div className="bg-blue-600 text-white p-3 flex justify-between items-center">
//             <h3 className="font-semibold">SoftSell Help</h3>
//             <button onClick={() => setOpen(false)}>✖️</button>
//           </div>

//           <div className="p-2 flex flex-wrap gap-2 bg-gray-100 dark:bg-gray-700">
//             {quickQuestions.map((q) => (
//               <button
//                 key={q}
//                 onClick={() => sendMessage(q)}
//                 className="text-xs px-2 py-1 bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-full hover:bg-gray-200"
//               >
//                 {q}
//               </button>
//             ))}
//           </div>

//           <div className="flex-1 p-3 overflow-y-auto space-y-2">
//             {messages.map((m, i) => (
//               <div key={i} className={`flex ${m.fromUser ? 'justify-end' : 'justify-start'}`}>
//                 <div
//                   className={`px-3 py-1 rounded-lg max-w-[70%] ${
//                     m.fromUser
//                       ? 'bg-blue-600 text-white'
//                       : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
//                   }`}
//                 >
//                   {m.text}
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="p-2 border-t border-gray-200 dark:border-gray-700 flex">
//             <input
//               type="text"
//               className="flex-1 p-2 border rounded-l bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
//               placeholder="Type a message..."
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => e.key === 'Enter' && input.trim() && sendMessage(input.trim())}
//             />
//             <button
//               onClick={() => input.trim() && sendMessage(input.trim())}
//               className="px-4 bg-blue-600 text-white rounded-r hover:bg-blue-700"
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// src/components/ChatWidget.jsx
import { useState } from 'react';

async function getBotReply(prompt) {
  const key = import.meta.env.VITE_OPENAI_API_KEY;
  const res = await fetch('/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
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
    console.error('OpenAI API error', await res.text());
    return 'Sorry, something went wrong on my end.';
  }

  const { choices } = await res.json();
  return choices[0].message.content.trim();
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

  const sendMessage = async (text, fromUser = true) => {
    setMessages(m => [...m, { text, fromUser }]);
    setInput('');
    if (!fromUser) return;
    try {
      const reply = await getBotReply(text);
      setMessages(m => [...m, { text: reply, fromUser: false }]);
    } catch {
      setMessages(m => [...m, { text: 'Sorry, something went wrong.', fromUser: false }]);
    }
  };

  return (
    <>
      <button
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 z-50"
        onClick={() => setOpen(o => !o)}
      >
        {open ? '✖️' : '💬'}
      </button>

      {open && (
        <div className="fixed bottom-20 right-6 w-80 max-h-[70vh] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg flex flex-col overflow-hidden z-50">
          <div className="bg-blue-600 text-white p-3 flex justify-between items-center">
            <h3 className="font-semibold">SoftSell Help</h3>
            <button onClick={() => setOpen(false)}>✖️</button>
          </div>
          <div className="p-2 flex flex-wrap gap-2 bg-gray-100 dark:bg-gray-700">
            {quickQuestions.map(q => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="text-xs px-2 py-1 bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-full hover:bg-gray-200"
              >
                {q}
              </button>
            ))}
          </div>
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
          <div className="p-2 border-t border-gray-200 dark:border-gray-700 flex">
            <input
              type="text"
              className="flex-1 p-2 border rounded-l bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              placeholder="Type a message..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && input.trim() && sendMessage(input.trim())}
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
