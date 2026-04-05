// src/components/chatbot/Chatbot.jsx
import { useState, useRef, useEffect } from 'react';
import { sendChatMessage } from '../../services/api';
import './Chatbot.css';

const QUICK_QUESTIONS = [
  'Career path for cricket',
  'Best diet for athletes',
  'How to improve fitness score',
  'Government sports jobs in India',
  'Training plan for football',
  'Salary of IPL players',
];

export default function Chatbot({ userProfile }) {
  const [messages, setMessages] = useState([
    {
      from: 'bot',
      text: "Hi! I'm SportPath AI.\n\nAsk me anything about sports — careers, training plans, diet, rules, history, salaries, scholarships, and more. I cover all sports worldwide!",
    },
  ]);
  const [input, setInput]     = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef             = useRef(null);
  const inputRef              = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const send = async (text) => {
    const msg = (text || input).trim();
    if (!msg || loading) return;
    setInput('');
    setMessages(prev => [...prev, { from: 'user', text: msg }]);
    setLoading(true);

    try {
      const reply = await sendChatMessage(msg, userProfile?.id || 'guest');
      setMessages(prev => [...prev, { from: 'bot', text: reply }]);
    } catch {
      setMessages(prev => [...prev, {
        from: 'bot',
        text: 'Sorry, I could not connect to the server. Please make sure the Flask Chatbot is running on port 5000.',
      }]);
    }
    setLoading(false);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="cb-full-page">
      <div className="cb-window full-page-window">

        {/* ── Header ── */}
        <div className="cb-header">
          <div className="cb-header-left">
            <div className="cb-avatar">AI</div>
            <div>
              <div className="cb-title">SportPath AI</div>
              <div className="cb-status">
                <span className="cb-dot" />
                Online — Ask anything about sports
              </div>
            </div>
          </div>
        </div>

        {/* ── Messages ── */}
        <div className="cb-messages">
          {messages.map((m, i) => (
            <div key={i} className={`cb-row ${m.from}`}>
              {m.from === 'bot' && <div className="cb-msg-avatar">AI</div>}
              <div className={`cb-bubble ${m.from}`}>{m.text}</div>
            </div>
          ))}

          {loading && (
            <div className="cb-row bot">
              <div className="cb-msg-avatar">AI</div>
              <div className="cb-bubble bot cb-typing">
                <span /><span /><span />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* ── Quick chips ── */}
        <div className="cb-chips">
          {QUICK_QUESTIONS.map(q => (
            <button
              key={q}
              className="cb-chip"
              onClick={() => send(q)}
              disabled={loading}
            >
              {q}
            </button>
          ))}
        </div>

        {/* ── Input ── */}
        <div className="cb-input-row">
          <input
            ref={inputRef}
            className="cb-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask anything about sports..."
            disabled={loading}
          />
          <button
            className="cb-send"
            onClick={() => send()}
            disabled={loading || !input.trim()}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
}
