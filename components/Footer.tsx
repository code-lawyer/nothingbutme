import Link from "next/link";
import type { FooterData } from "@/lib/content";

interface Props {
  footer: FooterData;
}

export default function Footer({ footer }: Props) {
  return (
    <footer id="contact" className="max-w-[680px] mx-auto px-6 pt-[120px] pb-16">
      <div className="border-t border-[#e5e7eb] pt-10">
        {footer.contactText && (
          <p className="text-[14px] text-[#6b7280] mb-6">{footer.contactText}</p>
        )}

        <div className="flex flex-wrap gap-6">
          {footer.links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              className="text-[14px] text-[#6b7280] hover:text-[#2563eb] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <p className="mt-10 text-[12px] text-[#9ca3af]">
          © {new Date().getFullYear()} {footer.copyright}
        </p>
      </div>
    </footer>
  );
}
