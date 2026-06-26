import React, { useState } from 'react';
import { MessageSquare, PhoneCall, Trash2, Send, Cpu, Loader2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SmsSimulator() {
  const [isOpen, setIsOpen] = useState(false);
  const [senderPhone, setSenderPhone] = useState('+91 98200 98200');
  const [smsText, setSmsText] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'system',
      text: 'SYSTEM: Gateway online. Compose your SMS emergency text below. You can use English, Hindi, Marathi, Hinglish, etc.'
    }
  ]);
  const [consoleLogs, setConsoleLogs] = useState([]);
  const [showConsole, setShowConsole] = useState(false);
  const [loading, setLoading] = useState(false);
  const [trackLink, setTrackLink] = useState('');

  const handleClear = () => {
    setMessages([
      {
        sender: 'system',
        text: 'SYSTEM: Gateway online. Chat logs cleared.'
      }
    ]);
    setConsoleLogs([]);
    setShowConsole(false);
    setTrackLink('');
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!smsText.trim() || !senderPhone.trim()) return;

    const userMessageText = smsText;
    setMessages(prev => [...prev, { sender: 'user', text: userMessageText }]);
    setSmsText('');
    setLoading(true);
    setShowConsole(true);
    setTrackLink('');

    setConsoleLogs([
      { status: 'info', msg: `[Gateway] SMS received from: ${senderPhone}` },
      { status: 'info', msg: '[Gateway] Routing payload to Gemini parser...' }
    ]);

    try {
      const response = await fetch('/api/simulate-sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ smsText: userMessageText, senderPhone })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to process SMS");
      }

      // Appending logs step by step
      setTimeout(() => {
        setConsoleLogs(prev => [
          ...prev,
          { status: 'success', msg: '[AI Engine] Parsing completed successfully.' }
        ]);
      }, 500);

      if (data.isRating) {
        setTimeout(() => {
          setConsoleLogs(prev => [
            ...prev,
            { status: 'success', msg: `[Feedback] Rating recorded: ${data.rating}/5 for ${data.volunteerName}` }
          ]);
          setMessages(prev => [
            ...prev,
            { sender: 'system', text: `SYSTEM: Feedback recorded. Rated volunteer ${data.volunteerName} ${data.rating}/5. Thank you!` }
          ]);
        }, 1000);
      } else {
        setTimeout(() => {
          setConsoleLogs(prev => [
            ...prev,
            { status: 'info', msg: `[AI Engine] Category: ${data.category} | Urgency: ${data.urgency}/5` },
            { status: 'success', msg: `[Match] Assigned volunteer: ${data.matchedVolunteer ? data.matchedVolunteer.name : 'NGO Coordinator'}` }
          ]);
          setMessages(prev => [
            ...prev,
            {
              sender: 'system',
              text: `SYSTEM: Request registered! Category: ${data.category}, Urgency: ${data.urgency}/5. Matched Volunteer: ${data.matchedVolunteer ? data.matchedVolunteer.name : 'NGO Coordinator'}. (ID: ${data.id})`
            }
          ]);
          setTrackLink(data.id);
        }, 1000);
      }

    } catch (err) {
      setConsoleLogs(prev => [
        ...prev,
        { status: 'error', msg: `[Gateway Error] ${err.message}` }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button (FAB) */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-[0_4px_15px_rgba(16,185,129,0.25)] hover:shadow-[0_4px_25px_rgba(16,185,129,0.45)] flex items-center justify-center transition-all duration-300 hover:scale-105"
        title="Simulate Offline SMS Gateway"
      >
        <MessageSquare size={22} className="text-white" />
      </button>

      {/* Slide-over Drawer / Modal overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs"
            />

            {/* Content Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="relative w-full max-w-md h-full bg-white/95 border-l border-slate-200 shadow-2xl flex flex-col p-6 overflow-y-auto scrollbar-thin"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
                <h3 className="font-display font-extrabold text-lg text-slate-800 flex items-center gap-2">
                  <span>📟</span> Offline SMS Gateway
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-650 transition-all duration-300"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                In disaster zones without internet, victims send a standard SMS to our gateway. Use this phone mock to simulate sending a raw SMS message and watch how Gemini AI parses it.
              </p>

              {/* Simulated Phone Chassis (Silver Bezel) */}
              <div className="border-[6px] border-slate-400 bg-slate-200 rounded-[32px] overflow-hidden shadow-xl flex-grow max-h-[480px] flex flex-col">
                {/* Phone Header */}
                <div className="bg-slate-300 text-slate-750 py-2.5 px-4 flex justify-between items-center text-xs border-b border-slate-400/30">
                  <div className="flex items-center gap-1.5 font-bold">
                    <PhoneCall size={11} className="text-emerald-700" />
                    <span className="text-[10px] uppercase tracking-widest text-slate-700">SMS Gateway Link</span>
                  </div>
                  <button
                    onClick={handleClear}
                    className="text-slate-600 hover:text-red-650 transition-colors"
                    title="Clear Logs"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>

                {/* Chat Screen Body (Light screen) */}
                <div className="flex-grow bg-[#E8EDE6] p-4 overflow-y-auto space-y-3 text-xs flex flex-col justify-start scrollbar-thin">
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`max-w-[85%] rounded-2xl p-3 leading-normal border ${
                        msg.sender === 'user'
                          ? 'bg-emerald-600 border-emerald-500 text-white self-end rounded-tr-none shadow-sm'
                          : msg.sender === 'system'
                          ? 'bg-emerald-50 border-emerald-250 text-emerald-800 self-start rounded-tl-none font-semibold shadow-sm'
                          : 'bg-white border-slate-200 text-slate-800 self-start rounded-tl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                  ))}
                </div>

                {/* Chat Input inside phone */}
                <form onSubmit={handleSend} className="bg-slate-100 p-3 border-t border-slate-300/30 flex flex-col gap-2">
                  <input
                    type="tel"
                    placeholder="Sender's Phone Number"
                    value={senderPhone}
                    onChange={(e) => setSenderPhone(e.target.value)}
                    className="rounded-xl border border-slate-250 bg-white px-3 py-2 text-xs focus:outline-none focus:border-emerald-500 text-slate-800 placeholder-slate-400"
                    required
                  />
                  <div className="flex gap-2">
                    <textarea
                      placeholder="Type raw emergency SMS..."
                      value={smsText}
                      onChange={(e) => setSmsText(e.target.value)}
                      className="flex-grow rounded-xl border border-slate-250 bg-white px-3 py-2 text-xs focus:outline-none focus:border-emerald-500 text-slate-800 placeholder-slate-400 resize-none h-12 scrollbar-none"
                      required
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-all flex items-center justify-center shadow-sm shrink-0"
                    >
                      {loading ? (
                        <Loader2 size={13} className="animate-spin" />
                      ) : (
                        <Send size={13} />
                      )}
                    </button>
                  </div>
                </form>
              </div>

              {/* Console Logs Output */}
              {showConsole && (
                <div className="mt-5 bg-[#080E0B] rounded-2xl p-4 text-left font-mono border border-emerald-950/20 shadow-[inset_0_0_15px_rgba(0,0,0,0.8)]">
                  <div className="flex items-center gap-1.5 text-[9px] text-emerald-400 uppercase tracking-widest mb-2.5 font-bold border-b border-white/5 pb-1">
                    <Cpu size={12} className="animate-pulse" />
                    <span>Gateway Console Logs</span>
                  </div>
                  <div className="space-y-1 text-[11px] max-h-[100px] overflow-y-auto scrollbar-thin">
                    {consoleLogs.map((log, index) => (
                      <div key={index} className="flex gap-1.5 items-start">
                        <span className="text-white/20">&gt;</span>
                        <span
                          className={
                            log.status === 'error'
                              ? 'text-red-400'
                              : log.status === 'success'
                              ? 'text-emerald-400 font-bold'
                              : 'text-slate-400'
                          }
                        >
                          {log.msg}
                        </span>
                      </div>
                    ))}
                  </div>

                  {trackLink && (
                    <div className="mt-3 text-right">
                      <a
                        href={`tracking.html?id=${trackLink}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 text-white text-xs font-bold hover:bg-emerald-600 transition-all duration-300 shadow-sm"
                      >
                        Track Request
                        <ArrowRight size={11} />
                      </a>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
