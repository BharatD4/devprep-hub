'use client';

import React, { useState } from 'react';
import { trpc } from '../../lib/trpc';
import { 
  FileCheck, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Send, 
  ArrowRight,
  TrendingUp,
  FileText
} from 'lucide-react';

export default function ATSAnalyzerPage() {
  const [jobDescription, setJobDescription] = useState(
    `We are seeking a Senior Software Engineer to design high-throughput distributed systems in TypeScript, Node.js, and React. Experience with PostgreSQL, Redis caching, Kafka message streaming, and Docker / Kubernetes is required. The ideal candidate has deep expertise in concurrency, system design, and building resilient microservices.`
  );

  const [resumeText, setResumeText] = useState(
    `Alex Chen — Senior Full-Stack Engineer
• Worked on the migration of legacy microservices to Node.js and TypeScript.
• Helped team implement Redis caching layer for session and product lookups.
• Responsible for writing unit tests and maintaining PostgreSQL database schemas.
• Assisted with Docker deployment scripts and frontend React components.`
  );

  const [result, setResult] = useState<any>(null);

  const analyzeMutation = trpc.ats.analyzeResume.useMutation({
    onSuccess: (data) => {
      setResult(data);
    },
  });

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobDescription || !resumeText) return;
    analyzeMutation.mutate({
      jobDescription,
      resumeText,
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
          <FileCheck className="h-7 w-7 text-indigo-400" />
          Resume ATS Match & Bullet Point Optimizer
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Score your resume against target engineering job descriptions, detect missing technical keywords, and get high-impact action-verb rewrites.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Inputs (6 cols) */}
        <form onSubmit={handleAnalyze} className="lg:col-span-6 space-y-5">
          <div className="rounded-2xl border border-gray-800 bg-[#111827]/60 p-5 space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5" />
              Target Software Engineer Job Description
            </label>
            <textarea
              rows={6}
              required
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste target job requirements and stack requirements here..."
              className="w-full rounded-xl border border-gray-800 bg-[#0d121f] p-3 text-xs text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div className="rounded-2xl border border-gray-800 bg-[#111827]/60 p-5 space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <FileCheck className="h-3.5 w-3.5" />
              Your Resume Text / Experience Bullets
            </label>
            <textarea
              rows={8}
              required
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your resume bullet points and summary here..."
              className="w-full rounded-xl border border-gray-800 bg-[#0d121f] p-3 text-xs text-white placeholder-gray-500 focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={analyzeMutation.isPending}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 p-3 text-xs font-bold text-white hover:from-indigo-500 hover:to-violet-500 shadow-lg shadow-indigo-600/25 transition-all disabled:opacity-50"
          >
            <Sparkles className="h-4 w-4" />
            {analyzeMutation.isPending ? 'Analyzing Resume & ATS Keywords...' : 'Grade Resume & Rewrite Bullets with AI'}
          </button>
        </form>

        {/* Results Stream (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          {result ? (
            <div className="space-y-6">
              {/* Score Hero */}
              <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/60 to-[#0e1422] p-6 flex items-center justify-between shadow-xl">
                <div>
                  <h3 className="text-base font-bold text-white">ATS Keyword Match Score</h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Evaluated against target role requirements
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-black text-emerald-400">{result.matchPercentage}%</span>
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                    {result.matchPercentage >= 75 ? 'Strong Match' : 'Keyword Deficit'}
                  </p>
                </div>
              </div>

              {/* Skills breakdown */}
              <div className="rounded-2xl border border-gray-800 bg-[#111827]/60 p-5 space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
                    Identified In Resume ({result.identifiedSkills.length})
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {result.identifiedSkills.map((sk: string) => (
                      <span
                        key={sk}
                        className="rounded-lg bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-1 text-xs font-medium text-emerald-300"
                      >
                        ✓ {sk}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-800">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                    Missing Target Keywords
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {result.missingKeywords.map((sk: string) => (
                      <span
                        key={sk}
                        className="rounded-lg bg-amber-950/40 border border-amber-800/40 px-2.5 py-1 text-xs font-medium text-amber-300"
                      >
                        + {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bullet Improvements */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  AI Action-Verb & Metric Rewrites
                </h4>

                {result.bulletImprovements.map((b: any) => (
                  <div
                    key={b.id}
                    className="rounded-2xl border border-gray-800 bg-[#111827]/70 p-4 space-y-2 text-xs"
                  >
                    <div>
                      <span className="text-[10px] font-semibold text-red-400 uppercase">Original Bullet:</span>
                      <p className="text-gray-400 line-through mt-0.5">{b.original}</p>
                    </div>

                    <div className="rounded-xl bg-[#090d16] p-3 border border-indigo-500/20 text-indigo-200">
                      <span className="text-[10px] font-bold text-emerald-400 uppercase flex items-center gap-1">
                        <Sparkles className="h-3 w-3" /> FAANG-Ready Rewrite:
                      </span>
                      <p className="text-gray-200 font-medium mt-1 leading-relaxed">{b.improved}</p>
                      <p className="text-[10px] text-indigo-400 mt-1.5 italic">Rationale: {b.critique}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-gray-800 bg-[#111827]/40 p-12 text-center flex flex-col items-center justify-center space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400">
                <FileCheck className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-white">Awaiting Analysis</h3>
              <p className="text-xs text-gray-400 max-w-sm">
                Paste your resume bullets and job requirements on the left, then click analyze to generate keyword gaps and action-verb improvements.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

