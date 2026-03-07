import React, { useState, useEffect, useRef } from 'react';
import { 
  Settings, 
  Facebook, 
  Calendar, 
  Clock, 
  ExternalLink, 
  ShieldCheck, 
  Code, 
  Award, 
  Gamepad2, 
  Wind, 
  Leaf,
  Terminal,
  Cpu,
  Sparkles,
  Send,
  Volume2,
  Loader2,
  MessageSquare
} from 'lucide-react';

const App = () => {
  const apiKey = ""; 
  const [timeLeft, setTimeLeft] = useState({});
  const [aiInput, setAiInput] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const targetDate = new Date('2026-05-30T08:00:00').getTime();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ expired: true });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const callGemini = async (prompt) => {
    if (!prompt.trim()) return;
    setIsAiLoading(true);
    let retries = 0;
    const maxRetries = 5;
    
    const systemPrompt = "Bạn là Venti từ Genshin Impact. Bạn đang nói chuyện với TrueHieu (sinh năm 2011, thích lập trình Python/C++, học trường THCS Phúc Diễn). Hãy trả lời bằng phong cách thơ mộng, tự do của gió. Trả lời cực kỳ ngắn gọn, súc tích trong 1-2 câu.";

    const fetchWithRetry = async (delay) => {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            systemInstruction: { parts: [{ text: systemPrompt }] }
          })
        });
        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text;
      } catch (error) {
        if (retries < maxRetries) {
          retries++;
          await new Promise(res => setTimeout(res, delay));
          return fetchWithRetry(delay * 2);
        }
        throw error;
      }
    };

    try {
      const result = await fetchWithRetry(1000);
      setAiResponse(result);
      setAiInput("");
    } catch (err) {
      setAiResponse("Cơn gió bị nghẽn rồi đại ca ơi...");
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleSpeak = async () => {
    if (!aiResponse || isSpeaking) return;
    setIsSpeaking(true);
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Say cheerfully: ${aiResponse}` }] }],
          generationConfig: {
            responseModalities: ["AUDIO"],
            speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: "Puck" } } }
          },
          model: "gemini-2.5-flash-preview-tts"
        })
      });
      const data = await response.json();
      const base64Audio = data.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      
      if (base64Audio) {
        const audioBlob = new Blob([Uint8Array.from(atob(base64Audio), c => c.charCodeAt(0))], { type: 'audio/l16' });
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.play();
        audio.onended = () => setIsSpeaking(false);
      }
    } catch (err) {
      setIsSpeaking(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f0b] flex items-center justify-center p-4 text-gray-100 selection:bg-emerald-500/30">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap');
        body { 
          font-family: 'Open Sans', sans-serif; 
          -webkit-font-smoothing: antialiased;
        }
        /* Giả lập Google Sans nếu máy có sẵn, nếu không dùng Open Sans tương tự */
        .google-sans {
          font-family: "Google Sans", "Open Sans", sans-serif;
        }
        .snow-glow { box-shadow: 0 0 30px rgba(16, 185, 129, 0.1); }
        .badge-fit { width: 34px; height: 44px; }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}} />

      <div className="w-full max-w-[800px] bg-[#111214] rounded-3xl overflow-hidden shadow-2xl border border-emerald-900/10 relative z-10 flex flex-col google-sans">
        
        {/* Banner Area - Bố cục cũ */}
        <div className="h-44 w-full relative overflow-hidden">
          <img 
            src="https://media1.tenor.com/m/A6qADxOkvkoAAAAC/venti-genshin.gif" 
            alt="Venti Banner" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111214] via-transparent to-transparent"></div>
          <div className="absolute top-4 right-4">
            <div className="bg-black/40 p-2 rounded-full backdrop-blur-md cursor-pointer hover:bg-emerald-500/50 transition-all">
              <Settings size={18} />
            </div>
          </div>
        </div>

        {/* Profile Header - Bố cục cũ */}
        <div className="px-8 pb-4">
          <div className="relative flex justify-between items-end mb-2">
            <div className="relative -mt-12 ml-2">
              <div className="w-28 h-28 rounded-full border-[6px] border-[#111214] overflow-hidden bg-[#111214] snow-glow">
                <img 
                  src="https://raw.githubusercontent.com/truehieu-dotcom/RealTrueHieu/dfe6554af7840c58f7c534828ff2f3812948ee12/35ab948d68a0fda9c089af34c6ec3b05.webp" 
                  alt="TrueHieu" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-1.5 right-1.5 w-6 h-6 bg-green-500 rounded-full border-[4px] border-[#111214]"></div>
            </div>
            
            <div className="flex gap-1.5 mb-1">
              <Badge icon={<Code size={16} />} />
              <Badge icon={<ShieldCheck size={16} />} />
              <Badge icon={<Award size={16} />} />
            </div>
          </div>

          <div className="mt-2 ml-2">
            <div className="flex items-baseline gap-2">
              <h1 className="text-3xl font-bold tracking-tight">It’s TrueHieu</h1>
              <span className="text-gray-500 text-sm opacity-60">phongthan3contot</span>
            </div>
            <p className="text-emerald-400 text-sm mt-1 font-medium flex items-center gap-2">
              <Leaf size={14} className="animate-spin-slow" /> Simp Venti & CODE
            </p>
          </div>
        </div>

        {/* Main Content Sections - Bố cục cũ */}
        <div className="px-8 pb-6 grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Left: Info */}
          <div className="md:col-span-3 space-y-3">
            <div className="p-5 bg-[#1e1f22]/50 rounded-2xl border border-white/5 h-full">
              <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">Thông tin cá nhân</h3>
              <div className="space-y-4">
                <InfoItem icon={<Calendar size={18} />} label="Ngày sinh" value="01/11/2011" />
                <InfoItem icon={<Gamepad2 size={18} />} label="Discord Server" value="discord.gg/CTyUJsMNSr" isLink />
                <div className="flex gap-2 pt-2">
                  <SkillTag icon={<Terminal size={14} />} text="Python" />
                  <SkillTag icon={<Cpu size={14} />} text="C++" />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Timer & FB */}
          <div className="md:col-span-2 space-y-4">
            {/* Countdown Timer */}
            <div className="p-5 bg-gradient-to-br from-[#0d1a12] to-[#1e1f22] rounded-2xl border border-emerald-500/10 shadow-lg relative overflow-hidden group">
              <div className="flex justify-between items-center mb-4 relative z-10">
                <h3 className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                  <Clock size={14} /> Kỳ thi vào 10
                </h3>
                <span className="text-[9px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full font-bold">8:00 AM</span>
              </div>
              
              <div className="grid grid-cols-4 gap-2 relative z-10">
                <TimeUnit value={timeLeft.days} label="Ngày" />
                <TimeUnit value={timeLeft.hours} label="Giờ" />
                <TimeUnit value={timeLeft.minutes} label="Phút" />
                <TimeUnit value={timeLeft.seconds} label="Giây" highlight />
              </div>
            </div>

            <a 
              href="https://www.facebook.com/share/1Ki4KizjmU/?mibextid=wwXIfr" 
              target="_blank" 
              className="flex items-center justify-between bg-[#1e1f22]/50 hover:bg-emerald-500/5 p-4 rounded-xl transition-all border border-white/5 group"
            >
              <div className="flex items-center gap-3">
                <Facebook size={22} className="text-[#1877F2]" />
                <div className="flex flex-col">
                  <span className="font-bold text-xs">Trần Trung Minh Hiếu</span>
                  <span className="text-[9px] text-blue-400 flex items-center gap-1 font-bold italic uppercase tracking-wider mt-0.5 opacity-80"><ShieldCheck size={10} /> Verified Member</span>
                </div>
              </div>
              <ExternalLink size={14} className="text-gray-600 group-hover:text-emerald-400" />
            </a>
          </div>
        </div>

        {/* ✨ VENTI CHAT BOX - Giữ nguyên bố cục trong ảnh ✨ */}
        <div className="mt-auto mx-8 mb-6 border border-white/5 bg-[#18191c]/80 p-5 rounded-2xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 bg-emerald-500/10 rounded-lg">
              <Sparkles className="text-emerald-400 w-4 h-4 animate-pulse" />
            </div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400">Gió Thần Thông Thái</h3>
          </div>

          <div className="space-y-4">
            {aiResponse && (
              <div className="bg-black/30 p-4 rounded-xl border border-emerald-500/5 flex justify-between items-start gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <p className="text-sm text-gray-300 leading-relaxed italic flex-1">"{aiResponse}"</p>
                <button 
                  onClick={handleSpeak}
                  disabled={isSpeaking}
                  className="mt-1 p-1.5 text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-all disabled:opacity-20"
                >
                  {isSpeaking ? <Loader2 className="animate-spin w-4 h-4" /> : <Volume2 size={18} />}
                </button>
              </div>
            )}

            <div className="relative flex items-center">
              <input 
                type="text" 
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                placeholder="Nhắn gì đó với Venti..."
                className="w-full bg-black/40 border border-white/5 rounded-xl pl-5 pr-12 py-3 text-sm focus:outline-none focus:border-emerald-500/30 transition-all placeholder:text-gray-600 shadow-inner"
                onKeyDown={(e) => e.key === 'Enter' && callGemini(aiInput)}
              />
              <button 
                onClick={() => callGemini(aiInput)}
                disabled={isAiLoading || !aiInput.trim()}
                className="absolute right-3 p-1.5 text-emerald-400 hover:text-emerald-300 transition-all disabled:opacity-30"
              >
                {isAiLoading ? <Loader2 className="animate-spin w-5 h-5" /> : <Send size={20} />}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

const Badge = ({ icon }) => (
  <div className="bg-[#1e1f22] badge-fit flex items-center justify-center rounded-lg border border-white/5 hover:border-emerald-500/30 transition-all cursor-help">
    <div className="text-emerald-400/70">{icon}</div>
  </div>
);

const InfoItem = ({ icon, label, value, isLink }) => (
  <div className="flex items-center gap-4 group">
    <div className="p-2.5 bg-emerald-500/5 rounded-xl text-emerald-500 group-hover:bg-emerald-500/10 transition-all">{icon}</div>
    <div>
      <span className="text-gray-500 block text-[9px] uppercase font-bold tracking-widest opacity-60">{label}</span>
      {isLink ? (
        <a href={`https://${value}`} target="_blank" className="text-blue-400 hover:underline text-sm font-semibold">{value}</a>
      ) : (
        <span className="text-gray-100 text-sm font-semibold">{value}</span>
      )}
    </div>
  </div>
);

const TimeUnit = ({ value, label, highlight }) => (
  <div className="bg-black/40 p-3 rounded-xl border border-white/5 flex-1 min-w-0">
    <div className={`text-xl font-bold tracking-tight ${highlight ? 'text-emerald-400' : 'text-white'}`}>
      {value?.toString().padStart(2, '0') || '00'}
    </div>
    <div className="text-[8px] text-gray-500 uppercase font-bold tracking-widest mt-1">{label}</div>
  </div>
);

const SkillTag = ({ icon, text }) => (
  <div className="flex items-center gap-2 bg-[#0d1a12] border border-emerald-500/10 px-4 py-1.5 rounded-lg text-emerald-100 font-bold text-[10px] uppercase tracking-wider hover:border-emerald-500/30 transition-all cursor-default">
    {icon} {text}
  </div>
);

export default App;
