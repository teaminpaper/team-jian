import React, { useState } from 'react';
import { Check, Copy, PhoneCall } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [showPhone, setShowPhone] = useState(false);
  const [copiedMail, setCopiedMail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const email = 'tackssen2002@gmail.com';
  const phoneNumber = '010-8226-1903';

  const handleCopyMail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(email);
    setCopiedMail(true);
    setTimeout(() => setCopiedMail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phoneNumber);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <section
      id="contact"
      className="relative w-full min-h-screen h-[100vh] flex items-center justify-center bg-black overflow-hidden select-none"
    >
      {/* Background Subtle Gradient Vignette matching teamsolfa contact */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,rgba(0,0,0,1)_70%)] pointer-events-none" />

      {/* Center 2-Column Minimalist Layout */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 w-full flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 lg:gap-28">
        {/* Left Column: 제작 문의 */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-end text-center md:text-right space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
            제작 문의
          </h2>
          <div className="flex flex-col items-center md:items-end gap-1">
            <a
              href={`mailto:${email}`}
              className="text-base sm:text-lg text-zinc-400 hover:text-white transition-colors font-sans tracking-wide"
            >
              {email}
            </a>
            <button
              onClick={handleCopyMail}
              className="text-xs font-mono text-zinc-600 hover:text-[var(--accent-color,#FFE600)] transition-colors flex items-center gap-1 pt-0.5 cursor-pointer"
            >
              {copiedMail ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400">메일 주소 복사됨</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>주소 복사</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Center Hairline Divider */}
        <div className="hidden md:block w-px h-28 bg-white/15 shrink-0" />
        <div className="md:hidden w-24 h-px bg-white/15" />

        {/* Right Column: 채용 문의 */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
            채용 문의
          </h2>
          <div className="flex flex-col items-center md:items-start gap-1">
            {!showPhone ? (
              <button
                onClick={() => setShowPhone(true)}
                className="text-base sm:text-lg text-zinc-400 hover:text-white transition-colors font-sans cursor-pointer tracking-wide group flex items-center gap-2"
              >
                <span>채용하기</span>
              </button>
            ) : (
              <div className="flex flex-col items-center md:items-start animate-in fade-in zoom-in-95 duration-200">
                <a
                  href={`tel:${phoneNumber.replace(/-/g, '')}`}
                  className="text-xl sm:text-2xl font-black font-mono text-[var(--accent-color,#FFE600)] hover:brightness-110 tracking-wider flex items-center gap-2"
                >
                  <PhoneCall className="w-5 h-5 shrink-0" />
                  <span>{phoneNumber}</span>
                </a>
                <div className="flex items-center gap-3 pt-1">
                  <button
                    onClick={handleCopyPhone}
                    className="text-xs font-mono text-zinc-500 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    {copiedPhone ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">번호 복사됨</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>전화번호 복사</span>
                      </>
                    )}
                  </button>
                  <span className="text-zinc-700">·</span>
                  <button
                    onClick={() => setShowPhone(false)}
                    className="text-xs font-mono text-zinc-600 hover:text-zinc-400 cursor-pointer"
                  >
                    접기
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
