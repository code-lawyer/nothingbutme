"use client";

import { useState } from "react";

interface Tab {
  value: string;
  label: string;
}

interface Props {
  tabs: Tab[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryTabs({ tabs, activeCategory, onCategoryChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onCategoryChange(tab.value)}
          className={`px-3 py-1 text-[13px] rounded-full transition-colors ${
            activeCategory === tab.value
              ? "bg-[#111111] text-white"
              : "bg-[#f3f4f6] text-[#6b7280] hover:bg-[#e5e7eb]"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
