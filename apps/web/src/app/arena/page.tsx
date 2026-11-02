'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { trpc } from '../../lib/trpc';
import { 
  Code2, 
  Search, 
  Filter, 
  CheckCircle2, 
  Building2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { tokens } from '@devprep/ui';

export default function ArenaListPage() {
  const [search, setSearch] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedCompany, setSelectedCompany] = useState<string>('ALL');

  const { data: problems, isLoading } = trpc.problem.list.useQuery({
    search: search.trim() || undefined,
    difficulty: selectedDifficulty !== 'ALL' ? (selectedDifficulty as any) : undefined,
    category: selectedCategory !== 'ALL' ? selectedCategory : undefined,
    company: selectedCompany !== 'ALL' ? selectedCompany : undefined,
  });

  const categories = [
    'ALL',
    'Arrays & Hashing',
    'Two Pointers',
    'Sliding Window',
    'Stack',
    'Linked List',
    'Trees',
    'Dynamic Programming',
    'Heap / Priority Queue',
  ];

  const companies = ['ALL', 'Google', 'Amazon', 'Meta', 'Microsoft', 'Apple', 'Uber'];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
            <Code2 className="h-7 w-7 text-indigo-400" />
            DSA & Algorithmic Coding Arena
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Solve curated interview problems with sandboxed multi-language execution and AI complexity analysis.
          </p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 rounded-2xl border border-gray-800 bg-[#111827]/70 p-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search problem title or slug..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-gray-800 bg-[#0d121f] pl-9 pr-3 py-2 text-xs text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
          />
        </div>

        {/* Difficulty */}
        <select
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
          className="rounded-xl border border-gray-800 bg-[#0d121f] px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
        >
          <option value="ALL">All Difficulties</option>
          <option value="EASY">Easy</option>
          <option value="MEDIUM">Medium</option>
          <option value="HARD">Hard</option>
        </select>

        {/* Category */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="rounded-xl border border-gray-800 bg-[#0d121f] px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c === 'ALL' ? 'All Categories' : c}
            </option>
          ))}
        </select>

        {/* Company Filter */}
        <select
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(e.target.value)}
          className="rounded-xl border border-gray-800 bg-[#0d121f] px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
        >
          {companies.map((co) => (
            <option key={co} value={co}>
              {co === 'ALL' ? 'All Companies' : co}
            </option>
          ))}
        </select>
      </div>

      {/* Problem Table */}
      <div className="rounded-2xl border border-gray-800 bg-[#111827]/60 overflow-hidden shadow-xl">
        {isLoading ? (
          <div className="py-20 text-center text-sm text-gray-400">Loading arena problems...</div>
        ) : problems && problems.length > 0 ? (
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-800 bg-[#0d121f]/80 text-gray-400">
                <th className="py-3.5 pl-6 font-semibold">#</th>
                <th className="py-3.5 font-semibold">Title</th>
                <th className="py-3.5 font-semibold">Category</th>
                <th className="py-3.5 font-semibold">Difficulty</th>
                <th className="py-3.5 font-semibold">Company Tags</th>
                <th className="py-3.5 pr-6 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {problems.map((prob) => {
                const diffColor = tokens.colors.difficulty[prob.difficulty] || tokens.colors.difficulty.MEDIUM;
                return (
                  <tr key={prob.id} className="hover:bg-gray-800/40 transition-colors group">
                    <td className="py-4 pl-6 text-gray-500 font-mono">{prob.orderIndex}</td>
                    <td className="py-4 font-semibold text-white group-hover:text-indigo-400 transition-colors">
                      <Link href={`/arena/${prob.slug}`} className="hover:underline flex items-center gap-2">
                        {prob.title}
                      </Link>
                    </td>
                    <td className="py-4 text-gray-300">
                      <span className="rounded-md bg-gray-800/80 px-2 py-0.5 text-[11px] text-gray-300">
                        {prob.category}
                      </span>
                    </td>
                    <td className="py-4">
                      <span
                        className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold border"
                        style={{
                          backgroundColor: diffColor.bg,
                          color: diffColor.text,
                          borderColor: diffColor.border,
                        }}
                      >
                        {prob.difficulty}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex flex-wrap gap-1.5">
                        {prob.companyTags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 rounded bg-[#0d121f] border border-gray-800 px-2 py-0.5 text-[10px] text-gray-400"
                          >
                            <Building2 className="h-2.5 w-2.5" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 pr-6 text-right">
                      <Link
                        href={`/arena/${prob.slug}`}
                        className="inline-flex items-center gap-1 rounded-lg bg-indigo-600/10 border border-indigo-500/30 px-3 py-1.5 text-xs font-semibold text-indigo-400 hover:bg-indigo-600 hover:text-white transition-all"
                      >
                        Solve
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="py-16 text-center text-sm text-gray-400">
            No problems match your selected filters. Try broadening your criteria.
          </div>
        )}
      </div>
    </div>
  );
}

