'use client';

import React, { useState, useEffect } from 'react';
import { trpc } from '../../lib/trpc';
import { 
  Bot, 
  Send, 
  Lightbulb, 
  Clock, 
  Sparkles, 
  Award, 
  User, 
  Play, 
  CheckCircle2, 
  Bookmark,
  MessageSquare,
  HelpCircle
} from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export default function MockInterviewPage() {
  const [activeTab, setActiveTab] = useState<'simulation' | 'star-builder'>('simulation');
  const [interviewType, setInterviewType] = useState<
    'DSA_TECHNICAL' | 'SYSTEM_DESIGN_HLD' | 'SYSTEM_DESIGN_LLD' | 'BEHAVIORAL_STAR'
  >('DSA_TECHNICAL');

  // Timed 45-minute session
  const [secondsRemaining, setSecondsRemaining] = useState(45 * 60);
  const [sessionActive, setSessionActive] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');

  // STAR Builder form
  const [starTitle, setStarTitle] = useState('');
  const [starPillar, setStarPillar] = useState('Ownership & Bias for Action');
  const [starSituation, setStarSituation] = useState('');
  const [starTask, setStarTask] = useState('');
  const [starAction, setStarAction] = useState('');
  const [starResult, setStarResult] = useState('');

  const { data: pastStories, refetch: refetchStories } = trpc.aiInterview.getStories.useQuery();

  const startSessionMutation = trpc.aiInterview.startSession.useMutation({
    onSuccess: (session) => {
      setMessages(session.messages as ChatMessage[]);
      setSessionActive(true);
      setSecondsRemaining(45 * 60);
    },
  });

  const sendMessageMutation = trpc.aiInterview.sendMessage.useMutation({
    onSuccess: (reply) => {
      setMessages((prev) => [...prev, reply as ChatMessage]);
    },
  });

  const evaluateStoryMutation = trpc.aiInterview.evaluateStory.useMutation({
    onSuccess: () => {
      refetchStories();
      setStarTitle('');
      setStarSituation('');
      setStarTask('');
      setStarAction('');
      setStarResult('');
    },
  });

  // Timer countdown
  useEffect(() => {
    if (!sessionActive) return;
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setSessionActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [sessionActive]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleStartSession = () => {
    startSessionMutation.mutate({
      type: interviewType,
      roleTarget: 'Staff Software Engineer',
    });
  };

  const handleSendMessage = (requestHint = false) => {
    if (!inputMessage.trim() && !requestHint) return;

    const userMsg: ChatMessage = {
      role: 'user',
      content: requestHint ? 'Could I get a subtle hint on optimal direction?' : inputMessage.trim(),
    };

    const updated = [...messages, userMsg];
    setMessages(updated);
    setInputMessage('');

    sendMessageMutation.mutate({
      type: interviewType,
      roleTarget: 'Staff Software Engineer',
      messages: updated,
      requestHint,
    });
  };

  const handleSaveStory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!starTitle || !starSituation || !starTask || !starAction || !starResult) return;

    evaluateStoryMutation.mutate({
      title: starTitle,
      companyPillar: starPillar,
      situation: starSituation,
      task: starTask,
      action: starAction,
      result: starResult,
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
            <Bot className="h-7 w-7 text-purple-400" />
            AI Mock Interviewer & Behavioral Prep
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Real-time 45-minute technical simulation with Senior Staff Engineer persona and interactive STAR story builder.
          </p>
        </div>

        {/* Mode Switch Tabs */}
        <div className="flex rounded-xl border border-gray-800 bg-[#0d121f] p-1">
          <button
            onClick={() => setActiveTab('simulation')}
            className={`rounded-lg px-4 py-1.5 text-xs font-semibold transition-all ${
              activeTab === 'simulation'
                ? 'bg-purple-600 text-white shadow'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            45-Min Live Simulation
          </button>
          <button
            onClick={() => setActiveTab('star-builder')}
            className={`rounded-lg px-4 py-1.5 text-xs font-semibold transition-all ${
              activeTab === 'star-builder'
                ? 'bg-purple-600 text-white shadow'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Behavioral STAR Builder
          </button>
        </div>
      </div>

      {activeTab === 'simulation' ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Controls Sidebar (1 col) */}
          <div className="rounded-2xl border border-gray-800 bg-[#111827]/60 p-5 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5 block">
                  Interview Track
                </label>
                <select
                  disabled={sessionActive}
                  value={interviewType}
                  onChange={(e) => setInterviewType(e.target.value as any)}
                  className="w-full rounded-xl border border-gray-800 bg-[#0d121f] p-2.5 text-xs text-white focus:border-purple-500 focus:outline-none disabled:opacity-50"
                >
                  <option value="DSA_TECHNICAL">DSA & Problem Solving</option>
                  <option value="SYSTEM_DESIGN_HLD">High-Level Design (HLD)</option>
                  <option value="SYSTEM_DESIGN_LLD">Object-Oriented Design (LLD)</option>
                  <option value="BEHAVIORAL_STAR">Behavioral Leadership Principles</option>
                </select>
              </div>

              {/* Timer Block */}
              <div className="rounded-xl border border-gray-800 bg-[#070a12] p-4 text-center space-y-1">
                <div className="flex items-center justify-center gap-2 text-purple-400">
                  <Clock className="h-5 w-5" />
                  <span className="text-2xl font-mono font-bold tracking-wider">
                    {formatTime(secondsRemaining)}
                  </span>
                </div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">
                  {sessionActive ? 'Session in progress' : '45-Min Standard FAANG Window'}
                </p>
              </div>

              {/* Progressive Hint Button */}
              {sessionActive && (
                <button
                  onClick={() => handleSendMessage(true)}
                  disabled={sendMessageMutation.isPending}
                  className="w-full flex items-center justify-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 p-2.5 text-xs font-semibold text-amber-300 hover:bg-amber-500/20 transition-all"
                >
                  <Lightbulb className="h-4 w-4" />
                  Request Subtle Hint
                </button>
              )}
            </div>

            {!sessionActive ? (
              <button
                onClick={handleStartSession}
                disabled={startSessionMutation.isPending}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-purple-600 p-3 text-xs font-bold text-white hover:bg-purple-500 shadow-lg shadow-purple-900/30 transition-all"
              >
                <Play className="h-4 w-4 fill-current" />
                {startSessionMutation.isPending ? 'Starting...' : 'Start 45-Min Mock Interview'}
              </button>
            ) : (
              <button
                onClick={() => setSessionActive(false)}
                className="w-full rounded-xl border border-red-500/30 bg-red-500/10 p-2.5 text-xs font-semibold text-red-400 hover:bg-red-500/20 transition-all"
              >
                End Session Early
              </button>
            )}
          </div>

          {/* Chat Interface (3 cols) */}
          <div className="lg:col-span-3 rounded-2xl border border-gray-800 bg-[#0e1422] flex flex-col h-[600px] overflow-hidden shadow-2xl">
            {/* Conversation Stream */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center p-8 space-y-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
                    <Bot className="h-6 w-6" />
                  </div>
                  <h3 className="text-base font-bold text-white">Ready for your simulation?</h3>
                  <p className="text-xs text-gray-400 max-w-md">
                    Select your track and start the session. The Staff Engineer AI will prompt you with real interview questions, probe clarifying edge cases, and guide your thought process.
                  </p>
                </div>
              ) : (
                messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex gap-3 text-xs leading-relaxed ${
                      msg.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {msg.role !== 'user' && (
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-600/20 text-purple-400 border border-purple-500/30 shrink-0">
                        <Bot className="h-4 w-4" />
                      </div>
                    )}
                    <div
                      className={`max-w-2xl rounded-2xl p-4 whitespace-pre-wrap ${
                        msg.role === 'user'
                          ? 'bg-purple-600 text-white rounded-br-sm'
                          : 'bg-[#151d30] border border-gray-800 text-gray-200 rounded-bl-sm'
                      }`}
                    >
                      {msg.content}
                    </div>
                    {msg.role === 'user' && (
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-800 text-gray-300 shrink-0">
                        <User className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Input Bar */}
            <div className="border-t border-gray-800 bg-[#090d16] p-4 flex items-center gap-3">
              <input
                type="text"
                disabled={!sessionActive || sendMessageMutation.isPending}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSendMessage(false);
                }}
                placeholder={
                  sessionActive
                    ? 'State your clarifying question or proposed approach...'
                    : 'Start the interview session first to begin conversation'
                }
                className="flex-1 rounded-xl border border-gray-800 bg-[#0e1422] px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none disabled:opacity-50"
              />
              <button
                disabled={!sessionActive || !inputMessage.trim() || sendMessageMutation.isPending}
                onClick={() => handleSendMessage(false)}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600 text-white hover:bg-purple-500 transition-all disabled:opacity-50"
                aria-label="Send Message"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Behavioral STAR Builder Tab */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Form (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl border border-gray-800 bg-[#111827]/60 p-6 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white">Craft High-Impact STAR Stories</h2>
              <p className="text-xs text-gray-400">
                Structure your engineering triumphs using Situation, Task, Action, and Result. AI will score your quantifiable business impact.
              </p>
            </div>

            <form onSubmit={handleSaveStory} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-300 mb-1 block">Story Title</label>
                  <input
                    type="text"
                    required
                    value={starTitle}
                    onChange={(e) => setStarTitle(e.target.value)}
                    placeholder="e.g. Distributed Ingestion Cutover"
                    className="w-full rounded-xl border border-gray-800 bg-[#0d121f] p-2.5 text-xs text-white focus:border-purple-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-300 mb-1 block">Leadership Pillar</label>
                  <select
                    value={starPillar}
                    onChange={(e) => setStarPillar(e.target.value)}
                    className="w-full rounded-xl border border-gray-800 bg-[#0d121f] p-2.5 text-xs text-white focus:border-purple-500 focus:outline-none"
                  >
                    <option value="Ownership & Bias for Action">Ownership & Bias for Action</option>
                    <option value="Customer Obsession">Customer Obsession</option>
                    <option value="Deep Technical Dive">Deep Technical Dive</option>
                    <option value="Disagree and Commit">Disagree and Commit</option>
                    <option value="Delivering High-Impact Results">Delivering High-Impact Results</option>
                  </select>
                </div>
              </div>

              {/* STAR Quadrants */}
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-purple-400 mb-1 block">
                    1. Situation (Context & Crisis)
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={starSituation}
                    onChange={(e) => setStarSituation(e.target.value)}
                    placeholder="What was the business context, outage, or technical bottleneck?"
                    className="w-full rounded-xl border border-gray-800 bg-[#0d121f] p-2.5 text-xs text-white focus:border-purple-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-purple-400 mb-1 block">
                    2. Task (Your Direct Responsibility)
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={starTask}
                    onChange={(e) => setStarTask(e.target.value)}
                    placeholder="What specific objective did you take personal responsibility for solving?"
                    className="w-full rounded-xl border border-gray-800 bg-[#0d121f] p-2.5 text-xs text-white focus:border-purple-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-purple-400 mb-1 block">
                    3. Action (Your Specific Technical Steps)
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={starAction}
                    onChange={(e) => setStarAction(e.target.value)}
                    placeholder="What exact architecture, code, or consensus-building actions did YOU execute?"
                    className="w-full rounded-xl border border-gray-800 bg-[#0d121f] p-2.5 text-xs text-white focus:border-purple-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-purple-400 mb-1 block">
                    4. Result (Quantified Business & Technical Metrics)
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={starResult}
                    onChange={(e) => setStarResult(e.target.value)}
                    placeholder="What numbers prove success? (e.g. 'reduced latency by 45%', '$300k cloud savings')"
                    className="w-full rounded-xl border border-gray-800 bg-[#0d121f] p-2.5 text-xs text-white focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={evaluateStoryMutation.isPending}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-purple-600 p-3 text-xs font-bold text-white hover:bg-purple-500 transition-all shadow-md shadow-purple-900/30"
              >
                <Sparkles className="h-4 w-4" />
                {evaluateStoryMutation.isPending ? 'Scoring Story...' : 'Save & Grade Story with AI'}
              </button>
            </form>
          </div>

          {/* Stored Stories & AI Feedback (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Bookmark className="h-4 w-4 text-purple-400" />
              Your Evaluated STAR Bank ({pastStories?.length || 0})
            </h3>

            <div className="space-y-4 overflow-y-auto max-h-[640px] pr-1">
              {pastStories?.map((story) => (
                <div
                  key={story.id}
                  className="rounded-2xl border border-gray-800 bg-[#111827]/70 p-5 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-purple-500/10 border border-purple-500/30 px-2 py-0.5 text-[10px] font-semibold text-purple-300">
                      {story.companyPillar}
                    </span>
                    <span className="text-xs font-bold text-emerald-400">
                      Impact Score: {story.aiScore}/100
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white">{story.title}</h4>

                  <p className="text-xs text-gray-300 leading-relaxed">
                    <strong className="text-purple-400">Result: </strong>
                    {story.result}
                  </p>

                  {story.aiFeedback && (
                    <div className="rounded-xl bg-[#090d16] p-3 border border-gray-800 text-[11px] text-gray-400 space-y-1">
                      <p className="font-semibold text-indigo-300 flex items-center gap-1">
                        <Sparkles className="h-3 w-3" /> AI Critique:
                      </p>
                      <p>{story.aiFeedback}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

