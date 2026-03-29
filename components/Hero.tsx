import type { Profile } from "@/lib/content";

interface Props {
  profile: Profile;
}

export default function Hero({ profile }: Props) {
  return (
    <section className="max-w-[680px] mx-auto px-6 pt-32 pb-0">
      {profile.quote && (
        <blockquote className="mb-10 border-l-2 border-[#e5e7eb] pl-4 italic text-[15px] text-[#6b7280] leading-relaxed">
          "{profile.quote}"
          <footer className="mt-1 not-italic text-[13px]">— {profile.name}</footer>
        </blockquote>
      )}

      <div>
        <h1 className="text-[32px] sm:text-[36px] font-bold text-[#111111] leading-tight tracking-tight">
          {profile.name}
        </h1>
        {profile.identityTags && (
          <p className="text-[14px] text-[#6b7280] mt-1 mb-3">
            {profile.identityTags}
          </p>
        )}
        {profile.intro && (
          <p className="text-[15px] text-[#374151] leading-[1.8]">
            {profile.intro}
          </p>
        )}
      </div>
    </section>
  );
}
