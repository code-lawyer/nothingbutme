// components/Footer.tsx
import Link from "next/link";

const contactLinks = [
  { label: "Email", href: "mailto:you@example.com" },
  { label: "GitHub", href: "https://github.com/yourusername" },
  { label: "Twitter / X", href: "https://x.com/yourusername" },
];

export default function Footer() {
  return (
    <footer
      id="contact"
      className="max-w-[680px] mx-auto px-6 pt-[120px] pb-16"
    >
      <div className="border-t border-[#e5e7eb] pt-10">
        <p className="text-[14px] text-[#6b7280] mb-6">
          如果你想聊聊，可以通过以下方式找到我
        </p>

        <div className="flex flex-wrap gap-6">
          {contactLinks.map((link) => (
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
          © {new Date().getFullYear()} Your Name
        </p>
      </div>
    </footer>
  );
}
