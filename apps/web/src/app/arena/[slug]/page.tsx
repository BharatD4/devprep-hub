'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Editor from '@monaco-editor/react';
import { trpc } from '../../../lib/trpc';
import { 
  ArrowLeft, 
  Play, 
  Send, 
  Terminal, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Database, 
  BookOpen, 
  History, 
  FileText,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import { tokens } from '@devprep/ui';

type LanguageType = 'python' | 'javascript' | 'typescript' | 'cpp' | 'java' | 'go';

export default function ProblemArenaPage() {
  const params = useParams();
  const slug = (params?.slug as string) || 'two-sum';

  const { data: problem, isLoading } = trpc.problem.bySlug.useQuery({ slug });

  const [language, setLanguage] = useState<LanguageType>('python');
  const [code, setCode] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'description' | 'editorial' | 'submissions'>('description');
  const [activeTestTab, setActiveTestTab] = useState<number>(0);
  const [consoleOpen, setConsoleOpen] = useState(true);

  // Execution outputs
  const [executing, setExecuting] = useState(false);
  const [runResult, setRunResult] = useState<any>(null);
  const [submitResult, setSubmitResult] = useState<any>(null);

  // Update starter code when problem loads or language switches
  useEffect(() => {
    if (problem?.starterCodeJson) {
      const starters = problem.starterCodeJson as Record<string, string>;
      setCode(starters[language] || starters.python || '// Write your solution here');
    }
  }, [problem, language]);

  const runMutation = trpc.problem.runCode.useMutation({
    onSuccess: (data) => {
      setRunResult(data);
      setConsoleOpen(true);
      setExecuting(false);
    },
    onError: (err) => {
      setRunResult({ stderr: err.message, exitCode: 1 });
      setConsoleOpen(true);
      setExecuting(false);
    },
  });

  const submitMutation = trpc.problem.submit.useMutation({
    onSuccess: (data) => {
      setSubmitResult(data);
      setConsoleOpen(true);
      setExecuting(false);
    },
    onError: (err) => {
      setSubmitResult({ status: 'RUNTIME_ERROR', aiCritique: err.message });
      setConsoleOpen(true);
      setExecuting(false);
    },
  });

  const handleRun = () => {
    if (!problem) return;
    setExecuting(true);
    setSubmitResult(null);
    runMutation.mutate({
      language,
      code,
      problemSlug: problem.slug,
      customInput: problem.testCasesJson?.[activeTestTab]?.input,
    });
  };

  const handleSubmit = () => {
    if (!problem) return;
    setExecuting(true);
    setRunResult(null);
    submitMutation.mutate({
      language,
      code,
      problemSlug: problem.slug,
    });
  };

  if (isLoading || !problem) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
          <p className="text-xs text-gray-400">Loading problem arena...</p>
        </div>
      </div>
    );
  }

  const diffColor = tokens.colors.difficulty[problem.difficulty] || tokens.colors.difficulty.MEDIUM;
  const testCases = (problem.testCasesJson as Array<any>) || [];

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-[#090d16] overflow-hidden">
      {/* Top Arena Header Bar */}
      <div className="flex items-center justify-between border-b border-gray-800 bg-[#0d121f] px-4 py-2.5 z-10">
        <div className="flex items-center gap-4">
          <Link
            href="/arena"
            className="flex items-center gap-1.5 rounded-lg border border-gray-800 bg-gray-900 px-2.5 py-1 text-xs font-medium text-gray-400 hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Problems
          </Link>
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-bold text-white">{problem.title}</h1>
            <span
              className="rounded-full px-2 py-0.5 text-[10px] font-semibold border"
              style={{
                backgroundColor: diffColor.bg,
                color: diffColor.text,
                borderColor: diffColor.border,
              }}
            >
              {problem.difficulty}
            </span>
          </div>
        </div>

        {/* Language selector & Run/Submit controls */}
        <div className="flex items-center gap-3">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as LanguageType)}
            className="rounded-lg border border-gray-800 bg-gray-900 px-3 py-1.5 text-xs font-medium text-gray-200 focus:border-indigo-500 focus:outline-none"
          >
            <option value="python">Python 3 (CPython 3.10)</option>
            <option value="javascript">JavaScript (Node.js 18)</option>
            <option value="typescript">TypeScript (5.0)</option>
            <option value="cpp">C++ (g++ 17)</option>
            <option value="java">Java (OpenJDK 15)</option>
            <option value="go">Go (1.16)</option>
          </select>

          <button
            onClick={handleRun}
            disabled={executing}
            className="flex items-center gap-1.5 rounded-lg border border-gray-700 bg-gray-800 px-3 py-1.5 text-xs font-semibold text-gray-200 hover:bg-gray-700 hover:text-white transition-all disabled:opacity-50"
          >
            <Play className="h-3.5 w-3.5 fill-current text-gray-300" />
            {executing ? 'Executing...' : 'Run'}
          </button>

          <button
            onClick={handleSubmit}
            disabled={executing}
            className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-emerald-500 shadow-md shadow-emerald-900/30 transition-all disabled:opacity-50"
          >
            <Send className="h-3.5 w-3.5" />
            Submit
          </button>
        </div>
      </div>

      {/* Split Pane: Left (Problem / Editorial / Submissions) & Right (Monaco + Console) */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
        {/* Left Pane */}
        <div className="flex flex-col border-r border-gray-800 bg-[#0b0f19] overflow-hidden">
          {/* Sub tabs */}
          <div className="flex items-center gap-1 border-b border-gray-800 bg-[#090d16] px-4 pt-2 text-xs">
            <button
              onClick={() => setActiveTab('description')}
              className={`flex items-center gap-1.5 border-b-2 px-3 py-2 font-medium transition-colors ${
                activeTab === 'description'
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-gray-400 hover:text-gray-200'
              }`}
            >
              <FileText className="h-3.5 w-3.5" />
              Description
            </button>
            <button
              onClick={() => setActiveTab('editorial')}
              className={`flex items-center gap-1.5 border-b-2 px-3 py-2 font-medium transition-colors ${
                activeTab === 'editorial'
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-gray-400 hover:text-gray-200'
              }`}
            >
              <BookOpen className="h-3.5 w-3.5" />
              Editorial
            </button>
            <button
              onClick={() => setActiveTab('submissions')}
              className={`flex items-center gap-1.5 border-b-2 px-3 py-2 font-medium transition-colors ${
                activeTab === 'submissions'
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-gray-400 hover:text-gray-200'
              }`}
            >
              <History className="h-3.5 w-3.5" />
              Submissions ({problem.submissions?.length || 0})
            </button>
          </div>

          {/* Left Pane Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm text-gray-300">
            {activeTab === 'description' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-white mb-2">{problem.title}</h2>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="rounded bg-gray-800 px-2 py-0.5 text-gray-300">{problem.category}</span>
                    {problem.companyTags.map((tag) => (
                      <span key={tag} className="rounded bg-indigo-950 border border-indigo-800/50 px-2 py-0.5 text-indigo-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="prose prose-invert max-w-none text-xs leading-relaxed space-y-4 whitespace-pre-wrap">
                  {problem.descriptionMdx}
                </div>

                {/* Example Cases */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Example Test Cases</h3>
                  {testCases.slice(0, 2).map((tc, idx) => (
                    <div key={idx} className="rounded-xl border border-gray-800 bg-[#070a12] p-3 font-mono text-xs space-y-1">
                      <div className="text-gray-400">
                        <span className="text-indigo-400 font-semibold">Input: </span>
                        {tc.input}
                      </div>
                      <div className="text-gray-300">
                        <span className="text-emerald-400 font-semibold">Expected: </span>
                        {tc.expected}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Constraints */}
                {problem.constraints && problem.constraints.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Constraints</h3>
                    <ul className="list-disc pl-5 space-y-1 text-xs text-gray-400 font-mono">
                      {problem.constraints.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'editorial' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-amber-400">
                  <Sparkles className="h-5 w-5" />
                  <h2 className="text-base font-bold text-white">Optimal Engineering Editorial</h2>
                </div>
                <div className="rounded-xl border border-gray-800 bg-[#070a12] p-4 text-xs leading-relaxed whitespace-pre-wrap text-gray-300">
                  {problem.editorialMdx || 'Optimal solution details with time/space complexity derivations.'}
                </div>
              </div>
            )}

            {activeTab === 'submissions' && (
              <div className="space-y-3">
                <h2 className="text-sm font-bold text-white">Your Past Submissions</h2>
                {problem.submissions && problem.submissions.length > 0 ? (
                  <div className="space-y-2">
                    {problem.submissions.map((sub: any) => (
                      <div key={sub.id} className="rounded-xl border border-gray-800 bg-[#070a12] p-3 text-xs space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-emerald-400">{sub.status}</span>
                          <span className="text-gray-500 font-mono text-[10px]">
                            {new Date(sub.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-400 text-[11px]">
                          <span>Runtime: {sub.runtimeMs}ms</span>
                          <span>Complexity: {sub.timeComplexity || 'O(N)'}</span>
                        </div>
                        {sub.aiCritique && (
                          <p className="text-[11px] text-indigo-300 bg-indigo-950/40 p-2 rounded border border-indigo-900/40">
                            💡 {sub.aiCritique}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-500">No submissions yet for this problem.</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Pane: Monaco Editor + Collapsible Console */}
        <div className="flex flex-col h-full overflow-hidden bg-[#1e1e1e]">
          {/* Monaco Editor Container */}
          <div className="flex-1 overflow-hidden relative">
            <Editor
              height="100%"
              language={language === 'cpp' ? 'cpp' : language}
              value={code}
              onChange={(value) => setCode(value || '')}
              theme="vs-dark"
              options={{
                fontSize: 13,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                fontFamily: 'ui-monospace, Menlo, Monaco, Consolas, monospace',
                tabSize: 4,
                automaticLayout: true,
              }}
            />
          </div>

          {/* Collapsible Test Console */}
          <div className="border-t border-gray-800 bg-[#0d121f]">
            <div className="flex items-center justify-between px-4 py-2 bg-[#090d16] border-b border-gray-800">
              <div className="flex items-center gap-2">
                <Terminal className="h-3.5 w-3.5 text-gray-400" />
                <span className="text-xs font-semibold text-gray-300">Testcase & Execution Console</span>
              </div>
              <button
                onClick={() => setConsoleOpen(!consoleOpen)}
                className="text-gray-400 hover:text-white"
                aria-label="Toggle Console"
              >
                {consoleOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
              </button>
            </div>

            {consoleOpen && (
              <div className="p-4 max-h-56 overflow-y-auto space-y-3 text-xs">
                {/* Test case tabs */}
                <div className="flex items-center gap-2">
                  {testCases.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTestTab(i)}
                      className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                        activeTestTab === i
                          ? 'bg-gray-800 text-white border border-gray-700'
                          : 'text-gray-500 hover:text-gray-300'
                      }`}
                    >
                      Case {i + 1}
                    </button>
                  ))}
                </div>

                {/* Submit Result / Run Output Display */}
                {submitResult && (
                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 font-bold text-emerald-400">
                        <CheckCircle2 className="h-4 w-4" />
                        Status: {submitResult.status}
                      </span>
                      <div className="flex items-center gap-3 text-gray-400 font-mono text-[11px]">
                        <span>Runtime: {submitResult.runtimeMs}ms</span>
                        <span>Memory: {(submitResult.memoryKb / 1024).toFixed(1)}MB</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-mono text-indigo-300">
                      <span>Time: {submitResult.timeComplexity}</span>
                      <span>Space: {submitResult.spaceComplexity}</span>
                    </div>
                    {submitResult.aiCritique && (
                      <div className="rounded-lg bg-indigo-950/60 p-2.5 border border-indigo-800/40 text-indigo-200">
                        <p className="font-semibold text-indigo-300 mb-0.5 flex items-center gap-1">
                          <Sparkles className="h-3.5 w-3.5" />
                          AI Complexity Analysis:
                        </p>
                        <p className="text-[11px] leading-relaxed">{submitResult.aiCritique}</p>
                      </div>
                    )}
                  </div>
                )}

                {runResult && (
                  <div className="space-y-2">
                    {runResult.stderr ? (
                      <div className="rounded-xl border border-red-500/40 bg-red-950/30 p-3 font-mono text-red-400">
                        <p className="font-bold flex items-center gap-1.5">
                          <XCircle className="h-4 w-4" /> Runtime Error (Exit code: {runResult.exitCode})
                        </p>
                        <pre className="mt-1 whitespace-pre-wrap text-[11px]">{runResult.stderr}</pre>
                      </div>
                    ) : (
                      <div className="rounded-xl border border-gray-800 bg-[#070a12] p-3 font-mono space-y-1 text-gray-300">
                        <div className="flex items-center justify-between text-gray-500 text-[10px]">
                          <span>Standard Output</span>
                          <span>Runtime: {runResult.runtimeMs}ms</span>
                        </div>
                        <pre className="whitespace-pre-wrap text-[11px] text-emerald-300">{runResult.stdout}</pre>
                      </div>
                    )}
                  </div>
                )}

                {/* Default Input/Expected display */}
                {!runResult && !submitResult && testCases[activeTestTab] && (
                  <div className="rounded-xl border border-gray-800 bg-[#070a12] p-3 font-mono space-y-1.5 text-gray-400">
                    <div>
                      <span className="text-gray-500">Input: </span>
                      <span className="text-gray-200">{testCases[activeTestTab].input}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Expected: </span>
                      <span className="text-emerald-400">{testCases[activeTestTab].expected}</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
