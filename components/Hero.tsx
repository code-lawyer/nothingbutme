// components/Hero.tsx
import Image from "next/image";

export default function Hero() {
  return (
    <section className="max-w-[680px] mx-auto px-6 pt-32 pb-0">
      {/* Quote */}
      <blockquote className="mb-10 border-l-2 border-[#e5e7eb] pl-4 italic text-[15px] text-[#6b7280] leading-relaxed">
        "法律是将道德最低限度固化为规则的艺术；代码是将逻辑最严格固化为指令的艺术。"
        <footer className="mt-1 not-italic text-[13px]">— Your Name</footer>
      </blockquote>

      {/* Name + photo row */}
      <div className="flex items-start gap-5">
        <Image
          src="/avatar.jpg"
          alt="Profile photo"
          width={100}
          height={120}
          className="rounded-lg object-cover flex-shrink-0 grayscale"
          priority
        />
        <div>
          <h1 className="text-[36px] font-bold text-[#111111] leading-tight tracking-tight">
            Your Name
          </h1>
          <p className="text-[14px] text-[#6b7280] mt-1 mb-3">
            律师 · 写作者 · 业余程序员
          </p>
          <p className="text-[15px] text-[#374151] leading-[1.8]">
            我在法律文书与代码之间游走，试图用精确的语言描述模糊的世界。这里记录我的思考、项目与阅读。
          </p>
        </div>
      </div>
    </section>
  );
}
