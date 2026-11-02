'use client';

import React, { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { 
  Sparkles, 
  Lightbulb, 
  BookOpen, 
  Search, 
  Layers, 
  Cpu, 
  Database, 
  Network, 
  Binary, 
  Copy, 
  Check, 
  ChevronDown, 
  ChevronUp,
  Zap
} from 'lucide-react';

const CATEGORIES = [
  { id: 'ALL', label: 'All Knowledge', icon: Layers },
  { id: 'DSA', label: 'DSA Patterns & Tricks', icon: Binary },
  { id: 'System Design', label: 'System Design Math', icon: Sparkles },
  { id: 'OS', label: 'Operating Systems', icon: Cpu },
  { id: 'DBMS', label: 'DBMS & SQL', icon: Database },
  { id: 'Networks', label: 'Computer Networks', icon: Network },
];

export default function ConceptsPage() {
  const [selectedCat, setSelectedCat] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>('dsa-sliding-window');
  const [copiedFormula, setCopiedFormula] = useState<string | null>(null);

  const { data: concepts, isLoading } = trpc.concept.list.useQuery({
    category: selectedCat === 'ALL' ? undefined : (selectedCat as any),
    search: searchQuery || undefined,
  });

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFormula(text);
    setTimeout(() => setCopiedFormula(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#070b12] text-gray-100 pb-20">
      {/* Header Banner */}
      <div className="relative border-b border-gray-800/80 bg-gradient-to-b from-indigo-950/20 via-[#0a0f1d] to-[#070b12] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-400 mb-3">
                <Zap className="h-3.5 w-3.5" /> High-Yield Revision Vault
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Concepts, Short Tricks & Master Formulas
              </h1>
              <p className="mt-2 text-sm sm:text-base text-gray-400 max-w-2xl">
                Quick-revision cheat sheets for DSA templates, Latency numbers, QPS estimation, 
                OS scheduling formulas, DBMS normalization rules, and Network protocols.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-4 bg-gray-900/60 border border-gray-800 rounded-xl p-4 self-start">
              <div>
                <div className="text-2xl font-black text-indigo-400">150+</div>
                <div className="text-xs text-gray-400 font-medium">Curated Questions</div>
              </div>
              <div className="h-8 w-px bg-gray-800" />
              <div>
                <div className="text-2xl font-black text-emerald-400">30/Topic</div>
                <div className="text-xs text-gray-400 font-medium">Deep Question Bank</div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-8 relative max-w-2xl">
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search concepts, formulas, short tricks (e.g., 'sliding window', 'QPS', 'Coffman', 'B+ tree')..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-gray-800 bg-gray-900/90 pl-10 pr-4 py-2.5 text-sm text-gray-200 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors shadow-inner"
            />
          </div>

          {/* Category Tabs */}
          <div className="mt-6 flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCat === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCat(cat.id)}
                  className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'bg-gray-900/80 text-gray-400 border border-gray-800 hover:text-gray-200 hover:border-gray-700'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-8">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
            <span className="text-xs text-gray-500">Loading formula vault...</span>
          </div>
        ) : !concepts || concepts.length === 0 ? (
          <div className="rounded-xl border border-gray-800 bg-gray-900/40 p-12 text-center">
            <BookOpen className="mx-auto h-10 w-10 text-gray-600 mb-3" />
            <h3 className="text-base font-semibold text-gray-300">No concept matches found</h3>
            <p className="text-xs text-gray-500 mt-1">Try a different search query or select "All Knowledge".</p>
          </div>
        ) : (
          <div className="space-y-6">
            {concepts.map((concept: any) => {
              const isExpanded = expandedId === concept.id;
              return (
                <div
                  key={concept.id}
                  className="rounded-2xl border border-gray-800/80 bg-gray-900/40 hover:border-gray-700/80 transition-all overflow-hidden shadow-lg backdrop-blur-sm"
                >
                  {/* Card Header */}
                  <div
                    onClick={() => setExpandedId(isExpanded ? null : concept.id)}
                    className="p-6 cursor-pointer flex items-start justify-between gap-4 select-none"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2.5 mb-2">
                        <span className="rounded-md border border-indigo-500/30 bg-indigo-500/10 px-2 py-0.5 text-[11px] font-semibold text-indigo-400">
                          {concept.category}
                        </span>
                        <h2 className="text-lg sm:text-xl font-bold text-white hover:text-indigo-300 transition-colors">
                          {concept.title}
                        </h2>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                        {concept.shortSummary}
                      </p>
                    </div>

                    <button
                      className="rounded-lg p-2 text-gray-400 hover:text-white hover:bg-gray-800/60 transition-colors"
                      aria-label="Toggle details"
                    >
                      {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </button>
                  </div>

                  {/* Highlights Grid: Formulas & Short Tricks */}
                  <div className="px-6 pb-6 pt-0 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Formulas Box */}
                    <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                      <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2.5">
                        <Zap className="h-4 w-4" /> Core Formulas & Invariants
                      </div>
                      <ul className="space-y-2 text-xs text-amber-200/90 font-mono">
                        {concept.formulas.map((f: string, i: number) => (
                          <li key={i} className="flex items-start justify-between gap-2 group/item">
                            <span className="leading-snug">• {f}</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCopy(f);
                              }}
                              className="opacity-0 group-hover/item:opacity-100 text-amber-400 hover:text-white transition-opacity p-0.5"
                              title="Copy formula"
                            >
                              {copiedFormula === f ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Short Tricks Box */}
                    <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                      <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2.5">
                        <Lightbulb className="h-4 w-4" /> 💡 Golden Short Tricks
                      </div>
                      <ul className="space-y-2 text-xs text-emerald-200/90 leading-relaxed">
                        {concept.shortTricks.map((t: string, i: number) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-emerald-400 font-bold">✓</span>
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Expanded Detailed Content & Code Templates */}
                  {isExpanded && (
                    <div className="border-t border-gray-800 bg-[#090e1a]/80 p-6 space-y-4">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400">
                        <BookOpen className="h-4 w-4" /> Detailed Architecture & Code Templates
                      </div>
                      <div className="prose prose-invert max-w-none text-xs sm:text-sm text-gray-300 leading-relaxed whitespace-pre-wrap font-sans">
                        {concept.contentMdx}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
