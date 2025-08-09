'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';

type SearchBarProps = {
  placeholder?: string;
  defaultValue?: string;
  debounceMs?: number;
  onSearch?: (q: string) => void;
  className?: string;
};

export default function SearchBar({
  placeholder = 'Search…',
  defaultValue = '',
  debounceMs = 200,
  onSearch,
  className = '',
}: SearchBarProps) {
  const [q, setQ] = useState(defaultValue);
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Ctrl/⌘+K to focus
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const isK = e.key.toLowerCase() === 'k';
      if ((e.ctrlKey || e.metaKey) && isK) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Debounce notify
  useEffect(() => {
    setIsTyping(true);
    const t = setTimeout(() => {
      setIsTyping(false);
      onSearch?.(q.trim());
    }, debounceMs);
    return () => clearTimeout(t);
  }, [q, debounceMs, onSearch]);

  const showClear = useMemo(() => q.length > 0, [q]);

  return (
    <div
      className={`flex items-center gap-2 rounded-xl border px-3 h-10 bg-white shadow-sm flex-nowrap ${className}`}
    >
      {/* magnifier */}
      <svg
        className="h-5 w-5 shrink-0 opacity-70"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-4.3-4.3M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"
        />
      </svg>

      <input
        ref={inputRef}
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={placeholder}
        className="w-full h-full outline-none bg-transparent text-[14px] placeholder:text-gray-400"
        aria-label="Search"
      />

      {/* typing indicator */}
      {isTyping && (
        <div className="text-[12px] leading-none text-gray-400">…</div>
      )}

      {/* clear button */}
      {showClear && (
        <button
          type="button"
          onClick={() => setQ('')}
          className="rounded-md px-2 py-1 text-[12px] bg-gray-100 hover:bg-gray-200"
          aria-label="Clear search"
        >
          Clear
        </button>
      )}
    </div>
  );
}
