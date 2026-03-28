// components/About.tsx
export default function About() {
  return (
    <section
      id="about"
      className="max-w-[680px] mx-auto px-6 pt-[120px]"
    >
      <h2 className="text-[13px] font-semibold text-[#6b7280] uppercase tracking-widest mb-8">
        关于
      </h2>

      <div className="space-y-5 text-[15px] text-[#374151] leading-[1.8]">
        <p>
          白天是律师，晚上写代码。这不是什么特别的身份，只是我碰巧在两件事上花了足够多的时间。法律让我习惯于在模糊中寻找确定性，代码让我习惯于在规则中寻找自由。
        </p>
        <p>
          我相信清晰的思维比聪明的头脑更重要。我喜欢把复杂的问题拆解成可以被语言描述的最小单元——无论那个语言是中文、英文还是 Python。
        </p>
        <p>
          这个网站是我的外脑。我在这里记录读到的、想到的、做过的。如果你也在法律、技术或写作的某个交叉点上，也许我们可以聊聊。
        </p>
      </div>

      <p className="mt-8 text-[13px] text-[#9ca3af]">
        目前在做：{" "}
        <span className="text-[#6b7280]">某个合同解析的小工具</span>
      </p>
    </section>
  );
}
