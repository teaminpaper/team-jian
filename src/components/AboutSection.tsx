import React from 'react';

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative w-full min-h-screen py-28 md:py-36 px-6 md:px-12 flex flex-col items-center justify-center bg-black text-center select-none"
    >
      {/* Background Subtle Gradient Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,rgba(0,0,0,1)_75%)] pointer-events-none" />

      {/* Main Philosophy Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center space-y-10 md:space-y-12">
        {/* 1. Header Statement (헤드문구, 왜(Why) 노란색 컬러) */}
        <p className="text-sm sm:text-base md:text-lg text-zinc-300 font-light tracking-wide leading-relaxed">
          저에게 콘텐츠 기획은 명확한 목적의식, 즉{' '}
          <span className="text-[var(--accent-color,#FFE600)] font-semibold">
            '왜(Why)'
          </span>
          라는 질문에서 출발합니다.
        </p>

        {/* 2. Core Bold Big Headline (볼드체, 중앙 가득 찬 크기) */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-display text-white tracking-tight leading-[1.25] max-w-4xl text-balance">
          '이 기획은 무엇을 말하고자 하는가',<br />
          '궁극적으로 무엇을 이루려 하는가'.
        </h1>

        {/* 3. Deep Body Paragraphs (가운데 정렬, 리듬감 있는 간격과 높은 가독성) */}
        <div className="max-w-2xl mx-auto space-y-7 text-xs sm:text-sm md:text-base text-zinc-400 font-light leading-relaxed tracking-normal font-sans">
          <p className="text-zinc-200">
            저는 질문들을 반복하며 기획의 뼈대를 세우고, 콘텐츠가 전달해야 할 핵심을 구체화합니다.
          </p>

          <p>
            사람들은 자신이 경험한 일에서는 <span className="text-white font-medium">'공감'</span>을, 경험하지 못한 세계에서는 <span className="text-white font-medium">'호기심과 대리만족'</span>을 느낍니다. 알지 못하는 타인의 세계를 궁금해하고, 그 궁금증을 해소하기 위해 콘텐츠를 찾아보는 이 두 가지 심리가 관심을 이끄는 중요한 동력이라고 생각합니다.
          </p>

          <p>
            기대했던 재미와 매력을 충분히 경험한 시청자는 다음 콘텐츠에서도 같은 만족을 기대하게 됩니다. 저는 현재의 트렌드와 시청자의 관심사를 연결하는 데 그치지 않고, 콘텐츠 자체의 완성도와 매력이 다음 콘텐츠에 대한 기대로 이어지는 구조를 고민합니다.
          </p>

          {/* 4. Final Conclusion Statement */}
          <p className="pt-4 text-sm sm:text-base md:text-lg text-white font-medium border-t border-white/10 tracking-tight leading-relaxed">
            하나의 콘텐츠에서 얻은 만족감이 다음 콘텐츠에 대한 기대로 이어지도록 만드는 것, 이것이 제가 중요하게 생각하는 기획의 기준입니다.
          </p>
        </div>
      </div>
    </section>
  );
};
