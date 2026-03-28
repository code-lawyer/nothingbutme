// components/Navbar.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "/#articles", label: "文章" },
  { href: "/#projects", label: "项目" },
  { href: "/#about", label: "关于" },
  { href: "/#contact", label: "联系" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setScrolled(window.scrollY > 10);
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-14 transition-colors duration-200 ${
        scrolled
          ? "bg-[#fafafa]/80 backdrop-blur-md border-b border-[#e5e7eb]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[680px] mx-auto px-6 h-full flex items-center justify-between">
        <Link
          href="/"
          className="text-[#111111] font-medium text-sm tracking-tight hover:text-[#2563eb] transition-colors"
        >
          Your Name
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-[#6b7280] hover:text-[#111111] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden text-[#6b7280] p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            {menuOpen ? (
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              />
            ) : (
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          role="navigation"
          aria-label="Mobile navigation"
          className="sm:hidden bg-[#fafafa]/95 backdrop-blur-md border-b border-[#e5e7eb] px-6 py-4 flex flex-col gap-4"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-[#6b7280] hover:text-[#111111] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
