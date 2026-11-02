'use client';

import React from 'react';
import Link from 'next/link';
import { trpc } from '../lib/trpc';
import { 
  Flame, 
  Sparkles, 
  Target, 
  ArrowRight, 
  Code2, 
  BrainCircuit, 
  Layout, 
  Bot, 
  FileCheck,
  CheckCircle2,
  Clock,
  TrendingUp,
  Award
} from 'lucide-react';

export default function DashboardPage() {
  const { data: analytics, isLoading } = trpc.analytics.getDashboard.useQuery();
  const { data: srsData } = trpc.srs.getDueQueue.useQuery();

  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
          <p className="text-sm text-gray-400">Loading interview intelligence dashboard...</p>
        </div>
      </div>
    );
  }

  const user = analytics?.user;
  const radarData = analytics?.radarData || [];
  const activityMap = analytics?.activityMap || [];
  const categoryStats = analytics?.categoryStats || [];
  const recentSubmissions = analytics?.recentSubmissions || [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-indigo-900/40 bg-gradient-to-r from-indigo-950/70 via-[#111827] to-[#0d121f] p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400">
              <Target className="h-3.5 w-3.5" />
              Target: {user?.targetRole || 'Senior Staff Engineer'}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Welcome back, {user?.name || 'Engineer'}
            </h1>
            <p className="text-sm text-gray-400 max-w-xl">
              You're currently in the top 8% of candidate readiness. Complete your daily SM-2 review queue and practice high-yield dynamic programming.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-4">
            <div className="rounded-xl border border-gray-800 bg-[#0b0f19] p-4 text-center min-w-[110px]">
              <div className="flex items-center justify-center gap-1.5 text-amber-400 mb-1">
                <Flame className="h-5 w-5 fill-amber-400" />
                <span className="text-2xl font-bold">{user?.streakCount || 14}</span>
              </div>
              <p className="text-xs text-gray-400 font-medium">Day Streak</p>
            </div>

            <div className="rounded-xl border border-gray-800 bg-[#0b0f19] p-4 text-center min-w-[110px]">
              <div className="flex items-center justify-center gap-1.5 text-emerald-400 mb-1">
                <Sparkles className="h-5 w-5" />
                <span className="text-2xl font-bold">{user?.readinessScore || 82}%</span>
              </div>
              <p className="text-xs text-gray-400 font-medium">Readiness Index</p>
            </div>

            <div className="rounded-xl border border-gray-800 bg-[#0b0f19] p-4 text-center min-w-[110px]">
              <div className="flex items-center justify-center gap-1.5 text-indigo-400 mb-1">
                <BrainCircuit className="h-5 w-5" />
                <span className="text-2xl font-bold">{srsData?.dueCount ?? 4}</span>
              </div>
              <p className="text-xs text-gray-400 font-medium">SRS Due Today</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Command Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          href="/flashcards"
          className="group rounded-xl border border-gray-800 bg-[#111827]/70 p-5 hover:border-indigo-500/50 hover:bg-[#161f33] transition-all flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600/20 text-indigo-400 group-hover:scale-110 transition-transform">
              <BrainCircuit className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white group-hover:text-indigo-400 transition-colors">
                Spaced Repetition (SRS)
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                {srsData?.dueCount ?? 4} cards due for recall today via SuperMemo SM-2.
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-indigo-400">
            <span>Start Review</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          href="/concepts"
          className="group rounded-xl border border-amber-500/30 bg-[#161a24] p-5 hover:border-amber-500/70 hover:bg-[#1a2130] transition-all flex flex-col justify-between shadow-lg"
        >
          <div className="space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400 group-hover:scale-110 transition-transform">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="inline-block rounded bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-300 uppercase tracking-wide mb-1">
                High-Yield Vault
              </div>
              <h3 className="text-base font-semibold text-white group-hover:text-amber-400 transition-colors">
                Concepts & Short Tricks
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Formulas, DSA patterns, System Design math, OS & Networks cheat sheets.
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-amber-400">
            <span>Read Formulas</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          href="/arena"
          className="group rounded-xl border border-gray-800 bg-[#111827]/70 p-5 hover:border-indigo-500/50 hover:bg-[#161f33] transition-all flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600/20 text-emerald-400 group-hover:scale-110 transition-transform">
              <Code2 className="h-5 w-5" />
            </div>
            <div>
              <div className="inline-block rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300 uppercase tracking-wide mb-1">
                150 Questions (30/Topic)
              </div>
              <h3 className="text-base font-semibold text-white group-hover:text-emerald-400 transition-colors">
                DSA Coding Arena
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Monaco IDE, multi-language runner, and automated Big-O complexity analyzer.
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-emerald-400">
            <span>Explore 150 Problems</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          href="/system-design"
          className="group rounded-xl border border-gray-800 bg-[#111827]/70 p-5 hover:border-indigo-500/50 hover:bg-[#161f33] transition-all flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-600/20 text-sky-400 group-hover:scale-110 transition-transform">
              <Layout className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white group-hover:text-sky-400 transition-colors">
                System Design Studio
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Interactive HLD diagramming canvas with automated AI SPOF and bottleneck audit.
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-sky-400">
            <span>Design Architecture</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          href="/mock-interview"
          className="group rounded-xl border border-gray-800 bg-[#111827]/70 p-5 hover:border-indigo-500/50 hover:bg-[#161f33] transition-all flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600/20 text-purple-400 group-hover:scale-110 transition-transform">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white group-hover:text-purple-400 transition-colors">
                Staff AI Interviewer
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                45-minute timed simulation with progressive hints and STAR behavioral scoring.
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-purple-400">
            <span>Start Simulation</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>

      {/* Readiness Radar & Category Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Readiness Radar / Competency Breakdown */}
        <div className="lg:col-span-2 rounded-2xl border border-gray-800 bg-[#111827]/60 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Award className="h-5 w-5 text-indigo-400" />
                Readiness Competency Index
              </h2>
              <p className="text-xs text-gray-400">Evaluated across algorithmic rigor, scale, and communication</p>
            </div>
            <span className="rounded-lg bg-indigo-500/10 border border-indigo-500/30 px-2.5 py-1 text-xs font-semibold text-indigo-300">
              FAANG Tier: Ready
            </span>
          </div>

          {/* Visual Category Bars */}
          <div className="space-y-4">
            {radarData.map((item) => (
              <div key={item.subject} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-gray-300">{item.subject}</span>
                  <span className="font-semibold text-indigo-400">{item.score}%</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-gray-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-indigo-400 to-emerald-400 transition-all duration-700"
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Roadmap Quick Progress */}
        <div className="rounded-2xl border border-gray-800 bg-[#111827]/60 p-6 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-emerald-400" />
                Blind 75 Progress
              </h3>
              <Link href="/roadmaps" className="text-xs text-indigo-400 hover:underline">
                View All
              </Link>
            </div>

            <div className="space-y-3">
              {categoryStats.map((cat) => (
                <div key={cat.name} className="rounded-xl border border-gray-800/80 bg-[#0d121f] p-3 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-gray-200">{cat.name}</span>
                    <span className="text-gray-400">
                      {cat.completed}/{cat.total}
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-gray-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-emerald-500"
                      style={{ width: `${cat.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link
            href="/roadmaps"
            className="w-full rounded-xl border border-indigo-500/40 bg-indigo-600/10 py-2.5 text-center text-xs font-semibold text-indigo-300 hover:bg-indigo-600/20 transition-colors"
          >
            Explore Structured Roadmaps →
          </Link>
        </div>
      </div>

      {/* GitHub-Style 16-Week Contribution Heatmap */}
      <div className="rounded-2xl border border-gray-800 bg-[#111827]/60 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Flame className="h-4 w-4 text-amber-400" />
              Daily Study Consistency Heatmap
            </h3>
            <p className="text-xs text-gray-400">112-day streak and review log across Web and Mobile</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span>Less</span>
            <div className="flex gap-1">
              <div className="h-3 w-3 rounded-sm bg-gray-800" />
              <div className="h-3 w-3 rounded-sm bg-indigo-950" />
              <div className="h-3 w-3 rounded-sm bg-indigo-700" />
              <div className="h-3 w-3 rounded-sm bg-indigo-500" />
              <div className="h-3 w-3 rounded-sm bg-emerald-400" />
            </div>
            <span>More</span>
          </div>
        </div>

        {/* Heatmap grid */}
        <div className="overflow-x-auto pb-2">
          <div className="grid grid-flow-col grid-rows-7 gap-1.5 w-max">
            {activityMap.map((cell) => {
              let bg = 'bg-gray-800/80';
              if (cell.count === 1) bg = 'bg-indigo-900';
              if (cell.count === 2) bg = 'bg-indigo-700';
              if (cell.count === 3) bg = 'bg-indigo-500';
              if (cell.count >= 4) bg = 'bg-emerald-400';

              return (
                <div
                  key={cell.date}
                  title={`${cell.date}: ${cell.count} activities completed`}
                  className={`h-3.5 w-3.5 rounded-sm ${bg} transition-transform hover:scale-125 cursor-pointer`}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Submissions */}
      <div className="rounded-2xl border border-gray-800 bg-[#111827]/60 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            Recent Arena Submissions
          </h3>
          <Link href="/arena" className="text-xs text-indigo-400 hover:underline">
            All Problems
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-800 text-gray-400">
                <th className="pb-3 font-semibold">Problem</th>
                <th className="pb-3 font-semibold">Language</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold">Runtime</th>
                <th className="pb-3 font-semibold">Memory</th>
                <th className="pb-3 font-semibold">Complexity</th>
                <th className="pb-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {recentSubmissions.map((sub) => (
                <tr key={sub.id} className="hover:bg-gray-800/30 transition-colors">
                  <td className="py-3 font-medium text-white">Two Sum</td>
                  <td className="py-3 capitalize text-gray-300">{sub.language}</td>
                  <td className="py-3">
                    <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 font-semibold text-emerald-400 border border-emerald-500/20">
                      {sub.status}
                    </span>
                  </td>
                  <td className="py-3 text-gray-300">{sub.runtimeMs} ms</td>
                  <td className="py-3 text-gray-300">{(sub.memoryKb / 1024).toFixed(1)} MB</td>
                  <td className="py-3 font-mono text-indigo-400">{sub.timeComplexity || 'O(N)'}</td>
                  <td className="py-3 text-right">
                    <Link
                      href="/arena/two-sum"
                      className="rounded-lg bg-gray-800 px-2.5 py-1 font-medium text-gray-200 hover:bg-gray-700"
                    >
                      Open
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

