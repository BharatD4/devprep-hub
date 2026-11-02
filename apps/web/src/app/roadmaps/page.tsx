'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { trpc } from '../../lib/trpc';
import { 
  Map, 
  CheckCircle2, 
  Circle, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  Clock, 
  Award
} from 'lucide-react';

export default function RoadmapsPage() {
  const { data: roadmaps, isLoading } = trpc.roadmap.getRoadmaps.useQuery();
  const { data: userProgress, refetch: refetchProgress } = trpc.roadmap.getUserProgress.useQuery();
  const toggleMutation = trpc.roadmap.toggleProblem.useMutation({
    onSuccess: () => {
      refetchProgress();
    },
  });

  const [activeRoadmap, setActiveRoadmap] = useState<string>('blind-75');

  if (isLoading || !roadmaps) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
      </div>
    );
  }

  const current = roadmaps.find((r) => r.id === activeRoadmap) || roadmaps[0];
  const completedSlugs = userProgress?.[current.id] || [];
  const percentComplete = Math.round((completedSlugs.length / Math.max(1, current.totalProblems)) * 100);

  const handleToggle = (slug: string) => {
    toggleMutation.mutate({
      roadmapKey: current.id,
      problemSlug: slug,
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
          <Map className="h-7 w-7 text-indigo-400" />
          Interactive Curated Roadmaps
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Targeted study pathways (Blind 75, NeetCode 150, Frontend, Backend) with prerequisite dependency graphs and progress tracking.
        </p>
      </div>

      {/* Roadmap Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-800 pb-4">
        {roadmaps.map((r) => {
          const isActive = r.id === current.id;
          const completedCount = userProgress?.[r.id]?.length || 0;
          return (
            <button
              key={r.id}
              onClick={() => setActiveRoadmap(r.id)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-gray-900 border border-gray-800 text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <span>{r.title}</span>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] ${
                  isActive ? 'bg-indigo-700 text-indigo-100' : 'bg-gray-800 text-gray-400'
                }`}
              >
                {completedCount}/{r.totalProblems}
              </span>
            </button>
          );
        })}
      </div>

      {/* Overview Card */}
      <div className="rounded-2xl border border-gray-800 bg-[#111827]/60 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white">{current.title}</h2>
            <p className="text-xs text-gray-400 mt-0.5">{current.description}</p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black text-indigo-400">{percentComplete}%</span>
            <p className="text-[11px] text-gray-400 font-medium">Pathway Mastery</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-2 w-full rounded-full bg-gray-800 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-500"
            style={{ width: `${percentComplete}%` }}
          />
        </div>
      </div>

      {/* Roadmap Topic Tree / Categories */}
      <div className="space-y-6">
        {current.categories.map((cat, catIdx) => (
          <div
            key={cat.name}
            className="rounded-2xl border border-gray-800 bg-[#111827]/40 p-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold font-mono">
                  0{catIdx + 1}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{cat.name}</h3>
                  <p className="text-xs text-gray-400">{cat.description}</p>
                </div>
              </div>
            </div>

            {/* Problems list */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
              {cat.slugs.map((slug) => {
                const isCompleted = completedSlugs.includes(slug);
                return (
                  <div
                    key={slug}
                    className={`flex items-center justify-between rounded-xl border p-3.5 transition-all ${
                      isCompleted
                        ? 'border-emerald-500/30 bg-emerald-950/15'
                        : 'border-gray-800 bg-[#0d121f] hover:border-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <button
                        onClick={() => handleToggle(slug)}
                        className={`transition-colors ${
                          isCompleted ? 'text-emerald-400' : 'text-gray-600 hover:text-gray-400'
                        }`}
                        title={isCompleted ? 'Mark as incomplete' : 'Mark as completed'}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="h-5 w-5" />
                        ) : (
                          <Circle className="h-5 w-5" />
                        )}
                      </button>
                      <Link
                        href={`/arena/${slug}`}
                        className={`text-xs font-semibold truncate hover:underline ${
                          isCompleted ? 'text-gray-300 line-through' : 'text-white'
                        }`}
                      >
                        {slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                      </Link>
                    </div>

                    <Link
                      href={`/arena/${slug}`}
                      className="rounded-lg bg-gray-800 p-1.5 text-gray-400 hover:bg-gray-700 hover:text-white"
                      title="Solve in Arena"
                    >
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

