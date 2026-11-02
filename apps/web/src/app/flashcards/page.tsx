'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { trpc } from '../../lib/trpc';
import { 
  BrainCircuit, 
  RotateCw, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Layers, 
  Tag, 
  Flame,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Search,
  BookOpen,
  Copy,
  Check,
  Filter,
  GraduationCap,
  Cpu,
  Database,
  Network,
  Boxes,
  Server
} from 'lucide-react';

export default function FlashcardsSRSPage() {
  const [activeTab, setActiveTab] = useState<'qna' | 'drill'>('qna');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // SRS drill state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  // Fetch theory questions via listTheory or getDueQueue
  const { data: theoryCards, isLoading: isLoadingTheory } = trpc.srs.listTheory.useQuery({
    category: selectedCategory === 'ALL' ? undefined : selectedCategory,
    search: searchQuery || undefined,
  });

  const { data: queueData, refetch: refetchQueue } = trpc.srs.getDueQueue.useQuery();

  const reviewMutation = trpc.srs.reviewCard.useMutation({
    onSuccess: () => {
      refetchQueue();
      setFlipped(false);
      setCurrentIndex((prev) => prev + 1);
    },
  });

  const categoryConfigs = [
    { key: 'ALL', label: 'All Questions', count: 150, icon: GraduationCap, color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30' },
    { key: 'Operating Systems', label: 'Operating Systems', count: 30, icon: Cpu, color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30' },
    { key: 'DBMS', label: 'DBMS & SQL', count: 30, icon: Database, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' },
    { key: 'Computer Networks', label: 'Computer Networks', count: 30, icon: Network, color: 'text-blue-400 bg-blue-500/10 border-blue-500/30' },
    { key: 'OOPs', label: 'OOPs & Principles', count: 30, icon: Boxes, color: 'text-purple-400 bg-purple-500/10 border-purple-500/30' },
    { key: 'System Design', label: 'System Design', count: 30, icon: Server, color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' },
  ];

  const cardsToDisplay = theoryCards || [];

  const toggleExpand = (id: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const allExpanded: Record<string, boolean> = {};
    cardsToDisplay.forEach((c) => {
      allExpanded[c.id] = true;
    });
    setExpandedCards(allExpanded);
  };

  const collapseAll = () => {
    setExpandedCards({});
  };

  const handleCopy = (card: { id: string; front: string; back: string }) => {
    const text = `Q: ${card.front}\n\nA: ${card.back}`;
    navigator.clipboard.writeText(text);
    setCopiedId(card.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Drill active card
  const drillCards = queueData?.allCards || theoryCards || [];
  const filteredDrillCards = selectedCategory === 'ALL'
    ? drillCards
    : drillCards.filter((c) => c.deckCategory.toLowerCase().includes(selectedCategory.toLowerCase()));
  const activeDrillCard = filteredDrillCards[currentIndex % Math.max(1, filteredDrillCards.length)];

  const handleReview = (rating: 'AGAIN' | 'HARD' | 'GOOD' | 'EASY') => {
    if (!activeDrillCard) return;
    reviewMutation.mutate({
      cardId: activeDrillCard.id,
      rating,
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-slate-900/50 border border-indigo-500/20 rounded-2xl p-6 md:p-8 backdrop-blur-sm relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-xs font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>150 Top Placement Interview Questions & Answers</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-2">
                Placement Theory & CS Fundamentals Vault
              </h1>
              <p className="text-slate-300 text-sm md:text-base max-w-3xl leading-relaxed">
                Master high-frequency core interview questions with crystal-clear, structured answers across 
                <span className="text-cyan-300 font-medium"> OS</span>, 
                <span className="text-emerald-300 font-medium"> DBMS & SQL</span>, 
                <span className="text-blue-300 font-medium"> Computer Networks</span>, 
                <span className="text-purple-300 font-medium"> OOPs</span>, and 
                <span className="text-amber-300 font-medium"> System Design</span> (30 questions each).
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/concepts"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-sm font-semibold transition"
              >
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <span>Concepts & Formulas</span>
              </Link>
              <Link
                href="/arena"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-lg shadow-indigo-600/30 transition"
              >
                <Cpu className="w-4 h-4" />
                <span>150 DSA Coding Arena</span>
              </Link>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center bg-slate-900/80 p-1.5 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveTab('qna')}
                className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === 'qna'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>150 Interview Q&A Bank</span>
                <span className="ml-1 px-1.5 py-0.5 rounded-full text-xs bg-indigo-900/60 text-indigo-200">
                  150
                </span>
              </button>
              <button
                onClick={() => setActiveTab('drill')}
                className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === 'drill'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <BrainCircuit className="w-4 h-4" />
                <span>SM-2 Spaced Repetition Drill</span>
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>Placement Ready: Complete verified answers with diagrams and code snippets</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto">
        {/* Category Filters Bar */}
        <div className="mb-6 flex flex-wrap gap-2 items-center">
          {categoryConfigs.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => {
                  setSelectedCategory(cat.key);
                  setCurrentIndex(0);
                  setFlipped(false);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs md:text-sm font-medium border transition-all ${
                  isSelected
                    ? `${cat.color} ring-2 ring-indigo-500/50 shadow-md`
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{cat.label}</span>
                <span className="px-1.5 py-0.5 rounded-md bg-slate-800/80 text-[11px] font-mono text-slate-300">
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: 150 Q&A BANK */}
        {activeTab === 'qna' && (
          <div>
            {/* Search and Action Bar */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative w-full md:w-96">
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search 150 questions (e.g. Deadlock, B+ Tree, TCP, SOLID, Kafka)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
                />
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                <span className="text-xs text-slate-400">
                  Showing <strong className="text-slate-200">{cardsToDisplay.length}</strong> questions
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={expandAll}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-medium transition"
                  >
                    Expand All
                  </button>
                  <button
                    onClick={collapseAll}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-medium transition"
                  >
                    Collapse All
                  </button>
                </div>
              </div>
            </div>

            {/* Questions List */}
            {isLoadingTheory ? (
              <div className="text-center py-24 bg-slate-900/40 rounded-2xl border border-slate-800">
                <RotateCw className="w-8 h-8 text-indigo-400 animate-spin mx-auto mb-3" />
                <p className="text-slate-400 text-sm">Loading 150 placement interview questions...</p>
              </div>
            ) : cardsToDisplay.length === 0 ? (
              <div className="text-center py-20 bg-slate-900/40 rounded-2xl border border-slate-800">
                <p className="text-slate-400 text-base mb-2">No questions matched your search query.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('ALL');
                  }}
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cardsToDisplay.map((card, idx) => {
                  const isExpanded = !!expandedCards[card.id];
                  const isCopied = copiedId === card.id;

                  // Determine category color badge
                  const catUpper = card.deckCategory.toUpperCase();
                  let catBadgeStyle = 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30';
                  if (catUpper.includes('DBMS') || catUpper.includes('SQL')) {
                    catBadgeStyle = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
                  } else if (catUpper.includes('NETWORK')) {
                    catBadgeStyle = 'text-blue-400 bg-blue-500/10 border-blue-500/30';
                  } else if (catUpper.includes('OOP')) {
                    catBadgeStyle = 'text-purple-400 bg-purple-500/10 border-purple-500/30';
                  } else if (catUpper.includes('SYSTEM')) {
                    catBadgeStyle = 'text-amber-400 bg-amber-500/10 border-amber-500/30';
                  }

                  return (
                    <div
                      key={card.id}
                      className="bg-slate-900/70 border border-slate-800/80 hover:border-slate-700/80 rounded-2xl overflow-hidden transition-all duration-200 shadow-sm"
                    >
                      {/* Question Header Card */}
                      <div
                        onClick={() => toggleExpand(card.id)}
                        className="p-5 cursor-pointer flex items-start justify-between gap-4 hover:bg-slate-800/30 transition"
                      >
                        <div className="flex items-start gap-4 flex-1">
                          <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center font-mono text-xs font-bold text-slate-300">
                            {idx + 1}
                          </span>
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${catBadgeStyle}`}>
                                {card.deckCategory}
                              </span>
                              {card.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded-md"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                            <h3 className="text-base md:text-lg font-semibold text-slate-100 leading-snug">
                              {card.front}
                            </h3>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopy(card);
                            }}
                            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition"
                            title="Copy Question & Answer"
                          >
                            {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                          </button>
                          <div className="p-2 rounded-lg bg-slate-800/60 text-slate-400">
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </div>
                        </div>
                      </div>

                      {/* Expandable Answer Section */}
                      {isExpanded && (
                        <div className="px-5 pb-6 pt-2 border-t border-slate-800/60 bg-slate-950/60">
                          <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Interview-Ready Model Answer:</span>
                          </div>
                          
                          <div className="text-slate-300 text-sm md:text-base leading-relaxed whitespace-pre-line pl-4 border-l-2 border-indigo-500/40 bg-slate-900/30 p-4 rounded-r-xl">
                            {card.back}
                          </div>

                          {card.codeSnippet && (
                            <div className="mt-4">
                              <div className="text-xs font-mono text-slate-400 mb-1 flex items-center gap-1.5">
                                <span>Code / Schema Illustration:</span>
                              </div>
                              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs md:text-sm font-mono text-emerald-300 overflow-x-auto leading-relaxed">
                                {card.codeSnippet}
                              </pre>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: SM-2 SPACED REPETITION DRILL */}
        {activeTab === 'drill' && (
          <div className="max-w-3xl mx-auto">
            {filteredDrillCards.length === 0 ? (
              <div className="text-center py-20 bg-slate-900/40 rounded-2xl border border-slate-800">
                <p className="text-slate-400 text-base">No flashcards available in this category.</p>
              </div>
            ) : (
              <div>
                {/* Progress Indicator */}
                <div className="flex items-center justify-between mb-4 text-sm text-slate-400">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-indigo-400" />
                    <span>Card {((currentIndex) % filteredDrillCards.length) + 1} of {filteredDrillCards.length}</span>
                  </div>
                  <div className="text-xs font-mono bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
                    Category: {activeDrillCard?.deckCategory || selectedCategory}
                  </div>
                </div>

                {/* Flashcard Box */}
                <div
                  onClick={() => setFlipped(!flipped)}
                  className={`min-h-[380px] md:min-h-[440px] bg-slate-900/90 border-2 rounded-3xl p-6 md:p-10 cursor-pointer flex flex-col justify-between transition-all duration-300 shadow-2xl relative ${
                    flipped
                      ? 'border-indigo-500/50 bg-gradient-to-b from-slate-900 via-indigo-950/20 to-slate-900'
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                      {flipped ? 'Model Answer' : 'Interview Question'}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1.5">
                      <RotateCw className="w-3.5 h-3.5" />
                      Click card to flip
                    </span>
                  </div>

                  <div className="flex-1 flex flex-col justify-center my-4 overflow-y-auto max-h-[320px] pr-2">
                    {!flipped ? (
                      <div>
                        <h2 className="text-xl md:text-2xl font-bold text-white leading-relaxed mb-4">
                          {activeDrillCard?.front}
                        </h2>
                        <div className="flex flex-wrap gap-2">
                          {activeDrillCard?.tags.map((t) => (
                            <span key={t} className="text-xs text-indigo-300 bg-indigo-950/50 px-2.5 py-1 rounded-lg border border-indigo-800/40">
                              #{t}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="text-slate-200 text-sm md:text-base leading-relaxed whitespace-pre-line pl-4 border-l-2 border-indigo-500/50">
                          {activeDrillCard?.back}
                        </div>
                        {activeDrillCard?.codeSnippet && (
                          <pre className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-300 overflow-x-auto">
                            {activeDrillCard.codeSnippet}
                          </pre>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="border-t border-slate-800/80 pt-4 flex items-center justify-between text-xs text-slate-400">
                    <span>ID: {activeDrillCard?.id}</span>
                    <span>Tap or click anywhere to flip</span>
                  </div>
                </div>

                {/* Confidence SM-2 Rating Buttons (visible when flipped) */}
                {flipped ? (
                  <div className="mt-6 bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
                    <p className="text-xs font-semibold text-slate-400 text-center mb-3 uppercase tracking-wider">
                      Rate Your Recall Quality (SuperMemo SM-2 Interval Algorithm):
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                      <button
                        onClick={() => handleReview('AGAIN')}
                        className="py-3 px-4 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs md:text-sm font-semibold transition"
                      >
                        Again (&lt;1d)
                      </button>
                      <button
                        onClick={() => handleReview('HARD')}
                        className="py-3 px-4 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs md:text-sm font-semibold transition"
                      >
                        Hard (1-2d)
                      </button>
                      <button
                        onClick={() => handleReview('GOOD')}
                        className="py-3 px-4 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs md:text-sm font-semibold transition"
                      >
                        Good (3-6d)
                      </button>
                      <button
                        onClick={() => handleReview('EASY')}
                        className="py-3 px-4 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs md:text-sm font-semibold transition"
                      >
                        Easy (7+d)
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-6 flex items-center justify-between">
                    <button
                      onClick={() => {
                        setCurrentIndex((prev) => Math.max(0, prev - 1));
                        setFlipped(false);
                      }}
                      className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 text-sm font-medium transition"
                    >
                      Previous Card
                    </button>
                    <button
                      onClick={() => setFlipped(true)}
                      className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-lg shadow-indigo-600/30 transition flex items-center gap-2"
                    >
                      <span>Show Answer</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setCurrentIndex((prev) => prev + 1);
                        setFlipped(false);
                      }}
                      className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 text-sm font-medium transition"
                    >
                      Next Card
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
