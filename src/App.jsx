import React, { useState, useEffect } from 'react';
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
  Cpu
} from 'lucide-react';

const App = () => {
  const [timeLeft, setTimeLeft] = useState({});
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

  return (
    <div className="min-h-screen bg-[#0a0f0b] flex items-center justify-center p-4 text-gray-100 selection:bg-emerald-500/30">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.cdnfonts.com/css/product-sans');
        body {
          font-family: 'Product Sans', sans-serif;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .snow-glow {
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.2), inset 0 0 10px rgba(16, 185, 129, 0.3);
        }
      `}} />

      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-10">
         <div className="absolute top-1/4 left-10 text-emerald-400 animate-pulse"><Wind size={100} /></div>
         <div className="absolute bottom-1/4 right-10 text-green-400 animate-bounce"><Leaf size={60} /></div>
      </div>

      {/* Discord Profile Container */}
      <div className="w-full max-w-[480px] bg-[#111214] rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(16,185,129,0.15)] border border-emerald-900/30 relative z-10">
        
        {/* Banner GIF */}
        <div className="h-32 w-full relative overflow-hidden">
          <img 
            src="https://media1.tenor.com/m/A6qADxOkvkoAAAAC/venti-genshin.gif" 
            alt="Venti Banner" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111214]/40 to-transparent"></div>
          <div className="absolute top-4 right-4">
            <div className="bg-black/50 p-1.5 rounded-full backdrop-blur-md cursor-pointer hover:bg-black/80 transition">
              <Settings size={18} />
            </div>
          </div>
        </div>

        {/* Avatar Section */}
        <div className="px-4 pb-4 relative">
          <div className="absolute -top-16 left-4">
            <div className="relative group">
              {/* Avatar mới nhất theo yêu cầu của đại ca */}
              <div className="w-28 h-28 rounded-full border-[6px] border-[#111214] overflow-hidden bg-[#111214] shadow-2xl transition-transform hover:scale-105 duration-300 snow-glow">
                <img 
                  src="https://raw.githubusercontent.com/truehieu-dotcom/RealTrueHieu/dfe6554af7840c58f7c534828ff2f3812948ee12/35ab948d68a0fda9c089af34c6ec3b05.webp" 
                  alt="TrueHieu Avatar" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-[4px] border-[#111214]"></div>
            </div>
          </div>

          {/* Badges Area */}
          <div className="flex justify-end pt-5 gap-1.5 h-14">
            <Badge icon={<Code size={16} />} title="CODE" />
            <Badge icon={<ShieldCheck size={16} />} title="Active Developer" />
            <Badge icon={<Award size={16} />} title="Nitro" />
          </div>

          {/* Identity Section */}
          <div className="mt-4 bg-[#1e1f22] rounded-xl p-4 border border-emerald-500/10 shadow-lg">
            <h1 className="text-2xl font-bold flex items-center gap-2 tracking-tight leading-none">
              It’s TrueHieu <span className="text-gray-400 font-normal text-sm opacity-60">phongthan3contot</span>
            </h1>
            <p className="text-emerald-400/90 text-[13px] mt-1.5 font-medium flex items-center gap-1.5 leading-none">
              <Leaf size={14} className="animate-spin-slow" /> He/Him • Simp Venti & CODE
            </p>
          </div>

          {/* Custom Status */}
          <div className="mt-3 p-3 bg-[#1e1f22] rounded-xl border border-white/5 flex items-center gap-2 hover:bg-[#232428] transition cursor-default group">
             <span className="text-xl group-hover:animate-bounce">🍃</span>
             <span className="text-sm text-gray-200">Gió thổi mây bay, thi tốt ngay thôi!</span>
          </div>

          {/* Programming Languages Section */}
          <div className="mt-3 p-4 bg-[#1e1f22] rounded-xl border border-white/5 shadow-md">
            <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Ngôn ngữ lập trình</h3>
            <div className="flex gap-2.5">
              <div className="flex items-center gap-2 bg-[#0d1a12] border border-emerald-500/20 px-3 py-1.5 rounded-lg group hover:border-emerald-500/50 transition-all cursor-default">
                <Terminal size={14} className="text-emerald-400" />
                <span className="text-[12px] font-bold text-emerald-50 color-emerald-100 uppercase tracking-wider">Python</span>
              </div>
              <div className="flex items-center gap-2 bg-[#0d1a12] border border-emerald-500/20 px-3 py-1.5 rounded-lg group hover:border-emerald-500/50 transition-all cursor-default">
                <Cpu size={14} className="text-emerald-400" />
                <span className="text-[12px] font-bold text-emerald-50 color-emerald-100 uppercase tracking-wider">C++</span>
              </div>
            </div>
          </div>

          {/* TIMER: THI VÀO 10 */}
          <div className="mt-3 p-4 bg-gradient-to-br from-[#0d1a12] to-[#1e1f22] rounded-xl border border-emerald-500/30 relative overflow-hidden shadow-inner">
            <div className="flex justify-between items-center mb-3 relative z-10">
               <h3 className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.15em] flex items-center gap-2">
                <Clock size={14} /> Kỳ thi vào 10 sắp tới
              </h3>
              <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30 font-bold uppercase">8:00 AM</span>
            </div>
            
            {timeLeft.expired ? (
              <div className="text-2xl font-bold text-center text-emerald-400 animate-pulse tracking-widest py-2">
                THI TỐT NHÉ ĐẠI CA!
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-2 text-center relative z-10">
                <TimeUnit value={timeLeft.days} label="Ngày" />
                <TimeUnit value={timeLeft.hours} label="Giờ" />
                <TimeUnit value={timeLeft.minutes} label="Phút" />
                <TimeUnit value={timeLeft.seconds} label="Giây" highlight />
              </div>
            )}
          </div>

          {/* About Me */}
          <div className="mt-3 p-4 bg-[#1e1f22] rounded-xl border border-white/5">
            <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Thông tin chi tiết</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                  <Gamepad2 size={16} />
                </div>
                <div>
                  <span className="text-gray-500 block text-[9px] uppercase font-bold tracking-wider">Server Discord</span>
                  <a href="https://discord.gg/CTyUJsMNSr" target="_blank" className="text-blue-400 hover:underline text-[13px] font-medium">discord.gg/CTyUJsMNSr</a>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                  <Calendar size={16} />
                </div>
                <div>
                  <span className="text-gray-500 block text-[9px] uppercase font-bold tracking-wider">Ngày sinh nhật</span>
                  <span className="text-gray-200 text-[13px] font-medium">01/11/2011 • 14 tuổi</span>
                </div>
              </div>

              <div className="pt-2 mt-2 border-t border-white/5">
                <p className="text-gray-400 text-xs leading-relaxed">
                  Đang học tại <span className="text-emerald-400 font-bold">THCS Phúc Diễn</span>. 
                  Một fan cứng của Phong Thần Venti.
                </p>
              </div>
            </div>
          </div>

          {/* Connections */}
          <div className="mt-3 p-4 bg-[#1e1f22] rounded-xl border border-white/5">
            <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Kết Nối</h3>
            <a 
              href="https://www.facebook.com/share/1Ki4KizjmU/?mibextid=wwXIfr" 
              target="_blank" 
              className="flex items-center justify-between group bg-white/5 hover:bg-emerald-500/10 p-2.5 rounded-lg transition-all border border-transparent hover:border-emerald-500/20"
            >
              <div className="flex items-center gap-3">
                <Facebook size={20} className="text-[#1877F2] group-hover:scale-110 transition-transform" />
                <div>
                  <span className="font-bold text-gray-200 block text-sm">Trần Trung Minh Hiếu</span>
                  <span className="text-[10px] text-blue-400 flex items-center gap-1 font-medium"><ShieldCheck size={10} /> Đã xác thực</span>
                </div>
              </div>
              <ExternalLink size={14} className="text-gray-600 group-hover:text-emerald-400 transition-colors" />
            </a>
          </div>

          {/* Footer Quote */}
          <p className="mt-6 text-center text-[10px] text-gray-600 italic tracking-widest opacity-50 uppercase">
            — Would it be simpler to just fly? —
          </p>
        </div>
      </div>
    </div>
  );
};

const Badge = ({ icon, title }) => (
  <div className="bg-[#1e1f22] p-1.5 rounded-md border border-white/5 hover:bg-[#2b2d31] transition cursor-help shadow-sm" title={title}>
    <div className="text-emerald-400">{icon}</div>
  </div>
);

const TimeUnit = ({ value, label, highlight }) => (
  <div className="bg-black/40 p-2 rounded-lg border border-white/5 backdrop-blur-sm shadow-inner group hover:bg-black/60 transition">
    <div className={`text-xl font-bold tracking-tight ${highlight ? 'text-emerald-400 animate-pulse' : 'text-gray-100'}`}>
      {value?.toString().padStart(2, '0') || '00'}
    </div>
    <div className="text-[8px] text-gray-500 uppercase font-bold tracking-widest mt-1 group-hover:text-emerald-500/70 transition-colors">{label}</div>
  </div>
);

export default App;
