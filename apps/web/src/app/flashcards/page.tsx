'use client';

import React, { useState } from 'react';
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
  ChevronRight
} from 'lucide-react';

export default function FlashcardsSRSPage() {
  const { data: queueData, isLoading, refetch } = trpc.srs.getDueQueue.useQuery();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const reviewMutation = trpc.srs.reviewCard.useMutation({
    onSuccess: () => {
      refetch();
      setFlipped(false);
      setCurrentIndex((prev) => prev + 1);
    },
  });

  const allCards = queueData?.allCards || [];
  const filteredCards = selectedCategory === 'ALL'
    ? (queueData?.dueCards && queueData.dueCards.length > 0 ? queueData.dueCards : allCards)
    : allCards.filter((c) => c.deckCategory === selectedCategory);

  const activeCard = filteredCards[currentIndex % Math.max(1, filteredCards.length)];

  const categories = [
    'ALL',
    'Operating Systems',
    'DBMS',
    'Computer Networks',
    'Concurrency',
    'OOPs',
  ];

  const handleReview = (rating: 'AGAIN' | 'HARD' | 'GOOD' | 'EASY') => {
    if (!activeCard) return;
    reviewMutation.mutate({
      cardId: activeCard.id,
      rating,
    });
  };

  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
            <BrainCircuit className="h-7 w-7 text-indigo-400" />
            CS Fundamentals Spaced Repetition (SM-2)
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            SuperMemo SM-2 interval scheduling for OS, DBMS, Networks, Concurrency, and OOPs mastery.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1.5 text-center">
            <span className="text-lg font-bold text-indigo-400">{queueData?.dueCount ?? 0}</span>
            <p className="text-[10px] text-gray-400 uppercase font-semibold">Cards Due Today</p>
          </div>
        </div>
      </div>

      {/* Categories Filter Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-800 pb-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setCurrentIndex(0);
              setFlipped(false);
            }}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-gray-900 border border-gray-800 text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Flashcard Area */}
      {activeCard ? (
        <div className="space-y-6">
          {/* Card Frame */}
          <div
            onClick={() => setFlipped(!flipped)}
            className="cursor-pointer group relative min-h-[340px] rounded-3xl border border-gray-800 bg-gradient-to-b from-[#111827] to-[#0d121f] p-8 sm:p-10 flex flex-col justify-between shadow-2xl transition-all duration-300 hover:border-indigo-500/40"
          >
            {/* Card Metadata Header */}
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-indigo-500/10 border border-indigo-500/30 px-3 py-1 text-xs font-bold text-indigo-300">
                {activeCard.deckCategory}
              </span>

              <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                <RotateCw className="h-3.5 w-3.5 group-hover:rotate-180 transition-transform duration-500" />
                <span>Click to flip</span>
              </div>
            </div>

            {/* Content Front vs Back */}
            <div className="my-auto py-6">
              {!flipped ? (
                <div className="space-y-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">
                    Question
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white leading-relaxed">
                    {activeCard.front}
                  </h2>
                </div>
              ) : (
                <div className="space-y-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                    Answer & Explanation
                  </span>
                  <p className="text-base text-gray-200 leading-relaxed whitespace-pre-wrap">
                    {activeCard.back}
                  </p>
                </div>
              )}
            </div>

            {/* Card Footer tags & SM-2 stats */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-gray-800/80 pt-4 text-xs text-gray-400">
              <div className="flex items-center gap-1.5">
                <Tag className="h-3.5 w-3.5 text-gray-500" />
                {activeCard.tags.map((t) => (
                  <span key={t} className="rounded bg-gray-800 px-2 py-0.5 text-[10px] text-gray-400">
                    #{t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3 text-[11px]">
                <span>Interval: {activeCard.interval ?? 0}d</span>
                <span>Ease: {activeCard.easeFactor ? activeCard.easeFactor.toFixed(2) : '2.50'}</span>
              </div>
            </div>
          </div>

          {/* SM-2 Confidence Review Buttons */}
          <div className="space-y-2">
            <p className="text-center text-xs text-gray-400 font-medium">
              Rate your recall quality to calculate next SM-2 interval:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                onClick={() => handleReview('AGAIN')}
                disabled={reviewMutation.isPending}
                className="rounded-xl border border-red-500/30 bg-red-950/20 p-3 text-center hover:bg-red-900/30 transition-all"
              >
                <span className="text-sm font-bold text-red-400 block">Again</span>
                <span className="text-[10px] text-gray-400 block mt-0.5">&lt; 10 mins (Reset)</span>
              </button>

              <button
                onClick={() => handleReview('HARD')}
                disabled={reviewMutation.isPending}
                className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-3 text-center hover:bg-amber-900/30 transition-all"
              >
                <span className="text-sm font-bold text-amber-400 block">Hard</span>
                <span className="text-[10px] text-gray-400 block mt-0.5">3 days</span>
              </button>

              <button
                onClick={() => handleReview('GOOD')}
                disabled={reviewMutation.isPending}
                className="rounded-xl border border-indigo-500/30 bg-indigo-950/20 p-3 text-center hover:bg-indigo-900/30 transition-all"
              >
                <span className="text-sm font-bold text-indigo-400 block">Good</span>
                <span className="text-[10px] text-gray-400 block mt-0.5">6 days</span>
              </button>

              <button
                onClick={() => handleReview('EASY')}
                disabled={reviewMutation.isPending}
                className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-3 text-center hover:bg-emerald-900/30 transition-all"
              >
                <span className="text-sm font-bold text-emerald-400 block">Easy</span>
                <span className="text-[10px] text-gray-400 block mt-0.5">10 days</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-gray-800 bg-[#111827]/60 p-12 text-center space-y-3">
          <CheckCircle2 className="h-10 w-10 text-emerald-400 mx-auto" />
          <h3 className="text-lg font-bold text-white">Daily Queue Completed!</h3>
          <p className="text-xs text-gray-400 max-w-sm mx-auto">
            All due cards have been successfully processed for today. Review will resume tomorrow according to the SM-2 schedule.
          </p>
        </div>
      )}
    </div>
  );
}

