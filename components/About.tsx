import type { About as AboutData } from "@/lib/content";

interface Props {
  about: AboutData;
}

export default function About({ about }: Props) {
  return (
    <section id="about" className="max-w-[680px] mx-auto px-6 pt-[120px]">
      <h2 className="text-[13px] font-semibold text-[#6b7280] uppercase tracking-widest mb-8">
        关于
      </h2>

      <div className="space-y-5 text-[15px] text-[#374151] leading-[1.8]">
        {about.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {about.currentProject && (
        <p className="mt-8 text-[13px] text-[#9ca3af]">
          目前在做：{" "}
          <span className="text-[#6b7280]">{about.currentProject}</span>
        </p>
      )}
    </section>
  );
}
