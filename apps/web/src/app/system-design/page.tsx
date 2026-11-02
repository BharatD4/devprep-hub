'use client';

import React from 'react';
import Link from 'next/link';
import { trpc } from '../../lib/trpc';
import { 
  Layout, 
  ArrowRight, 
  Layers, 
  Server, 
  Database, 
  Cpu, 
  Sparkles,
  GitCommit
} from 'lucide-react';

export default function SystemDesignListPage() {
  const { data: scenarios, isLoading } = trpc.systemDesign.list.useQuery();

  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
          <Layout className="h-7 w-7 text-sky-400" />
          System Design Studio (HLD & LLD)
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Interactive architecture canvas with node-based topology, automated AI SPOF detection, CAP theorem audits, and Low-Level Object-Oriented scenarios.
        </p>
      </div>

      {/* Scenarios Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scenarios?.map((sd) => {
          const isHLD = sd.type === 'HLD';
          return (
            <div
              key={sd.id}
              className="group rounded-2xl border border-gray-800 bg-[#111827]/60 p-6 flex flex-col justify-between hover:border-sky-500/50 hover:bg-[#151f33] transition-all shadow-lg"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold border ${
                      isHLD
                        ? 'border-sky-500/30 bg-sky-500/10 text-sky-400'
                        : 'border-purple-500/30 bg-purple-500/10 text-purple-400'
                    }`}
                  >
                    {sd.type} Architecture
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-gray-400">
                    <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                    <span>AI Evaluated</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors">
                    {sd.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1.5 leading-relaxed line-clamp-3">
                    {sd.scaleRequirements}
                  </p>
                </div>

                {/* Specs preview */}
                <div className="space-y-1.5 pt-2 border-t border-gray-800/80">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    Key Requirements
                  </span>
                  <ul className="space-y-1">
                    {sd.functionalSpecs.slice(0, 2).map((spec, i) => (
                      <li key={i} className="text-xs text-gray-300 flex items-start gap-1.5">
                        <span className="text-sky-400 mt-0.5">•</span>
                        <span className="truncate">{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-800/80 flex items-center justify-between">
                <span className="text-xs text-gray-500">Interactive Canvas</span>
                <Link
                  href={`/system-design/${sd.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-sky-500/10 border border-sky-500/30 px-3.5 py-2 text-xs font-semibold text-sky-400 hover:bg-sky-500 hover:text-white transition-all"
                >
                  Open Studio
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

